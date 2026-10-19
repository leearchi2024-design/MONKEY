import { ITEMS, MAX_HEARTS, save, tickHearts, type ItemKey } from './state';

export type Cleanup = () => void;
export type Screen = (root: HTMLElement) => Cleanup | void;

let app: HTMLElement;
let cleanup: Cleanup | void;

export function mount(el: HTMLElement): void {
  app = el;
}

export function go(screen: Screen): void {
  if (cleanup) cleanup();
  app.innerHTML = '';
  const root = document.createElement('div');
  root.className = 'screen';
  app.appendChild(root);
  cleanup = screen(root);
}

export function appEl(): HTMLElement {
  return app;
}

export function $(sel: string, root: ParentNode = document): HTMLElement {
  const el = root.querySelector(sel);
  if (!el) throw new Error(`找不到元素 ${sel}`);
  return el as HTMLElement;
}

export function html(root: HTMLElement, markup: string): void {
  root.insertAdjacentHTML('beforeend', markup);
}

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function shuffle<T>(a: T[]): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

// ───────── 圖示 ─────────

export function starSvg(on: boolean): string {
  return `<svg viewBox="0 0 48 48" class="${on ? 'on' : ''}"><path d="M24 3 L30 17 L45 18 L33.5 28 L37 43 L24 35 L11 43 L14.5 28 L3 18 L18 17 Z" fill="${on ? '#c4af6e' : '#d8d1ca'}" stroke="${on ? '#a8894b' : '#bbb2aa'}" stroke-width="3" stroke-linejoin="round"/>${on ? '<path d="M17 19 L22 13" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>' : ''}</svg>`;
}

export function heartSvg(on: boolean): string {
  return `<svg viewBox="0 0 32 30"><path d="M16 28 C6 20 2 15 2 9.5 A7 7 0 0 1 16 6 A7 7 0 0 1 30 9.5 C30 15 26 20 16 28Z" fill="${on ? '#cd8491' : '#cac7c4'}" stroke="${on ? '#ae6976' : '#b3afab'}" stroke-width="2"/>${on ? '<ellipse cx="9" cy="10" rx="3" ry="2" fill="#fff" opacity=".6"/>' : ''}</svg>`;
}

export function coinSvg(): string {
  return `<svg viewBox="0 0 24 24"><path d="M12 2 L14.6 8.6 L21.6 9 L16.2 13.4 L18 20.2 L12 16.4 L6 20.2 L7.8 13.4 L2.4 9 L9.4 8.6 Z" fill="#fff"/></svg>`;
}

export const ITEM_ICON: Record<ItemKey, string> = {
  magnifier: `<svg viewBox="0 0 48 48"><circle cx="20" cy="20" r="12" fill="#cbe0ea" stroke="#403737" stroke-width="4"/><path d="M29 29 L41 41" stroke="#786253" stroke-width="7" stroke-linecap="round"/><path d="M14 16 Q16 12 20 12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  time: `<svg viewBox="0 0 48 48"><circle cx="24" cy="26" r="16" fill="#fff" stroke="#403737" stroke-width="4"/><path d="M24 26 V16 M24 26 L31 30" stroke="#b56f72" stroke-width="4" stroke-linecap="round"/><rect x="19" y="4" width="10" height="6" rx="2" fill="#403737"/><text x="38" y="46" font-size="13" font-weight="900" fill="#52908f">+30</text></svg>`,
  hotline: `<svg viewBox="0 0 48 48"><path d="M14 6 L20 6 L23 15 L18 19 Q22 28 29 30 L33 25 L42 28 L42 34 Q40 42 32 41 Q10 36 7 14 Q7 7 14 6Z" fill="#d18f9f" stroke="#403737" stroke-width="3" stroke-linejoin="round"/><path d="M30 6 Q40 8 42 18 M30 12 Q35 13 36 18" stroke="#52908f" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
  hat: `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="34" rx="21" ry="7" fill="#64544c" stroke="#403737" stroke-width="3"/><path d="M12 33 Q12 12 24 10 Q36 12 36 33 Z" fill="#7d6b62" stroke="#403737" stroke-width="3"/><rect x="12" y="25" width="24" height="5" fill="#403737"/><g transform="translate(10 37)"><rect x="-1" y="-4" width="13" height="8" rx="3" fill="#2c2c30"/><rect x="15" y="-4" width="13" height="8" rx="3" fill="#2c2c30"/></g></svg>`,
  dashcam: `<svg viewBox="0 0 48 48"><rect x="6" y="14" width="36" height="24" rx="6" fill="#464951" stroke="#403737" stroke-width="3"/><circle cx="20" cy="26" r="7" fill="#99c1d5" stroke="#403737" stroke-width="3"/><circle cx="36" cy="20" r="3" fill="#b56f72"/><rect x="20" y="6" width="8" height="8" fill="#464951"/><text x="30" y="34" font-size="8" font-weight="900" fill="#c4af6e">REC</text></svg>`,
};

// ───────── 回饋 ─────────

export function toast(msg: string): void {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  app.appendChild(t);
  setTimeout(() => t.remove(), 1500);
}

export function floatText(parent: HTMLElement, x: number, y: number, msg: string, bad = false): void {
  const t = document.createElement('div');
  t.className = `float-txt${bad ? ' bad' : ''}`;
  t.style.left = `${x}px`;
  t.style.top = `${y}px`;
  t.textContent = msg;
  parent.appendChild(t);
  setTimeout(() => t.remove(), 950);
}

// 極簡 WebAudio 音效，不需要任何音檔
let ctx: AudioContext | null = null;
type Sfx = 'tap' | 'good' | 'bad' | 'coin' | 'win' | 'lose' | 'alert' | 'stamp' | 'shutter';
const NOTES: Record<Sfx, [number, number, OscillatorType][]> = {
  tap: [[660, 0.05, 'sine']],
  good: [[660, 0.08, 'triangle'], [990, 0.12, 'triangle']],
  bad: [[220, 0.15, 'square'], [180, 0.2, 'square']],
  coin: [[988, 0.06, 'square'], [1319, 0.14, 'square']],
  win: [[523, 0.12, 'triangle'], [659, 0.12, 'triangle'], [784, 0.12, 'triangle'], [1047, 0.3, 'triangle']],
  lose: [[392, 0.2, 'sawtooth'], [330, 0.2, 'sawtooth'], [262, 0.4, 'sawtooth']],
  alert: [[880, 0.08, 'square'], [880, 0.08, 'square']],
  stamp: [[110, 0.18, 'square']],
  shutter: [[1800, 0.03, 'square'], [400, 0.05, 'square']],
};
export function sfx(name: Sfx): void {
  if (save.muted) return;
  try {
    ctx ??= new AudioContext();
    let t = ctx.currentTime;
    for (const [f, d, type] of NOTES[name]) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = f;
      g.gain.setValueAtTime(0.08, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + d);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + d);
      t += d * 0.9;
    }
  } catch {
    /* 不支援就安靜 */
  }
}

export function vibrate(ms = 40): void {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* ignore */
  }
}

// ───────── 彈窗 ─────────

export interface ModalHandle {
  el: HTMLElement;
  close: () => void;
}

export function modal(inner: string, opts: { ribbon?: string; closable?: boolean; onClose?: () => void } = {}): ModalHandle {
  const back = document.createElement('div');
  back.className = 'modal-back';
  back.innerHTML = `<div class="modal">${opts.ribbon ? `<div class="ribbon">${opts.ribbon}</div>` : ''}${opts.closable !== false ? '<button class="close" aria-label="關閉">✕</button>' : ''}<div class="modal-body">${inner}</div></div>`;
  app.appendChild(back);
  const close = () => {
    back.remove();
    opts.onClose?.();
  };
  back.querySelector('.close')?.addEventListener('click', () => {
    sfx('tap');
    close();
  });
  back.addEventListener('click', (e) => {
    if (e.target === back && opts.closable !== false) close();
  });
  return { el: back.querySelector('.modal') as HTMLElement, close };
}

// ───────── HUD：金幣 + 愛心 ─────────

export function hudMarkup(): string {
  return `<div class="hud">
    <div class="pill"><span class="coin-ico">${coinSvg()}</span><span class="num" data-coins>${save.coins}</span><button class="plus" data-shop aria-label="道具店">+</button></div>
    <div class="pill"><span class="hearts" data-hearts></span><button class="plus" data-refill aria-label="補愛心">+</button></div>
  </div><div class="heart-sub" data-heart-sub></div>`;
}

export function refreshHud(root: ParentNode): void {
  const ms = tickHearts();
  const coins = root.querySelector('[data-coins]');
  if (coins) coins.textContent = String(save.coins);
  const hearts = root.querySelector('[data-hearts]');
  if (hearts) hearts.innerHTML = Array.from({ length: MAX_HEARTS }, (_, i) => heartSvg(i < save.hearts)).join('');
  const sub = root.querySelector('[data-heart-sub]') as HTMLElement | null;
  if (sub) {
    if (ms === 0) sub.textContent = 'FULL';
    else {
      const m = Math.floor(ms / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      sub.textContent = `${m}:${String(s).padStart(2, '0')} 後 +1`;
    }
  }
}

export function itemLabel(k: ItemKey): string {
  return ITEMS[k].name;
}
