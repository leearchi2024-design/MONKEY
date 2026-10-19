import { iconSvg } from '../../art/icons';
import { sceneSvg } from '../../art/scenes';
import { save, useItem } from '../../state';
import { html, ITEM_ICON, sfx, shuffle, sleep, toast, vibrate } from '../../ui';
import type { PhaseResult, Run, StageChrome } from '../play';

const GROUPS = [
  { key: 'time', label: '時間', color: '#c4996e', ico: '⏰' },
  { key: 'place', label: '地點', color: '#52908f', ico: '📍' },
  { key: 'who', label: '對象', color: '#d18f9f', ico: '👤' },
] as const;

/** 階段 2：推理（把證物拼成時間／地點／對象） */
export function runDeduce(run: Run, stage: HTMLElement, ui: StageChrome): Promise<PhaseResult> {
  return new Promise((resolve) => {
    const lv = run.lv;
    const opts = GROUPS.map((g) => shuffle(lv.deduce[g.key].map((text, i) => ({ text, right: i === 0 }))));
    const sel: (number | null)[] = [null, null, null];
    const locked = [false, false, false];

    const cards = [
      ...lv.clues.map((c) => `<div class="ev-card">${iconSvg(c.icon, 40)}${c.name}</div>`),
      ...run.hidden.filter((h) => h.found).map((h) => `<div class="ev-card joker">${iconSvg(h.icon, 40)}★${h.name}</div>`),
    ].join('');

    html(
      stage,
      `${sceneSvg(lv.scene)}
      <div class="deduce-panel">
        <h3>推理：他／她什麼時候、在哪裡、跟誰？</h3>
        <div class="ev-strip">${cards}</div>
        ${GROUPS.map(
          (g, gi) => `<div class="q-group" data-g="${gi}">
            <div class="q-label"><span class="badge" style="background:${g.color}">${g.ico}</span>${g.label}</div>
            <div class="chips">${opts[gi].map((o, oi) => `<button class="chip" data-o="${oi}">${o.text}</button>`).join('')}</div>
          </div>`,
        ).join('')}
        <div style="display:flex;gap:10px;align-items:center">
          <button class="item-btn" data-hotline style="flex:none">${ITEM_ICON.hotline}<span class="cnt">${save.items.hotline}</span></button>
          <button class="btn pink" data-lock style="flex:1" disabled>鎖定推理 ▶</button>
        </div>
        <p class="tiny">提示：地點推錯會撲空；時間或對象推錯，證據值 -15%。</p>
      </div>`,
    );

    const groups = Array.from(stage.querySelectorAll<HTMLElement>('[data-g]'));
    const lockBtn = stage.querySelector('[data-lock]') as HTMLButtonElement;
    const hotBtn = stage.querySelector('[data-hotline]') as HTMLButtonElement;

    const render = () => {
      groups.forEach((g, gi) => {
        g.querySelectorAll<HTMLElement>('[data-o]').forEach((c) => {
          const oi = Number(c.dataset.o);
          c.classList.toggle('sel', sel[gi] === oi && !locked[gi]);
          c.classList.toggle('right', locked[gi] && opts[gi][oi].right);
        });
        g.classList.toggle('ok', locked[gi]);
      });
      lockBtn.disabled = sel.some((s, i) => s === null && !locked[i]);
      hotBtn.disabled = save.items.hotline <= 0 || locked.every(Boolean);
      (hotBtn.querySelector('.cnt') as HTMLElement).textContent = String(save.items.hotline);
    };

    groups.forEach((g, gi) =>
      g.addEventListener('click', (e) => {
        const c = (e.target as HTMLElement).closest('[data-o]') as HTMLElement | null;
        if (!c || locked[gi]) return;
        sfx('tap');
        sel[gi] = Number(c.dataset.o);
        render();
      }),
    );

    hotBtn.addEventListener('click', () => {
      const gi = locked.findIndex((l) => !l);
      if (gi < 0 || !useItem('hotline')) return;
      sfx('good');
      locked[gi] = true;
      sel[gi] = opts[gi].findIndex((o) => o.right);
      toast(run.route === 'f' ? '阿芳：「這題我知道！」' : '阿凱：「這我熟！」');
      render();
    });

    lockBtn.addEventListener('click', async () => {
      lockBtn.disabled = true;
      let placeWrong = false;
      for (let gi = 0; gi < 3; gi++) {
        if (locked[gi]) continue;
        const pick = sel[gi]!;
        const right = opts[gi][pick].right;
        const chip = groups[gi].querySelector(`[data-o="${pick}"]`) as HTMLElement;
        chip.classList.remove('sel');
        if (right) {
          chip.classList.add('right');
          groups[gi].classList.add('ok');
          sfx('good');
        } else {
          chip.classList.add('wrong');
          groups[gi].classList.add('bad');
          const correct = groups[gi].querySelector(`[data-o="${opts[gi].findIndex((o) => o.right)}"]`) as HTMLElement;
          correct.classList.add('right');
          sfx('bad');
          vibrate(80);
          if (GROUPS[gi].key === 'place') placeWrong = true;
          else {
            run.deduceMistakes++;
            run.evidence -= 15;
            ui.setEvidence(run.evidence);
          }
        }
        await sleep(450);
      }
      await sleep(700);
      resolve(placeWrong ? { ok: false, fail: 'miss' } : { ok: true });
    });

    render();
  });
}
