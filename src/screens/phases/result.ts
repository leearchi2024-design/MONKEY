import { portrait } from '../../art/chibi';
import { ch } from '../../data/characters';
import { getLevel, LEVELS, SIDEKICK } from '../../data/levels';
import { persist, save, starsOf, useHeart } from '../../state';
import { coinSvg, go, sfx, starSvg, toast, type Screen } from '../../ui';
import type { FailKind, Run } from '../play';

const FAIL_TITLE: Record<FailKind, string> = {
  timeout: '證據不足',
  miss: '撲空了',
  spotted: '打草驚蛇',
  lost: '跟丟了',
  bitten: '被反咬一口',
  trap: '搞錯了！',
};

function failLine(run: Run, kind: FailKind): string {
  const you = run.route === 'f' ? '妳' : '你';
  switch (kind) {
    case 'miss':
      return `我早就回家了，${you}人呢？`;
    case 'bitten':
      return run.route === 'f' ? '妳偷看我手機，這才是犯法！' : '你跟蹤我，你才可怕吧！';
    case 'spotted':
      return `……${you}在這裡做什麼？`;
    case 'lost':
      return '（對方的車消失在車陣裡）';
    case 'timeout':
      return `沒證據就不要亂說。`;
    case 'trap':
      return `${you}幹嘛？我們只是在打麻將／開會啊！`;
  }
}

const MENTOR = [
  '抓猴就像煮湯，火候不到，掀蓋就失敗。',
  '男人女人都一樣，手機不會說謊。再看一次證物。',
  '急什麼？對方一回頭，你就要變成一棵盆栽。',
  '證據是一片一片拼起來的，少一片都不行。',
];

export function computeStars(run: Run): number {
  let s = 1;
  if (run.evidence >= 80) s = 2;
  if (run.evidence >= 100 && run.hidden.every((h) => h.found)) s = 3;
  return s;
}

export function showResult(run: Run, ok: boolean, fail?: FailKind): void {
  // 延遲 import 避免循環相依
  import('../play').then(({ playScreen }) =>
    import('../map').then(({ mapScreen, openRefill }) => {
      const screen: Screen = (root) => {
        const lv = run.lv;
        const opp = lv.target;
        root.classList.add('result-screen', ok ? 'win' : 'lose');
        const hasNext = LEVELS[run.route].some((l) => l.id === lv.id + 1);

        if (ok) {
          const stars = computeStars(run);
          const prev = starsOf(run.route, lv.id);
          const first = prev === 0;
          let coins = 60 + lv.chapter * 20 + (stars === 3 ? 50 : 0);
          if (!first) coins = Math.round(coins / 3);
          save.stars[run.route][lv.id] = Math.max(prev, stars);
          save.coins += coins;
          persist();
          setTimeout(() => sfx('win'), 150);
          setTimeout(() => sfx('coin'), 900);
          root.innerHTML = `<div class="result-card">
            <div class="ribbon">${run.retreated ? '真相大白' : '抓到現行！'}</div><div class="rc-body">
            <div class="big-stars">${[1, 2, 3].map((k) => starSvg(k <= stars)).join('')}</div>
            <div class="result-pics">${portrait(run.hero, { size: 110, expr: 'happy' })}${lv.client ? portrait(lv.client, { size: 96, expr: 'happy' }) : ''}${portrait(opp, { size: 110, expr: run.retreated ? 'happy' : 'cry' })}</div>
            <h3 style="margin:0">第 ${lv.id} 關・${lv.title}</h3>
            <p class="result-text">${lv.win}</p>
            <div class="stat-row"><span>證據值 ${Math.max(0, run.evidence)}%</span><span>隱藏證物 ${run.hidden.filter((h) => h.found).length}/2</span>${run.saves ? `<span>變裝帽 ×${run.saves}</span>` : ''}</div>
            <div class="reward">${coinSvg().replace('fill="#fff"', 'fill="#c4996e"')} +${coins}${first ? '' : '（重玩）'}</div>
            ${stars < 3 ? `<p class="tiny" style="margin-top:8px">三星條件：證據值 100% 且找到 2 件隱藏證物</p>` : ''}
            ${lv.ending ? `<div class="ending"><b>${lv.id === 20 ? '— 全劇終 —' : '— 本章完 —'}</b>${lv.ending}</div>` : ''}
            <div class="modal-actions">
              <button class="btn plain" data-map>回地圖</button>
              ${hasNext ? '<button class="btn pink" data-next>下一關 ▶</button>' : '<button class="btn pink" data-other>挑戰另一條路線</button>'}
            </div>
          </div></div>`;
        } else {
          setTimeout(() => sfx('lose'), 100);
          const kind = fail ?? 'bitten';
          const mentor = lv.chapter === 1 ? SIDEKICK[run.route] : 'caijie';
          root.innerHTML = `<div class="result-card">
            <div class="ribbon">${FAIL_TITLE[kind]}</div><div class="rc-body">
            <div class="result-pics">${portrait(run.hero, { size: 104, expr: 'cry' })}${portrait(opp, { size: 112, expr: kind === 'bitten' ? 'angry' : 'smug' })}</div>
            <p class="result-text"><b>${ch(opp).name}：</b>「${failLine(run, kind)}」</p>
            <p class="result-text" style="color:var(--ink-soft)">${kind === 'trap' ? lv.lose : kind === 'miss' ? '推理的地點錯了，埋伏的地方根本沒人。' : lv.lose}</p>
            <div class="mentor">${portrait(mentor, { size: 64, expr: 'normal' })}<div><b>${ch(mentor).name}：</b>${mentor === 'caijie' ? MENTOR[Math.floor(Math.random() * MENTOR.length)] : run.route === 'f' ? '姊妹別氣餒！我們再查一次！' : '兄弟，沒事，再來一次！'}</div></div>
            <div class="stat-row"><span>剩餘愛心 ♥ ${save.hearts}</span></div>
            <div class="modal-actions">
              <button class="btn plain" data-map>回地圖</button>
              <button class="btn pink" data-retry>再挑戰 ♥1</button>
            </div>
          </div></div>`;
        }

        root.querySelector('[data-map]')?.addEventListener('click', () => {
          sfx('tap');
          go(mapScreen);
        });
        root.querySelector('[data-next]')?.addEventListener('click', () => {
          sfx('tap');
          go(mapScreen);
          setTimeout(() => import('../map').then((m) => m.openBrief(run.route, getLevel(run.route, lv.id + 1).id)), 350);
        });
        root.querySelector('[data-other]')?.addEventListener('click', () => {
          sfx('tap');
          save.route = run.route === 'f' ? 'm' : 'f';
          persist();
          import('../select').then((s) => go(s.selectScreen));
        });
        root.querySelector('[data-retry]')?.addEventListener('click', () => {
          if (!useHeart()) {
            sfx('bad');
            toast('愛心不夠了');
            openRefill();
            return;
          }
          sfx('good');
          go(playScreen(run.route, lv.id));
        });
      };
      go(screen);
    }),
  );
}
