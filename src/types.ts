export type Route = 'f' | 'm';
export type SceneKey = 'office' | 'car' | 'motel' | 'cinema' | 'park' | 'library' | 'home';

/** 關鍵證物：每一件都能戳破對方的一句謊言 */
export interface Clue {
  name: string;
  icon: string;
  /** 對質時，這件證物要戳破的那句狡辯 */
  lie: string;
}

export interface Deduce {
  /** 每組第一個是正確答案，畫面上會自動洗牌 */
  time: [string, string, string];
  place: [string, string, string];
  who: [string, string, string];
}

export interface Level {
  id: number; // 1–20
  route: Route;
  chapter: 1 | 2 | 3 | 4;
  scene: SceneKey;
  title: string;
  brief: string;
  /** 對質對象（也是埋伏時會回頭的那個人） */
  target: string;
  /** 委託人（第二章起） */
  client?: string;
  clues: [Clue, Clue, Clue];
  deduce: Deduce;
  win: string;
  lose: string;
  /** 陷阱關：真相是誤會，正確選擇是撤退 */
  trap?: { sound: string };
  boss?: boolean;
  /** 章末劇情 */
  ending?: string;
  /** 新玩法提示 */
  tip?: string;
}

export type Expr = 'normal' | 'happy' | 'shocked' | 'smug' | 'angry' | 'cry' | 'worried';

export type Hair = 'short' | 'spiky' | 'long' | 'bob' | 'bun' | 'ponytail' | 'slick' | 'curly' | 'bald' | 'perm' | 'wavy' | 'messy';

export type Acc =
  | 'glasses' | 'sunglasses' | 'tie' | 'bow' | 'headband' | 'cap' | 'beanie'
  | 'earring' | 'hoops' | 'pearls' | 'chain' | 'beard' | 'stubble' | 'scarf'
  | 'headphones' | 'clip' | 'lips' | 'mole' | 'freckles' | 'bandage';

/** 服裝款式：tee 素T、polo、turtleneck 高領、hoodie 帽T、zip 運動外套、jacket 敞開外套、
 *  suit 西裝、blouse 襯衫、cardigan 開襟毛衣、tank 背心、vest 工作背心 */
export type Outfit = 'tee' | 'polo' | 'turtleneck' | 'hoodie' | 'zip' | 'jacket' | 'suit' | 'blouse' | 'cardigan' | 'tank' | 'vest';

export interface Look {
  skin: string;
  hair: Hair;
  hairColor: string;
  /** 最外層衣服的顏色 */
  top: string;
  /** 內搭顏色（外套、西裝、開襟毛衣才看得到） */
  inner?: string;
  outfit?: Outfit;
  /** 一個或多個配件 */
  acc?: Acc | Acc[];
  /** 帽子、髮帶、圍巾等配件的顏色 */
  accColor?: string;
  eye?: string;
  gender: 'f' | 'm';
}

export interface Character {
  name: string;
  look: Look;
}
