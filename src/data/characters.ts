import type { Character } from '../types';

// 膚色
const S1 = '#f6d6bd';
const S2 = '#ecc19c';
const S3 = '#d9a67e';
const S4 = '#b98060';

// 大地色系（參考插畫設定稿）
const MUSTARD = '#d9a23c';
const OLIVE = '#4b5a3e';
const CHAR = '#34333a';
const CREAM = '#efe3cf';
const RUST = '#b5583a';
const NAVY = '#2f3a52';
const ROSE = '#d9938a';
const TEAL = '#5f8a8b';
const PLUM = '#6b4a6e';
const SAND = '#c9b28a';
const SAGE = '#8fa58a';
const WINE = '#7a2e3e';
const DENIM = '#4f6a8a';
const BROWN = '#7a5a40';

export const CHARS: Record<string, Character> = {
  // ── 主角 ──
  // 小婕：波浪中長髮＋芥末色髮夾＋玫瑰色開襟毛衣＋大圈耳環
  xiaojie: { name: '小婕', look: { skin: S1, hair: 'wavy', hairColor: '#3b2a26', top: ROSE, inner: CREAM, outfit: 'cardigan', acc: ['clip', 'hoops'], accColor: MUSTARD, gender: 'f' } },
  // 大偉：亂翹短髮＋圓框眼鏡＋橄欖綠帽T＋掛脖耳機（工程師）
  dawei: { name: '大偉', look: { skin: S2, hair: 'messy', hairColor: '#24242e', top: OLIVE, outfit: 'hoodie', acc: ['glasses', 'headphones'], gender: 'm' } },

  // ── 女生線 ──
  // 志豪：油頭＋深藍西裝＋酒紅領帶＋金項鍊＋嘴邊痣（渣男感）
  zhihao: { name: '志豪', look: { skin: S2, hair: 'slick', hairColor: '#2a211d', top: NAVY, outfit: 'suit', acc: ['tie', 'mole'], accColor: WINE, gender: 'm' } },
  // Vivian：紅棕長髮＋酒紅襯衫＋珍珠項鍊＋紅唇
  vivian: { name: 'Vivian', look: { skin: S1, hair: 'long', hairColor: '#8a4b2e', top: WINE, inner: CREAM, outfit: 'blouse', acc: ['pearls', 'lips'], gender: 'f' } },
  // 阿芳：包包頭＋芥末黃上衣＋大圈耳環＋紅唇（嘴砲閨蜜）
  afang: { name: '阿芳', look: { skin: S1, hair: 'bun', hairColor: '#5b3423', top: MUSTARD, inner: CREAM, outfit: 'blouse', acc: ['hoops', 'lips'], gender: 'f' } },
  ajie: { name: '阿傑', look: { skin: S2, hair: 'spiky', hairColor: '#2c2c34', top: SAGE, outfit: 'hoodie', gender: 'm' } },
  xiaolin: { name: '小琳', look: { skin: S1, hair: 'ponytail', hairColor: '#43302a', top: '#8a7fa6', inner: CREAM, outfit: 'cardigan', acc: 'clip', accColor: TEAL, gender: 'f' } },
  linhus: { name: '小琳老公', look: { skin: S3, hair: 'short', hairColor: '#1f1d22', top: '#6d6f75', outfit: 'suit', acc: ['tie', 'stubble'], accColor: MUSTARD, gender: 'm' } },
  dongniang: { name: '董娘', look: { skin: S1, hair: 'perm', hairColor: '#3a2622', top: WINE, inner: CREAM, outfit: 'blouse', acc: ['pearls', 'lips', 'earring'], gender: 'f' } },
  chairman: { name: '董事長', look: { skin: S2, hair: 'bald', hairColor: '#8b8b8b', top: CHAR, outfit: 'suit', acc: ['tie', 'beard', 'glasses'], accColor: '#a8423a', gender: 'm' } },
  wangtai: { name: '王太太', look: { skin: S1, hair: 'curly', hairColor: '#3b2a26', top: RUST, inner: CREAM, outfit: 'cardigan', acc: 'glasses', gender: 'f' } },
  uncle: { name: '王先生', look: { skin: S3, hair: 'short', hairColor: '#55504c', top: MUSTARD, outfit: 'polo', acc: 'beard', gender: 'm' } },
  student: { name: '師母', look: { skin: S1, hair: 'long', hairColor: '#2b2420', top: TEAL, outfit: 'turtleneck', acc: 'glasses', gender: 'f' } },
  prof: { name: '教授', look: { skin: S2, hair: 'curly', hairColor: '#7d7a77', top: BROWN, inner: CREAM, outfit: 'jacket', acc: ['glasses', 'stubble'], gender: 'm' } },
  rich: { name: '富二代', look: { skin: S1, hair: 'slick', hairColor: '#d9a441', top: CHAR, inner: '#f4efe6', outfit: 'jacket', acc: ['sunglasses', 'chain'], gender: 'm' } },
  rosa: { name: '委託人 Rosa', look: { skin: S1, hair: 'wavy', hairColor: '#b0582f', top: TEAL, inner: CREAM, outfit: 'blouse', acc: ['earring', 'freckles'], gender: 'f' } },
  meiling: { name: '美玲', look: { skin: S2, hair: 'bob', hairColor: '#2a1f1b', top: ROSE, inner: CREAM, outfit: 'cardigan', gender: 'f' } },
  dad2: { name: '美玲的老公', look: { skin: S2, hair: 'short', hairColor: '#2b2523', top: OLIVE, outfit: 'polo', acc: 'cap', accColor: RUST, gender: 'm' } },
  bride: { name: '準新娘', look: { skin: S1, hair: 'bun', hairColor: '#4a2f24', top: '#f4efe6', inner: '#f4efe6', outfit: 'blouse', acc: ['pearls', 'bow'], accColor: ROSE, gender: 'f' } },
  groom: { name: '未婚夫', look: { skin: S2, hair: 'spiky', hairColor: '#3a2a24', top: NAVY, outfit: 'suit', acc: 'tie', accColor: SAGE, gender: 'm' } },
  huang: { name: '黃太太', look: { skin: S1, hair: 'long', hairColor: '#1e1a1a', top: MUSTARD, inner: CREAM, outfit: 'blouse', acc: ['earring', 'lips'], gender: 'f' } },
  huanghus: { name: '黃先生', look: { skin: S3, hair: 'slick', hairColor: '#2a2a2a', top: OLIVE, inner: CREAM, outfit: 'jacket', acc: 'glasses', gender: 'm' } },
  sender: { name: '匿名寄件人', look: { skin: S3, hair: 'short', hairColor: '#333333', top: CHAR, outfit: 'hoodie', acc: ['cap', 'stubble'], accColor: CHAR, gender: 'm' } },
  // 蔡姐：酒紅大捲髮＋墨鏡＋紫色圍巾＋珍珠＋紅唇（抓猴事務所老闆娘）
  caijie: { name: '蔡姐', look: { skin: S2, hair: 'perm', hairColor: '#7b2f3a', top: CHAR, outfit: 'turtleneck', acc: ['sunglasses', 'scarf', 'lips'], accColor: PLUM, gender: 'f' } },

  // ── 男生線 ──
  // 雅琪：高馬尾＋運動髮帶＋青綠運動外套＋雀斑（瑜伽老師）
  yaqi: { name: '雅琪', look: { skin: S1, hair: 'ponytail', hairColor: '#4a2a1f', top: TEAL, outfit: 'zip', acc: ['headband', 'freckles'], accColor: ROSE, gender: 'f' } },
  // Kevin：刺蝟頭＋鏽紅背心露肩膀＋金項鍊＋OK繃（健身教練）
  kevin: { name: 'Kevin', look: { skin: S3, hair: 'spiky', hairColor: '#1d1d1d', top: RUST, outfit: 'tank', acc: ['chain', 'bandage'], gender: 'm' } },
  // 阿凱：橄欖綠鴨舌帽＋芥末黃工作背心＋鬍渣（前計程車司機）
  akai: { name: '阿凱', look: { skin: S4, hair: 'short', hairColor: '#2a2a2a', top: MUSTARD, inner: CHAR, outfit: 'vest', acc: ['cap', 'stubble'], accColor: OLIVE, gender: 'm' } },
  xiaomei: { name: '小美', look: { skin: S1, hair: 'long', hairColor: '#6b3a26', top: '#e5a4b4', inner: CREAM, outfit: 'blouse', acc: 'bow', accColor: WINE, gender: 'f' } },
  azhe: { name: '阿哲', look: { skin: S2, hair: 'short', hairColor: '#352a24', top: DENIM, outfit: 'polo', gender: 'm' } },
  azhewife: { name: '阿哲的老婆', look: { skin: S1, hair: 'bob', hairColor: '#2c2420', top: PLUM, inner: CREAM, outfit: 'suit', acc: ['earring', 'lips'], gender: 'f' } },
  cousin: { name: '表弟阿翔', look: { skin: S1, hair: 'messy', hairColor: '#4b3326', top: '#86b5c8', outfit: 'tee', acc: 'freckles', gender: 'm' } },
  cousingf: { name: '阿翔的女友', look: { skin: S1, hair: 'ponytail', hairColor: '#2e211c', top: MUSTARD, outfit: 'zip', acc: 'earring', gender: 'f' } },
  courier: { name: '外送員阿豐', look: { skin: S4, hair: 'short', hairColor: '#1e1e1e', top: '#3f8a5a', inner: CHAR, outfit: 'vest', acc: 'cap', accColor: '#3f8a5a', gender: 'm' } },
  courierwife: { name: '阿豐的老婆', look: { skin: S1, hair: 'curly', hairColor: '#4a2b20', top: ROSE, inner: CREAM, outfit: 'cardigan', acc: 'earring', gender: 'f' } },
  lindad: { name: '林先生', look: { skin: S2, hair: 'short', hairColor: '#2d2722', top: NAVY, outfit: 'turtleneck', acc: 'glasses', gender: 'm' } },
  linmom: { name: '林太太', look: { skin: S1, hair: 'bob', hairColor: '#5b3a2a', top: '#d98a5a', inner: CREAM, outfit: 'blouse', acc: 'clip', accColor: TEAL, gender: 'f' } },
  zhang: { name: '張先生', look: { skin: S2, hair: 'slick', hairColor: '#2b2b2b', top: DENIM, outfit: 'suit', acc: 'tie', accColor: MUSTARD, gender: 'm' } },
  zhangwife: { name: '張太太', look: { skin: S1, hair: 'long', hairColor: '#3a2824', top: SAGE, inner: CREAM, outfit: 'blouse', acc: 'earring', gender: 'f' } },
  he: { name: '何先生', look: { skin: S3, hair: 'curly', hairColor: '#2a221f', top: BROWN, inner: CREAM, outfit: 'cardigan', acc: 'glasses', gender: 'm' } },
  hewife: { name: '何太太', look: { skin: S1, hair: 'bun', hairColor: '#3d2a22', top: DENIM, outfit: 'turtleneck', acc: 'glasses', gender: 'f' } },
  agent: { name: '經紀人 Joy', look: { skin: S1, hair: 'bob', hairColor: '#1b1b1b', top: CHAR, inner: CREAM, outfit: 'suit', acc: ['sunglasses', 'lips'], gender: 'f' } },
  actorbf: { name: '女星的男友', look: { skin: S2, hair: 'wavy', hairColor: '#3a2a20', top: SAND, inner: CHAR, outfit: 'jacket', acc: 'chain', gender: 'm' } },
  fiance: { name: '準新郎', look: { skin: S2, hair: 'short', hairColor: '#2f241f', top: NAVY, outfit: 'suit', acc: 'tie', accColor: ROSE, gender: 'm' } },
  fiancee: { name: '準新娘', look: { skin: S1, hair: 'wavy', hairColor: '#a35e3a', top: CREAM, inner: '#f4efe6', outfit: 'blouse', acc: ['earring', 'lips'], gender: 'f' } },
  xu: { name: '許先生', look: { skin: S3, hair: 'spiky', hairColor: '#2a2a2a', top: OLIVE, inner: CREAM, outfit: 'jacket', acc: 'stubble', gender: 'm' } },
  xuwife: { name: '許太太', look: { skin: S1, hair: 'perm', hairColor: '#4a2f28', top: PLUM, inner: CREAM, outfit: 'cardigan', acc: 'pearls', gender: 'f' } },
  husband17: { name: '陳先生', look: { skin: S2, hair: 'short', hairColor: '#2e2a28', top: RUST, outfit: 'polo', acc: 'glasses', gender: 'm' } },
  wife17: { name: '陳太太', look: { skin: S1, hair: 'perm', hairColor: '#4b2c22', top: DENIM, inner: CREAM, outfit: 'blouse', acc: 'hoops', gender: 'f' } },
};

export function ch(key: string): Character {
  const c = CHARS[key];
  if (!c) throw new Error(`未知角色：${key}`);
  return c;
}
