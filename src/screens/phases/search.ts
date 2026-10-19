import { iconSvg, SCENE_DECOYS } from '../../art/icons';
import { sceneSvg, SPOTS } from '../../art/scenes';
import { save, useItem } from '../../state';
import { floatText, html, ITEM_ICON, sfx, shuffle, toast, vibrate } from '../../ui';
import { makeMapper, type PhaseResult, type Run, type StageChrome } from '../play';

const BASE_TIME = 90;

type Spot = { kind: 'key' | 'hidden' | 'decoy'; idx: number; icon: string; x: number; y: number; el?: HTMLElement; found?: boolean };

/** 階段 1：搜證找物 */
export function runSearch(run: Run, stage: HTMLElement, ui: StageChrome): Promise<PhaseResult> {
  return new Promise((resolve) => {
    const lv = run.lv;
    stage.classList.add('dark');
    html(
      stage,
      `<div class="found-tray" data-tray>
        ${lv.clues.map((_, i) => `<div class="slot" data-k="${i}"><span style="color:#fff;font-weight:900">?</span></div>`).join('')}
        ${run.hidden.map((_, i) => `<div class="slot hid" data-h="${i}"><span style="color:#fff;font-size:12px">★</span></div>`).join('')}
      </div>
      <div class="timer" data-timer>${BASE_TIME}</div>
      <div class="search-area" data-area>
        <div class="backdrop">${sceneSvg(lv.scene)}</div>
        <div class="main">${sceneSvg(lv.scene, '', '', 'xMidYMid meet')}</div>
        <div class="search-layer" data-layer></div>
      </div>
      <div class="item-bar">
        <button class="item-btn" data-item="magnifier">${ITEM_ICON.magnifier}<span class="cnt">${save.items.magnifier}</span><span class="lbl">放大鏡</span></button>
        <button class="item-btn" data-item="time">${ITEM_ICON.time}<span class="cnt">${save.items.time}</span><span class="lbl">+30秒</span></button>
        <button class="btn teal" data-done style="display:none">完成搜證 ▶</button>
      </div>`,
    );

    const area = stage.querySelector('[data-area]') as HTMLElement;
    const layer = stage.querySelector('[data-layer]') as HTMLElement;
    const timerEl = stage.querySelector('[data-timer]') as HTMLElement;
    const doneBtn = stage.querySelector('[data-done]') as HTMLElement;

    // 擺放證物：關鍵 3、隱藏 2、雜物 3
    const spots = shuffle(SPOTS[lv.scene]);
    const decoys = shuffle(SCENE_DECOYS[lv.scene]).slice(0, 3);
    const items: Spot[] = [
      ...lv.clues.map((c, i) => ({ kind: 'key' as const, idx: i, icon: c.icon })),
      ...run.hidden.map((h, i) => ({ kind: 'hidden' as const, idx: i, icon: h.icon })),
      ...decoys.map((d, i) => ({ kind: 'decoy' as const, idx: i, icon: d })),
    ].map((it, i) => ({ ...it, x: spots[i][0], y: spots[i][1] }));

    for (const it of items) {
      const b = document.createElement('button');
      b.className = `hotspot${it.kind === 'hidden' ? ' hidden-ev' : ''}`;
      b.innerHTML = iconSvg(it.icon, it.kind === 'hidden' ? 30 : 48);
      b.style.transform = `translate(-50%,-50%) rotate(${Math.round(Math.random() * 40 - 20)}deg)`;
      b.setAttribute('aria-label', it.kind === 'decoy' ? '雜物' : '可疑物品');
      layer.appendChild(b);
      it.el = b;
      b.addEventListener('click', (e) => onTap(it, e));
    }

    const place = () => {
      const { map } = makeMapper(area);
      for (const it of items) {
        const [px, py] = map(it.x, it.y);
        it.el!.style.left = `${px}px`;
        it.el!.style.top = `${py}px`;
      }
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(area);

    let time = BASE_TIME;
    let ended = false;
    const keysDone = () => run.keysFound.every(Boolean);

    const end = (r: PhaseResult) => {
      if (ended) return;
      ended = true;
      clearInterval(tick);
      ro.disconnect();
      resolve(r);
    };

    const updTimer = () => {
      timerEl.textContent = String(Math.max(0, time));
      timerEl.classList.toggle('warn', time <= 10);
    };

    const tick = window.setInterval(() => {
      time--;
      updTimer();
      if (time <= 0) {
        if (keysDone()) end({ ok: true });
        else {
          sfx('lose');
          end({ ok: false, fail: 'timeout' });
        }
      }
    }, 1000);

    function onTap(it: Spot, e: MouseEvent) {
      if (ended || it.found) return;
      const ar = area.getBoundingClientRect();
      const fx = e.clientX - ar.left + area.offsetLeft;
      const fy = e.clientY - ar.top + area.offsetTop;
      if (it.kind === 'decoy') {
        time = Math.max(1, time - 5);
        updTimer();
        sfx('bad');
        vibrate(60);
        it.el!.classList.remove('miss');
        void it.el!.offsetWidth;
        it.el!.classList.add('miss');
        floatText(stage, fx, fy, '-5 秒', true);
        return;
      }
      it.found = true;
      it.el!.classList.remove('hint');
      it.el!.classList.add('found');
      sfx('good');
      if (it.kind === 'key') {
        run.keysFound[it.idx] = true;
        const slot = stage.querySelector(`[data-k="${it.idx}"]`) as HTMLElement;
        slot.classList.add('got');
        slot.innerHTML = iconSvg(it.icon, 38);
        floatText(stage, fx, fy, lv.clues[it.idx].name);
        if (keysDone()) {
          doneBtn.style.display = '';
          toast('關鍵證物到齊！還可以找隱藏證物');
        }
      } else {
        run.hidden[it.idx].found = true;
        const slot = stage.querySelector(`[data-h="${it.idx}"]`) as HTMLElement;
        slot.classList.add('got');
        slot.innerHTML = iconSvg(it.icon, 28);
        floatText(stage, fx, fy, `★ ${run.hidden[it.idx].name}`);
      }
      if (keysDone() && run.hidden.every((h) => h.found)) {
        toast('完美搜證！');
        setTimeout(() => end({ ok: true }), 900);
      }
    }

    doneBtn.addEventListener('click', () => {
      sfx('tap');
      end({ ok: true });
    });

    const refreshItems = () => {
      stage.querySelectorAll<HTMLElement>('[data-item]').forEach((b) => {
        const k = b.dataset.item as 'magnifier' | 'time';
        (b.querySelector('.cnt') as HTMLElement).textContent = String(save.items[k]);
        b.toggleAttribute('disabled', save.items[k] <= 0);
      });
    };
    refreshItems();
    stage.querySelector('[data-item="magnifier"]')!.addEventListener('click', () => {
      const target = items.find((i) => i.kind === 'key' && !i.found) ?? items.find((i) => i.kind === 'hidden' && !i.found);
      if (!target || !useItem('magnifier')) return;
      sfx('good');
      target.el!.classList.add('hint');
      refreshItems();
    });
    stage.querySelector('[data-item="time"]')!.addEventListener('click', () => {
      if (!useItem('time')) return;
      time += 30;
      updTimer();
      sfx('good');
      toast('+30 秒');
      refreshItems();
    });

    ui.setEvidence(run.evidence);
  });
}
