import { portrait } from '../art/chibi';
import { sceneSvg } from '../art/scenes';
import { ch } from '../data/characters';
import type { Expr, SceneKey } from '../types';
import { sfx } from '../ui';

export interface Line {
  /** 角色 key；省略代表旁白 */
  who?: string;
  text: string;
  expr?: Expr;
  /** 這句話時跳出手機訊息 */
  phone?: { from: string; msg: string };
  /** 內心話 */
  inner?: boolean;
}

/** 對話劇情播放器：點擊推進，回傳播放完畢的 Promise */
export function playStory(parent: HTMLElement, scene: SceneKey, hero: string, lines: Line[]): Promise<void> {
  return new Promise((resolve) => {
    const el = document.createElement('div');
    el.className = 'story';
    el.innerHTML = `${sceneSvg(scene)}<div class="shade"></div>
      <div class="story-actor l" data-l></div><div class="story-actor r" data-r></div>
      <div data-phone></div>
      <button class="btn plain small story-skip" data-skip>略過 ▶▶</button>
      <div class="story-box" data-box><span class="name" data-name></span><p data-text></p><span class="next">點一下繼續 ▼</span></div>`;
    parent.appendChild(el);
    const L = el.querySelector('[data-l]') as HTMLElement;
    const R = el.querySelector('[data-r]') as HTMLElement;
    const phone = el.querySelector('[data-phone]') as HTMLElement;
    const nameEl = el.querySelector('[data-name]') as HTMLElement;
    const textEl = el.querySelector('[data-text]') as HTMLElement;
    let i = -1;
    let typing: number | undefined;
    let full = '';
    let rightKey = '';

    const finish = () => {
      clearInterval(typing);
      el.remove();
      resolve();
    };

    const show = () => {
      i++;
      if (i >= lines.length) return finish();
      const ln = lines[i];
      const speaking = ln.who;
      if (speaking && speaking !== hero) rightKey = speaking;
      L.innerHTML = portrait(hero, { size: 150, expr: speaking === hero ? ln.expr ?? 'normal' : 'normal' });
      R.innerHTML = rightKey ? portrait(rightKey, { size: 150, expr: speaking === rightKey ? ln.expr ?? 'normal' : 'normal' }) : '';
      L.classList.toggle('dim', speaking !== hero);
      R.classList.toggle('dim', speaking !== rightKey || !speaking);
      if (speaking) {
        nameEl.textContent = ln.inner ? `${ch(speaking).name}（內心）` : ch(speaking).name;
        nameEl.className = 'name';
      } else {
        nameEl.textContent = '旁白';
        nameEl.className = 'name narr';
      }
      phone.innerHTML = ln.phone ? `<div class="phone-pop"><p class="from">📱 ${ln.phone.from}</p><div class="msg">${ln.phone.msg}</div></div>` : '';
      if (ln.phone) sfx('alert');
      full = ln.text;
      textEl.textContent = '';
      let k = 0;
      clearInterval(typing);
      typing = window.setInterval(() => {
        k++;
        textEl.textContent = full.slice(0, k);
        if (k >= full.length) {
          clearInterval(typing);
          typing = undefined;
        }
      }, 32);
    };

    el.querySelector('[data-box]')!.addEventListener('click', () => {
      sfx('tap');
      if (typing !== undefined) {
        clearInterval(typing);
        typing = undefined;
        textEl.textContent = full;
      } else show();
    });
    el.querySelector('[data-skip]')!.addEventListener('click', (e) => {
      e.stopPropagation();
      finish();
    });
    show();
  });
}

export const INTRO: Record<'f' | 'm', Line[]> = {
  f: [
    { text: '深夜 11:48，客廳只剩電視的光。' },
    { who: 'xiaojie', inner: true, expr: 'worried', text: '結婚三週年……他說今晚要陪客戶。' },
    { text: '志豪的手機在沙發上震了一下，螢幕亮了起來。', phone: { from: '中和信託', msg: '今晚老地方見 ♥' } },
    { who: 'xiaojie', expr: 'shocked', text: '……銀行會傳愛心？' },
    { text: '浴室傳來志豪哼歌的聲音。小婕的手指，停在手機上方。' },
    { text: '有些事，不查不會死；查了，會比較痛快。' },
    { who: 'afang', expr: 'angry', text: '什麼？「中和信託」傳愛心？姊妹，這絕對有鬼！明天開始，我陪妳查！' },
    { who: 'xiaojie', expr: 'angry', text: '好。這一次，我要親眼看到真相。' },
  ],
  m: [
    { text: '週三晚上 9:30，大偉一個人吃著微波便當。' },
    { who: 'dawei', inner: true, expr: 'worried', text: '瑜伽進修課……怎麼每週都上到半夜？' },
    { text: '洗衣籃裡，雅琪的瑜伽褲上，黏著一根短短的、不屬於她的頭髮。' },
    { who: 'dawei', expr: 'shocked', text: '這是……男生的髮蠟味。' },
    { text: '工程師最擅長的事，就是 debug。' },
    { who: 'akai', expr: 'angry', text: '兄弟，這種事我載客載多了。明天開始，我開車陪你查！' },
    { who: 'dawei', expr: 'angry', text: '好。找出 bug，然後修好它。' },
  ],
};
