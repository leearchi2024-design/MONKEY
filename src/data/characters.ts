import type { Character } from '../types';

// 膚色
const S1 = '#e3ccba';
const S2 = '#d8baa0';
const S3 = '#cca281';
const S4 = '#af8167';

// 大地色系（參考插畫設定稿）
const MUSTARD = '#b9975a';
const OLIVE = '#525b49';
const CHAR = '#3e3d42';
const CREAM = '#e1d7c7';
const RUST = '#9e6553';
const NAVY = '#3c4454';
const ROSE = '#c59892';
const TEAL = '#698384';
const PLUM = '#6a556c';
const SAND = '#b8aa90';
const SAGE = '#8f9d8c';
const WINE = '#71414b';
const DENIM = '#5d6d81';
const BROWN = '#735f4f';

export const CHARS: Record<string, Character> = {
  // ── 主角 ──
  // 小婕：波浪中長髮＋芥末色髮夾＋玫瑰色開襟毛衣＋大圈耳環
  xiaojie: { name: '小婕', look: { skin: S1, hair: 'wavy', hairColor: '#423532', top: ROSE, inner: CREAM, outfit: 'cardigan', acc: ['clip', 'hoops'], accColor: MUSTARD, gender: 'f' } },
  // 大偉：亂翹短髮＋圓框眼鏡＋橄欖綠帽T＋掛脖耳機（工程師）
  dawei: { name: '大偉', look: { skin: S2, hair: 'messy', hairColor: '#303037', top: OLIVE, outfit: 'hoodie', acc: ['glasses', 'headphones'], gender: 'm' } },

  // ── 女生線 ──
  // 志豪：油頭＋深藍西裝＋酒紅領帶＋金項鍊＋嘴邊痣（渣男感）
  zhihao: { name: '志豪', look: { skin: S2, hair: 'slick', hairColor: '#342d29', top: NAVY, outfit: 'suit', acc: ['tie', 'mole'], accColor: WINE, gender: 'm' } },
  // Vivian：紅棕長髮＋酒紅襯衫＋珍珠項鍊＋紅唇
  vivian: { name: 'Vivian', look: { skin: S1, hair: 'long', hairColor: '#7d5643', top: WINE, inner: CREAM, outfit: 'blouse', acc: ['pearls', 'lips'], gender: 'f' } },
  // 阿芳：包包頭＋芥末黃上衣＋大圈耳環＋紅唇（嘴砲閨蜜）
  afang: { name: '阿芳', look: { skin: S1, hair: 'bun', hairColor: '#5a3f34', top: MUSTARD, inner: CREAM, outfit: 'blouse', acc: ['hoops', 'lips'], gender: 'f' } },
  ajie: { name: '阿傑', look: { skin: S2, hair: 'spiky', hairColor: '#37373c', top: SAGE, outfit: 'hoodie', gender: 'm' } },
  xiaolin: { name: '小琳', look: { skin: S1, hair: 'ponytail', hairColor: '#483b37', top: '#8b849c', inner: CREAM, outfit: 'cardigan', acc: 'clip', accColor: TEAL, gender: 'f' } },
  linhus: { name: '小琳老公', look: { skin: S3, hair: 'short', hairColor: '#2b292d', top: '#707275', outfit: 'suit', acc: ['tie', 'stubble'], accColor: MUSTARD, gender: 'm' } },
  dongniang: { name: '董娘', look: { skin: S1, hair: 'perm', hairColor: '#41322f', top: WINE, inner: CREAM, outfit: 'blouse', acc: ['pearls', 'lips', 'earring'], gender: 'f' } },
  chairman: { name: '董事長', look: { skin: S2, hair: 'bald', hairColor: '#8a8a8a', top: CHAR, outfit: 'suit', acc: ['tie', 'beard', 'glasses'], accColor: '#945651', gender: 'm' } },
  wangtai: { name: '王太太', look: { skin: S1, hair: 'curly', hairColor: '#423532', top: RUST, inner: CREAM, outfit: 'cardigan', acc: 'glasses', gender: 'f' } },
  uncle: { name: '王先生', look: { skin: S3, hair: 'short', hairColor: '#595653', top: MUSTARD, outfit: 'polo', acc: 'beard', gender: 'm' } },
  student: { name: '師母', look: { skin: S1, hair: 'long', hairColor: '#352f2c', top: TEAL, outfit: 'turtleneck', acc: 'glasses', gender: 'f' } },
  prof: { name: '教授', look: { skin: S2, hair: 'curly', hairColor: '#7c7b79', top: BROWN, inner: CREAM, outfit: 'jacket', acc: ['glasses', 'stubble'], gender: 'm' } },
  rich: { name: '富二代', look: { skin: S1, hair: 'slick', hairColor: '#ba995d', top: CHAR, inner: '#e7e2d9', outfit: 'jacket', acc: ['sunglasses', 'chain'], gender: 'm' } },
  rosa: { name: '委託人 Rosa', look: { skin: S1, hair: 'wavy', hairColor: '#99634a', top: TEAL, inner: CREAM, outfit: 'blouse', acc: ['earring', 'freckles'], gender: 'f' } },
  meiling: { name: '美玲', look: { skin: S2, hair: 'bob', hairColor: '#342b28', top: ROSE, inner: CREAM, outfit: 'cardigan', gender: 'f' } },
  dad2: { name: '美玲的老公', look: { skin: S2, hair: 'short', hairColor: '#35302f', top: OLIVE, outfit: 'polo', acc: 'cap', accColor: RUST, gender: 'm' } },
  bride: { name: '準新娘', look: { skin: S1, hair: 'bun', hairColor: '#4d3a32', top: '#e7e2d9', inner: '#e7e2d9', outfit: 'blouse', acc: ['pearls', 'bow'], accColor: ROSE, gender: 'f' } },
  groom: { name: '未婚夫', look: { skin: S2, hair: 'spiky', hairColor: '#413531', top: NAVY, outfit: 'suit', acc: 'tie', accColor: SAGE, gender: 'm' } },
  huang: { name: '黃太太', look: { skin: S1, hair: 'long', hairColor: '#2a2626', top: MUSTARD, inner: CREAM, outfit: 'blouse', acc: ['earring', 'lips'], gender: 'f' } },
  huanghus: { name: '黃先生', look: { skin: S3, hair: 'slick', hairColor: '#343434', top: OLIVE, inner: CREAM, outfit: 'jacket', acc: 'glasses', gender: 'm' } },
  sender: { name: '匿名寄件人', look: { skin: S3, hair: 'short', hairColor: '#3c3c3c', top: CHAR, outfit: 'hoodie', acc: ['cap', 'stubble'], accColor: CHAR, gender: 'm' } },
  // 蔡姐：酒紅大捲髮＋墨鏡＋紫色圍巾＋珍珠＋紅唇（抓猴事務所老闆娘）
  caijie: { name: '蔡姐', look: { skin: S2, hair: 'perm', hairColor: '#724249', top: CHAR, outfit: 'turtleneck', acc: ['sunglasses', 'scarf', 'lips'], accColor: PLUM, gender: 'f' } },

  // ── 男生線 ──
  // 雅琪：高馬尾＋運動髮帶＋青綠運動外套＋雀斑（瑜伽老師）
  yaqi: { name: '雅琪', look: { skin: S1, hair: 'ponytail', hairColor: '#4d362e', top: TEAL, outfit: 'zip', acc: ['headband', 'freckles'], accColor: ROSE, gender: 'f' } },
  // Kevin：刺蝟頭＋鏽紅背心露肩膀＋金項鍊＋OK繃（健身教練）
  kevin: { name: 'Kevin', look: { skin: S3, hair: 'spiky', hairColor: '#292929', top: RUST, outfit: 'tank', acc: ['chain', 'bandage'], gender: 'm' } },
  // 阿凱：橄欖綠鴨舌帽＋芥末黃工作背心＋鬍渣（前計程車司機）
  akai: { name: '阿凱', look: { skin: S4, hair: 'short', hairColor: '#343434', top: MUSTARD, inner: CHAR, outfit: 'vest', acc: ['cap', 'stubble'], accColor: OLIVE, gender: 'm' } },
  xiaomei: { name: '小美', look: { skin: S1, hair: 'long', hairColor: '#664639', top: '#d2a6b1', inner: CREAM, outfit: 'blouse', acc: 'bow', accColor: WINE, gender: 'f' } },
  azhe: { name: '阿哲', look: { skin: S2, hair: 'short', hairColor: '#3d3530', top: DENIM, outfit: 'polo', gender: 'm' } },
  azhewife: { name: '阿哲的老婆', look: { skin: S1, hair: 'bob', hairColor: '#352f2c', top: PLUM, inner: CREAM, outfit: 'suit', acc: ['earring', 'lips'], gender: 'f' } },
  cousin: { name: '表弟阿翔', look: { skin: S1, hair: 'messy', hairColor: '#4e3d34', top: '#8dabb7', outfit: 'tee', acc: 'freckles', gender: 'm' } },
  cousingf: { name: '阿翔的女友', look: { skin: S1, hair: 'ponytail', hairColor: '#372d29', top: MUSTARD, outfit: 'zip', acc: 'earring', gender: 'f' } },
  courier: { name: '外送員阿豐', look: { skin: S4, hair: 'short', hairColor: '#2a2a2a', top: '#517f61', inner: CHAR, outfit: 'vest', acc: 'cap', accColor: '#517f61', gender: 'm' } },
  courierwife: { name: '阿豐的老婆', look: { skin: S1, hair: 'curly', hairColor: '#4d372f', top: ROSE, inner: CREAM, outfit: 'cardigan', acc: 'earring', gender: 'f' } },
  lindad: { name: '林先生', look: { skin: S2, hair: 'short', hairColor: '#36322e', top: NAVY, outfit: 'turtleneck', acc: 'glasses', gender: 'm' } },
  linmom: { name: '林太太', look: { skin: S1, hair: 'bob', hairColor: '#5a443a', top: '#be8d6f', inner: CREAM, outfit: 'blouse', acc: 'clip', accColor: TEAL, gender: 'f' } },
  zhang: { name: '張先生', look: { skin: S2, hair: 'slick', hairColor: '#353535', top: DENIM, outfit: 'suit', acc: 'tie', accColor: MUSTARD, gender: 'm' } },
  zhangwife: { name: '張太太', look: { skin: S1, hair: 'long', hairColor: '#413431', top: SAGE, inner: CREAM, outfit: 'blouse', acc: 'earring', gender: 'f' } },
  he: { name: '何先生', look: { skin: S3, hair: 'curly', hairColor: '#342d2b', top: BROWN, inner: CREAM, outfit: 'cardigan', acc: 'glasses', gender: 'm' } },
  hewife: { name: '何太太', look: { skin: S1, hair: 'bun', hairColor: '#43352f', top: DENIM, outfit: 'turtleneck', acc: 'glasses', gender: 'f' } },
  agent: { name: '經紀人 Joy', look: { skin: S1, hair: 'bob', hairColor: '#272727', top: CHAR, inner: CREAM, outfit: 'suit', acc: ['sunglasses', 'lips'], gender: 'f' } },
  actorbf: { name: '女星的男友', look: { skin: S2, hair: 'wavy', hairColor: '#40352d', top: SAND, inner: CHAR, outfit: 'jacket', acc: 'chain', gender: 'm' } },
  fiance: { name: '準新郎', look: { skin: S2, hair: 'short', hairColor: '#382f2c', top: NAVY, outfit: 'suit', acc: 'tie', accColor: ROSE, gender: 'm' } },
  fiancee: { name: '準新娘', look: { skin: S1, hair: 'wavy', hairColor: '#916650', top: CREAM, inner: '#e7e2d9', outfit: 'blouse', acc: ['earring', 'lips'], gender: 'f' } },
  xu: { name: '許先生', look: { skin: S3, hair: 'spiky', hairColor: '#343434', top: OLIVE, inner: CREAM, outfit: 'jacket', acc: 'stubble', gender: 'm' } },
  xuwife: { name: '許太太', look: { skin: S1, hair: 'perm', hairColor: '#4d3b36', top: PLUM, inner: CREAM, outfit: 'cardigan', acc: 'pearls', gender: 'f' } },
  husband17: { name: '陳先生', look: { skin: S2, hair: 'short', hairColor: '#373433', top: RUST, outfit: 'polo', acc: 'glasses', gender: 'm' } },
  wife17: { name: '陳太太', look: { skin: S1, hair: 'perm', hairColor: '#4e3831', top: DENIM, inner: CREAM, outfit: 'blouse', acc: 'hoops', gender: 'f' } },
};

export function ch(key: string): Character {
  const c = CHARS[key];
  if (!c) throw new Error(`未知角色：${key}`);
  return c;
}
