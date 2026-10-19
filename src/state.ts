import type { Route } from './types';

export const MAX_HEARTS = 5;
export const HEART_REGEN_MS = 30 * 60 * 1000;

export type ItemKey = 'magnifier' | 'time' | 'hotline' | 'hat' | 'dashcam';

export const ITEMS: Record<ItemKey, { name: string; price: number; desc: string; stage: string }> = {
  magnifier: { name: '放大鏡', price: 100, desc: '搜證時標出一件證物的位置', stage: '搜證' },
  time: { name: '多 30 秒', price: 80, desc: '延長搜證時間 30 秒', stage: '搜證' },
  hotline: { name: '熱線求救', price: 120, desc: '推理時自動填對一格', stage: '推理' },
  hat: { name: '變裝帽', price: 150, desc: '潛行被看到時，免失敗一次', stage: '埋伏' },
  dashcam: { name: '行車紀錄器', price: 200, desc: '對質時直接戳破一回合謊言', stage: '對質' },
};

export interface Save {
  route: Route | null;
  seenIntro: Record<Route, boolean>;
  /** 每條路線每關的最高星數，0 = 未通過 */
  stars: Record<Route, Record<number, number>>;
  coins: number;
  hearts: number;
  heartTs: number;
  items: Record<ItemKey, number>;
  muted: boolean;
}

const KEY = 'zhuahou-save-v1';

function fresh(): Save {
  return {
    route: null,
    seenIntro: { f: false, m: false },
    stars: { f: {}, m: {} },
    coins: 1000,
    hearts: MAX_HEARTS,
    heartTs: Date.now(),
    items: { magnifier: 1, time: 1, hotline: 1, hat: 1, dashcam: 0 },
    muted: false,
  };
}

function load(): Save {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    return { ...fresh(), ...JSON.parse(raw) } as Save;
  } catch {
    return fresh();
  }
}

export const save: Save = load();

export function persist(): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch {
    /* 隱私模式等情況下存不了，遊戲照玩 */
  }
}

export function resetSave(): void {
  Object.assign(save, fresh());
  persist();
}

/** 依經過時間回復愛心，回傳距離下一顆的毫秒數（滿了回傳 0） */
export function tickHearts(): number {
  const now = Date.now();
  if (save.hearts >= MAX_HEARTS) {
    save.heartTs = now;
    return 0;
  }
  const gained = Math.floor((now - save.heartTs) / HEART_REGEN_MS);
  if (gained > 0) {
    save.hearts = Math.min(MAX_HEARTS, save.hearts + gained);
    save.heartTs += gained * HEART_REGEN_MS;
    if (save.hearts >= MAX_HEARTS) save.heartTs = now;
    persist();
  }
  return save.hearts >= MAX_HEARTS ? 0 : HEART_REGEN_MS - (now - save.heartTs);
}

export function useHeart(): boolean {
  tickHearts();
  if (save.hearts <= 0) return false;
  if (save.hearts === MAX_HEARTS) save.heartTs = Date.now();
  save.hearts -= 1;
  persist();
  return true;
}

export function starsOf(route: Route, id: number): number {
  return save.stars[route][id] ?? 0;
}

export function isUnlocked(route: Route, id: number): boolean {
  return id === 1 || starsOf(route, id - 1) > 0;
}

/** 目前可挑戰的最新關卡 */
export function currentLevel(route: Route): number {
  for (let i = 1; i <= 20; i++) if (starsOf(route, i) === 0) return i;
  return 20;
}

export function useItem(k: ItemKey): boolean {
  if (save.items[k] <= 0) return false;
  save.items[k] -= 1;
  persist();
  return true;
}
