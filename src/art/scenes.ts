import type { SceneKey } from '../types';
import { CRAYON, SCENE_LIGHT } from './texture';

/**
 * 六大場景＋家（開場用）。viewBox 0 0 400 720，直式手機比例。
 * 風格：繪本感、暖色燈光、柔和陰影（參考附圖的酒館與商店）。
 */

export const SCENE_NAME: Record<SceneKey, string> = {
  office: '辦公室', car: '汽車', motel: '汽車旅館', cinema: '電影院', park: '遊樂園', library: '圖書館', home: '家',
};

/** 搜證時證物可以擺放的位置（落在桌面、地上、座椅等表面） */
export const SPOTS: Record<SceneKey, [number, number][]> = {
  office: [[78, 452], [158, 446], [262, 500], [346, 496], [338, 286], [62, 628], [196, 654], [330, 668], [120, 300]],
  car: [[96, 560], [300, 560], [200, 470], [70, 660], [330, 668], [200, 640], [120, 420], [290, 410], [200, 300]],
  motel: [[70, 470], [326, 452], [196, 640], [86, 650], [318, 650], [200, 520], [52, 300], [350, 330], [250, 560]],
  cinema: [[80, 506], [200, 500], [320, 506], [110, 612], [290, 612], [70, 690], [330, 690], [200, 690], [200, 410]],
  park: [[64, 540], [200, 600], [330, 548], [110, 668], [290, 672], [200, 470], [352, 440], [42, 430], [150, 560]],
  library: [[82, 476], [300, 476], [198, 600], [68, 664], [330, 660], [66, 236], [334, 220], [200, 520], [150, 352]],
  home: [[80, 520], [300, 520], [200, 620], [70, 660], [330, 660], [200, 460], [60, 340], [340, 340], [200, 560]],
};

const glow = (id: string, color: string) =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity=".85"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;

function office(): string {
  const win = (x: number) => `<g><rect x="${x}" y="56" width="104" height="170" rx="8" fill="#333a50"/>
    <rect x="${x}" y="56" width="104" height="170" rx="8" fill="url(#ofSky)"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${x + 8 + i * 19}" y="${150 - (i % 3) * 22}" width="14" height="${80 + (i % 3) * 22}" fill="#434c64"/>`).join('')}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${x + 11 + (i % 5) * 19}" y="${158 + Math.floor(i / 5) * 16 - (i % 3) * 18}" width="5" height="6" fill="#d4c296" opacity=".9"/>`).join('')}
    <rect x="${x + 49}" y="56" width="6" height="170" fill="#afa08c"/><rect x="${x}" y="137" width="104" height="6" fill="#afa08c"/>
    <rect x="${x - 4}" y="52" width="112" height="178" rx="10" fill="none" stroke="#afa08c" stroke-width="8"/></g>`;
  const monitor = (x: number, y: number) => `<g><rect x="${x - 34}" y="${y - 70}" width="68" height="46" rx="5" fill="#3c3f49"/><rect x="${x - 29}" y="${y - 65}" width="58" height="36" rx="3" fill="#99c1d5"/><rect x="${x - 29}" y="${y - 65}" width="58" height="36" rx="3" fill="url(#ofScreen)"/><rect x="${x - 6}" y="${y - 24}" width="12" height="16" fill="#3c3f49"/><rect x="${x - 18}" y="${y - 10}" width="36" height="6" rx="3" fill="#3c3f49"/></g>`;
  return `<defs>
    <linearGradient id="ofSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#444c69"/><stop offset="1" stop-color="#7e7193"/></linearGradient>
    <linearGradient id="ofScreen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
    ${glow('ofLamp', '#d2bc92')}
  </defs>
  <rect width="400" height="720" fill="#cebda6"/>
  <rect width="400" height="430" fill="#d7c9b0"/>
  ${win(20)}${win(148)}${win(276)}
  <rect x="0" y="238" width="400" height="10" fill="#bdab94"/>
  <g><circle cx="200" cy="290" r="26" fill="#f2ece0" stroke="#786253" stroke-width="5"/><path d="M200 290 V274 M200 290 L212 296" stroke="#403737" stroke-width="3" stroke-linecap="round"/></g>
  <rect x="290" y="300" width="96" height="134" rx="6" fill="#969fa9"/><rect x="290" y="300" width="96" height="10" fill="#848e98"/>
  ${[0, 1, 2].map((i) => `<rect x="298" y="${318 + i * 38}" width="80" height="30" rx="4" fill="#a9b2bc"/><rect x="328" y="${330 + i * 38}" width="20" height="5" rx="2" fill="#6a727c"/>`).join('')}
  <g><rect x="20" y="300" width="40" height="70" rx="6" fill="#c1d9e6" opacity=".8"/><rect x="18" y="370" width="44" height="64" rx="4" fill="#d5dadf"/><circle cx="30" cy="392" r="4" fill="#7ba0bd"/><circle cx="48" cy="392" r="4" fill="#bf7e7e"/></g>
  <rect x="0" y="430" width="400" height="290" fill="#aa9079"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="0" y="${450 + i * 46}" width="400" height="3" fill="#987e69" opacity=".6"/>`).join('')}
  <ellipse cx="120" cy="560" rx="120" ry="18" fill="#000" opacity=".12"/>
  <rect x="10" y="464" width="214" height="16" rx="4" fill="#786253"/><rect x="10" y="460" width="214" height="10" rx="4" fill="#8f7864"/>
  <rect x="24" y="478" width="12" height="76" fill="#645046"/><rect x="198" y="478" width="12" height="76" fill="#645046"/>
  ${monitor(118, 462)}
  <circle cx="190" cy="420" r="70" fill="url(#ofLamp)"/>
  <path d="M188 462 L188 430 L206 406" stroke="#464951" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M196 400 L222 396 L214 418 Z" fill="#464951"/>
  <ellipse cx="300" cy="612" rx="110" ry="18" fill="#000" opacity=".12"/>
  <rect x="190" y="514" width="206" height="16" rx="4" fill="#786253"/><rect x="190" y="510" width="206" height="10" rx="4" fill="#8f7864"/>
  <rect x="202" y="528" width="12" height="80" fill="#645046"/><rect x="374" y="528" width="12" height="80" fill="#645046"/>
  ${monitor(300, 512)}
  <g><rect x="80" y="580" width="70" height="60" rx="14" fill="#4e5464"/><rect x="88" y="636" width="54" height="10" rx="4" fill="#3c3f49"/><rect x="110" y="646" width="10" height="36" fill="#3c3f49"/><path d="M84 690 L146 690" stroke="#3c3f49" stroke-width="6" stroke-linecap="round"/></g>
  <g><path d="M340 600 L370 600 L364 650 L346 650 Z" fill="#ae8167"/><path d="M355 600 Q326 560 340 520 Q356 556 355 600 Z M355 600 Q384 560 372 524 Q356 560 355 600Z" fill="#749979"/></g>`;
}

function car(): string {
  return `<defs>
    <linearGradient id="caSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#363349"/><stop offset=".7" stop-color="#66526b"/><stop offset="1" stop-color="#c29586"/></linearGradient>
    ${glow('caLight', '#d8caa0')}${glow('caRed', '#cd8484')}
  </defs>
  <rect width="400" height="720" fill="#35313a"/>
  <path d="M30 70 Q200 30 370 70 L390 330 L10 330 Z" fill="url(#caSky)"/>
  <path d="M10 330 L160 200 L240 200 L390 330 Z" fill="#434049"/>
  <path d="M196 214 L204 214 L210 250 L190 250 Z M190 268 L210 268 L218 320 L182 320 Z" fill="#d8caa0" opacity=".8"/>
  ${[60, 120, 300, 350].map((x, i) => `<rect x="${x}" y="${120 + (i % 2) * 30}" width="${18 + i * 4}" height="${110 - (i % 2) * 30}" fill="#454053"/>`).join('')}
  <circle cx="60" cy="100" r="3" fill="#fff"/><circle cx="330" cy="80" r="2" fill="#fff"/><circle cx="280" cy="120" r="2.4" fill="#fff"/>
  <path d="M0 0 H400 V70 Q200 26 0 70 Z" fill="#434047"/>
  <path d="M0 70 Q30 200 14 340 L0 340 Z M400 70 Q370 200 386 340 L400 340 Z" fill="#434047"/>
  <rect x="150" y="70" width="100" height="30" rx="8" fill="#514e56"/><rect x="156" y="74" width="88" height="22" rx="6" fill="#8b8498" opacity=".6"/>
  <path d="M0 340 Q200 300 400 340 L400 450 L0 450 Z" fill="#504a54"/>
  <path d="M0 340 Q200 300 400 340" fill="none" stroke="#615b66" stroke-width="10"/>
  <rect x="150" y="360" width="100" height="40" rx="10" fill="#38353c"/><rect x="160" y="368" width="80" height="24" rx="5" fill="#78a8a5" opacity=".8"/>
  <text x="200" y="386" text-anchor="middle" font-size="14" fill="#2f4140" font-family="monospace">22:47</text>
  <circle cx="98" cy="400" r="56" fill="none" stroke="#343138" stroke-width="16"/><path d="M50 400 L146 400 M98 400 L98 452" stroke="#343138" stroke-width="10"/>
  <circle cx="98" cy="400" r="14" fill="#434047"/>
  <rect x="0" y="450" width="400" height="270" fill="#423e46"/>
  <g><path d="M24 470 Q24 440 60 440 L150 440 Q176 440 176 470 L176 720 L24 720 Z" fill="#6e574f"/><path d="M40 490 L160 490 M40 540 L160 540 M40 590 L160 590" stroke="#5d4943" stroke-width="4"/><rect x="60" y="400" width="80" height="50" rx="16" fill="#6e574f"/></g>
  <g><path d="M224 470 Q224 440 260 440 L350 440 Q376 440 376 470 L376 720 L224 720 Z" fill="#7b645c"/><path d="M240 490 L360 490 M240 540 L360 540 M240 590 L360 590" stroke="#66524a" stroke-width="4"/><rect x="260" y="400" width="80" height="50" rx="16" fill="#7b645c"/></g>
  <rect x="178" y="470" width="44" height="250" fill="#343138"/><rect x="186" y="490" width="28" height="60" rx="8" fill="#514e56"/>`;
}

function motel(): string {
  const door = (x: number, n: string, open = false) => `<g><rect x="${x}" y="160" width="86" height="240" rx="6" fill="#644c58"/><rect x="${x + 6}" y="166" width="74" height="228" rx="4" fill="${open ? '#d2bc92' : '#7b5e6c'}"/>
    <rect x="${x + 22}" y="128" width="42" height="22" rx="6" fill="#342e39"/><text x="${x + 43}" y="145" text-anchor="middle" font-size="15" font-weight="700" fill="#c9b57a">${n}</text>
    <circle cx="${x + 68}" cy="290" r="5" fill="#c9b57a"/><rect x="${x + 64}" y="300" width="10" height="14" rx="2" fill="#342e39"/><circle cx="${x + 69}" cy="306" r="2" fill="#8cb382"/></g>`;
  return `<defs>
    <linearGradient id="moWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4d3d55"/><stop offset="1" stop-color="#6f5369"/></linearGradient>
    ${glow('moNeon', '#cd84a6')}${glow('moLamp', '#d2bc92')}
  </defs>
  <rect width="400" height="720" fill="url(#moWall)"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<rect x="${i * 48}" y="0" width="24" height="430" fill="#000" opacity=".06"/>`).join('')}
  <circle cx="200" cy="60" r="90" fill="url(#moNeon)" opacity=".7"/>
  <rect x="98" y="30" width="204" height="56" rx="28" fill="none" stroke="#d8a0bc" stroke-width="5"/>
  <text x="200" y="68" text-anchor="middle" font-size="26" font-weight="700" fill="#ecd0df" letter-spacing="3">薇光汽旅</text>
  ${door(18, '301')}${door(157, '302')}${door(296, '303')}
  ${[66, 205, 344].map((x) => `<circle cx="${x}" cy="114" r="34" fill="url(#moLamp)"/><path d="M${x - 10} 100 L${x + 10} 100 L${x + 6} 112 L${x - 6} 112 Z" fill="#d4c296"/>`).join('')}
  <rect x="0" y="400" width="400" height="30" fill="#3e2f3e"/>
  <path d="M0 430 L400 430 L400 720 L0 720 Z" fill="#764b58"/>
  <path d="M120 430 L280 430 L340 720 L60 720 Z" fill="#8d5d69"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${132 - i * 12} ${460 + i * 46} L${268 + i * 12} ${460 + i * 46}" stroke="#d2bc92" stroke-width="3" stroke-dasharray="10 10" opacity=".55"/>`).join('')}
  <g><rect x="20" y="430" width="100" height="90" rx="8" fill="#d5dadf"/><rect x="28" y="440" width="84" height="40" rx="4" fill="#a3aeb7"/><text x="70" y="466" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">ICE</text><rect x="54" y="490" width="32" height="20" rx="4" fill="#6a727c"/></g>
  <g><rect x="284" y="460" width="92" height="70" rx="6" fill="#e4e4e4"/><rect x="284" y="460" width="92" height="12" fill="#c9cfd6"/><rect x="292" y="480" width="34" height="40" rx="3" fill="#c1d9e6"/><rect x="332" y="480" width="34" height="40" rx="3" fill="#ecd2df"/>
    <path d="M290 530 L290 560 M370 530 L370 560" stroke="#898989" stroke-width="5"/><circle cx="290" cy="566" r="8" fill="#464951"/><circle cx="370" cy="566" r="8" fill="#464951"/></g>
  <g><path d="M30 600 L80 600 L74 660 L36 660 Z" fill="#ae9669"/><path d="M55 600 Q30 560 46 530 Q60 566 55 600 Z M55 600 Q84 560 70 530 Q54 566 55 600Z" fill="#69947d"/></g>`;
}

function cinema(): string {
  const row = (y: number, n: number, w: number, c: string) => {
    const gap = (400 - n * w) / (n + 1);
    return Array.from({ length: n }, (_, i) => {
      const x = gap + i * (w + gap);
      return `<g><rect x="${x}" y="${y}" width="${w}" height="${w * 0.9}" rx="${w * 0.25}" fill="${c}"/><rect x="${x + 4}" y="${y + w * 0.6}" width="${w - 8}" height="${w * 0.36}" rx="${w * 0.15}" fill="#693f46"/></g>`;
    }).join('');
  };
  return `<defs>
    <linearGradient id="ciScreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c1d9e6"/><stop offset="1" stop-color="#94afc7"/></linearGradient>
    <linearGradient id="ciBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c1d9e6" stop-opacity=".35"/><stop offset="1" stop-color="#c1d9e6" stop-opacity="0"/></linearGradient>
    ${glow('ciAisle', '#d2bc92')}
  </defs>
  <rect width="400" height="720" fill="#2c2836"/>
  <path d="M0 0 L60 0 L60 360 L0 400 Z M400 0 L340 0 L340 360 L400 400 Z" fill="#693f46"/>
  ${[10, 30, 50].map((x) => `<path d="M${x} 0 L${x} 380" stroke="#522f37" stroke-width="6"/><path d="M${400 - x} 0 L${400 - x} 380" stroke="#522f37" stroke-width="6"/>`).join('')}
  <rect x="70" y="60" width="260" height="150" rx="6" fill="url(#ciScreen)"/>
  <g opacity=".7"><circle cx="170" cy="140" r="26" fill="#fff"/><circle cx="230" cy="130" r="20" fill="#ecd2df"/><path d="M150 190 Q200 160 250 190" fill="#fff"/></g>
  <path d="M70 210 L330 210 L400 520 L0 520 Z" fill="url(#ciBeam)"/>
  <rect x="0" y="300" width="400" height="420" fill="#363242"/>
  ${row(320, 7, 44, '#9c5f67')}
  ${row(400, 6, 52, '#a1646c')}
  ${row(490, 5, 62, '#a66871')}
  ${row(600, 4, 74, '#ab6d76')}
  ${[340, 420, 520, 640].map((y) => `<circle cx="18" cy="${y + 60}" r="14" fill="url(#ciAisle)"/><circle cx="382" cy="${y + 60}" r="14" fill="url(#ciAisle)"/>`).join('')}
  <text x="200" y="40" text-anchor="middle" font-size="16" fill="#d2bc92" letter-spacing="6" opacity=".8">THEATER 7</text>`;
}

function park(): string {
  const cabins = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    const x = 270 + Math.cos(a) * 112;
    const y = 200 + Math.sin(a) * 112;
    const cs = ['#d18f9f', '#ccb782', '#99c1d5', '#a2c49a', '#bea1d9'];
    return `<line x1="270" y1="200" x2="${x}" y2="${y}" stroke="#fff" stroke-width="2.4" opacity=".7"/><g><rect x="${x - 13}" y="${y}" width="26" height="22" rx="6" fill="${cs[i % 5]}"/><rect x="${x - 8}" y="${y + 4}" width="16" height="8" rx="2" fill="#f2ece0" opacity=".8"/></g>`;
  }).join('');
  const lanterns = [40, 100, 160, 220, 280, 340].map((x, i) => `<circle cx="${x}" cy="${330 + (i % 2) * 10}" r="20" fill="url(#paLamp)"/><ellipse cx="${x}" cy="${330 + (i % 2) * 10}" rx="9" ry="11" fill="#c89478"/>`).join('');
  return `<defs>
    <linearGradient id="paSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#73739d"/><stop offset=".55" stop-color="#ca9cae"/><stop offset="1" stop-color="#d8bea0"/></linearGradient>
    ${glow('paLamp', '#d2bc92')}
  </defs>
  <rect width="400" height="720" fill="url(#paSky)"/>
  <circle cx="80" cy="90" r="28" fill="#ece4d0" opacity=".9"/>
  <ellipse cx="90" cy="160" rx="60" ry="16" fill="#fff" opacity=".35"/><ellipse cx="320" cy="60" rx="50" ry="12" fill="#fff" opacity=".35"/>
  <circle cx="270" cy="200" r="112" fill="none" stroke="#fff" stroke-width="5"/><circle cx="270" cy="200" r="96" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>
  ${cabins}
  <circle cx="270" cy="200" r="12" fill="#fff"/>
  <path d="M270 200 L220 360 M270 200 L320 360" stroke="#fff" stroke-width="7"/>
  <path d="M0 300 Q60 220 120 300 Q140 250 170 300" fill="none" stroke="#bf7e7e" stroke-width="6"/>
  <path d="M0 300 Q60 220 120 300" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 6"/>
  <path d="M0 310 L400 340 L400 360 L0 330 Z" fill="none" stroke="#403737" stroke-width="1.4"/>
  ${lanterns}
  <path d="M0 360 Q200 330 400 360 L400 720 L0 720 Z" fill="#9cb58c"/>
  <path d="M120 360 Q200 350 280 360 L340 720 L60 720 Z" fill="#c9b79b"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${(i * 53) % 400 + 20}" cy="${400 + ((i * 37) % 300)}" r="4" fill="${['#d18f9f', '#fff', '#ccb782'][i % 3]}"/>`).join('')}
  <g transform="translate(64 470)"><path d="M-40 0 L40 0 L30 -40 L0 -64 L-30 -40 Z" fill="#d8a0b2"/><path d="M-30 -40 L30 -40" stroke="#fff" stroke-width="4"/><rect x="-40" y="0" width="80" height="60" fill="#eee6d6"/>${[-24, 0, 24].map((x) => `<rect x="${x - 2}" y="0" width="4" height="60" fill="#ae9669"/><ellipse cx="${x}" cy="40" rx="9" ry="7" fill="${x === 0 ? '#fff' : '#d4c296'}" stroke="#403737" stroke-width="1.4"/>`).join('')}</g>
  <g transform="translate(330 470)">${['#d18f9f', '#99c1d5', '#ccb782', '#a2c49a'].map((c, i) => `<path d="M0 60 Q${-14 + i * 9} 20 ${-18 + i * 12} ${-10 - (i % 2) * 14}" fill="none" stroke="#403737" stroke-width="1.2"/><ellipse cx="${-18 + i * 12}" cy="${-22 - (i % 2) * 14}" rx="12" ry="14" fill="${c}"/>`).join('')}<rect x="-16" y="56" width="32" height="40" rx="4" fill="#7ba0bd"/></g>`;
}

function library(): string {
  const shelf = (x: number, w: number) => {
    const books: string[] = [];
    const cs = ['#bf7e7e', '#7ba0bd', '#ccb782', '#88a67e', '#bea1d9', '#cda183', '#6a727c'];
    for (let r = 0; r < 4; r++) {
      let bx = x + 8;
      let k = r * 3;
      while (bx < x + w - 14) {
        const bw = 10 + ((k * 7) % 9);
        const bh = 50 - ((k * 5) % 14);
        books.push(`<rect x="${bx}" y="${120 + r * 76 + (64 - bh)}" width="${bw}" height="${bh}" rx="2" fill="${cs[k % cs.length]}"/>`);
        bx += bw + 2;
        k++;
      }
    }
    return `<rect x="${x}" y="100" width="${w}" height="320" rx="6" fill="#6c5548"/>${[0, 1, 2, 3].map((r) => `<rect x="${x + 4}" y="${108 + r * 76}" width="${w - 8}" height="70" fill="#544036"/>`).join('')}${books.join('')}${[0, 1, 2, 3, 4].map((r) => `<rect x="${x}" y="${100 + r * 76}" width="${w}" height="8" fill="#786253"/>`).join('')}`;
  };
  return `<defs>
    ${glow('liLamp', '#d8caa0')}
    <linearGradient id="liWin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#444c69"/><stop offset="1" stop-color="#73739d"/></linearGradient>
  </defs>
  <rect width="400" height="720" fill="#cbbca5"/>
  <path d="M150 20 Q200 -20 250 20 L250 100 L150 100 Z" fill="url(#liWin)"/><path d="M200 0 V100 M150 60 H250" stroke="#afa08c" stroke-width="5"/>
  ${shelf(10, 140)}${shelf(250, 140)}
  <rect x="160" y="110" width="80" height="300" fill="#bdab94"/>
  <path d="M176 120 L176 400 M224 120 L224 400 M176 160 H224 M176 220 H224 M176 280 H224 M176 340 H224" stroke="#786253" stroke-width="5"/>
  <rect x="0" y="420" width="400" height="300" fill="#8f7864"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="0" y="${440 + i * 46}" width="400" height="3" fill="#806a5a" opacity=".7"/>`).join('')}
  <ellipse cx="200" cy="560" rx="180" ry="20" fill="#000" opacity=".12"/>
  <rect x="20" y="490" width="360" height="18" rx="5" fill="#645046"/><rect x="20" y="484" width="360" height="12" rx="5" fill="#786253"/>
  <rect x="40" y="506" width="14" height="70" fill="#544036"/><rect x="346" y="506" width="14" height="70" fill="#544036"/>
  ${[110, 290].map((x) => `<circle cx="${x}" cy="440" r="70" fill="url(#liLamp)"/><path d="M${x} 484 V456" stroke="#afa08c" stroke-width="4"/><path d="M${x - 24} 456 Q${x} 426 ${x + 24} 456 Z" fill="#567963"/>`).join('')}
  <g><path d="M60 600 h60 v50 h-60z" fill="#6c5548"/><path d="M60 600 h60 v-40 h-60z" fill="#786253"/></g>
  <g><path d="M280 600 h60 v50 h-60z" fill="#6c5548"/><path d="M280 600 h60 v-40 h-60z" fill="#786253"/></g>
  <text x="200" y="700" text-anchor="middle" font-size="13" fill="#544036" letter-spacing="4">請保持安靜</text>`;
}

function home(): string {
  return `<defs>${glow('hoTv', '#99c1d5')}${glow('hoLamp', '#d2bc92')}</defs>
  <rect width="400" height="720" fill="#49465b"/>
  <rect width="400" height="430" fill="#59566e"/>
  <rect x="40" y="80" width="130" height="150" rx="8" fill="#343649"/><circle cx="130" cy="120" r="16" fill="#ece4d0"/><path d="M105 80 V230 M40 155 H170" stroke="#76728a" stroke-width="6"/>
  <rect x="236" y="70" width="110" height="80" rx="6" fill="#ae9669"/><rect x="244" y="78" width="94" height="64" fill="#ecd2df"/><circle cx="270" cy="104" r="12" fill="#cf9ca7"/><circle cx="306" cy="104" r="12" fill="#4e5464"/><path d="M276 104 Q291 112 300 104" fill="none" stroke="#b1646f" stroke-width="3"/>
  <circle cx="320" cy="330" r="130" fill="url(#hoTv)" opacity=".5"/>
  <rect x="250" y="250" width="140" height="90" rx="6" fill="#2c2c30"/><rect x="258" y="258" width="124" height="74" fill="#78a8a5" opacity=".7"/>
  <rect x="0" y="430" width="400" height="290" fill="#67575f"/>
  <path d="M40 450 Q40 400 90 400 L310 400 Q360 400 360 450 L360 560 L40 560 Z" fill="#ae8484"/>
  <rect x="30" y="460" width="340" height="110" rx="24" fill="#bc9191"/>
  <rect x="60" y="470" width="120" height="50" rx="16" fill="#cda5a5"/><rect x="220" y="470" width="120" height="50" rx="16" fill="#cda5a5"/>
  <rect x="50" y="570" width="12" height="40" fill="#584949"/><rect x="338" y="570" width="12" height="40" fill="#584949"/>
  <circle cx="60" cy="380" r="60" fill="url(#hoLamp)"/><path d="M60 420 V360" stroke="#ae9669" stroke-width="4"/><path d="M40 360 L80 360 L72 330 L48 330 Z" fill="#d4c296"/>`;
}

const DRAW: Record<SceneKey, () => string> = { office, car, motel, cinema, park, library, home };
const cache: Partial<Record<SceneKey, string>> = {};

/** 前車（跟車玩法用），中心在 0,0，寬約 70 */
export const TARGET_CAR = `<g><rect x="-34" y="-10" width="68" height="34" rx="10" fill="#a66f7c"/><rect x="-28" y="-24" width="56" height="22" rx="8" fill="#8d5d69"/><rect x="-22" y="-20" width="44" height="12" rx="4" fill="#454053" opacity=".6"/><circle cx="-22" cy="12" r="9" fill="#cd8484" opacity=".5"/><circle cx="22" cy="12" r="9" fill="#cd8484" opacity=".5"/><circle cx="-22" cy="12" r="4" fill="#d8a0a0"/><circle cx="22" cy="12" r="4" fill="#d8a0a0"/><rect x="-10" y="6" width="20" height="7" rx="2" fill="#f2ece0"/></g>`;

export function sceneInner(key: SceneKey): string {
  return (cache[key] ??= DRAW[key]());
}

export function sceneSvg(key: SceneKey, extra = '', cls = '', aspect = 'xMidYMid slice'): string {
  return `<svg class="scene-svg ${cls}" viewBox="0 0 400 720" preserveAspectRatio="${aspect}" xmlns="http://www.w3.org/2000/svg"><g filter="${CRAYON}">${sceneInner(key)}</g>${SCENE_LIGHT}${extra}</svg>`;
}
