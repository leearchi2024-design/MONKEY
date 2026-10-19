/**
 * 證物與雜物圖示，座標範圍 -24..24，可直接放進場景 <g> 或包成小 svg。
 */

const O = 'stroke="#3a2a2a" stroke-width="2" stroke-linejoin="round"';

export const ICONS: Record<string, string> = {
  // ── 證物 ──
  lipstick: `<g transform="rotate(-20)"><rect x="-7" y="-2" width="14" height="22" rx="3" fill="#d9a441" ${O}/><path d="M-6 -2 L-6 -14 Q0 -24 6 -16 L6 -2 Z" fill="#e0384f" ${O}/><rect x="-8" y="2" width="16" height="4" fill="#b8862f"/></g><path d="M8 14 Q14 10 18 16 Q14 20 8 14Z" fill="#e0384f" opacity=".7"/>`,
  receipt: `<path d="M-13 -20 L13 -20 L13 20 L9 16 L5 20 L1 16 L-3 20 L-7 16 L-13 20 Z" fill="#fffdf4" ${O}/><path d="M-8 -12 H8 M-8 -6 H5 M-8 0 H8 M-8 6 H2" stroke="#9a8f86" stroke-width="2"/><path d="M1 10 H9" stroke="#e0384f" stroke-width="2.4"/>`,
  keycard: `<rect x="-20" y="-13" width="40" height="26" rx="4" fill="#5aa9e6" ${O}/><rect x="-14" y="-6" width="12" height="12" rx="2" fill="#ffd34d"/><path d="M2 -4 H14 M2 3 H11" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`,
  hairclip: `<path d="M-18 6 L16 -6" stroke="#c9c2b8" stroke-width="5" stroke-linecap="round"/><circle cx="-12" cy="4" r="5.5" fill="#fffaf0" ${O}/><circle cx="-2" cy="0.5" r="5.5" fill="#fffaf0" ${O}/><circle cx="8" cy="-3" r="5.5" fill="#fffaf0" ${O}/>`,
  sdcard: `<path d="M-12 -18 L6 -18 L14 -10 L14 18 L-12 18 Z" fill="#3d4a6b" ${O}/><g fill="#ffd34d"><rect x="-8" y="-14" width="3" height="7"/><rect x="-3" y="-14" width="3" height="7"/><rect x="2" y="-14" width="3" height="7"/></g><rect x="-8" y="2" width="18" height="10" rx="2" fill="#fff"/>`,
  ticket: `<path d="M-20 -11 H20 V-4 A4 4 0 0 0 20 4 V11 H-20 V4 A4 4 0 0 0 -20 -4 Z" fill="#ffcf5a" ${O}/><path d="M8 -11 V11" stroke="#3a2a2a" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M-14 -4 H2 M-14 3 H-2" stroke="#b5671d" stroke-width="2.4" stroke-linecap="round"/>`,
  popcorn: `<path d="M-14 -4 L14 -4 L10 20 L-10 20 Z" fill="#fff" ${O}/><path d="M-9 -4 L-7 20 M0 -4 V20 M9 -4 L7 20" stroke="#e0384f" stroke-width="3.4"/><g fill="#fff5d6" ${O}><circle cx="-9" cy="-8" r="6"/><circle cx="0" cy="-11" r="7"/><circle cx="9" cy="-8" r="6"/></g>`,
  calendar: `<rect x="-18" y="-15" width="36" height="34" rx="4" fill="#fffdf4" ${O}/><rect x="-18" y="-15" width="36" height="10" rx="4" fill="#e85d5d" ${O}/><path d="M-10 -20 V-11 M10 -20 V-11" stroke="#3a2a2a" stroke-width="3" stroke-linecap="round"/><circle cx="5" cy="7" r="6" fill="none" stroke="#e0384f" stroke-width="2.4"/><path d="M-11 1 H-5 M-11 9 H-5" stroke="#9a8f86" stroke-width="2"/>`,
  creditcard: `<rect x="-21" y="-14" width="42" height="28" rx="4" fill="#7a5cc9" ${O}/><rect x="-21" y="-7" width="42" height="6" fill="#3a2a2a"/><rect x="-15" y="4" width="10" height="6" rx="1.5" fill="#ffd34d"/><path d="M2 7 H15" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`,
  balloon: `<ellipse cx="0" cy="-6" rx="14" ry="16" fill="#ff6f91" ${O}/><path d="M-3 10 L3 10 L0 14 Z" fill="#ff6f91" ${O}/><path d="M0 14 Q-6 18 2 24" fill="none" stroke="#3a2a2a" stroke-width="1.6"/><path d="M-7 -14 Q-4 -18 0 -18" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>`,
  chat: `<rect x="-13" y="-21" width="26" height="42" rx="5" fill="#3a3f4f" ${O}/><rect x="-10" y="-16" width="20" height="30" rx="2" fill="#eef7ff"/><rect x="-8" y="-12" width="12" height="6" rx="3" fill="#7fd36a"/><rect x="-4" y="-3" width="12" height="6" rx="3" fill="#cfd9e6"/><path d="M-6 8 l2 -2 l2 2 l2 -2 l2 2" fill="none" stroke="#ff5d7a" stroke-width="1.8"/>`,
  phone: `<rect x="-13" y="-21" width="26" height="42" rx="5" fill="#ff9d5c" ${O}/><rect x="-10" y="-16" width="20" height="30" rx="2" fill="#2e3446"/><circle cx="0" cy="17" r="2" fill="#3a2a2a"/><path d="M-6 -8 L6 4 M6 -8 L-6 4" stroke="#7fd3ff" stroke-width="1.6" opacity=".7"/>`,
  note: `<rect x="-16" y="-16" width="32" height="32" fill="#ffe873" ${O} transform="rotate(-6)"/><path d="M-9 -6 H8 M-9 1 H6 M-9 8 H3" stroke="#b39a2a" stroke-width="2" transform="rotate(-6)"/><path d="M6 6 q3 -4 6 0 q-3 4 -6 0" fill="#ff5d7a" transform="rotate(-6)"/>`,
  book: `<path d="M-20 -14 Q-10 -18 0 -12 Q10 -18 20 -14 V16 Q10 12 0 18 Q-10 12 -20 16 Z" fill="#fffdf4" ${O}/><path d="M0 -12 V18" stroke="#3a2a2a" stroke-width="2"/><path d="M-15 -6 H-5 M-15 0 H-5 M5 -6 H15 M5 0 H13" stroke="#9a8f86" stroke-width="1.8"/><path d="M-20 -14 V16" stroke="#5aa9e6" stroke-width="4"/>`,
  fuel: `<rect x="-14" y="-16" width="22" height="34" rx="3" fill="#e85d5d" ${O}/><rect x="-10" y="-11" width="14" height="10" rx="2" fill="#fff"/><path d="M8 -6 L16 -2 L16 12" fill="none" stroke="#3a2a2a" stroke-width="2.6" stroke-linecap="round"/><path d="M-6 6 q3 -6 6 0 q0 5 -3 5 q-3 0 -3 -5" fill="#ffd34d"/>`,
  camera: `<rect x="-20" y="-11" width="40" height="27" rx="5" fill="#3a3f4f" ${O}/><rect x="-10" y="-17" width="14" height="8" rx="2" fill="#3a3f4f" ${O}/><circle cx="0" cy="3" r="9" fill="#7fd3ff" ${O}/><circle cx="-3" cy="0" r="3" fill="#fff" opacity=".8"/><rect x="11" y="-7" width="6" height="4" rx="1" fill="#ffd34d"/>`,
  pen: `<g transform="rotate(-35)"><rect x="-4" y="-22" width="8" height="34" rx="3" fill="#2e3446" ${O}/><path d="M-4 12 L0 22 L4 12 Z" fill="#d9a441" ${O}/><rect x="-4" y="-14" width="8" height="3" fill="#d9a441"/><path d="M4 -20 V-6" stroke="#d9a441" stroke-width="2"/></g>`,
  shred: `<g ${O}><path d="M-16 -18 h6 v36 h-6z" fill="#fff" transform="rotate(-8)"/><path d="M-6 -18 h6 v34 h-6z" fill="#fff" transform="rotate(4)"/><path d="M4 -16 h6 v34 h-6z" fill="#fff" transform="rotate(-3)"/><path d="M13 -18 h6 v32 h-6z" fill="#fff" transform="rotate(9)"/></g><path d="M-14 -4 h28" stroke="#e0384f" stroke-width="1.6" stroke-dasharray="3 3"/>`,
  mahjong: `<rect x="-14" y="-19" width="28" height="38" rx="4" fill="#fffaf0" ${O}/><rect x="-14" y="10" width="28" height="9" rx="2" fill="#4fae7a"/><text x="0" y="5" text-anchor="middle" font-size="18" font-weight="700" fill="#d33d3d" font-family="serif">中</text>`,
  bento: `<rect x="-21" y="-12" width="42" height="26" rx="4" fill="#3a3f4f" ${O}/><rect x="-18" y="-9" width="20" height="20" rx="2" fill="#fffaf0"/><rect x="4" y="-9" width="14" height="9" rx="2" fill="#7fbf6a"/><rect x="4" y="2" width="14" height="9" rx="2" fill="#e8a24a"/><circle cx="-8" cy="1" r="3.5" fill="#e0384f"/><text x="14" y="-16" font-size="11" font-weight="700" fill="#3a2a2a">×2</text>`,
  flower: `<path d="M0 22 L-10 0 L10 0 Z" fill="#7fbf6a" ${O}/><g ${O}><circle cx="-7" cy="-6" r="7" fill="#ff6f91"/><circle cx="7" cy="-6" r="7" fill="#ffb84d"/><circle cx="0" cy="-14" r="7" fill="#c78bff"/></g><text x="8" y="22" font-size="10" font-weight="700" fill="#3a2a2a">×3</text>`,
  ring: `<ellipse cx="0" cy="6" rx="15" ry="13" fill="none" stroke="#d9a441" stroke-width="5"/><path d="M-7 -10 L0 -20 L7 -10 L0 -5 Z" fill="#bfe9ff" ${O}/>`,
  coffee: `<path d="M-13 -12 H11 L8 20 H-10 Z" fill="#fffaf0" ${O}/><rect x="-15" y="-18" width="28" height="7" rx="2" fill="#7a4a2f" ${O}/><rect x="-11" y="0" width="20" height="8" fill="#b87a4a"/><circle cx="-1" cy="4" r="2" fill="#fff"/>`,
  newspaper: `<rect x="-20" y="-16" width="40" height="32" rx="2" fill="#ece6d8" ${O}/><rect x="-16" y="-12" width="32" height="6" fill="#3a2a2a"/><rect x="-16" y="-2" width="14" height="14" fill="#b8b0a2"/><path d="M2 -1 H16 M2 4 H16 M2 9 H12" stroke="#7a7268" stroke-width="2"/>`,
  letter: `<rect x="-20" y="-13" width="40" height="27" rx="2" fill="#fffaf0" ${O}/><path d="M-20 -13 L0 3 L20 -13" fill="none" ${O}/><rect x="9" y="-10" width="8" height="9" fill="#e85d5d"/><circle cx="-10" cy="7" r="5" fill="none" stroke="#5aa9e6" stroke-width="1.6" stroke-dasharray="2 2"/>`,
  card: `<rect x="-20" y="-13" width="40" height="27" rx="3" fill="#e9f3e3" ${O}/><circle cx="-10" cy="-1" r="6" fill="#ffd9bd" ${O}/><path d="M0 -5 H15 M0 1 H12 M0 7 H14" stroke="#7a8f72" stroke-width="2"/><rect x="-20" y="-13" width="40" height="5" fill="#4fae7a"/>`,
  hair: `<path d="M-16 12 Q-6 -16 6 -4 Q12 2 18 -14" fill="none" stroke="#1d1d1d" stroke-width="2.6" stroke-linecap="round"/><path d="M-14 16 Q-2 -6 10 4" fill="none" stroke="#1d1d1d" stroke-width="2" stroke-linecap="round"/><circle cx="0" cy="0" r="22" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 4" opacity=".7"/>`,
  perfume: `<rect x="-12" y="-6" width="24" height="26" rx="6" fill="#bfe9ff" ${O}/><rect x="-5" y="-14" width="10" height="8" fill="#d9a441" ${O}/><rect x="-7" y="-20" width="14" height="6" rx="2" fill="#3a2a2a"/><path d="M14 -16 q4 -4 8 0 M16 -10 q4 -4 8 0" fill="none" stroke="#c78bff" stroke-width="2"/>`,
  seat: `<path d="M-14 18 L-10 -14 Q-8 -20 0 -20 L6 -20 Q12 -20 10 -12 L6 6 L16 8 L16 18 Z" fill="#6d4b3a" ${O}/><path d="M-22 0 L-28 0 M-22 0 l4 -4 M-22 0 l4 4" stroke="#e0384f" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  shoe: `<path d="M-20 8 L-18 -6 Q-10 -4 -4 -8 L4 -8 Q8 2 20 4 Q24 6 22 12 L-20 12 Z" fill="#6d4b3a" ${O}/><path d="M-20 12 H22" stroke="#3a2a2a" stroke-width="3"/><path d="M-4 -4 L2 0 M-6 0 L0 4" stroke="#fff" stroke-width="1.6"/>`,
  bottle: `<rect x="-11" y="-10" width="22" height="30" rx="5" fill="#fff" ${O}/><rect x="-8" y="-17" width="16" height="7" rx="2" fill="#3a3f4f" ${O}/><rect x="-11" y="0" width="22" height="10" fill="#e85d5d"/><text x="0" y="8" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">PRO</text>`,
  gift: `<rect x="-16" y="-6" width="32" height="24" fill="#8a6ad6" ${O}/><rect x="-18" y="-12" width="36" height="8" fill="#a98af0" ${O}/><path d="M0 -12 V18" stroke="#ffd34d" stroke-width="5"/><path d="M0 -12 q-10 -10 -12 -2 q4 4 12 2 q10 -10 12 -2 q-4 4 -12 2" fill="#ffd34d"/><circle cx="-8" cy="6" r="2.4" fill="#fff"/><circle cx="8" cy="8" r="2.4" fill="#fff"/>`,
  cake: `<rect x="-16" y="-2" width="32" height="20" rx="3" fill="#fff0f4" ${O}/><path d="M-16 4 q4 4 8 0 q4 4 8 0 q4 4 8 0 q4 4 8 0" fill="none" stroke="#ff6f91" stroke-width="3"/><rect x="-2" y="-14" width="4" height="12" fill="#5aa9e6"/><path d="M0 -20 q4 4 0 6 q-4 -2 0 -6" fill="#ffb84d"/>`,
  key: `<circle cx="-10" cy="-6" r="9" fill="none" stroke="#d9a441" stroke-width="5"/><path d="M-3 0 L16 18 M8 10 L13 6 M12 14 L17 10" stroke="#d9a441" stroke-width="5" stroke-linecap="round"/><rect x="2" y="-20" width="18" height="10" rx="3" fill="#e85d5d" ${O}/>`,
  drawing: `<rect x="-20" y="-16" width="40" height="32" fill="#fff" ${O}/><circle cx="-8" cy="-2" r="5" fill="none" stroke="#5aa9e6" stroke-width="2"/><circle cx="6" cy="-4" r="6" fill="none" stroke="#e85d5d" stroke-width="2"/><path d="M-8 3 V12 M6 2 V12 M-13 7 H-3 M0 7 H12" stroke="#7a7268" stroke-width="2"/><text x="10" y="-8" font-size="8" fill="#e85d5d">?</text>`,
  cctv: `<rect x="-16" y="-10" width="28" height="14" rx="4" fill="#fffaf0" ${O} transform="rotate(14)"/><circle cx="-8" cy="-6" r="3.4" fill="#3a2a2a" transform="rotate(14)"/><path d="M8 4 L14 16 H22" fill="none" stroke="#3a2a2a" stroke-width="3"/><circle cx="-14" cy="-14" r="2.4" fill="#e0384f"/>`,
  // 隱藏證物（萬用）
  witness: `<circle cx="0" cy="-6" r="9" fill="#ffd9bd" ${O}/><path d="M-14 18 Q-14 4 0 4 Q14 4 14 18 Z" fill="#7a8f72" ${O}/><path d="M8 -20 h14 v10 h-8 l-4 4 v-4 h-2 z" fill="#fff" ${O}/><path d="M12 -15 h6" stroke="#e85d5d" stroke-width="2"/>`,
  logbook: `<rect x="-16" y="-20" width="32" height="40" rx="3" fill="#8a5a3a" ${O}/><rect x="-11" y="-14" width="22" height="28" fill="#fffaf0"/><path d="M-7 -8 H7 M-7 -2 H7 M-7 4 H3" stroke="#9a8f86" stroke-width="2"/><path d="M-7 10 H7" stroke="#e0384f" stroke-width="2.4"/>`,
  // ── 雜物（點錯扣時間）──
  mug: `<rect x="-12" y="-12" width="22" height="26" rx="4" fill="#fff" ${O}/><path d="M10 -6 q10 0 10 7 q0 7 -10 7" fill="none" stroke="#3a2a2a" stroke-width="2.4"/><path d="M-6 -2 q5 -6 10 0" fill="none" stroke="#ff6f91" stroke-width="2.4"/>`,
  plant: `<path d="M-10 6 H10 L7 20 H-7 Z" fill="#d9773f" ${O}/><g fill="#5fb06a" ${O}><path d="M0 6 Q-18 -2 -10 -18 Q0 -8 0 6Z"/><path d="M0 6 Q18 -2 10 -18 Q0 -8 0 6Z"/><path d="M0 6 Q-2 -14 0 -22 Q4 -12 0 6Z"/></g>`,
  stapler: `<path d="M-20 10 H18 V16 H-20 Z" fill="#3a3f4f" ${O}/><path d="M-20 8 L-18 -2 L16 -6 Q20 -4 18 4 L-20 8Z" fill="#e85d5d" ${O}/>`,
  sock: `<path d="M-6 -20 H8 V6 Q8 18 -4 18 L-14 18 Q-20 18 -20 12 Q-20 6 -12 6 L-6 6 Z" fill="#7fd3ff" ${O}/><path d="M-6 -12 H8 M-6 -6 H8" stroke="#fff" stroke-width="3"/>`,
  cat: `<path d="M-16 18 Q-18 -2 0 -2 Q18 -2 16 18 Z" fill="#f2a65a" ${O}/><circle cx="0" cy="-8" r="11" fill="#f2a65a" ${O}/><path d="M-10 -14 L-8 -24 L-2 -17 M10 -14 L8 -24 L2 -17" fill="#f2a65a" ${O}/><path d="M-5 -9 v2 M5 -9 v2" stroke="#3a2a2a" stroke-width="2.4" stroke-linecap="round"/><path d="M-2 -4 q2 2 4 0" fill="none" stroke="#3a2a2a" stroke-width="1.6"/>`,
  umbrella: `<path d="M-20 -2 Q0 -26 20 -2 Q15 -6 10 -2 Q5 -6 0 -2 Q-5 -6 -10 -2 Q-15 -6 -20 -2Z" fill="#7a5cc9" ${O}/><path d="M0 -2 V16 q0 5 -5 5 q-4 0 -4 -4" fill="none" stroke="#3a2a2a" stroke-width="2.6"/>`,
  tissue: `<rect x="-18" y="-4" width="36" height="20" rx="3" fill="#bfe9ff" ${O}/><path d="M-6 -4 Q-4 -18 0 -14 Q4 -20 6 -4" fill="#fff" ${O}/><path d="M-12 8 h24" stroke="#fff" stroke-width="3"/>`,
  remote: `<rect x="-8" y="-20" width="16" height="40" rx="6" fill="#3a3f4f" ${O}/><circle cx="0" cy="-12" r="3" fill="#e0384f"/><g fill="#cfd9e6"><circle cx="-3" cy="-2" r="2"/><circle cx="3" cy="-2" r="2"/><circle cx="-3" cy="5" r="2"/><circle cx="3" cy="5" r="2"/><circle cx="-3" cy="12" r="2"/><circle cx="3" cy="12" r="2"/></g>`,
  duck: `<ellipse cx="0" cy="8" rx="16" ry="11" fill="#ffd34d" ${O}/><circle cx="-6" cy="-6" r="9" fill="#ffd34d" ${O}/><path d="M-16 -6 L-22 -3 L-15 -1 Z" fill="#ff9d3a" ${O}/><circle cx="-8" cy="-8" r="1.8" fill="#3a2a2a"/>`,
  glove: `<path d="M-12 18 L-14 -2 Q-16 -8 -11 -9 L-10 -18 Q-6 -22 -4 -18 L-3 -20 Q1 -24 3 -19 L4 -18 Q9 -20 10 -15 L10 -4 L14 -8 Q19 -6 16 0 L8 18 Z" fill="#7fbf6a" ${O}/>`,
  sunglasses: `<g fill="#2e3446" ${O}><rect x="-20" y="-6" width="16" height="12" rx="5"/><rect x="4" y="-6" width="16" height="12" rx="5"/></g><path d="M-4 -2 H4" stroke="#3a2a2a" stroke-width="2.4"/>`,
};

export const SCENE_DECOYS: Record<string, string[]> = {
  office: ['mug', 'plant', 'stapler', 'remote', 'duck'],
  car: ['sunglasses', 'tissue', 'umbrella', 'duck', 'glove'],
  motel: ['tissue', 'remote', 'sock', 'umbrella', 'duck'],
  cinema: ['mug', 'glove', 'sunglasses', 'tissue', 'umbrella'],
  park: ['glove', 'duck', 'umbrella', 'sunglasses', 'mug'],
  library: ['mug', 'plant', 'cat', 'glove', 'umbrella'],
  home: ['sock', 'cat', 'remote', 'mug', 'plant'],
};

/** 每個場景兩件隱藏證物（萬用：對質時任何一回合都能用一次） */
export const HIDDEN: Record<string, { name: string; icon: string }[]> = {
  office: [{ name: '監視器畫面', icon: 'cctv' }, { name: '保全的證詞', icon: 'witness' }],
  car: [{ name: '行車紀錄畫面', icon: 'cctv' }, { name: '停車場警衛證詞', icon: 'witness' }],
  motel: [{ name: '櫃台登記簿', icon: 'logbook' }, { name: '房務阿姨證詞', icon: 'witness' }],
  cinema: [{ name: '影廳監視器', icon: 'cctv' }, { name: '帶位員證詞', icon: 'witness' }],
  park: [{ name: '園區照相館照片', icon: 'cctv' }, { name: '遊客的證詞', icon: 'witness' }],
  library: [{ name: '館員的證詞', icon: 'witness' }, { name: '自習室登記簿', icon: 'logbook' }],
};

export function iconSvg(key: string, size = 48): string {
  return `<svg viewBox="-26 -26 52 52" width="${size}" height="${size}" aria-hidden="true"><g filter="url(#crayon-soft)">${ICONS[key] ?? ICONS.note}</g></svg>`;
}
