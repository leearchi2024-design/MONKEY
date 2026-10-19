/**
 * 蠟筆繪本質感（參考附圖的手繪插畫風）：
 * 1. SVG 濾鏡：邊緣微微抖動像蠟筆描邊，色塊裡有蠟質顆粒
 * 2. 紙張顆粒：用 canvas 產生一張雜訊貼圖，鋪在整個畫面上
 * 3. 暖色暈影：場景四角壓暗、中央像被燈光照亮
 *
 * 濾鏡和漸層放在 document 裡一份，所有 SVG 用 url(#id) 共用。
 */

export const CRAYON = 'url(#crayon)';
export const CRAYON_SOFT = 'url(#crayon-soft)';

function crayonFilter(id: string, warp: number, grainFreq: number, grainMin: number): string {
  return `<filter id="${id}" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="4" result="warp"/>
    <feDisplacementMap in="SourceGraphic" in2="warp" scale="${warp}" xChannelSelector="R" yChannelSelector="G" result="rough"/>
    <feTurbulence type="fractalNoise" baseFrequency="${grainFreq}" numOctaves="2" seed="9" result="noise"/>
    <feColorMatrix in="noise" type="saturate" values="0" result="gray"/>
    <feComponentTransfer in="gray" result="tex">
      <feFuncR type="linear" slope="${(1 - grainMin) * 2}" intercept="${grainMin - (1 - grainMin) * 0.5}"/>
      <feFuncG type="linear" slope="${(1 - grainMin) * 2}" intercept="${grainMin - (1 - grainMin) * 0.5}"/>
      <feFuncB type="linear" slope="${(1 - grainMin) * 2}" intercept="${grainMin - (1 - grainMin) * 0.5}"/>
      <feFuncA type="linear" slope="0" intercept="1"/>
    </feComponentTransfer>
    <feBlend in="rough" in2="tex" mode="multiply" result="waxy"/>
    <feComposite in="waxy" in2="rough" operator="in"/>
  </filter>`;
}

const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
  ${crayonFilter('crayon', 5, 0.75, 0.72)}
  ${crayonFilter('crayon-soft', 2.6, 0.9, 0.8)}
  <radialGradient id="warmVignette" cx="50%" cy="46%" r="75%">
    <stop offset=".45" stop-color="#fff3d6" stop-opacity="0"/>
    <stop offset="1" stop-color="#5a2a1a" stop-opacity=".55"/>
  </radialGradient>
  <radialGradient id="warmLight" cx="50%" cy="38%" r="55%">
    <stop offset="0" stop-color="#ffd890" stop-opacity=".35"/>
    <stop offset="1" stop-color="#ffd890" stop-opacity="0"/>
  </radialGradient>
</defs></svg>`;

/** 產生一張可平鋪的紙張／蠟筆顆粒貼圖 */
function grainTile(size: number, alpha: number, dark: boolean): string {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  if (!g) return '';
  const img = g.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random();
    const shade = dark ? 60 + v * 80 : 255 - v * 70;
    img.data[i] = shade;
    img.data[i + 1] = shade * 0.92;
    img.data[i + 2] = shade * 0.82;
    img.data[i + 3] = v > 0.5 ? v * alpha * 255 : 0;
  }
  g.putImageData(img, 0, 0);
  // 再刷幾道斜向的蠟筆筆觸
  g.globalAlpha = 0.05;
  g.strokeStyle = dark ? '#3a2010' : '#fff8e8';
  g.lineWidth = 1.2;
  for (let k = 0; k < 90; k++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + 10 + Math.random() * 18, y - 6 - Math.random() * 10);
    g.stroke();
  }
  return c.toDataURL('image/png');
}

export function installTextures(): void {
  document.body.insertAdjacentHTML('afterbegin', DEFS);
  const root = document.documentElement.style;
  root.setProperty('--grain', `url(${grainTile(180, 0.45, true)})`);
  root.setProperty('--paper', `url(${grainTile(160, 0.14, true)})`);
}

/** 場景上方的暖光與暈影 */
export const SCENE_LIGHT = `<rect width="400" height="720" fill="url(#warmLight)" style="mix-blend-mode:screen"/><rect width="400" height="720" fill="url(#warmVignette)" style="mix-blend-mode:multiply"/>`;
