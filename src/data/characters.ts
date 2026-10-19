import type { Character } from '../types';

const SKIN = '#ffd9bd';
const SKIN2 = '#f3c3a0';
const SKIN3 = '#e0a982';

export const CHARS: Record<string, Character> = {
  // ── 主角 ──
  xiaojie: { name: '小婕', look: { skin: SKIN, hair: 'bob', hairColor: '#3b2a26', top: '#f08aa0', acc: 'earring', gender: 'f' } },
  dawei: { name: '大偉', look: { skin: SKIN2, hair: 'short', hairColor: '#24242e', top: '#5a9bd8', acc: 'glasses', gender: 'm' } },

  // ── 女生線 ──
  zhihao: { name: '志豪', look: { skin: SKIN2, hair: 'slick', hairColor: '#2a211d', top: '#3d4a6b', acc: 'tie', gender: 'm' } },
  vivian: { name: 'Vivian', look: { skin: SKIN, hair: 'long', hairColor: '#8a4b2e', top: '#c94f6d', acc: 'pearls', gender: 'f' } },
  afang: { name: '阿芳', look: { skin: SKIN, hair: 'bun', hairColor: '#5b3423', top: '#f2b544', acc: 'headband', gender: 'f' } },
  ajie: { name: '阿傑', look: { skin: SKIN2, hair: 'spiky', hairColor: '#2c2c34', top: '#7bbf6a', gender: 'm' } },
  xiaolin: { name: '小琳', look: { skin: SKIN, hair: 'ponytail', hairColor: '#43302a', top: '#9b8ad6', gender: 'f' } },
  linhus: { name: '小琳老公', look: { skin: SKIN3, hair: 'short', hairColor: '#1f1d22', top: '#6d7a85', acc: 'tie', gender: 'm' } },
  dongniang: { name: '董娘', look: { skin: SKIN, hair: 'perm', hairColor: '#3a2622', top: '#8e3b5c', acc: 'pearls', gender: 'f' } },
  chairman: { name: '董事長', look: { skin: SKIN2, hair: 'bald', hairColor: '#8b8b8b', top: '#2e3446', acc: 'tie', gender: 'm' } },
  wangtai: { name: '王太太', look: { skin: SKIN, hair: 'curly', hairColor: '#3b2a26', top: '#e48b5c', gender: 'f' } },
  uncle: { name: '王先生', look: { skin: SKIN3, hair: 'short', hairColor: '#55504c', top: '#c9a35b', acc: 'beard', gender: 'm' } },
  student: { name: '師母', look: { skin: SKIN, hair: 'long', hairColor: '#2b2420', top: '#6aa7a0', acc: 'glasses', gender: 'f' } },
  prof: { name: '教授', look: { skin: SKIN2, hair: 'curly', hairColor: '#7d7a77', top: '#8a6a4f', acc: 'glasses', gender: 'm' } },
  rich: { name: '富二代', look: { skin: SKIN, hair: 'slick', hairColor: '#d9a441', top: '#1e1e24', acc: 'sunglasses', gender: 'm' } },
  rosa: { name: '委託人 Rosa', look: { skin: SKIN, hair: 'ponytail', hairColor: '#b0582f', top: '#5fb6c9', gender: 'f' } },
  meiling: { name: '美玲', look: { skin: SKIN2, hair: 'bob', hairColor: '#2a1f1b', top: '#e5a4c4', gender: 'f' } },
  dad2: { name: '美玲的老公', look: { skin: SKIN2, hair: 'short', hairColor: '#2b2523', top: '#86a35e', acc: 'cap', gender: 'm' } },
  bride: { name: '準新娘', look: { skin: SKIN, hair: 'bun', hairColor: '#4a2f24', top: '#f6f0e6', acc: 'bow', gender: 'f' } },
  groom: { name: '未婚夫', look: { skin: SKIN2, hair: 'spiky', hairColor: '#3a2a24', top: '#2f3a52', acc: 'tie', gender: 'm' } },
  husband17: { name: '那對夫妻', look: { skin: SKIN2, hair: 'short', hairColor: '#2e2a28', top: '#b65f45', gender: 'm' } },
  wife17: { name: '陳太太', look: { skin: SKIN, hair: 'perm', hairColor: '#4b2c22', top: '#6ca0d4', gender: 'f' } },
  huang: { name: '黃太太', look: { skin: SKIN, hair: 'long', hairColor: '#1e1a1a', top: '#d4a35b', gender: 'f' } },
  huanghus: { name: '黃先生', look: { skin: SKIN3, hair: 'slick', hairColor: '#2a2a2a', top: '#4c6e5a', acc: 'glasses', gender: 'm' } },
  sender: { name: '匿名寄件人', look: { skin: SKIN3, hair: 'short', hairColor: '#333', top: '#444a55', acc: 'cap', gender: 'm' } },
  caijie: { name: '蔡姐', look: { skin: SKIN2, hair: 'perm', hairColor: '#7b2f3a', top: '#5b3f78', acc: 'sunglasses', gender: 'f' } },

  // ── 男生線 ──
  yaqi: { name: '雅琪', look: { skin: SKIN, hair: 'ponytail', hairColor: '#4a2a1f', top: '#7fd0c0', acc: 'headband', gender: 'f' } },
  kevin: { name: 'Kevin', look: { skin: SKIN3, hair: 'spiky', hairColor: '#1d1d1d', top: '#e2593f', gender: 'm' } },
  akai: { name: '阿凱', look: { skin: SKIN3, hair: 'short', hairColor: '#2a2a2a', top: '#f2c14e', acc: 'cap', gender: 'm' } },
  xiaomei: { name: '小美', look: { skin: SKIN, hair: 'long', hairColor: '#6b3a26', top: '#f39ab5', acc: 'bow', gender: 'f' } },
  azhe: { name: '阿哲', look: { skin: SKIN2, hair: 'short', hairColor: '#352a24', top: '#7e9bb8', gender: 'm' } },
  azhewife: { name: '阿哲的老婆', look: { skin: SKIN, hair: 'bob', hairColor: '#2c2420', top: '#b45d6f', acc: 'earring', gender: 'f' } },
  cousin: { name: '表弟阿翔', look: { skin: SKIN, hair: 'spiky', hairColor: '#4b3326', top: '#86c5e8', gender: 'm' } },
  cousingf: { name: '阿翔的女友', look: { skin: SKIN, hair: 'ponytail', hairColor: '#2e211c', top: '#f4d35e', gender: 'f' } },
  courier: { name: '外送員阿豐', look: { skin: SKIN3, hair: 'short', hairColor: '#1e1e1e', top: '#3fb07a', acc: 'cap', gender: 'm' } },
  courierwife: { name: '阿豐的老婆', look: { skin: SKIN, hair: 'curly', hairColor: '#4a2b20', top: '#d97a9a', gender: 'f' } },
  lindad: { name: '林先生', look: { skin: SKIN2, hair: 'short', hairColor: '#2d2722', top: '#9a7cc4', acc: 'glasses', gender: 'm' } },
  linmom: { name: '林太太', look: { skin: SKIN, hair: 'bob', hairColor: '#5b3a2a', top: '#ef9f6b', gender: 'f' } },
  zhang: { name: '張先生', look: { skin: SKIN2, hair: 'slick', hairColor: '#2b2b2b', top: '#4e6fa8', gender: 'm' } },
  zhangwife: { name: '張太太', look: { skin: SKIN, hair: 'long', hairColor: '#3a2824', top: '#a7c76e', acc: 'earring', gender: 'f' } },
  he: { name: '何先生', look: { skin: SKIN3, hair: 'curly', hairColor: '#2a221f', top: '#c47a4a', acc: 'glasses', gender: 'm' } },
  hewife: { name: '何太太', look: { skin: SKIN, hair: 'bun', hairColor: '#3d2a22', top: '#7aa6c9', acc: 'glasses', gender: 'f' } },
  agent: { name: '經紀人 Joy', look: { skin: SKIN, hair: 'bob', hairColor: '#1b1b1b', top: '#2b2b33', acc: 'sunglasses', gender: 'f' } },
  actorbf: { name: '女星的男友', look: { skin: SKIN2, hair: 'perm', hairColor: '#3a2a20', top: '#d6d0c4', gender: 'm' } },
  fiance: { name: '準新郎', look: { skin: SKIN2, hair: 'short', hairColor: '#2f241f', top: '#2f3a52', acc: 'tie', gender: 'm' } },
  fiancee: { name: '準新娘', look: { skin: SKIN, hair: 'long', hairColor: '#a35e3a', top: '#f6f0e6', acc: 'earring', gender: 'f' } },
  xu: { name: '許先生', look: { skin: SKIN3, hair: 'spiky', hairColor: '#2a2a2a', top: '#6c8f6a', gender: 'm' } },
  xuwife: { name: '許太太', look: { skin: SKIN, hair: 'perm', hairColor: '#4a2f28', top: '#c7a2d8', gender: 'f' } },
};

export function ch(key: string): Character {
  const c = CHARS[key];
  if (!c) throw new Error(`未知角色：${key}`);
  return c;
}
