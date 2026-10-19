import { portrait } from '../art/chibi';
import { logoSvg, mascotSvg } from '../art/mascot';
import { persist, save } from '../state';
import { go, html, sfx, type Screen } from '../ui';
import { mapScreen } from './map';
import { selectScreen } from './select';

const CLOUDS = `<svg class="clouds" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
  <g fill="#fff" opacity=".85">
    <ellipse cx="70" cy="120" rx="60" ry="22"/><ellipse cx="100" cy="104" rx="36" ry="24"/>
    <ellipse cx="330" cy="70" rx="56" ry="20"/><ellipse cx="350" cy="56" rx="30" ry="20"/>
    <ellipse cx="300" cy="300" rx="44" ry="14" opacity=".6"/>
  </g>
  <path d="M0 640 Q100 600 200 630 Q300 660 400 620 L400 800 L0 800Z" fill="#9bd07a"/>
  <path d="M0 680 Q120 650 240 680 Q330 700 400 680 L400 800 L0 800Z" fill="#7fbf6a"/>
  <path d="M150 800 Q190 690 200 640 Q210 690 250 800Z" fill="#e8c38a"/>
  ${[30, 80, 330, 370].map((x, i) => `<circle cx="${x}" cy="${700 + (i % 2) * 30}" r="5" fill="${i % 2 ? '#ff6f91' : '#fff'}"/>`).join('')}
</svg>`;

export const titleScreen: Screen = (root) => {
  root.classList.add('title-screen');
  html(
    root,
    `${CLOUDS}
    <div class="title-hero">
      <div class="logo">${logoSvg(310)}</div>
      <div class="title-cast">
        ${portrait('xiaojie', { size: 118, expr: 'angry' })}
        <div class="mascot">${mascotSvg(150)}</div>
        ${portrait('dawei', { size: 118, expr: 'smug' })}
      </div>
    </div>
    <div class="title-btns">
      <button class="btn pink block" data-start>${save.route ? '繼續冒險' : '開始遊戲'}</button>
      ${save.route ? '<button class="btn plain block" data-switch>切換路線</button>' : ''}
      <button class="btn plain small" data-mute>${save.muted ? '🔇 音效：關' : '🔊 音效：開'}</button>
      <p class="tiny">本遊戲純屬虛構，人物、地點、品牌皆為杜撰。<br>現實中偷看他人手機、私裝定位或錄音可能觸法，請勿模仿。</p>
    </div>`,
  );
  root.querySelector('[data-start]')!.addEventListener('click', () => {
    sfx('good');
    go(save.route ? mapScreen : selectScreen);
  });
  root.querySelector('[data-switch]')?.addEventListener('click', () => {
    sfx('tap');
    go(selectScreen);
  });
  const mute = root.querySelector('[data-mute]') as HTMLElement;
  mute.addEventListener('click', () => {
    save.muted = !save.muted;
    persist();
    mute.textContent = save.muted ? '🔇 音效：關' : '🔊 音效：開';
    sfx('tap');
  });
};
