import type { Expr, Look } from '../types';
import { ch } from '../data/characters';
import { CRAYON_SOFT } from './texture';

/**
 * Q 版半身角色（viewBox 0 0 120 140）。
 * 大頭、豆豆眼、腮紅，參考附圖的繪本風格。
 */

const INK = '#3a2a2a';

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function body(l: Look): string {
  const dark = shade(l.top, -28);
  let s = `<path d="M18 140 Q18 108 42 102 L78 102 Q102 108 102 140 Z" fill="${l.top}"/>
  <path d="M18 140 Q18 120 28 112 L30 140 Z" fill="${dark}" opacity=".5"/>
  <rect x="52" y="92" width="16" height="14" rx="5" fill="${shade(l.skin, -18)}"/>`;
  if (l.gender === 'm') {
    s += `<path d="M48 102 L60 114 L72 102" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round" opacity=".85"/>`;
  } else {
    s += `<path d="M46 103 Q60 116 74 103" fill="none" stroke="${shade(l.top, 30)}" stroke-width="4" stroke-linecap="round"/>`;
  }
  if (l.acc === 'tie') s += `<path d="M57 108 L63 108 L65 130 L60 136 L55 130 Z" fill="#c8453e"/><rect x="56" y="104" width="8" height="6" rx="2" fill="#a8352f"/>`;
  if (l.acc === 'pearls') s += [44, 50, 56, 62, 68, 74].map((x, i) => `<circle cx="${x + 1}" cy="${106 + Math.abs(2.5 - i) * -1.6 + 4}" r="2.6" fill="#fffaf0" stroke="#e8dcc8" stroke-width=".6"/>`).join('');
  if (l.acc === 'scarf') s += `<path d="M40 100 Q60 112 80 100 L82 108 Q60 120 38 108 Z" fill="#e85d5d"/>`;
  return s;
}

function hairBack(l: Look): string {
  const c = l.hairColor;
  switch (l.hair) {
    case 'long':
      return `<path d="M18 62 Q16 20 60 18 Q104 20 102 62 L106 118 Q90 126 78 112 L42 112 Q30 126 14 118 Z" fill="${c}"/>`;
    case 'bob':
      return `<path d="M17 64 Q16 20 60 18 Q104 20 103 64 L104 92 Q96 98 88 92 L32 92 Q24 98 16 92 Z" fill="${c}"/>`;
    case 'ponytail':
      return `<path d="M92 34 Q118 40 112 78 Q108 96 98 100 Q104 76 90 56 Z" fill="${c}"/>`;
    case 'perm':
      return `<g fill="${c}">${[[22, 50], [18, 70], [24, 88], [98, 50], [102, 70], [96, 88], [34, 28], [86, 28], [60, 18]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15"/>`).join('')}</g>`;
    default:
      return '';
  }
}

function hairFront(l: Look): string {
  const c = l.hairColor;
  const hi = `<path d="M38 30 Q48 24 58 26" fill="none" stroke="${shade(c, 50)}" stroke-width="3" stroke-linecap="round" opacity=".55"/>`;
  switch (l.hair) {
    case 'short':
      return `<path d="M19 60 Q16 18 60 17 Q104 18 101 60 Q96 46 84 42 Q74 48 62 40 Q50 48 38 42 Q26 46 19 60 Z" fill="${c}"/>${hi}`;
    case 'spiky':
      return `<path d="M19 60 Q14 30 30 22 L28 8 L44 18 L50 2 L60 16 L72 2 L76 18 L92 8 L90 24 Q106 32 101 60 Q94 44 80 42 L74 34 L64 42 L54 34 L46 42 Q28 44 19 60 Z" fill="${c}"/>${hi}`;
    case 'slick':
      return `<path d="M19 58 Q18 18 62 17 Q104 20 101 58 Q98 40 84 34 Q66 28 46 34 Q30 40 26 50 Z" fill="${c}"/><path d="M48 22 Q70 20 90 34" fill="none" stroke="${shade(c, 45)}" stroke-width="3" opacity=".5"/>`;
    case 'curly':
      return `<g fill="${c}">${[[24, 50], [30, 34], [44, 24], [60, 20], [76, 24], [90, 34], [96, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12"/>`).join('')}</g>`;
    case 'bald':
      return `<path d="M20 64 Q18 52 24 46 L26 70 Z M100 64 Q102 52 96 46 L94 70 Z" fill="${c}"/><path d="M40 28 Q50 22 60 24" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/>`;
    case 'bob':
    case 'long':
      return `<path d="M18 64 Q16 18 60 17 Q104 18 102 64 Q96 44 86 40 Q72 46 66 34 Q54 46 34 42 Q22 48 18 64 Z" fill="${c}"/>${hi}`;
    case 'bun':
      return `<circle cx="60" cy="14" r="14" fill="${c}"/><path d="M18 62 Q16 22 60 20 Q104 22 102 62 Q94 42 60 38 Q26 42 18 62 Z" fill="${c}"/>${hi}`;
    case 'ponytail':
      return `<path d="M18 62 Q16 20 60 19 Q104 20 102 62 Q90 40 70 38 Q48 44 30 44 Q22 50 18 62 Z" fill="${c}"/><circle cx="94" cy="36" r="6" fill="#ff7a8a"/>${hi}`;
    case 'perm':
      return `<g fill="${c}">${[[28, 40], [42, 30], [58, 26], [74, 30], [88, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13"/>`).join('')}</g>`;
  }
}

function face(l: Look, e: Expr): string {
  const ey = 66;
  let eyes = '';
  let brows = '';
  let mouth = '';
  const extra: string[] = [];
  switch (e) {
    case 'happy':
      eyes = `<path d="M38 ${ey + 2} Q44 ${ey - 5} 50 ${ey + 2}" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/><path d="M70 ${ey + 2} Q76 ${ey - 5} 82 ${ey + 2}" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;
      mouth = `<path d="M52 80 Q60 90 68 80 Z" fill="#c4505a"/>`;
      break;
    case 'shocked':
      eyes = `<circle cx="44" cy="${ey}" r="7" fill="#fff" stroke="${INK}" stroke-width="2.4"/><circle cx="44" cy="${ey}" r="2.6" fill="${INK}"/><circle cx="76" cy="${ey}" r="7" fill="#fff" stroke="${INK}" stroke-width="2.4"/><circle cx="76" cy="${ey}" r="2.6" fill="${INK}"/>`;
      brows = `<path d="M36 52 Q44 46 52 50 M68 50 Q76 46 84 52" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
      mouth = `<ellipse cx="60" cy="84" rx="6" ry="8" fill="#8a2f3a"/>`;
      extra.push(`<path d="M98 40 Q104 48 100 54 Q96 50 98 40Z" fill="#8fd3ff"/>`);
      break;
    case 'smug':
      eyes = `<path d="M37 ${ey} L51 ${ey}" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/><path d="M69 ${ey} L83 ${ey}" stroke="${INK}" stroke-width="3.6" stroke-linecap="round"/><path d="M38 ${ey + 2} Q44 ${ey + 6} 50 ${ey + 2}" fill="${INK}"/><path d="M70 ${ey + 2} Q76 ${ey + 6} 82 ${ey + 2}" fill="${INK}"/>`;
      brows = `<path d="M36 54 L52 56 M68 56 L84 52" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
      mouth = `<path d="M52 82 Q62 86 70 78" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`;
      break;
    case 'angry':
      eyes = `<ellipse cx="44" cy="${ey + 1}" rx="3.6" ry="4.4" fill="${INK}"/><ellipse cx="76" cy="${ey + 1}" rx="3.6" ry="4.4" fill="${INK}"/>`;
      brows = `<path d="M36 54 L52 60 M68 60 L84 54" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`;
      mouth = `<path d="M52 86 Q60 78 68 86" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
      extra.push(`<g stroke="#e0483e" stroke-width="2.6" stroke-linecap="round"><path d="M92 34 l6 6 M98 34 l-6 6"/></g>`);
      break;
    case 'cry':
      eyes = `<path d="M38 ${ey} Q44 ${ey + 5} 50 ${ey}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/><path d="M70 ${ey} Q76 ${ey + 5} 82 ${ey}" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>`;
      brows = `<path d="M36 56 Q44 50 52 54 M68 54 Q76 50 84 56" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;
      mouth = `<path d="M52 86 Q60 80 68 86" fill="none" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`;
      extra.push(`<path d="M42 ${ey + 4} Q38 82 42 94 Q46 82 44 ${ey + 4}Z M78 ${ey + 4} Q74 82 78 94 Q82 82 80 ${ey + 4}Z" fill="#8fd3ff" opacity=".9"/>`);
      break;
    case 'worried':
      eyes = `<ellipse cx="44" cy="${ey}" rx="3.6" ry="4.6" fill="${INK}"/><ellipse cx="76" cy="${ey}" rx="3.6" ry="4.6" fill="${INK}"/><circle cx="45.2" cy="${ey - 1.6}" r="1.2" fill="#fff"/><circle cx="77.2" cy="${ey - 1.6}" r="1.2" fill="#fff"/>`;
      brows = `<path d="M36 56 Q44 50 52 54 M68 54 Q76 50 84 56" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;
      mouth = `<path d="M54 84 Q57 81 60 84 Q63 87 66 84" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
      break;
    default:
      eyes = `<ellipse cx="44" cy="${ey}" rx="3.8" ry="4.8" fill="${INK}"/><ellipse cx="76" cy="${ey}" rx="3.8" ry="4.8" fill="${INK}"/><circle cx="45.4" cy="${ey - 1.8}" r="1.3" fill="#fff"/><circle cx="77.4" cy="${ey - 1.8}" r="1.3" fill="#fff"/>`;
      mouth = `<path d="M54 82 Q60 87 66 82" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
  }
  if (l.gender === 'f' && (e === 'normal' || e === 'worried' || e === 'smug')) {
    eyes += `<path d="M38 ${ey - 4} l-4 -3 M82 ${ey - 4} l4 -3" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
  }
  const blush = `<ellipse cx="34" cy="78" rx="7" ry="4" fill="#ff8f9a" opacity=".45"/><ellipse cx="86" cy="78" rx="7" ry="4" fill="#ff8f9a" opacity=".45"/>`;
  return blush + eyes + brows + mouth + extra.join('');
}

function accessory(l: Look): string {
  switch (l.acc) {
    case 'glasses':
      return `<g fill="rgba(255,255,255,.25)" stroke="#2d2d36" stroke-width="2.6"><circle cx="44" cy="66" r="10"/><circle cx="76" cy="66" r="10"/></g><path d="M54 66 L66 66" stroke="#2d2d36" stroke-width="2.6"/>`;
    case 'sunglasses':
      return `<g fill="#1f1f27"><rect x="31" y="58" width="24" height="15" rx="6"/><rect x="65" y="58" width="24" height="15" rx="6"/></g><path d="M55 64 L65 64" stroke="#1f1f27" stroke-width="3"/><path d="M36 62 L44 62" stroke="#fff" stroke-width="2" opacity=".6"/>`;
    case 'headband':
      return `<path d="M20 48 Q60 22 100 48" fill="none" stroke="#ff6f91" stroke-width="7" stroke-linecap="round"/>`;
    case 'bow':
      return `<g transform="translate(86 30) rotate(18)"><path d="M0 0 L-12 -9 L-12 9 Z M0 0 L12 -9 L12 9 Z" fill="#ff5d7a"/><circle r="4" fill="#e04563"/></g>`;
    case 'cap':
      return `<path d="M18 46 Q20 14 60 14 Q100 14 102 46 Z" fill="#e8574a"/><path d="M14 46 L106 46 Q108 52 100 52 L20 52 Q12 52 14 46Z" fill="#c4433a"/><circle cx="60" cy="16" r="4" fill="#c4433a"/>`;
    case 'earring':
      return `<circle cx="17" cy="84" r="3.4" fill="#ffd34d"/><circle cx="103" cy="84" r="3.4" fill="#ffd34d"/>`;
    case 'beard':
      return `<path d="M30 78 Q34 104 60 106 Q86 104 90 78 Q84 92 60 92 Q36 92 30 78Z" fill="#55504c"/><path d="M50 86 Q60 82 70 86" fill="none" stroke="#3d3936" stroke-width="3"/>`;
    default:
      return '';
  }
}

export interface ChibiOpts {
  expr?: Expr;
  back?: boolean;
  size?: number;
  cls?: string;
}

export function chibiSvg(look: Look, opts: ChibiOpts = {}): string {
  const e = opts.expr ?? 'normal';
  const size = opts.size ?? 120;
  const h = Math.round((size * 140) / 120);
  const head = `<ellipse cx="60" cy="66" rx="42" ry="40" fill="${look.skin}"/>`;
  const ears = `<ellipse cx="18" cy="70" rx="6" ry="8" fill="${look.skin}"/><ellipse cx="102" cy="70" rx="6" ry="8" fill="${look.skin}"/>`;
  let inner: string;
  if (opts.back) {
    const c = look.hairColor === '#8b8b8b' ? look.skin : look.hairColor;
    inner = body(look) + ears + `<ellipse cx="60" cy="66" rx="43" ry="41" fill="${c}"/>` +
      (look.hair === 'bun' ? `<circle cx="60" cy="18" r="14" fill="${c}"/>` : '') +
      (look.hair === 'ponytail' ? `<path d="M52 56 Q60 120 68 56 Z" fill="${c}"/>` : '') +
      (look.hair === 'long' ? `<path d="M18 66 L14 118 Q60 128 106 118 L102 66 Z" fill="${c}"/>` : '') +
      `<path d="M40 40 Q56 30 72 34" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".2"/>` +
      (look.acc === 'cap' ? `<path d="M18 46 Q20 14 60 14 Q100 14 102 46 Z" fill="#e8574a"/>` : '');
  } else {
    inner = hairBack(look) + body(look) + ears + head + face(look, e) + hairFront(look) + accessory(look);
  }
  return `<svg class="chibi ${opts.cls ?? ''}" viewBox="0 0 120 140" width="${size}" height="${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g filter="${CRAYON_SOFT}">${inner}</g></svg>`;
}

export function portrait(key: string, opts: ChibiOpts = {}): string {
  return chibiSvg(ch(key).look, opts);
}
