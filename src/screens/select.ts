import { portrait } from '../art/chibi';
import { persist, save } from '../state';
import type { Route } from '../types';
import { go, html, sfx, type Screen } from '../ui';
import { mapScreen } from './map';
import { INTRO, playStory } from './story';

function cleared(r: Route): number {
  return Object.values(save.stars[r]).filter((s) => s > 0).length;
}

export const selectScreen: Screen = (root) => {
  root.classList.add('select-screen');
  html(
    root,
    `<h2>選擇你的角色</h2>
    <p class="sub">不同角色，會遇到完全不同的 20 關劇情</p>
    <button class="route-card f" data-route="f">
      <div class="portrait">${portrait('xiaojie', { size: 112, expr: 'angry' })}</div>
      <div>
        <span class="tag">女生線・抓老公</span>
        <h3>林小婕</h3>
        <p>28 歲，廣告公司企劃。細心、愛看推理劇，記得老公每件襯衫的味道。</p>
        <div class="progress">已破 ${cleared('f')} / 20 關</div>
      </div>
    </button>
    <button class="route-card m" data-route="m">
      <div class="portrait">${portrait('dawei', { size: 112, expr: 'smug' })}</div>
      <div>
        <span class="tag">男生線・抓老婆</span>
        <h3>王大偉</h3>
        <p>30 歲，工程師。木訥但記性超好，會比對每一張發票的時間。</p>
        <div class="progress">已破 ${cleared('m')} / 20 關</div>
      </div>
    </button>
    <p class="tiny">兩條路線的進度分開保存，隨時可以切換。</p>`,
  );
  root.querySelectorAll<HTMLElement>('[data-route]').forEach((b) =>
    b.addEventListener('click', async () => {
      const r = b.dataset.route as Route;
      sfx('good');
      save.route = r;
      persist();
      if (!save.seenIntro[r]) {
        await playStory(root, 'home', r === 'f' ? 'xiaojie' : 'dawei', INTRO[r]);
        save.seenIntro[r] = true;
        persist();
      }
      go(mapScreen);
    }),
  );
};
