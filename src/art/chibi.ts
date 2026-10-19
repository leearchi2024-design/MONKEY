import type { Acc, Expr, Look, Outfit } from '../types';
import { ch } from '../data/characters';
import { CRAYON_SOFT } from './texture';

/**
 * 角色半身像（viewBox 0 0 120 140）。
 * 風格參考插畫設定稿：深色手繪描線、有眼白與虹膜的大眼、層次服裝、招牌配件、大地色系。
 */

const LINE = '#2b2220';
const LW = 2.2;

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, v + amt));
  const r = c((n >> 16) & 255);
  const g = c((n >> 8) & 255);
  const b = c(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/** 多個形狀合併描外框：先畫粗的深色版本，再疊上填色 */
function ol(shapes: string, fill: string, w = LW): string {
  return `<g fill="${LINE}" stroke="${LINE}" stroke-width="${w * 2}" stroke-linejoin="round" stroke-linecap="round">${shapes}</g><g fill="${fill}">${shapes}</g>`;
}

const line = (d: string, w = LW, color = LINE) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

function accs(l: Look): Set<Acc> {
  return new Set(Array.isArray(l.acc) ? l.acc : l.acc ? [l.acc] : []);
}

function outfitOf(l: Look, a: Set<Acc>): Outfit {
  if (l.outfit) return l.outfit;
  if (a.has('tie')) return 'suit';
  return l.gender === 'f' ? 'blouse' : 'tee';
}

// ───────── 頭部 ─────────

const HEAD = '<path d="M23 64 Q22 27 60 25 Q98 27 97 64 Q97 90 80 101 Q60 111 40 101 Q23 90 23 64 Z"/>';
const EARS = '<ellipse cx="23" cy="70" rx="5.5" ry="7.5"/><ellipse cx="97" cy="70" rx="5.5" ry="7.5"/>';

// ───────── 身體與服裝 ─────────

const TORSO = '<path d="M14 142 Q15 116 37 108 Q48 104 60 104 Q72 104 83 108 Q105 116 106 142 Z"/>';

function body(l: Look, a: Set<Acc>): string {
  const o = outfitOf(l, a);
  const top = l.top;
  const dark = shade(top, -30);
  const inner = l.inner ?? (o === 'suit' ? '#f4efe6' : '#efe3cf');
  const neck = ol('<path d="M51 92 L51 108 Q60 113 69 108 L69 92 Z"/>', shade(l.skin, -14), 1.6);
  let s = '';

  const panels = (cut: number, y2 = 142) =>
    `<path d="M14 142 Q15 116 37 108 L50 104.5 L${60 - cut} ${y2} Z"/><path d="M106 142 Q105 116 83 108 L70 104.5 L${60 + cut} ${y2} Z"/>`;

  switch (o) {
    case 'hoodie':
      s += ol('<path d="M33 113 Q34 96 60 96 Q86 96 87 113 Q74 120 60 120 Q46 120 33 113 Z"/>', dark);
      s += neck + ol(TORSO, top);
      s += ol('<path d="M44 108 Q60 122 76 108 Q60 116 44 108 Z"/>', dark, 1.6);
      s += line('M54 116 L52.5 131') + line('M66 116 L67.5 131');
      s += `<circle cx="52.5" cy="132" r="1.8" fill="#efe3cf" stroke="${LINE}" stroke-width="1.2"/><circle cx="67.5" cy="132" r="1.8" fill="#efe3cf" stroke="${LINE}" stroke-width="1.2"/>`;
      break;
    case 'zip':
      s += neck + ol(TORSO, top);
      s += ol('<path d="M47 103 L48 114 L60 118 L72 114 L73 103 L60 107 Z"/>', dark, 1.6);
      s += line('M60 118 L60 142', 2) + line('M30 116 L24 140', 3, '#f4efe6') + line('M90 116 L96 140', 3, '#f4efe6');
      s += `<rect x="58" y="120" width="4" height="6" rx="1" fill="#d9c9a8" stroke="${LINE}" stroke-width="1"/>`;
      break;
    case 'turtleneck':
      s += ol(TORSO, top) + ol('<path d="M49 96 L49 110 Q60 115 71 110 L71 96 Q60 100 49 96 Z"/>', shade(top, 10), 1.8);
      s += line('M53 99 L53 110', 1, dark) + line('M57 100 L57 111', 1, dark) + line('M63 100 L63 111', 1, dark) + line('M67 99 L67 110', 1, dark);
      break;
    case 'polo':
      s += neck + ol(TORSO, top);
      s += ol('<path d="M47 104 L56 115 L52 104 Z"/><path d="M73 104 L64 115 L68 104 Z"/>', shade(top, 25), 1.4);
      s += line('M60 108 L60 122', 1.6) + `<circle cx="60" cy="113" r="1.2" fill="${LINE}"/><circle cx="60" cy="119" r="1.2" fill="${LINE}"/>`;
      break;
    case 'jacket':
      s += neck + ol(TORSO, inner);
      s += line('M49 106 Q60 114 71 106', 1.6);
      s += ol(panels(8), top);
      s += ol('<path d="M50 104.5 L44 116 L48 118 L52 112 Z"/><path d="M70 104.5 L76 116 L72 118 L68 112 Z"/>', dark, 1.4);
      s += line('M28 128 L40 128', 1.6) + line('M80 128 L92 128', 1.6);
      break;
    case 'suit':
      s += neck + ol(TORSO, inner);
      s += ol('<path d="M14 142 Q15 116 37 108 L50 104.5 L58 130 L57 142 Z"/><path d="M106 142 Q105 116 83 108 L70 104.5 L62 130 L63 142 Z"/>', top);
      s += line('M50 104.5 L45 117 L53 121', 1.8) + line('M70 104.5 L75 117 L67 121', 1.8);
      s += `<circle cx="58" cy="135" r="1.6" fill="${LINE}"/>`;
      break;
    case 'blouse':
      s += neck + ol(TORSO, top);
      s += ol('<path d="M45 105 Q50 114 56 110 Q58 116 60 113 Q62 116 64 110 Q70 114 75 105 Q60 112 45 105 Z"/>', inner, 1.4);
      s += `<circle cx="60" cy="122" r="1.4" fill="${LINE}"/><circle cx="60" cy="131" r="1.4" fill="${LINE}"/>`;
      break;
    case 'cardigan':
      s += neck + ol(TORSO, inner);
      s += line('M48 106 Q60 116 72 106', 1.6);
      s += ol(panels(4), top);
      s += [118, 127, 136].map((y) => `<circle cx="${55.5 - (y - 118) * 0.06}" cy="${y}" r="1.8" fill="${shade(top, 40)}" stroke="${LINE}" stroke-width="1"/>`).join('');
      break;
    case 'tank':
      s += neck + ol(TORSO, l.skin);
      s += line('M30 114 Q37 120 42 116', 1.4, shade(l.skin, -40)) + line('M90 114 Q83 120 78 116', 1.4, shade(l.skin, -40));
      s += ol('<path d="M42 142 L43 116 L46 105 L50 105 Q51 116 60 117 Q69 116 70 105 L74 105 L77 116 L78 142 Z"/>', top);
      break;
    case 'vest':
      s += neck + ol(TORSO, inner);
      s += line('M48 106 Q60 114 72 106', 1.6);
      s += ol('<path d="M30 142 L32 118 Q40 110 50 105 L57 142 Z"/><path d="M90 142 L88 118 Q80 110 70 105 L63 142 Z"/>', top);
      s += line('M33 128 L56 128', 3, '#e8e2d2') + line('M64 128 L87 128', 3, '#e8e2d2');
      break;
    default: // tee
      s += neck + ol(TORSO, top);
      s += ol('<path d="M46 106 Q60 118 74 106 Q60 112 46 106 Z"/>', dark, 1.4);
  }
  if (a.has('tie') || o === 'suit') {
    s += ol('<path d="M57 108 L63 108 L61.5 112 L64 130 L60 135 L56 130 L58.5 112 Z"/>', l.accColor && a.has('tie') ? l.accColor : '#a8423a', 1.2);
  }
  if (a.has('pearls')) s += [43, 49, 55, 60, 65, 71, 77].map((x, i) => `<circle cx="${x}" cy="${108 + (3 - Math.abs(3 - i)) * 1.6}" r="2.5" fill="#fffaf0" stroke="${LINE}" stroke-width=".9"/>`).join('');
  if (a.has('chain')) s += line('M47 106 Q60 119 73 106', 1.8, '#d4a63a');
  if (a.has('scarf')) {
    const c = l.accColor ?? '#b5583a';
    s += ol('<path d="M38 104 Q60 116 82 104 L84 112 Q60 124 36 112 Z"/><path d="M66 114 L74 114 L76 134 L66 132 Z"/>', c, 1.6);
    s += line('M68 132 L68 137 M71 133 L71 138 M74 133 L74 137', 1.2);
  }
  if (a.has('headphones')) {
    // 掛在脖子上的耳機
    s += line('M40 106 Q60 124 80 106', 3.2, '#3a3a40');
    s += ol('<ellipse cx="38" cy="108" rx="6" ry="7"/><ellipse cx="82" cy="108" rx="6" ry="7"/>', '#d9a23c', 1.6);
  }
  return s;
}

// ───────── 頭髮 ─────────

function hairBack(l: Look): string {
  const c = l.hairColor;
  switch (l.hair) {
    case 'long':
      return ol('<path d="M17 62 Q15 20 60 18 Q105 20 103 62 L106 116 Q100 122 94 116 Q88 124 80 114 L40 114 Q32 124 26 116 Q20 122 14 116 Z"/>', c);
    case 'wavy':
      return ol('<path d="M17 62 Q15 20 60 18 Q105 20 103 62 Q108 76 102 86 Q108 96 100 104 Q96 112 86 108 L34 108 Q24 112 20 104 Q12 96 18 86 Q12 76 17 62 Z"/>', c);
    case 'bob':
      return ol('<path d="M17 64 Q15 20 60 18 Q105 20 103 64 L104 90 L98 96 L93 90 L88 97 L32 97 L27 90 L22 96 L16 90 Z"/>', c);
    case 'ponytail':
      return ol('<path d="M90 30 Q120 34 116 72 Q114 92 104 102 Q108 84 98 72 Q100 52 88 42 Z"/>', c);
    case 'perm':
      return ol([[20, 52], [16, 72], [22, 92], [100, 52], [104, 72], [98, 92], [32, 28], [88, 28], [60, 18]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15"/>`).join(''), c);
    default:
      return '';
  }
}

function hairFront(l: Look): string {
  const c = l.hairColor;
  const hi = line('M38 33 Q48 27 58 29', 2.4, shade(c, 55));
  switch (l.hair) {
    case 'short':
      return ol('<path d="M20 62 Q16 20 60 19 Q104 20 100 62 Q96 48 86 44 L82 50 L76 41 L66 46 L60 38 L52 46 L44 40 L38 48 Q26 48 20 62 Z"/>', c) + hi;
    case 'messy':
      return ol('<path d="M20 64 Q14 40 24 28 L20 20 L32 22 Q36 10 50 14 Q58 4 68 12 Q82 8 88 20 L100 18 L96 30 Q106 42 100 64 Q96 50 88 46 L84 54 L78 44 L70 50 L64 40 L56 50 L50 42 L42 52 L38 44 Q26 48 20 64 Z"/>', c) + hi;
    case 'spiky':
      return ol('<path d="M20 62 Q14 32 30 24 L26 8 L44 18 L50 1 L60 15 L72 1 L76 17 L94 7 L90 24 Q106 32 100 62 Q94 46 80 44 L74 35 L64 44 L54 35 L46 44 Q28 46 20 62 Z"/>', c) + hi;
    case 'slick':
      return ol('<path d="M20 60 Q18 20 62 18 Q104 20 100 60 Q98 42 84 36 Q66 30 46 36 Q32 42 27 52 Z"/>', c) + line('M46 24 Q70 20 92 36', 2.4, shade(c, 50)) + line('M38 30 Q48 26 56 26', 1.6, shade(c, 50));
    case 'curly':
      return ol([[24, 52], [30, 36], [44, 26], [60, 22], [76, 26], [90, 36], [96, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12"/>`).join(''), c);
    case 'bald':
      return ol('<path d="M21 66 Q19 54 25 48 L27 72 Z"/><path d="M99 66 Q101 54 95 48 L93 72 Z"/>', c, 1.4) + line('M40 34 Q50 28 60 30', 3.4, '#fff');
    case 'bob':
      return ol('<path d="M18 66 Q15 18 60 18 Q105 18 102 66 Q98 48 92 42 L88 50 L84 42 L76 48 L72 40 L64 46 L60 38 L54 46 L48 40 L42 48 L36 42 L30 50 Q22 50 18 66 Z"/>', c) + hi;
    case 'long':
      return ol('<path d="M18 68 Q15 18 60 18 Q105 18 102 68 Q98 46 86 42 Q76 48 68 36 Q56 48 34 44 Q22 50 18 68 Z"/>', c) + hi;
    case 'wavy':
      return ol('<path d="M18 68 Q15 18 60 18 Q105 18 102 68 Q100 52 92 46 Q86 52 80 44 Q72 50 64 38 Q52 50 40 44 Q30 52 24 50 Q20 56 18 68 Z"/>', c) + hi;
    case 'bun':
      return ol('<circle cx="60" cy="13" r="14"/><path d="M18 64 Q16 22 60 21 Q104 22 102 64 Q94 42 60 38 Q26 42 18 64 Z"/>', c) + line('M50 13 Q60 6 70 13', 1.6, shade(c, 50)) + hi;
    case 'ponytail':
      return ol('<path d="M18 64 Q15 20 60 19 Q105 20 102 64 Q92 40 72 38 Q50 44 32 44 Q22 50 18 64 Z"/>', c) + ol('<circle cx="94" cy="35" r="5.5"/>', '#d9a23c', 1.4) + hi;
    case 'perm':
      return ol([[28, 40], [42, 30], [58, 26], [74, 30], [88, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13"/>`).join(''), c);
  }
}

// ───────── 臉 ─────────

function eyeOpen(cx: number, l: Look, o: { iris?: number; look?: number; white?: number } = {}): string {
  const ey = 68;
  const iris = o.iris ?? 5.4;
  const dy = o.look ?? 1;
  const wy = o.white ?? 8.4;
  const eye = l.eye ?? '#4a3226';
  return `<ellipse cx="${cx}" cy="${ey}" rx="7.4" ry="${wy}" fill="#fffaf2"/>
    <circle cx="${cx + 0.4}" cy="${ey + dy}" r="${iris}" fill="${eye}"/>
    <circle cx="${cx + 0.4}" cy="${ey + dy}" r="${iris * 0.48}" fill="#1a1210"/>
    <circle cx="${cx + 2}" cy="${ey + dy - 1.8}" r="1.5" fill="#fff"/>`;
}

function lid(cx: number, female: boolean, outer: 1 | -1): string {
  let s = line(`M${cx - 8.2} ${64.5} Q${cx} ${57.5} ${cx + 8.2} ${64}`, 3);
  if (female) s += line(`M${cx + outer * 8} ${64} l${outer * 3.2} -2.8`, 2.2);
  return s;
}

function face(l: Look, e: Expr, a: Set<Acc>): string {
  const L = 45;
  const R = 75;
  const f = l.gender === 'f';
  const browC = shade(l.hairColor === '#8b8b8b' ? '#6b6560' : l.hairColor, -10);
  const brow = (d: string) => line(d, 3.2, browC);
  let eyes = '';
  let brows = '';
  let mouth = '';
  const extra: string[] = [];

  switch (e) {
    case 'happy':
      eyes = line(`M${L - 6} 70 Q${L} 62 ${L + 6} 70`, 3) + line(`M${R - 6} 70 Q${R} 62 ${R + 6} 70`, 3);
      brows = brow(`M${L - 7} 56 Q${L} 51 ${L + 7} 55`) + brow(`M${R - 7} 55 Q${R} 51 ${R + 7} 56`);
      mouth = ol('<path d="M52 84 Q60 97 68 84 Z"/>', '#8c3a3a', 1.2) + '<path d="M55 90 Q60 94 65 90 Q60 88 55 90Z" fill="#e8807a"/>';
      break;
    case 'shocked':
      eyes = eyeOpen(L, l, { iris: 2.8, look: 0, white: 8.6 }) + eyeOpen(R, l, { iris: 2.8, look: 0, white: 8.6 }) + line(`M${L - 7} 63 Q${L} 57 ${L + 7} 63`, 2.4) + line(`M${R - 7} 63 Q${R} 57 ${R + 7} 63`, 2.4);
      brows = brow(`M${L - 7} 52 Q${L} 46 ${L + 7} 50`) + brow(`M${R - 7} 50 Q${R} 46 ${R + 7} 52`);
      mouth = ol('<ellipse cx="60" cy="89" rx="5" ry="6.5"/>', '#7a2e34', 1.2);
      extra.push(ol('<path d="M100 42 Q106 52 101 57 Q96 52 100 42Z"/>', '#9fd3f2', 1));
      break;
    case 'smug':
      eyes = eyeOpen(L, l, { look: 2 }) + eyeOpen(R, l, { look: 2 });
      eyes += `<path d="M${L - 8} 56 L${L + 8} 56 L${L + 8} 67 Q${L} 64 ${L - 8} 67 Z" fill="${l.skin}"/><path d="M${R - 8} 56 L${R + 8} 56 L${R + 8} 67 Q${R} 64 ${R - 8} 67 Z" fill="${l.skin}"/>`;
      eyes += line(`M${L - 7.5} 67 Q${L} 63.5 ${L + 7.5} 66.5`, 2.8) + line(`M${R - 7.5} 66.5 Q${R} 63.5 ${R + 7.5} 67`, 2.8);
      brows = brow(`M${L - 7} 58 L${L + 7} 59`) + brow(`M${R - 7} 57 Q${R} 51 ${R + 7} 54`);
      mouth = line('M53 88 Q62 91 69 84', 2.6);
      break;
    case 'angry':
      eyes = eyeOpen(L, l, { iris: 4.2 }) + eyeOpen(R, l, { iris: 4.2 });
      eyes += `<path d="M${L - 8} 56 L${L + 8} 56 L${L + 8} 66 L${L - 8} 61 Z" fill="${l.skin}"/><path d="M${R - 8} 56 L${R + 8} 56 L${R + 8} 61 L${R - 8} 66 Z" fill="${l.skin}"/>`;
      eyes += line(`M${L - 7.5} 61.5 L${L + 7.5} 66`, 2.8) + line(`M${R - 7.5} 66 L${R + 7.5} 61.5`, 2.8);
      brows = brow(`M${L - 8} 54 L${L + 7} 61`) + brow(`M${R - 7} 61 L${R + 8} 54`);
      mouth = ol('<path d="M52 91 Q60 83 68 91 Z"/>', '#f4efe6', 1.2);
      extra.push(line('M94 36 l7 7 M101 36 l-7 7', 2.6, '#c8433a'));
      break;
    case 'cry':
      eyes = line(`M${L - 6} 67 Q${L} 73 ${L + 6} 67`, 3) + line(`M${R - 6} 67 Q${R} 73 ${R + 6} 67`, 3);
      brows = brow(`M${L - 7} 58 Q${L} 52 ${L + 7} 55`) + brow(`M${R - 7} 55 Q${R} 52 ${R + 7} 58`);
      mouth = ol('<path d="M53 91 Q60 84 67 91 Q60 89 53 91 Z"/>', '#8c3a3a', 1.2);
      extra.push(ol(`<path d="M${L - 2} 71 Q${L - 6} 84 ${L - 2} 96 Q${L + 2} 84 ${L} 71Z"/><path d="M${R + 2} 71 Q${R + 6} 84 ${R + 2} 96 Q${R - 2} 84 ${R} 71Z"/>`, '#9fd3f2', 1));
      break;
    case 'worried':
      eyes = eyeOpen(L, l, { look: -1.4 }) + eyeOpen(R, l, { look: -1.4 }) + lid(L, f, -1) + lid(R, f, 1);
      brows = brow(`M${L - 7} 58 Q${L} 51 ${L + 7} 54`) + brow(`M${R - 7} 54 Q${R} 51 ${R + 7} 58`);
      mouth = line('M54 89 Q57 86 60 89 Q63 92 66 89', 2.4);
      break;
    default:
      eyes = eyeOpen(L, l) + eyeOpen(R, l) + lid(L, f, -1) + lid(R, f, 1);
      brows = brow(`M${L - 7} 56 Q${L} 52.5 ${L + 7} 55`) + brow(`M${R - 7} 55 Q${R} 52.5 ${R + 7} 56`);
      mouth = line('M55 87 Q60 90.5 65 87', 2.4);
  }
  if (a.has('lips') && (e === 'normal' || e === 'smug' || e === 'worried')) mouth = ol('<path d="M54 87 Q57 84.5 60 86 Q63 84.5 66 87 Q60 92 54 87 Z"/>', '#b8323e', 1);
  const nose = line('M59.5 76 Q62 79.5 58.5 81', 1.6, shade(l.skin, -60));
  const blush = `<ellipse cx="34" cy="81" rx="6.5" ry="3.6" fill="#e9806e" opacity=".42"/><ellipse cx="86" cy="81" rx="6.5" ry="3.6" fill="#e9806e" opacity=".42"/>`;
  let marks = '';
  if (a.has('freckles')) marks += [[32, 78], [36, 80], [34, 75], [84, 78], [88, 80], [86, 75]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="${shade(l.skin, -70)}"/>`).join('');
  if (a.has('mole')) marks += `<circle cx="70" cy="86" r="1.3" fill="${LINE}"/>`;
  if (a.has('stubble')) marks += Array.from({ length: 16 }, (_, i) => `<circle cx="${42 + (i % 8) * 5 + (i > 7 ? 2.5 : 0)}" cy="${95 + (i > 7 ? 4 : 0) - Math.abs(i % 8 - 3.5) * 0.6}" r=".9" fill="${shade(l.skin, -80)}"/>`).join('');
  if (a.has('bandage')) marks += ol('<rect x="78" y="74" width="14" height="6" rx="2" transform="rotate(-18 85 77)"/>', '#f1d3a8', 1);
  return blush + marks + eyes + brows + nose + mouth + extra.join('');
}

// ───────── 頭上配件 ─────────

function headwear(l: Look, a: Set<Acc>): string {
  let s = '';
  const c = l.accColor;
  if (a.has('beard')) s += ol('<path d="M29 78 Q32 106 60 108 Q88 106 91 78 Q84 94 60 94 Q36 94 29 78 Z"/>', shade(l.hairColor, 10), 1.6) + ol('<path d="M50 87 Q60 83 70 87 Q60 90 50 87 Z"/>', shade(l.hairColor, 10), 1.2);
  if (a.has('glasses')) s += `<g fill="rgba(255,255,255,.18)" stroke="${LINE}" stroke-width="2.4"><circle cx="45" cy="68" r="10"/><circle cx="75" cy="68" r="10"/></g>` + line('M55 67 Q60 64 65 67', 2.2) + line('M35 66 L25 64', 2.2) + line('M85 66 L95 64', 2.2);
  if (a.has('sunglasses')) s += ol('<rect x="31" y="60" width="26" height="15" rx="6"/><rect x="63" y="60" width="26" height="15" rx="6"/><rect x="56" y="63" width="8" height="3"/>', '#22201f', 1.4) + line('M36 64 L45 64', 2, 'rgba(255,255,255,.55)') + line('M68 64 L77 64', 2, 'rgba(255,255,255,.55)');
  if (a.has('headband')) s += line('M21 50 Q60 22 99 50', 8, LINE) + line('M21 50 Q60 22 99 50', 5, c ?? '#d9707a');
  if (a.has('clip')) s += ol('<rect x="78" y="38" width="16" height="6" rx="3" transform="rotate(-24 86 41)"/>', c ?? '#d9a23c', 1.2) + ol('<circle cx="80" cy="44" r="3"/>', '#f4efe6', 1);
  if (a.has('bow')) s += `<g transform="translate(88 30) rotate(18)">${ol('<path d="M0 0 L-12 -9 L-12 9 Z"/><path d="M0 0 L12 -9 L12 9 Z"/>', c ?? '#c9505a', 1.4)}${ol('<circle r="4"/>', shade(c ?? '#c9505a', -25), 1.2)}</g>`;
  if (a.has('cap')) {
    const cc = c ?? '#b5583a';
    s += ol('<path d="M18 48 Q20 14 60 13 Q100 14 102 48 Z"/>', cc) + ol('<path d="M14 48 L106 48 Q108 55 100 55 L20 55 Q12 55 14 48 Z"/>', shade(cc, -25), 1.8) + ol('<circle cx="60" cy="14" r="4"/>', shade(cc, -25), 1.2) + line('M60 16 L60 46', 1.4, shade(cc, -35));
  }
  if (a.has('beanie')) {
    const bc = c ?? '#d9a23c';
    s += ol('<path d="M18 54 Q16 12 60 10 Q104 12 102 54 Z"/>', bc);
    s += ol('<path d="M15 44 Q60 34 105 44 L105 58 Q60 48 15 58 Z"/>', shade(bc, -18), 1.8);
    s += [24, 33, 42, 51, 60, 69, 78, 87, 96].map((x) => line(`M${x} ${43 - Math.abs(x - 60) * -0.06 - 2} L${x} ${54 - Math.abs(x - 60) * 0.05}`, 1, shade(bc, -45))).join('');
    s += ol('<circle cx="40" cy="30" r="4.2"/>', '#efe3cf', 1.2) + ol('<circle cx="49" cy="25" r="3.4"/>', '#5f8a8b', 1.2);
  }
  if (a.has('earring')) s += ol('<circle cx="21" cy="83" r="2.8"/><circle cx="99" cy="83" r="2.8"/>', '#d4a63a', 1);
  if (a.has('hoops')) s += `<circle cx="21" cy="86" r="5" fill="none" stroke="${LINE}" stroke-width="4"/><circle cx="21" cy="86" r="5" fill="none" stroke="#d4a63a" stroke-width="2"/><circle cx="99" cy="86" r="5" fill="none" stroke="${LINE}" stroke-width="4"/><circle cx="99" cy="86" r="5" fill="none" stroke="#d4a63a" stroke-width="2"/>`;
  return s;
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
  const a = accs(look);
  let inner: string;
  if (opts.back) {
    const c = look.hair === 'bald' ? look.skin : look.hairColor;
    inner =
      body(look, new Set([...a].filter((x) => x === 'scarf'))) +
      ol(EARS, look.skin, 1.6) +
      ol(HEAD.replace('<path', '<path transform="translate(0 -1)"'), c) +
      (look.hair === 'bun' ? ol('<circle cx="60" cy="16" r="14"/>', c) : '') +
      (look.hair === 'ponytail' ? ol('<path d="M52 54 Q60 122 68 54 Z"/>', c) : '') +
      (look.hair === 'long' ? ol('<path d="M18 66 L14 116 Q60 126 106 116 L102 66 Z"/>', c) : '') +
      (look.hair === 'wavy' || look.hair === 'bob' ? ol('<path d="M18 66 Q14 90 22 102 Q60 112 98 102 Q106 90 102 66 Z"/>', c) : '') +
      line('M40 40 Q56 30 72 34', 3.4, 'rgba(255,255,255,.22)') +
      (a.has('beanie') || a.has('cap') ? headwear(look, new Set([...a].filter((x) => x === 'beanie' || x === 'cap'))) : '');
  } else {
    inner =
      hairBack(look) +
      body(look, a) +
      ol(EARS, look.skin, 1.6) +
      ol(HEAD, look.skin) +
      face(look, e, a) +
      (a.has('beanie') ? '' : hairFront(look)) +
      headwear(look, a);
    // 戴毛帽時，瀏海從帽沿下露出來
    if (a.has('beanie') && look.hair !== 'bald') inner = inner.replace(headwear(look, a), headwear(look, a) + bangsUnderHat(look));
  }
  return `<svg class="chibi ${opts.cls ?? ''}" viewBox="0 0 120 140" width="${size}" height="${h}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g filter="${CRAYON_SOFT}">${inner}</g></svg>`;
}

function bangsUnderHat(l: Look): string {
  return ol('<path d="M22 56 L28 66 L32 56 L38 64 L43 55 L50 62 L54 54 L62 60 L66 54 L72 62 L77 55 L82 64 L88 56 L92 66 L98 56 Z"/>', l.hairColor, 1.6);
}

export function portrait(key: string, opts: ChibiOpts = {}): string {
  return chibiSvg(ch(key).look, opts);
}
