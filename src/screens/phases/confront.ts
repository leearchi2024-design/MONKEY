import { portrait } from '../../art/chibi';
import { iconSvg } from '../../art/icons';
import { sceneSvg } from '../../art/scenes';
import { ch } from '../../data/characters';
import { save, useItem } from '../../state';
import { html, ITEM_ICON, sfx, sleep, toast, vibrate } from '../../ui';
import type { PhaseResult, Run, StageChrome } from '../play';

const RETORTS = ['哈，這能證明什麼？', '你想太多了吧。', '拿這個來？笑死。', '這跟我有什麼關係？'];

/** 階段 4：對質（出示證物戳破三句謊言） */
export function runConfront(run: Run, stage: HTMLElement, ui: StageChrome): Promise<PhaseResult> {
  return new Promise((resolve) => {
    const lv = run.lv;
    const opp = ch(lv.target);
    const you = run.route === 'f' ? '妳' : '你';
    let round = 0;
    let busy = false;

    type Card = { kind: 'key'; i: number } | { kind: 'joker'; i: number };
    const hand: Card[] = [...lv.clues.map((_, i) => ({ kind: 'key' as const, i })), ...run.hidden.map((h, i) => ({ h, i })).filter((x) => x.h.found).map((x) => ({ kind: 'joker' as const, i: x.i }))];

    html(
      stage,
      `${sceneSvg(lv.scene, '<rect width="400" height="720" fill="#1a1020" opacity=".45"/>')}
      <div class="confront-opp" data-opp>${portrait(lv.target, { size: 190, expr: 'smug' })}</div>
      <div class="round-pips" data-pips>${[1, 2, 3].map((n) => `<i>${n}</i>`).join('')}</div>
      <div class="speech" data-speech><span class="who">${opp.name}</span><span data-line></span></div>
      <div class="hand-label">出示證物，戳破謊言 👇</div>
      <div class="card-hand" data-hand>${hand
        .map((c, hi) =>
          c.kind === 'key'
            ? `<div class="ev-card" data-c="${hi}">${iconSvg(lv.clues[c.i].icon, 40)}${lv.clues[c.i].name}</div>`
            : `<div class="ev-card joker" data-c="${hi}">${iconSvg(run.hidden[c.i].icon, 40)}★${run.hidden[c.i].name}<br><small>萬用</small></div>`,
        )
        .join('')}</div>
      <div class="item-bar"><button class="item-btn" data-dash>${ITEM_ICON.dashcam}<span class="cnt">${save.items.dashcam}</span><span class="lbl">行車紀錄器</span></button></div>`,
    );

    const oppEl = stage.querySelector('[data-opp]') as HTMLElement;
    const line = stage.querySelector('[data-line]') as HTMLElement;
    const pips = Array.from(stage.querySelectorAll<HTMLElement>('[data-pips] i'));
    const handEl = stage.querySelector('[data-hand]') as HTMLElement;
    const dash = stage.querySelector('[data-dash]') as HTMLElement;
    const refreshDash = () => {
      (dash.querySelector('.cnt') as HTMLElement).textContent = String(save.items.dashcam);
      dash.toggleAttribute('disabled', save.items.dashcam <= 0);
    };
    refreshDash();

    const setOpp = (expr: 'smug' | 'shocked' | 'angry' | 'cry') => {
      oppEl.innerHTML = portrait(lv.target, { size: 190, expr });
    };
    const say = (t: string) => {
      line.textContent = `「${t}」`;
    };
    say(lv.clues[0].lie);

    const pierce = async (label: string) => {
      busy = true;
      sfx('stamp');
      vibrate(120);
      pips[round].classList.add('done');
      setOpp(round === 2 ? 'cry' : 'shocked');
      oppEl.classList.remove('hit');
      void oppEl.offsetWidth;
      oppEl.classList.add('hit');
      const st = document.createElement('div');
      st.className = 'stamp';
      st.textContent = label;
      stage.appendChild(st);
      await sleep(1000);
      st.remove();
      round++;
      if (round >= 3) {
        const fl = document.createElement('div');
        fl.className = 'flash';
        stage.appendChild(fl);
        sfx('shutter');
        say(run.route === 'f' ? '我……我可以解釋……' : '我……我可以解釋……');
        await sleep(1100);
        resolve({ ok: true });
        return;
      }
      setOpp('smug');
      say(lv.clues[round].lie);
      busy = false;
    };

    handEl.addEventListener('click', async (e) => {
      const el = (e.target as HTMLElement).closest('[data-c]') as HTMLElement | null;
      if (!el || busy) return;
      const c = hand[Number(el.dataset.c)];
      if (c.kind === 'key' && c.i === round) {
        el.classList.add('used');
        await pierce('戳破！');
      } else if (c.kind === 'joker' && !run.hidden[c.i].used) {
        run.hidden[c.i].used = true;
        el.classList.add('used');
        await pierce('鐵證！');
      } else {
        busy = true;
        sfx('bad');
        vibrate(80);
        run.confrontMistakes++;
        run.evidence -= 20;
        ui.setEvidence(run.evidence);
        setOpp('smug');
        say(`${RETORTS[Math.floor(Math.random() * RETORTS.length)]}${you}拿錯東西了吧？`);
        if (run.evidence < 60) {
          await sleep(900);
          setOpp('angry');
          say(run.route === 'f' ? '妳偷看我手機，這才是犯法！' : '你跟蹤我，你才可怕吧！');
          await sleep(1300);
          resolve({ ok: false, fail: 'bitten' });
          return;
        }
        await sleep(1200);
        say(lv.clues[round].lie);
        busy = false;
      }
    });

    dash.addEventListener('click', async () => {
      if (busy || !useItem('dashcam')) return;
      refreshDash();
      toast('行車紀錄器畫面一播，對方啞口無言');
      const keyCard = handEl.querySelector(`[data-c="${hand.findIndex((c) => c.kind === 'key' && c.i === round)}"]`);
      keyCard?.classList.add('used');
      await pierce('鐵證！');
    });
  });
}
