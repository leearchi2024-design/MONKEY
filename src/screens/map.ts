import { portrait } from '../art/chibi';
import { SCENE_NAME, sceneSvg } from '../art/scenes';
import { CHAPTERS, getLevel, HERO, LEVELS } from '../data/levels';
import { ch } from '../data/characters';
import { currentLevel, isUnlocked, ITEMS, MAX_HEARTS, persist, resetSave, save, starsOf, useHeart, type ItemKey } from '../state';
import type { Route } from '../types';
import { coinSvg, go, html, ITEM_ICON, modal, refreshHud, hudMarkup, sfx, starSvg, toast, type Screen } from '../ui';
import { playScreen } from './play';
import { selectScreen } from './select';
import { titleScreen } from './title';

const GAP = 132;
const PAD_TOP = 220;
const PAD_BOTTOM = 230;
const N = 20;
/** 章節之間多留的空間，放章節橫幅 */
const CH_GAP = 90;
const H = PAD_TOP + PAD_BOTTOM + (N - 1) * GAP + 3 * CH_GAP;

const nodeY = (i: number) => H - PAD_BOTTOM - (i - 1) * GAP - Math.floor((i - 1) / 5) * CH_GAP;
const nodeX = (i: number) => 50 + Math.sin((i - 1) * 0.95) * 24; // 百分比

const ZONES = [
  { bg: '#d97a98', road: '#fbe9ee', edge: '#c06683', bld: ['#a8577a', '#8e4466', '#c4708f'], tree: ['#e39ab3', '#b8608a', '#f2c1d1'] },
  { bg: '#e8955c', road: '#fff0dc', edge: '#c97843', bld: ['#b8623a', '#9a4f2e', '#d98050'], tree: ['#7fbf6a', '#5fa05a', '#a7d88a'] },
  { bg: '#4fa3a8', road: '#e9f7f5', edge: '#3b8589', bld: ['#2f6f7a', '#3b8589', '#5d9ea6'], tree: ['#8fd3a8', '#5fb08a', '#c3ead2'] },
  { bg: '#6b5aa8', road: '#efe9fb', edge: '#57488c', bld: ['#4a3d7a', '#3a2f63', '#7f6cbd'], tree: ['#c78bff', '#a46be0', '#e3c6ff'] },
];

/** 偽隨機，讓地圖每次長一樣 */
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

function zoneBounds(c: number): [number, number] {
  const top = c === 4 ? 0 : (nodeY(c * 5) + nodeY(c * 5 + 1)) / 2;
  const bottom = c === 1 ? H : (nodeY(c * 5 - 4) + nodeY(c * 5 - 5)) / 2;
  return [top, bottom];
}

function worldSvg(): string {
  const parts: string[] = [];
  for (let c = 1; c <= 4; c++) {
    const z = ZONES[c - 1];
    const [top, bottom] = zoneBounds(c);
    parts.push(`<rect x="0" y="${top}" width="400" height="${bottom - top}" fill="${z.bg}"/>`);
    const r = rng(c * 97);
    // 兩側建築（參考附圖的街景）
    for (let y = top + 10; y < bottom - 40; y += 150 + r() * 60) {
      for (const side of [0, 1]) {
        const w = 70 + r() * 40;
        const hgt = 110 + r() * 90;
        const x = side === 0 ? -20 + r() * 10 : 400 - w + 20 - r() * 10;
        const col = z.bld[Math.floor(r() * 3)];
        parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${hgt}" rx="6" fill="${col}"/>`);
        parts.push(`<rect x="${x}" y="${y}" width="${w}" height="10" rx="4" fill="#000" opacity=".12"/>`);
        for (let wy = y + 22; wy < y + hgt - 24; wy += 30) {
          for (let wx = x + 12; wx < x + w - 18; wx += 24) {
            const lit = r() > 0.45;
            parts.push(`<rect x="${wx}" y="${wy}" width="12" height="16" rx="2" fill="${lit ? '#ffe7a8' : '#000'}" opacity="${lit ? 0.85 : 0.15}"/>`);
          }
        }
        if (r() > 0.5) parts.push(`<path d="M${x + 8} ${y + hgt - 30} h${w - 16} l-6 14 h${-(w - 28)} Z" fill="${['#ff6f91', '#ffcf3a', '#7fd3ff'][Math.floor(r() * 3)]}" opacity=".9"/>`);
      }
    }
    // 樹
    for (let k = 0; k < 9; k++) {
      const y = top + 40 + r() * (bottom - top - 80);
      const x = r() > 0.5 ? 70 + r() * 50 : 280 + r() * 50;
      const tc = z.tree[Math.floor(r() * 3)];
      parts.push(`<rect x="${x - 3}" y="${y}" width="6" height="26" fill="#6b4a3a" opacity=".8"/><ellipse cx="${x}" cy="${y - 4}" rx="${16 + r() * 8}" ry="${22 + r() * 8}" fill="${tc}"/>`);
    }
    // 燈籠串
    if (c === 2 || c === 4) {
      for (let y = top + 120; y < bottom - 80; y += 340) {
        parts.push(`<path d="M0 ${y} Q200 ${y + 50} 400 ${y}" fill="none" stroke="#3a2a2a" stroke-width="2" opacity=".5"/>`);
        for (let x = 40; x < 400; x += 64) {
          const yy = y + 50 * (1 - Math.pow((x - 200) / 200, 2)) * 0.5 + 6;
          parts.push(`<circle cx="${x}" cy="${yy + 8}" r="16" fill="#ffcf73" opacity=".35"/><ellipse cx="${x}" cy="${yy + 8}" rx="8" ry="10" fill="${c === 2 ? '#ff8a4a' : '#ff6fb0'}"/>`);
        }
      }
    }
  }
  // 小路
  const pts = Array.from({ length: N }, (_, k) => [nodeX(k + 1) * 4, nodeY(k + 1)]);
  pts.unshift([nodeX(1) * 4, H + 20]);
  pts.push([nodeX(N) * 4, -20]);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let k = 1; k < pts.length; k++) {
    const [px, py] = pts[k - 1];
    const [x, y] = pts[k];
    const my = (py + y) / 2;
    d += ` C${px} ${my} ${x} ${my} ${x} ${y}`;
  }
  parts.push(`<path d="${d}" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="76" stroke-linecap="round" transform="translate(0 8)"/>`);
  for (let c = 1; c <= 4; c++) {
    const [top, bottom] = zoneBounds(c);
    parts.push(`<clipPath id="zc${c}"><rect x="0" y="${top}" width="400" height="${bottom - top}"/></clipPath>`);
    parts.push(`<path d="${d}" fill="none" stroke="${ZONES[c - 1].edge}" stroke-width="72" stroke-linecap="round" clip-path="url(#zc${c})"/>`);
    parts.push(`<path d="${d}" fill="none" stroke="${ZONES[c - 1].road}" stroke-width="60" stroke-linecap="round" clip-path="url(#zc${c})"/>`);
    parts.push(`<path d="${d}" fill="none" stroke="${ZONES[c - 1].edge}" stroke-width="3" stroke-dasharray="2 22" stroke-linecap="round" opacity=".5" clip-path="url(#zc${c})"/>`);
  }
  return `<svg viewBox="0 0 400 ${H}" preserveAspectRatio="none"><g filter="url(#crayon)">${parts.join('')}</g></svg>`;
}

export const mapScreen: Screen = (root) => {
  const route = save.route as Route;
  if (!route) {
    go(selectScreen);
    return;
  }
  root.classList.add('map-screen');
  const levels = LEVELS[route];
  const cur = currentLevel(route);
  const hero = HERO[route];

  const nodes = levels
    .map((lv) => {
      const st = starsOf(route, lv.id);
      const unlocked = isUnlocked(route, lv.id);
      const cls = ['node', lv.boss ? 'boss' : '', unlocked ? '' : 'locked', lv.id === cur && st === 0 ? 'current' : ''].join(' ');
      return `<button class="${cls}" data-lv="${lv.id}" style="left:${nodeX(lv.id)}%;top:${nodeY(lv.id)}px" aria-label="第 ${lv.id} 關">
        ${st > 0 ? `<span class="stars">${[1, 2, 3].map((k) => starSvg(k <= st)).join('')}</span>` : ''}
        <span class="disc">${unlocked ? lv.id : '🔒'}</span>
        <span class="scene-tag">${SCENE_NAME[lv.scene]}</span>
      </button>`;
    })
    .join('');

  const banners = CHAPTERS.map((c) => {
    // 放在上一章最後一關的頭像標記之上、這章第一關的場景標籤之下
    const y = c.n === 1 ? nodeY(1) + 96 : nodeY(c.n * 5 - 5) - 160;
    return `<div class="chapter-banner" style="left:50%;top:${y}px"><small>CHAPTER ${c.n}</small>第${'一二三四'[c.n - 1]}章 ${route === 'f' ? c.f : c.m}</div>`;
  }).join('');

  html(
    root,
    `<div class="map-scroll" data-scroll>
      <div class="map-world" style="height:${H}px">${worldSvg()}${banners}${nodes}
        <div class="avatar-pin" style="left:${nodeX(cur)}%;top:${nodeY(cur) - 46}px"><div class="bob"><div class="bubble">${portrait(hero, { size: 70, expr: 'happy' })}</div><div class="tail"></div></div></div>
      </div>
    </div>
    ${hudMarkup()}
    <button class="map-route-tag" data-home><span class="mini" style="background:${route === 'f' ? '#ffe0e8' : '#deeefc'}">${portrait(hero, { size: 40 })}</span>${route === 'f' ? '女生線' : '男生線'}・${Object.values(save.stars[route]).filter((s) => s > 0).length}/20</button>
    <div class="map-dock">
      <button class="dock-btn" data-shop2>${ITEM_ICON.magnifier}道具店</button>
      <button class="dock-btn" data-settings><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="8" fill="none" stroke="#3a2a2a" stroke-width="4"/><path d="M24 4 v8 M24 36 v8 M4 24 h8 M36 24 h8 M10 10 l6 6 M32 32 l6 6 M38 10 l-6 6 M16 32 l-6 6" stroke="#3a2a2a" stroke-width="4" stroke-linecap="round"/></svg>設定</button>
    </div>`,
  );

  const scroll = root.querySelector('[data-scroll]') as HTMLElement;
  requestAnimationFrame(() => {
    scroll.scrollTop = nodeY(cur) - scroll.clientHeight * 0.6;
  });

  refreshHud(root);
  const timer = window.setInterval(() => refreshHud(root), 1000);

  root.querySelectorAll<HTMLElement>('[data-lv]').forEach((b) =>
    b.addEventListener('click', () => {
      const id = Number(b.dataset.lv);
      if (!isUnlocked(route, id)) {
        sfx('bad');
        toast('先破前一關才能挑戰喔');
        return;
      }
      sfx('tap');
      openBrief(route, id, root);
    }),
  );
  const openShopHere = () => openShop(root);
  root.querySelector('[data-shop]')!.addEventListener('click', openShopHere);
  root.querySelector('[data-shop2]')!.addEventListener('click', openShopHere);
  root.querySelector('[data-refill]')!.addEventListener('click', () => openRefill(root));
  root.querySelector('[data-home]')!.addEventListener('click', () => {
    sfx('tap');
    go(selectScreen);
  });
  root.querySelector('[data-settings]')!.addEventListener('click', () => openSettings());

  return () => clearInterval(timer);
};

export function openBrief(route: Route, id: number, hudRoot?: HTMLElement): void {
  const lv = getLevel(route, id);
  const hero = HERO[route];
  const chap = CHAPTERS[lv.chapter - 1];
  const m = modal(
    `<h3>第 ${lv.id} 關・${lv.title}</h3>
    <div class="brief-scene">${sceneSvg(lv.scene)}
      <span class="scene-chip">📍 ${SCENE_NAME[lv.scene]}</span>
      <div class="who l">${portrait(hero, { size: 88, expr: 'angry' })}${lv.client ? portrait(lv.client, { size: 80, expr: 'worried' }) : ''}</div>
      <div class="who r">${portrait(lv.target, { size: 88, expr: 'smug' })}</div>
    </div>
    <p class="brief-text">${lv.brief}</p>
    ${lv.client ? `<p class="brief-text" style="font-size:14px;color:var(--ink-soft)">委託人：${ch(lv.client).name}　目標：${ch(lv.target).name}</p>` : `<p class="brief-text" style="font-size:14px;color:var(--ink-soft)">目標：${ch(lv.target).name}</p>`}
    ${lv.tip ? `<div class="tip">💡 ${lv.tip}</div>` : ''}
    <div class="modal-actions"><button class="btn pink" data-go>開始抓猴！</button></div>
    <p class="cost">挑戰一次消耗 ♥ 1（目前 ${save.hearts} / ${MAX_HEARTS}）</p>`,
    { ribbon: `第${'一二三四'[lv.chapter - 1]}章 ${route === 'f' ? chap.f : chap.m}${lv.boss ? '・魔王關' : ''}` },
  );
  m.el.querySelector('[data-go]')!.addEventListener('click', () => {
    if (!useHeart()) {
      sfx('bad');
      m.close();
      openRefill(hudRoot);
      return;
    }
    sfx('good');
    m.close();
    go(playScreen(route, id));
  });
}

export function openRefill(hudRoot?: HTMLElement): void {
  const full = save.hearts >= MAX_HEARTS;
  const m = modal(
    `<h3>補充愛心</h3>
    <p style="text-align:center;line-height:1.6">${full ? '愛心已經是滿的！' : `每 30 分鐘自動回復 1 顆。<br>現在就用 <b>300</b> 金幣補滿嗎？`}</p>
    <div class="modal-actions">${full ? '<button class="btn teal" data-x>好</button>' : `<button class="btn teal" data-buy ${save.coins < 300 ? 'disabled' : ''}><span class="price-btn">${coinSvg()} 300 補滿</span></button>`}</div>`,
    { ribbon: '♥ 愛心' },
  );
  m.el.querySelector('[data-x]')?.addEventListener('click', m.close);
  m.el.querySelector('[data-buy]')?.addEventListener('click', () => {
    save.coins -= 300;
    save.hearts = MAX_HEARTS;
    save.heartTs = Date.now();
    persist();
    sfx('coin');
    m.close();
    if (hudRoot) refreshHud(hudRoot);
    toast('愛心補滿了！');
  });
}

export function openShop(hudRoot?: HTMLElement, onChange?: () => void): void {
  sfx('tap');
  const render = () =>
    (Object.keys(ITEMS) as ItemKey[])
      .map(
        (k) => `<div class="shop-item"><div class="ico">${ITEM_ICON[k]}</div>
        <div class="info"><b>${ITEMS[k].name}</b> <span class="own">持有 ${save.items[k]}</span><small>${ITEMS[k].stage}階段：${ITEMS[k].desc}</small></div>
        <button class="btn teal small" data-buy="${k}" ${save.coins < ITEMS[k].price ? 'disabled' : ''}><span class="price-btn">${coinSvg()}${ITEMS[k].price}</span></button></div>`,
      )
      .join('');
  const m = modal(`<h3>蔡姐的道具店</h3><p class="tiny" data-bal>持有金幣：${save.coins}</p><div class="shop-list" data-list>${render()}</div>`, { ribbon: '🛒 道具店' });
  const list = m.el.querySelector('[data-list]') as HTMLElement;
  list.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('[data-buy]') as HTMLElement | null;
    if (!b) return;
    const k = b.dataset.buy as ItemKey;
    if (save.coins < ITEMS[k].price) return;
    save.coins -= ITEMS[k].price;
    save.items[k] += 1;
    persist();
    sfx('coin');
    list.innerHTML = render();
    (m.el.querySelector('[data-bal]') as HTMLElement).textContent = `持有金幣：${save.coins}`;
    if (hudRoot) refreshHud(hudRoot);
    onChange?.();
  });
}

function openSettings(): void {
  sfx('tap');
  const m = modal(
    `<h3>設定</h3>
    <div class="settings-list">
      <button class="btn plain block" data-mute>${save.muted ? '🔇 音效：關' : '🔊 音效：開'}</button>
      <button class="btn plain block" data-route>切換路線（男／女）</button>
      <button class="btn plain block" data-title>回到標題畫面</button>
      <button class="btn pink block" data-reset>清除存檔重新開始</button>
    </div>`,
    { ribbon: '⚙ 設定' },
  );
  const mute = m.el.querySelector('[data-mute]') as HTMLElement;
  mute.addEventListener('click', () => {
    save.muted = !save.muted;
    persist();
    mute.textContent = save.muted ? '🔇 音效：關' : '🔊 音效：開';
  });
  m.el.querySelector('[data-route]')!.addEventListener('click', () => {
    m.close();
    go(selectScreen);
  });
  m.el.querySelector('[data-title]')!.addEventListener('click', () => {
    m.close();
    go(titleScreen);
  });
  m.el.querySelector('[data-reset]')!.addEventListener('click', () => {
    if (confirm('確定要清除所有進度、金幣和道具嗎？')) {
      resetSave();
      m.close();
      go(titleScreen);
    }
  });
}
