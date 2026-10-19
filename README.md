# 抓猴大作戰（可玩雛形）

搜證解謎闖關手遊。玩家扮演被劈腿的一方，每關走完「搜證 → 推理 → 埋伏 → 對質」四個階段，抓到現行就過關。
劇情對應 Notion「遊戲腳本」頁面：女生線、男生線各 20 關，六大場景輪替。

## 快速開始（VS Code）

需要 Node.js 18 以上。

```bash
npm install
npm run dev
```

終端機會顯示兩個網址：

- `Local: http://localhost:5173/`：電腦瀏覽器開這個，按 F12 切成手機尺寸（例如 iPhone 14）。
- `Network: http://192.168.x.x:5173/`：手機和電腦連同一個 Wi-Fi，用手機瀏覽器開這個就能直接玩。

其他指令：

| 指令 | 用途 |
| --- | --- |
| `npm run build` | 型別檢查並輸出到 `dist/` |
| `npm run preview` | 預覽 build 後的版本 |

## 已完成的內容

- 標題畫面、選角（女生線／男生線，進度分開存）
- 開場劇情動畫（打字機對話、手機訊息彈出）
- 關卡地圖：仿附圖的蜿蜒小路，四章四種街景配色，星等、鎖頭、目前位置頭像
- 金幣、愛心（上限 5 顆，每 30 分鐘回 1 顆）、道具店、設定
- 四階段玩法：
    1. 搜證：90 秒內點出 3 件關鍵證物，另有 2 件隱藏證物；點到雜物扣 5 秒
    2. 推理：時間／地點／對象三選一；地點錯會撲空，其他錯扣證據值 15%
    3. 埋伏：一二三木頭人式潛行；汽車關卡改成跟車（保持距離在綠區）
    4. 對質：對方說三句謊，出示正確證物戳破；隱藏證物可當萬用證據
- 陷阱關（女 12、男 13）：真相是誤會，選擇撤退才算過關
- 結算：星等、金幣、章末劇情、失敗時的反咬台詞與導師鼓勵
- 5 種道具：放大鏡、多 30 秒、熱線求救、變裝帽、行車紀錄器
- 音效用 WebAudio 即時產生，不需要音檔
- 所有角色、場景、證物都是程式畫的 SVG，不需要圖檔

## 專案結構

```
src/
  main.ts              進入點
  styles.css           全部樣式（顏色變數在最上面的 :root）
  state.ts             存檔、愛心、道具（存在瀏覽器 localStorage）
  ui.ts                畫面切換、彈窗、HUD、音效、共用圖示
  types.ts             型別定義
  data/
    levels.ts          40 關劇情資料 ← 改劇本主要改這裡
    characters.ts      角色外型（髮型、髮色、衣服、配件）
  art/
    chibi.ts           Q 版角色產生器（7 種表情、背面）
    scenes.ts          7 個場景插畫與證物擺放位置
    icons.ts           證物、雜物、隱藏證物圖示
    mascot.ts          吉祥物小猴與標題 Logo
  screens/
    title.ts           標題
    select.ts          選角
    story.ts           劇情對話播放器＋開場劇本
    map.ts             地圖、關卡說明、道具店、設定
    play.ts            一關的流程控制
    phases/
      search.ts        階段 1 搜證
      deduce.ts        階段 2 推理
      ambush.ts        階段 3 埋伏／跟車／陷阱門
      confront.ts      階段 4 對質
      result.ts        結算
```

## 怎麼改關卡

打開 `src/data/levels.ts`，每一關長這樣：

```ts
{
  id: 1, route: 'f', chapter: 1, scene: 'office', title: '加班的真相', target: 'zhihao',
  brief: '關卡說明……',
  clues: [
    { name: '口紅印襯衫', icon: 'lipstick', lie: '對質時第 1 句謊言' },
    { name: '兩人份便當發票', icon: 'bento', lie: '第 2 句謊言' },
    { name: '18:02 門禁紀錄', icon: 'keycard', lie: '第 3 句謊言' },
  ],
  deduce: {
    time: ['正確答案', '錯誤選項', '錯誤選項'],   // 第一個永遠是正確答案，畫面上會洗牌
    place: [...],
    who: [...],
  },
  win: '勝利文字', lose: '失敗文字',
  trap: { sound: '……' },   // 有這行就是陷阱關
  ending: '章末劇情',       // 只有魔王關需要
}
```

- `scene` 可用：`office` `car` `motel` `cinema` `park` `library`
- `icon` 可用的名稱都在 `src/art/icons.ts` 的 `ICONS`
- 新角色加在 `src/data/characters.ts`，再用 key 指定給 `target` 或 `client`

## 包成 iOS／Android APP（之後再做）

這是網頁專案，用 Capacitor 可以直接包成 APP：

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init 抓猴大作戰 com.yourname.zhuahou --web-dir dist
npm run build
npx cap add android   # 需要 Android Studio
npx cap add ios       # 需要 Mac + Xcode
npx cap sync
npx cap open android
```

`vite.config.ts` 已經設定 `base: './'`，build 出來的檔案可以直接給 Capacitor 用。

## 目前的限制

- 存檔只在本機瀏覽器（localStorage），換裝置不會同步；之後要上架可以接 Firebase 或自己的後端。
- 金幣購買、愛心補充都是遊戲內金幣，還沒接真實金流。
- 字型「Huninn（粉圓體）」從 Google Fonts 載入；沒網路時會退回系統字型。要完全離線，可下載字型放進 `public/` 再改 `index.html`。
- 所有品牌、旅館、銀行名稱都是虛構的（中和信託、薇光汽旅、大哥電信）。
