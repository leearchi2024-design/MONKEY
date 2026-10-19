import { chibiSvg, portrait } from '../../art/chibi';
import { sceneSvg, TARGET_CAR } from '../../art/scenes';
import { ch } from '../../data/characters';
import { save, useItem } from '../../state';
import { html, ITEM_ICON, sfx, sleep, toast, vibrate } from '../../ui';
import type { PhaseResult, Run, StageChrome } from '../play';

const FLAVOR: Record<string, string> = {
  office: '躲在辦公隔板後面，一步一步靠近',
  motel: '沿著走廊前進，必要時躲到清潔車後面',
  cinema: '在黑暗的走道上前進，手機千萬別亮',
  park: '穿上吉祥物人偶裝，混在遊客裡前進',
  library: '自習室很安靜，被看到就會被請出去',
};

/** 階段 3：埋伏（汽車場景是跟車，其他是一二三木頭人潛行） */
export async function runAmbush(run: Run, stage: HTMLElement, ui: StageChrome): Promise<PhaseResult> {
  const r = run.lv.scene === 'car' ? await chase(run, stage) : await stealth(run, stage);
  if (!r.ok || !run.lv.trap) return r;
  return trapChoice(run, stage, ui);
}

function holdButton(stage: HTMLElement, label: string, sub: string): { el: HTMLElement; held: () => boolean; dispose: () => void } {
  html(stage, `<button class="hold-btn" data-hold>${label}<small>${sub}</small></button>`);
  const el = stage.querySelector('[data-hold]') as HTMLElement;
  let down = false;
  const on = (e: Event) => {
    e.preventDefault();
    down = true;
    el.classList.add('on');
  };
  const off = () => {
    down = false;
    el.classList.remove('on');
  };
  el.addEventListener('pointerdown', on);
  el.addEventListener('pointerup', off);
  el.addEventListener('pointerleave', off);
  el.addEventListener('pointercancel', off);
  el.addEventListener('contextmenu', (e) => e.preventDefault());
  const key = (e: KeyboardEvent) => {
    if (e.code !== 'Space') return;
    if (e.type === 'keydown') on(e);
    else off();
  };
  window.addEventListener('keydown', key);
  window.addEventListener('keyup', key);
  return { el, held: () => down, dispose: () => (window.removeEventListener('keydown', key), window.removeEventListener('keyup', key)) };
}

function hatButton(stage: HTMLElement): HTMLElement {
  html(stage, `<div class="ambush-side-item"><button class="item-btn" data-hat disabled>${ITEM_ICON.hat}<span class="cnt">${save.items.hat}</span><span class="lbl">變裝帽</span></button></div>`);
  return stage.querySelector('[data-hat]') as HTMLElement;
}

function stealth(run: Run, stage: HTMLElement): Promise<PhaseResult> {
  return new Promise((resolve) => {
    const lv = run.lv;
    const target = ch(lv.target).look;
    const hero = ch(run.hero).look;
    const hard = lv.chapter - 1; // 0–3
    html(
      stage,
      `${sceneSvg(lv.scene)}
      <div class="track"><i data-prog style="width:0%"></i></div>
      <div class="status-chip" data-status>${FLAVOR[lv.scene] ?? '慢慢靠近'}</div>
      <div class="ambush-watcher" data-watch><span class="watch-bubble" data-wb style="display:none">?</span><div data-wimg>${chibiSvg(target, { size: 130, back: true })}</div></div>
      <div class="ambush-hero" data-hero>${chibiSvg(hero, { size: 104, back: true })}</div>`,
    );
    const hold = holdButton(stage, '按住前進', '對方回頭就放開！');
    const hat = hatButton(stage);
    hat.toggleAttribute('disabled', save.items.hat <= 0);
    if (save.items.hat > 0) {
      hat.style.outline = '0';
      (hat.querySelector('.lbl') as HTMLElement).textContent = '變裝帽 自動';
    }

    const prog = stage.querySelector('[data-prog]') as HTMLElement;
    const status = stage.querySelector('[data-status]') as HTMLElement;
    const watch = stage.querySelector('[data-watch]') as HTMLElement;
    const wimg = stage.querySelector('[data-wimg]') as HTMLElement;
    const wb = stage.querySelector('[data-wb]') as HTMLElement;
    const heroEl = stage.querySelector('[data-hero]') as HTMLElement;

    type St = 'away' | 'warn' | 'look';
    let st: St = 'away';
    let stT = 0;
    let stDur = 2.2;
    let p = 0;
    let last = performance.now();
    let done = false;
    let raf = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const setState = (s: St) => {
      st = s;
      stT = 0;
      if (s === 'away') {
        stDur = rand(1.5 - hard * 0.2, 3 - hard * 0.3);
        wimg.innerHTML = chibiSvg(target, { size: 130, back: true });
        wb.style.display = 'none';
        watch.classList.remove('turning');
        status.textContent = '他沒在看，快前進！';
        status.className = 'status-chip safe';
      } else if (s === 'warn') {
        stDur = 0.6 - hard * 0.05;
        wb.style.display = '';
        wb.textContent = '?';
        watch.classList.add('turning');
        status.textContent = '好像要回頭了……';
        status.className = 'status-chip';
        sfx('alert');
      } else {
        stDur = rand(1, 1.7);
        watch.classList.remove('turning');
        wimg.innerHTML = chibiSvg(target, { size: 130, expr: 'normal' });
        wb.style.display = 'none';
        status.textContent = '別動！';
        status.className = 'status-chip danger';
      }
    };
    setState('away');

    const place = () => {
      const h = stage.clientHeight;
      const start = 150;
      const end = Math.max(start + 60, h * 0.78 - 230);
      heroEl.style.bottom = `${start + (end - start) * (p / 100)}px`;
      const s = 1 - p / 400;
      heroEl.style.transform = `translateX(-50%) scale(${s})`;
    };
    place();

    /** 停止遊戲迴圈，延遲一下再回報結果（讓玩家看到演出） */
    const finish = (r: PhaseResult, delay: number) => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      hold.dispose();
      heroEl.classList.remove('moving');
      setTimeout(() => resolve(r), delay);
    };

    const loop = (now: number) => {
      if (done) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      stT += dt;
      const moving = hold.held();
      heroEl.classList.toggle('moving', moving);
      if (moving) {
        p = Math.min(100, p + dt * 17);
        prog.style.width = `${p}%`;
        place();
      }
      if (st === 'look' && moving && stT > 0.15) {
        if (useItem('hat')) {
          run.saves++;
          sfx('good');
          toast('變裝帽救了你！對方沒認出來');
          hat.toggleAttribute('disabled', save.items.hat <= 0);
          (hat.querySelector('.cnt') as HTMLElement).textContent = String(save.items.hat);
          setState('away');
        } else {
          wimg.innerHTML = chibiSvg(target, { size: 130, expr: 'angry' });
          wb.style.display = '';
          wb.textContent = '！';
          status.textContent = '被發現了！';
          sfx('lose');
          vibrate(200);
          finish({ ok: false, fail: 'spotted' }, 900);
          return;
        }
      }
      if (p >= 100) {
        status.textContent = '成功埋伏到位！';
        status.className = 'status-chip safe';
        sfx('win');
        finish({ ok: true }, 800);
        return;
      }
      if (stT >= stDur) setState(st === 'away' ? 'warn' : st === 'warn' ? 'look' : 'away');
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  });
}

function chase(run: Run, stage: HTMLElement): Promise<PhaseResult> {
  return new Promise((resolve) => {
    const NEED = 10; // 需要在綠區累積的秒數
    const LIMIT = 40;
    html(
      stage,
      `${sceneSvg('car')}
      <svg class="cover" data-carwrap viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" style="inset:0;width:100%;height:100%;position:absolute"><g data-car>${TARGET_CAR}</g></svg>
      <div class="track"><i data-prog style="width:0%"></i></div>
      <div class="dist-meter"><div class="car-pin" data-pin><svg viewBox="-40 -30 80 60">${TARGET_CAR}</svg></div><div class="lbls"><span>太近</span><span>保持距離</span><span>太遠</span></div></div>
      <div class="status-chip" data-status style="top:calc(210px + env(safe-area-inset-top))">按住油門，保持在綠色區域</div>`,
    );
    const hold = holdButton(stage, '油門', '按住加速');
    const prog = stage.querySelector('[data-prog]') as HTMLElement;
    const pin = stage.querySelector('[data-pin]') as HTMLElement;
    const car = stage.querySelector('[data-car]') as SVGGElement;
    const status = stage.querySelector('[data-status]') as HTMLElement;
    const hard = run.lv.chapter - 1;

    let d = 50;
    let my = 45;
    let green = 0;
    let t = 0;
    let burst = 0;
    let last = performance.now();
    let done = false;
    let raf = 0;

    const finish = (r: PhaseResult, msg: string, good: boolean) => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      hold.dispose();
      status.textContent = msg;
      status.className = `status-chip ${good ? 'safe' : 'danger'}`;
      sfx(good ? 'win' : 'lose');
      setTimeout(() => resolve(r), 900);
    };

    const loop = (now: number) => {
      if (done) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (Math.random() < dt * (0.25 + hard * 0.08)) burst = (Math.random() < 0.5 ? -1 : 1) * (14 + hard * 4);
      burst *= 1 - dt * 0.8;
      const tv = 48 + Math.sin(t * 0.9) * (12 + hard * 3) + burst;
      my += (hold.held() ? 34 : -26) * dt;
      my = Math.max(10, Math.min(90, my));
      d += (tv - my) * dt * 0.9;
      d = Math.max(0, Math.min(100, d));

      pin.style.left = `${d}%`;
      const scale = 2.2 - (d / 100) * 1.9;
      car.setAttribute('transform', `translate(200 ${210 + (1 - d / 100) * 40}) scale(${scale.toFixed(3)})`);

      const inGreen = d >= 33 && d <= 70;
      if (inGreen) green += dt;
      prog.style.width = `${(green / NEED) * 100}%`;
      status.textContent = inGreen ? '距離剛好，繼續保持！' : d < 33 ? '太近了！會被發現！' : '太遠了！快跟上！';
      status.className = `status-chip ${inGreen ? 'safe' : 'danger'}`;

      if (d < 12) {
        if (useItem('hat')) {
          run.saves++;
          toast('變裝帽：戴上墨鏡壓低帽子，沒被認出！');
          d = 45;
          my = 30;
        } else return finish({ ok: false, fail: 'spotted' }, '被發現了！對方掉頭甩車', false);
      }
      if (d > 92) return finish({ ok: false, fail: 'lost' }, '跟丟了……', false);
      if (green >= NEED) return finish({ ok: true }, '成功跟到目的地！', true);
      if (t > LIMIT) return finish({ ok: false, fail: 'lost' }, '跟丟了……', false);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  });
}

/** 陷阱關：門後的真相是誤會，正確選擇是撤退 */
async function trapChoice(run: Run, stage: HTMLElement, _ui: StageChrome): Promise<PhaseResult> {
  stage.querySelectorAll('.hold-btn, .ambush-side-item, .track, .status-chip').forEach((e) => e.remove());
  await sleep(200);
  return new Promise((resolve) => {
    html(
      stage,
      `<div class="door-choice">
        <div style="display:flex;gap:10px;align-items:center">${portrait(run.hero, { size: 64, expr: 'worried' })}<p><b>咦？</b>${run.lv.trap!.sound}</p></div>
        <button class="btn pink block" data-rush>衝進去抓猴！</button>
        <button class="btn plain block" data-back>悄悄撤退，回報委託人</button>
      </div>`,
    );
    stage.querySelector('[data-rush]')!.addEventListener('click', () => {
      sfx('bad');
      resolve({ ok: false, fail: 'trap' });
    });
    stage.querySelector('[data-back]')!.addEventListener('click', () => {
      sfx('good');
      run.retreated = true;
      resolve({ ok: true });
    });
  });
}
