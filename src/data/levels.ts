import type { Level, Route } from '../types';

/**
 * 40 關資料（女生線 20 關、男生線 20 關），內容對應 Notion「遊戲腳本」。
 * deduce 每組第一個是正確答案；clues[i].lie 是對質第 i 回合的狡辯。
 */

const F: Level[] = [
  // ───────── 第一章 枕邊人 ─────────
  {
    id: 1, route: 'f', chapter: 1, scene: 'office', title: '加班的真相', target: 'zhihao',
    brief: '志豪連續三晚說要加班。小婕帶著宵夜，決定突襲他的公司。',
    tip: '新手教學：點擊畫面找出 3 件關鍵證物，點錯會扣 5 秒。',
    clues: [
      { name: '口紅印襯衫', icon: 'lipstick', lie: '口紅？擠捷運被蹭到的啦。' },
      { name: '兩人份便當發票', icon: 'bento', lie: '便當是我一個人吃的，加班很餓。' },
      { name: '18:02 門禁紀錄', icon: 'keycard', lie: '我整晚都在座位上，哪都沒去。' },
    ],
    deduce: {
      time: ['18:02 刷卡離開', '22:00 還在座位', '整晚都在公司'],
      place: ['公司 B1 停車場', '頂樓會議室', '樓下便利商店'],
      who: ['穿高跟鞋的女同事', '客戶王總', '部門主管'],
    },
    win: '保全說他 6 點就走了。小婕拍下空蕩蕩的座位和門禁紀錄，證據到手。',
    lose: '小婕撞見志豪的主管。志豪回家後反咬：「妳讓我在公司很丟臉！」',
  },
  {
    id: 2, route: 'f', chapter: 1, scene: 'car', title: '副駕駛座的祕密', target: 'zhihao',
    brief: '副駕座椅被調到最前面，小婕身高 168 根本坐不下。',
    tip: '跟車玩法：按住油門保持距離在綠色區域，太近會被發現、太遠會跟丟。',
    clues: [
      { name: '珍珠髮夾', icon: 'hairclip', lie: '髮夾？是妳自己掉的吧。' },
      { name: '被拔掉的記憶卡', icon: 'sdcard', lie: '行車紀錄器壞了，我拿去修。' },
      { name: '停車場收據', icon: 'receipt', lie: '我那天根本沒開車出去。' },
    ],
    deduce: {
      time: ['下班 18:30', '午休 12:00', '早上 8:00'],
      place: ['公司地下停車場', '加油站', '洗車場'],
      who: ['業務助理 Vivian', '順路的男同事', '客戶'],
    },
    win: '小婕在停車場拍到志豪載 Vivian 下班，Vivian 下車前還親了他一下。',
    lose: '志豪發現小婕在跟車：「同事順路妳也吃醋？」',
  },
  {
    id: 3, route: 'f', chapter: 1, scene: 'cinema', title: '兩張票根', target: 'zhihao',
    brief: '志豪說在應酬，西裝口袋卻有兩張晚場電影票。',
    clues: [
      { name: '兩張票根', icon: 'ticket', lie: '我整晚都在陪客戶應酬。' },
      { name: '情侶爆米花發票', icon: 'popcorn', lie: '爆米花是我一個人吃的。' },
      { name: '日曆「V 看電影」', icon: 'calendar', lie: 'V 是 Victor，男客戶啦。' },
    ],
    deduce: {
      time: ['22:10 晚場', '19:00 晚餐', '14:00 午場'],
      place: ['第 7 廳', '第 2 廳', 'KTV 包廂'],
      who: ['Vivian', '客戶 Victor', '他媽媽'],
    },
    win: '散場燈一亮，志豪和 Vivian 正在共用一桶爆米花。',
    lose: '黑暗中小婕認錯人，被陌生情侶罵了一頓，志豪趁亂溜走。',
  },
  {
    id: 4, route: 'f', chapter: 1, scene: 'park', title: '生日驚喜不是給妳的', target: 'zhihao',
    brief: '信用卡帳單出現摩天輪 VIP 雙人票，可是小婕的生日還沒到。',
    tip: '遊樂園關卡：穿上吉祥物人偶裝，對方回頭時要停下來。',
    clues: [
      { name: '摩天輪雙人票帳單', icon: 'creditcard', lie: '那是公司抽獎送的票。' },
      { name: '生日氣球訂單', icon: 'balloon', lie: '氣球是幫同事慶生的。' },
      { name: '置頂「中和信託」', icon: 'chat', lie: '中和信託是銀行，找我辦貸款。' },
    ],
    deduce: {
      time: ['週六晚上 7 點', '週日早上', '週五下班'],
      place: ['摩天輪出口', '旋轉木馬', '園區餐廳'],
      who: ['Vivian', '銀行專員', '同事們'],
    },
    win: '人偶裝潛行成功，小婕在摩天輪出口拍到兩人牽手走出來。',
    lose: '人偶頭掉了，志豪當場認出小婕。',
  },
  {
    id: 5, route: 'f', chapter: 1, scene: 'motel', title: '中和信託的邀約', target: 'zhihao', boss: true,
    brief: '「中和信託」傳來訊息：「今晚 8 點 薇光汽旅 302」。這次，一定要抓到現行。',
    clues: [
      { name: '「302」訊息截圖', icon: 'chat', lie: '那是詐騙簡訊，我根本沒點開。' },
      { name: '旅館門卡', icon: 'keycard', lie: '門卡是客戶招待時拿到的。' },
      { name: '藥局發票', icon: 'receipt', lie: '我只是去買感冒藥。' },
    ],
    deduce: {
      time: ['今晚 8 點', '明早 8 點', '下週五'],
      place: ['薇光汽旅 302', '薇光汽旅 203', '公司會議室'],
      who: ['Vivian', '中和信託行員', '客戶'],
    },
    win: '櫃台、走廊、302，一路潛行成功。房門打開的那一刻，志豪和 Vivian 跪地求饒。',
    lose: '小婕衝錯房間，志豪趁亂離開。',
    ending: '小婕簽好離婚協議，走出事務所時，一位戴墨鏡的阿姨遞來名片：「妳很有天份。我是抓猴事務所的蔡姐。」',
  },

  // ───────── 第二章 好姊妹 ─────────
  {
    id: 6, route: 'f', chapter: 2, scene: 'library', title: '考公職的男友', target: 'ajie', client: 'afang',
    brief: '阿芳的男友阿傑說每晚都去圖書館 K 書，準備考公職。',
    tip: '圖書館關卡：自習室很安靜，被看到就會被請出去。',
    clues: [
      { name: '借閱紀錄', icon: 'book', lie: '我借的都是考試用書。' },
      { name: '22:30 停車證', icon: 'ticket', lie: '圖書館一閉館我就回家了。' },
      { name: '學妹的便利貼', icon: 'note', lie: '我一個人讀書，沒跟誰。' },
    ],
    deduce: {
      time: ['21:00 閉館後', '中午', '早上 9 點'],
      place: ['自習室書架後', '交誼廳', '圖書館門口'],
      who: ['讀書會學妹', '考試的同學', '館員'],
    },
    win: '書架後面，阿傑和學妹正在「交換筆記」。阿芳拍下了全部。',
    lose: '小婕被館員請出去，阿傑反咬阿芳：「妳連我讀書都不信？」',
  },
  {
    id: 7, route: 'f', chapter: 2, scene: 'car', title: '跟車大作戰', target: 'ajie', client: 'afang',
    brief: '阿傑週末又說要回老家，可是阿芳打電話給他媽媽，他根本沒回去。',
    clues: [
      { name: '陌生地址外送單', icon: 'receipt', lie: '我週末都在老家。' },
      { name: '第二支手機充電線', icon: 'phone', lie: '我只有一支手機。' },
      { name: '山上的加油發票', icon: 'fuel', lie: '我沒開車上山。' },
    ],
    deduce: {
      time: ['週六深夜', '週六中午', '週日早上'],
      place: ['山頂觀景台', '老家門口', '市區夜市'],
      who: ['陌生女子', '他爸媽', '高中同學'],
    },
    win: '一路跟到山頂觀景台，小婕敲了敲起霧的車窗。',
    lose: '跟太近被發現，阿傑掉頭甩車。',
  },
  {
    id: 8, route: 'f', chapter: 2, scene: 'cinema', title: '一個男人兩場電影', target: 'ajie', client: 'afang',
    brief: '阿傑同時劈兩個女生，同一晚約在兩個影廳。',
    clues: [
      { name: '兩個場次的票根', icon: 'ticket', lie: '我只看了一場電影。' },
      { name: '兩組情侶套餐', icon: 'popcorn', lie: '另一份是幫朋友買的。' },
      { name: '兩個置頂帳號', icon: 'chat', lie: '她只是我表妹。' },
    ],
    deduce: {
      time: ['19:00 與 21:30', '只有 20:00', '午夜場'],
      place: ['第 3 廳與第 5 廳', '只在第 3 廳', 'IMAX 廳'],
      who: ['兩個不同女生', '表妹', '阿芳'],
    },
    win: '小婕在兩廳之間奔跑，讓兩個女生在走廊撞見彼此。',
    lose: '時間算錯，只抓到其中一個，阿傑說：「她只是表妹。」',
  },
  {
    id: 9, route: 'f', chapter: 2, scene: 'office', title: '尾牙之後', target: 'linhus', client: 'xiaolin',
    brief: '阿芳的同事小琳，懷疑老公和他的主管在尾牙後越走越近。',
    clues: [
      { name: '尾牙合照', icon: 'camera', lie: '我跟主管不熟。' },
      { name: '會議室週五預約', icon: 'calendar', lie: '週五晚上我在家陪小孩。' },
      { name: '群組收回的訊息', icon: 'chat', lie: '我沒在群組說什麼啊。' },
    ],
    deduce: {
      time: ['週五 20:00', '週一早會', '午休'],
      place: ['12F 會議室', '茶水間', '主管辦公室'],
      who: ['女主管', '實習生', '清潔阿姨'],
    },
    win: '從百葉窗的縫隙，小婕拍到了會議室裡的兩人。',
    lose: '被保全攔下，主管反告小婕擅闖公司。',
  },
  {
    id: 10, route: 'f', chapter: 2, scene: 'park', title: '情人節大螢幕', target: 'ajie', client: 'afang', boss: true,
    brief: '阿傑要在遊樂園的情人節活動，向新歡公開告白。用的還是跟阿芳借的錢。',
    clues: [
      { name: '活動報名表', icon: 'note', lie: '情人節我要加班。' },
      { name: '告白布條訂單', icon: 'receipt', lie: '布條是公司活動用的。' },
      { name: '借錢轉帳紀錄', icon: 'creditcard', lie: '我借的錢都拿去繳補習費了。' },
    ],
    deduce: {
      time: ['情人節 20:00', '情人節中午', '前一天晚上'],
      place: ['園區大螢幕廣場', '摩天輪', '園區門口'],
      who: ['新歡學妹', '阿芳', '他媽媽'],
    },
    win: '小婕搶下控制台，大螢幕改播劈腿證據。全場鼓掌，阿芳終於笑了。',
    lose: '小婕被工作人員架走，阿傑的告白成功了。',
    ending: '人群散去後，蔡姐從人群中走出來：「兩次了。要不要來我的抓猴事務所上班？」',
  },

  // ───────── 第三章 抓猴事務所 ─────────
  {
    id: 11, route: 'f', chapter: 3, scene: 'office', title: '董娘的委託', target: 'chairman', client: 'dongniang',
    brief: '董事長每週四晚上都開「機密會議」，董娘覺得不對勁。',
    clues: [
      { name: '同款鋼筆', icon: 'pen', lie: '這支筆是贈品，人手一支。' },
      { name: '碎紙機殘片', icon: 'shred', lie: '週四的會議都是公事。' },
      { name: '秘書行事曆暗號', icon: 'calendar', lie: '我跟秘書只談工作。' },
    ],
    deduce: {
      time: ['每週四 19:00', '每週一早上', '月底'],
      place: ['頂樓會議室', '董事長辦公室', '股東會議室'],
      who: ['秘書', '股東們', '財務長'],
    },
    win: '拼出紙條上的「週四 機密＝頂樓」，小婕在頂樓會議室抓個正著。',
    lose: '拼錯紙條，小婕衝進了真正的股東會。',
  },
  {
    id: 12, route: 'f', chapter: 3, scene: 'motel', title: '三個人一間房', target: 'uncle', client: 'wangtai',
    brief: '王太太說，老公和兩個人一起走進了汽車旅館。三個人？',
    tip: '陷阱關：證據不一定指向劈腿。真相是誤會時，撤退才是正確答案。',
    trap: { sound: '門後傳來洗牌聲：「碰！」「自摸！」「王董你又放槍！」' },
    clues: [
      { name: '一枚麻將牌', icon: 'mahjong', lie: '我根本沒去旅館。' },
      { name: '四人份便當', icon: 'bento', lie: '我一個人吃的。' },
      { name: '群組「週二牌咖」', icon: 'chat', lie: '那群組早就沒在用了。' },
    ],
    deduce: {
      time: ['週二晚上', '週六晚上', '週二中午'],
      place: ['薇光汽旅 208', '薇光汽旅 302', 'KTV'],
      who: ['三個牌友', '一個女人', '他同事'],
    },
    win: '小婕把真相告訴王太太：老公只是偷打麻將。王太太鬆了口氣，順便沒收了他的麻將。',
    lose: '小婕破門而入，四個大叔抱著牌愣住。王先生告小婕妨害名譽。',
  },
  {
    id: 13, route: 'f', chapter: 3, scene: 'library', title: '致謝詞裡的名字', target: 'prof', client: 'student',
    brief: '師母發現，教授指導的研究生論文致謝詞，好像藏著什麼。',
    clues: [
      { name: '地下書庫預約單', icon: 'note', lie: '我去書庫是查資料。' },
      { name: '致謝詞藏頭詩', icon: 'book', lie: '致謝詞是學生自己寫的。' },
      { name: '同一天請假', icon: 'calendar', lie: '那天我在開研討會。' },
    ],
    deduce: {
      time: ['週三 15:00', '週三早上', '週五晚上'],
      place: ['B2 密集書架區', '研究室', '學生餐廳'],
      who: ['研究生', '系主任', '助教'],
    },
    win: '小婕轉動密集書架的把手，夾出了躲在書架間的兩個人。',
    lose: '小婕推錯書架，自己被夾住了。',
  },
  {
    id: 14, route: 'f', chapter: 3, scene: 'cinema', title: '包場富二代', target: 'rich', client: 'rosa',
    brief: '富二代包下整間影廳，同一晚約了三個女生，分三個時段。Rosa 是其中之一。',
    tip: '時間軸推理：注意三個時段的先後順序。',
    clues: [
      { name: '包場合約', icon: 'note', lie: '我只是辦影評會。' },
      { name: '三份花束訂單', icon: 'flower', lie: '花是送給我媽和兩個阿姨。' },
      { name: '三個置頂帳號', icon: 'chat', lie: '我只有一個女朋友。' },
    ],
    deduce: {
      time: ['19:00／21:00／23:00', '只有 21:00', '午夜一次'],
      place: ['VIP 包場廳', '一般廳', '頂樓餐廳'],
      who: ['三個不同女生', '他媽媽', '影評人'],
    },
    win: '小婕排好時間軸，讓三個女生同時走進影廳。富二代的爆米花掉了一地。',
    lose: '時間軸錯了一格，富二代說：「我只是在辦影評會。」',
  },
  {
    id: 15, route: 'f', chapter: 3, scene: 'park', title: '親子日的另一個家', target: 'dad2', client: 'meiling', boss: true,
    brief: '美玲發現，老公週末說加班，卻帶著另一個孩子去遊樂園。',
    clues: [
      { name: '兒童門票', icon: 'ticket', lie: '我週末都在公司加班。' },
      { name: '另一個家的全家福', icon: 'camera', lie: '照片上是我表哥一家。' },
      { name: '兩支手機通話紀錄', icon: 'phone', lie: '我只有一支手機。' },
    ],
    deduce: {
      time: ['週日下午', '週六早上', '平日晚上'],
      place: ['旋轉木馬前', '摩天輪', '兒童餐廳'],
      who: ['另一個女人和孩子', '表哥一家', '同事'],
    },
    win: '在旋轉木馬前，真相終於攤開。美玲拿到了完整的證據。',
    lose: '小孩被嚇哭了，美玲心軟撤案。',
    ending: '蔡姐把事務所的備用鑰匙交給小婕：「接下來的案子，一件比一件難。我相信妳。」',
  },

  // ───────── 第四章 最後的真相 ─────────
  {
    id: 16, route: 'f', chapter: 4, scene: 'car', title: '婚禮前夜', target: 'groom', client: 'bride',
    brief: '準新娘委託：未婚夫婚前一晚說要開單身派對，可是伴郎們都說沒有這回事。',
    clues: [
      { name: '只有他的派對群組', icon: 'chat', lie: '今晚是單身派對，兄弟們都在。' },
      { name: '租車合約', icon: 'note', lie: '車是幫伴郎租的。' },
      { name: '空的婚戒盒', icon: 'ring', lie: '婚戒放在伴郎那裡保管。' },
    ],
    deduce: {
      time: ['婚禮前一晚 23:00', '婚禮當天早上', '一週前'],
      place: ['前女友家樓下', 'KTV 包廂', '婚宴會館'],
      who: ['前女友', '伴郎們', '他媽媽'],
    },
    win: '跟車到前女友家樓下，婚戒正戴在前女友手上。',
    lose: '跟丟了，隔天婚禮照常舉行。',
  },
  {
    id: 17, route: 'f', chapter: 4, scene: 'motel', title: '雙重劈腿', target: 'huanghus', client: 'huang',
    brief: '黃太太和黃先生分別來事務所委託，要查的人竟然是彼此。',
    clues: [
      { name: '201 號房門卡', icon: 'keycard', lie: '我今天在出差，不在台北。' },
      { name: '202 號房門卡', icon: 'keycard', lie: '我太太今天在公司加班。' },
      { name: '同一天的請假單', icon: 'calendar', lie: '我們兩個誰都沒有請假。' },
    ],
    deduce: {
      time: ['今天下午 3 點', '今晚 10 點', '明天中午'],
      place: ['201 與 202 同時', '只有 201', '只有 202'],
      who: ['夫妻各自的情人', '只有老公的情人', '只有老婆的情人'],
    },
    win: '201 和 202 同時開門。黃先生和黃太太在走廊撞個正著，四個人一起愣住。',
    lose: '只開了一間房，另一個人反過來指責委託人。',
  },
  {
    id: 18, route: 'f', chapter: 4, scene: 'library', title: '借書證上的假名', target: 'xu', client: 'xuwife',
    brief: '許太太發現，老公用假名辦了借書證，每週都出現在同一座圖書館。',
    clues: [
      { name: '假名借書證', icon: 'card', lie: '那張借書證不是我的。' },
      { name: '咖啡店集點卡', icon: 'coffee', lie: '我從來不去那間圖書館。' },
      { name: '密碼筆記', icon: 'note', lie: '那只是數獨筆記。' },
    ],
    deduce: {
      time: ['每週四 19:00', '每週一早上', '週末中午'],
      place: ['B3 古籍室', '讀書會教室', '館外咖啡店'],
      who: ['一位女讀者', '讀書會成員', '館員'],
    },
    win: '破解密碼「B3 古籍室 19:00」，小婕在古籍室裡抓到現行。',
    lose: '解錯密碼，小婕誤闖了讀書會。',
  },
  {
    id: 19, route: 'f', chapter: 4, scene: 'office', title: '蔡姐的過去', target: 'sender', client: 'caijie',
    brief: '有人寄來匿名照片，指控蔡姐當年也介入別人的婚姻。事務所的招牌岌岌可危。',
    clues: [
      { name: '舊報紙', icon: 'newspaper', lie: '照片是當年報紙登的，假不了。' },
      { name: '匿名信郵戳', icon: 'letter', lie: '信是從國外寄來的。' },
      { name: '照片角落的名牌', icon: 'camera', lie: '我跟蔡姐素不相識。' },
    ],
    deduce: {
      time: ['三天前寄出', '三十年前', '昨天'],
      place: ['本市的郵局', '國外', '事務所樓下'],
      who: ['被蔡姐抓過的男人', '蔡姐的前夫', '競爭對手'],
    },
    win: '寄件人是當年被蔡姐抓到劈腿的男人。照片是合成的，蔡姐清白了。',
    lose: '小婕誤信了照片，事務所被迫關門一天。',
  },
  {
    id: 20, route: 'f', chapter: 4, scene: 'park', title: '摩天輪頂端', target: 'zhihao', client: 'vivian', boss: true,
    brief: '最後的委託人走進事務所，摘下墨鏡。是 Vivian。「志豪……又劈腿了。」',
    clues: [
      { name: '「中和信託 2 號」', icon: 'chat', lie: '我早就跟以前的人斷乾淨了。' },
      { name: '摩天輪預約', icon: 'ticket', lie: '今晚我在公司加班。' },
      { name: '新的婚戒', icon: 'ring', lie: '這戒指是我自己戴好看的。' },
    ],
    deduce: {
      time: ['今晚 20:00', '明天早上', '上週末'],
      place: ['摩天輪 7 號車廂', '雲霄飛車', '園區餐廳'],
      who: ['新的女人', 'Vivian', '客戶'],
    },
    win: '小婕和 Vivian 聯手。摩天輪轉到頂端時「剛好」停電，志豪被困在半空中，兩個前任在地面等他下來。',
    lose: '志豪混進人群逃走了，Vivian 和小婕不歡而散。',
    ending: '摩天輪重新轉動。Vivian 對小婕說了聲對不起。小婕笑了笑，把新名片遞給她：「抓猴事務所，王牌偵探。」——全劇終',
  },
];

const M: Level[] = [
  // ───────── 第一章 枕邊人 ─────────
  {
    id: 1, route: 'm', chapter: 1, scene: 'office', title: '週三的進修課', target: 'yaqi',
    brief: '雅琪說每週三晚上在瑜伽教室進修。大偉決定到教室辦公室問問課表。',
    tip: '新手教學：點擊畫面找出 3 件關鍵證物，點錯會扣 5 秒。',
    clues: [
      { name: '瑜伽褲上的短髮', icon: 'hair', lie: '頭髮？教室學員很多啊。' },
      { name: '男士髮蠟味', icon: 'perfume', lie: '那是我自己的護髮乳。' },
      { name: '週三的課表', icon: 'calendar', lie: '我週三晚上在上進修課。' },
    ],
    deduce: {
      time: ['週三 19:30', '週一早上', '週末下午'],
      place: ['教室附近停車場', '瑜伽教室', '健身房'],
      who: ['健身教練 Kevin', '瑜伽學員', '她閨蜜'],
    },
    win: '大偉拿到課表：週三晚上根本沒有課。櫃台小姐也說，雅琪都是被一個教練接走的。',
    lose: '櫃台小姐認出大偉。雅琪回家後冷冷地說：「你跟蹤我？」',
  },
  {
    id: 2, route: 'm', chapter: 1, scene: 'car', title: '座椅往後調了 15 公分', target: 'yaqi',
    brief: '雅琪開完車，駕駛座退到大偉自己才坐得下的位置。',
    tip: '跟車玩法：按住油門保持距離在綠色區域，太近會被發現、太遠會跟丟。',
    clues: [
      { name: '被調過的座椅', icon: 'seat', lie: '座椅？我一直都這樣坐。' },
      { name: '男鞋鞋印', icon: 'shoe', lie: '我一個人開車出去的。' },
      { name: 'ETC 扣款', icon: 'creditcard', lie: '我那天沒上高速公路。' },
    ],
    deduce: {
      time: ['週三 21:00', '週二中午', '週五早上'],
      place: ['交流道旁停車場', '加油站', '她公司'],
      who: ['Kevin', '她媽媽', '學員阿姨'],
    },
    win: '比對 ETC 時間，大偉在交流道旁的停車場拍到 Kevin 換手開車。',
    lose: '雅琪發現了：「我載健身房的學員，你心機很重欸。」',
  },
  {
    id: 3, route: 'm', chapter: 1, scene: 'library', title: '證照進修', target: 'yaqi',
    brief: '雅琪改口說，她在圖書館準備瑜伽證照考試。',
    clues: [
      { name: '五年沒用的借書證', icon: 'card', lie: '我每週都在圖書館讀書。' },
      { name: '包包裡的蛋白粉', icon: 'bottle', lie: '我在準備瑜伽證照。' },
      { name: '限動背景', icon: 'phone', lie: '我一個人去的。' },
    ],
    deduce: {
      time: ['週三 21:00 閉館時', '週三中午', '週日早上'],
      place: ['圖書館門口', '自習室', '樓上咖啡廳'],
      who: ['Kevin', '讀書會成員', '館員'],
    },
    win: '閉館鐘聲響起，大偉在圖書館門口拍到 Kevin 來接雅琪。',
    lose: '大偉在館內找了一整晚，雅琪根本沒進來過。',
  },
  {
    id: 4, route: 'm', chapter: 1, scene: 'cinema', title: '限動裡的反光', target: 'yaqi',
    brief: '雅琪的 IG 限動只拍了電影票，玻璃杯上卻映出一隻刺青的手臂。',
    clues: [
      { name: '限動截圖的反光', icon: 'phone', lie: '我跟閨蜜去看電影。' },
      { name: '刺青比對照', icon: 'camera', lie: '我不認識有刺青的人。' },
      { name: '兩人份熱狗套餐', icon: 'popcorn', lie: '兩份都是我吃的。' },
    ],
    deduce: {
      time: ['週六 21:00 場', '週六午場', '週日早場'],
      place: ['中場洗手間外', '售票口', '停車場'],
      who: ['Kevin', '她閨蜜', '她同事'],
    },
    win: '電影中場，大偉在洗手間外拍到兩人牽手。',
    lose: '大偉放大找錯了人，認成路人，還被瞪了一眼。',
  },
  {
    id: 5, route: 'm', chapter: 1, scene: 'motel', title: '大哥電信客服', target: 'yaqi', boss: true,
    brief: '「大哥電信客服」傳來訊息：「週三 21:00 薇光汽旅 517，老樣子。」',
    clues: [
      { name: '「517」訊息截圖', icon: 'chat', lie: '那是電信公司的帳單通知。' },
      { name: '旅館集點卡', icon: 'card', lie: '集點卡是學員送的。' },
      { name: '蕾絲睡衣發票', icon: 'receipt', lie: '睡衣是買來給你看的啊。' },
    ],
    deduce: {
      time: ['週三 21:00', '週四 21:00', '週三中午'],
      place: ['薇光汽旅 517', '薇光汽旅 715', '瑜伽教室'],
      who: ['Kevin', '電信客服', '學員'],
    },
    win: '潛行到 517，房門打開。Kevin 的腹肌，在大偉的閃光燈下顯得特別蒼白。',
    lose: '大偉在電梯裡遇到 Kevin，打草驚蛇。',
    ending: '大偉搬出了家門。在搬家公司的貨車旁，一位燙捲髮的阿姨攔住他：「你的記性，很適合這行。我是抓猴事務所的蔡姐。」',
  },

  // ───────── 第二章 好兄弟 ─────────
  {
    id: 6, route: 'm', chapter: 2, scene: 'car', title: '計程車上的熟悉香水', target: 'xiaomei', client: 'akai',
    brief: '阿凱載到一位男乘客，身上是他女友小美的香水味。',
    clues: [
      { name: '遺落的手機殼', icon: 'phone', lie: '那個手機殼不是我的。' },
      { name: '同款香水', icon: 'perfume', lie: '同款香水很多人用。' },
      { name: '乘客下車地址', icon: 'receipt', lie: '我那天整晚在家。' },
    ],
    deduce: {
      time: ['週五 23:00', '週五中午', '週六早上'],
      place: ['乘客住處樓下', '車行', '夜店'],
      who: ['那位男乘客', '她同事', '她表哥'],
    },
    win: '跟車到乘客住處，開門的人正是小美。',
    lose: '跟丟了，小美說：「同款香水很多人用好嗎。」',
  },
  {
    id: 7, route: 'm', chapter: 2, scene: 'park', title: '年票的第二個名字', target: 'xiaomei', client: 'akai',
    brief: '小美的遊樂園年票是情侶方案，另一個名字不是阿凱。',
    clues: [
      { name: '情侶年票', icon: 'ticket', lie: '年票是我自己一個人的。' },
      { name: '照片框合照', icon: 'camera', lie: '那是 P 圖的啦。' },
      { name: '鬼屋紀念品', icon: 'gift', lie: '我最怕鬼屋，根本沒去過。' },
    ],
    deduce: {
      time: ['週日晚上鬼屋場', '週日早上', '週六下午'],
      place: ['鬼屋出口', '旋轉木馬', '園區大門'],
      who: ['年票上的男人', '她閨蜜', '阿凱'],
    },
    win: '大偉扮成鬼躲在鬼屋裡，在出口抓到兩人。',
    lose: '扮得太像，小美嚇到報警。',
  },
  {
    id: 8, route: 'm', chapter: 2, scene: 'office', title: '加班到天亮', target: 'azhewife', client: 'azhe',
    brief: '阿凱的兄弟阿哲，懷疑老婆和上司加班加過頭。',
    clues: [
      { name: '03:12 打卡紀錄', icon: 'keycard', lie: '那天我九點就下班了。' },
      { name: '兩杯咖啡外帶杯', icon: 'coffee', lie: '兩杯都是我喝的。' },
      { name: '上司桌上的護手霜', icon: 'perfume', lie: '我跟上司只有公事。' },
    ],
    deduce: {
      time: ['凌晨 1 點後', '晚上 7 點', '中午'],
      place: ['上司辦公室', '茶水間', '公司樓下'],
      who: ['她的上司', '同事們', '警衛'],
    },
    win: '大偉扮成大夜班清潔工潛入，拍到辦公室裡的兩人。',
    lose: '清潔車撞到門，被發現了。',
  },
  {
    id: 9, route: 'm', chapter: 2, scene: 'cinema', title: '她說在陪閨蜜', target: 'cousingf', client: 'cousin',
    brief: '阿凱的表弟阿翔，女友說週五要陪閨蜜看電影。',
    clues: [
      { name: '閨蜜追劇限動', icon: 'phone', lie: '我在陪閨蜜看電影。' },
      { name: '情侶座電影票', icon: 'ticket', lie: '那是普通座位啦。' },
      { name: '訂位簡訊', icon: 'chat', lie: '票是閨蜜訂的。' },
    ],
    deduce: {
      time: ['週五 21:00', '週五 19:00', '週六午夜'],
      place: ['情侶座後排', '一般座位', '電影院大廳'],
      who: ['陌生男子', '閨蜜', '她弟弟'],
    },
    win: '大偉在情侶座後排抓到，阿翔終於看清了真相。',
    lose: '被帶位員請出去，女友反咬阿翔：「你監視我？」',
  },
  {
    id: 10, route: 'm', chapter: 2, scene: 'motel', title: '兄弟的女人', target: 'xiaomei', client: 'akai', boss: true,
    brief: '小美的新對象，竟然是阿凱車行的同事。',
    clues: [
      { name: '車行排班表', icon: 'calendar', lie: '那晚他排班在跑車。' },
      { name: '同一家旅館的兩台車', icon: 'camera', lie: '我們只是剛好路過。' },
      { name: '共用的加油卡', icon: 'creditcard', lie: '加油卡是車行公用的。' },
    ],
    deduce: {
      time: ['週六 22:00', '週六中午', '週日早上'],
      place: ['薇光汽旅停車場', '車行', '加油站'],
      who: ['阿凱的車行同事', '阿凱', '乘客'],
    },
    win: '阿凱親手拍下證據。隔天，車行老闆當場開除了那個同事。',
    lose: '阿凱衝動動手，反而被告傷害。',
    ending: '蔡姐坐在車行門口，吃著阿凱請的雞排：「大偉，你兩次都沒失手。抓猴事務所缺人，來嗎？」',
  },

  // ───────── 第三章 抓猴事務所 ─────────
  {
    id: 11, route: 'm', chapter: 3, scene: 'motel', title: '外送員的直覺', target: 'courierwife', client: 'courier',
    brief: '外送員阿豐送餐到旅館，發現門口那雙鞋是他老婆的。',
    clues: [
      { name: '旅館外送單', icon: 'receipt', lie: '我今晚回娘家了。' },
      { name: '門口的鞋子', icon: 'shoe', lie: '那雙鞋到處都買得到。' },
      { name: '假定位截圖', icon: 'phone', lie: '定位明明顯示在我娘家。' },
    ],
    deduce: {
      time: ['今晚 21:30', '今晚 18:00', '明天中午'],
      place: ['薇光汽旅 4F', '她娘家', '樓下超商'],
      who: ['陌生男子', '她媽媽', '外送員'],
    },
    win: '大偉拆穿了假定位，在 4F 抓到現行。',
    lose: '大偉衝錯樓層，被旅館保全請出去。',
  },
  {
    id: 12, route: 'm', chapter: 3, scene: 'park', title: '親子日的叔叔', target: 'linmom', client: 'lindad',
    brief: '林先生的兒子說：「媽媽帶我去玩，有個叔叔一直在。」',
    clues: [
      { name: '孩子的畫', icon: 'drawing', lie: '哪有什麼叔叔，孩子亂畫的。' },
      { name: '照相館的照片', icon: 'camera', lie: '照片是路人幫我們拍的。' },
      { name: '手機裡的「叔叔」', icon: 'chat', lie: '叔叔是我遠房親戚。' },
    ],
    deduce: {
      time: ['週日下午', '週六早上', '平日晚上'],
      place: ['旋轉咖啡杯', '摩天輪', '園區餐廳'],
      who: ['那位叔叔', '她弟弟', '園區員工'],
    },
    win: '大偉在旋轉咖啡杯旁拍到合照現場。',
    lose: '大偉被認出來，孩子嚇得大哭。',
  },
  {
    id: 13, route: 'm', chapter: 3, scene: 'office', title: '老婆的祕密會議', target: 'zhangwife', client: 'zhang',
    brief: '張先生懷疑，老婆每晚都和男同事關在會議室裡。',
    tip: '陷阱關：證據不一定指向劈腿。真相是誤會時，撤退才是正確答案。',
    trap: { sound: '門後傳來壓低的聲音：「再練一次！生日快樂歌要整齊！蛋糕藏好了沒？」' },
    clues: [
      { name: '會議室預約', icon: 'calendar', lie: '我在加班趕報告。' },
      { name: '「他一定會嚇一跳」', icon: 'chat', lie: '那是工作上的訊息。' },
      { name: '蛋糕店訂單', icon: 'cake', lie: '那是同事訂的。' },
    ],
    deduce: {
      time: ['每晚 19:00', '每天中午', '週末'],
      place: ['7F 會議室', '頂樓', '咖啡店'],
      who: ['準備驚喜的同事們', '單獨一個男同事', '她上司'],
    },
    win: '大偉悄悄撤退，告訴張先生下週記得空出時間。生日那天，張先生哭得比蛋糕還甜。',
    lose: '大偉硬闖會議室，蛋糕掉在地上，驚喜毀了。',
  },
  {
    id: 14, route: 'm', chapter: 3, scene: 'library', title: '讀書會的會長', target: 'hewife', client: 'he',
    brief: '何太太參加的讀書會，簽到表上永遠只有兩個人：她和會長。',
    tip: '時間軸推理：注意監視器上的時間。',
    clues: [
      { name: '讀書會簽到表', icon: 'note', lie: '讀書會很多人參加。' },
      { name: '畫線的情話', icon: 'book', lie: '畫線是讀書筆記。' },
      { name: '監視器時間', icon: 'cctv', lie: '讀書會九點就散了。' },
    ],
    deduce: {
      time: ['週四 20:00 之後', '週四 19:00', '週六早上'],
      place: ['視聽室', '閱覽室', '讀書會教室'],
      who: ['讀書會會長', '讀書會成員', '館員'],
    },
    win: '排出時間軸，大偉在視聽室抓到兩人。',
    lose: '時間錯了，大偉抓到的是真的在開會的讀書會。',
  },
  {
    id: 15, route: 'm', chapter: 3, scene: 'cinema', title: '首映會的伴', target: 'actorbf', client: 'agent', boss: true,
    brief: '女演員的經紀人 Joy 委託：女星的男友，可能在首映會帶了別人。',
    clues: [
      { name: '首映會名單', icon: 'note', lie: '我是一個人出席首映會。' },
      { name: '紅毯照片角落', icon: 'camera', lie: '照片裡那不是我。' },
      { name: '雙人邀請函', icon: 'letter', lie: '邀請函是公司給的單人票。' },
    ],
    deduce: {
      time: ['首映會散場後', '首映開始前', '隔天早上'],
      place: ['紅毯後台', '影廳第一排', '停車場'],
      who: ['新晉女星', '經紀人', '導演'],
    },
    win: '大偉在紅毯後台拍到兩人，經紀人拿到了證據。',
    lose: '大偉被保全攔下，隔天自己上了八卦新聞。',
    ending: '蔡姐把事務所的備用鑰匙丟給大偉：「接下來的案子，一件比一件難。我相信你。」',
  },

  // ───────── 第四章 最後的真相 ─────────
  {
    id: 16, route: 'm', chapter: 4, scene: 'car', title: '求婚前夜', target: 'fiancee', client: 'fiance',
    brief: '準新郎委託：女友在求婚前一晚，說要和姊妹們聚會。',
    clues: [
      { name: '姊妹群組', icon: 'chat', lie: '我在跟姊妹們聚會。' },
      { name: '租來的跑車', icon: 'key', lie: '我今晚沒有出門。' },
      { name: '前男友的車', icon: 'camera', lie: '我早就跟前男友沒聯絡了。' },
    ],
    deduce: {
      time: ['求婚前一晚 22:00', '求婚當天中午', '上週末'],
      place: ['海邊堤防', '姊妹家', 'KTV'],
      who: ['前男友', '姊妹們', '她爸爸'],
    },
    win: '大偉跟車到海邊，拍到她和前男友。',
    lose: '跟丟了，求婚照常進行。',
  },
  {
    id: 17, route: 'm', chapter: 4, scene: 'motel', title: '雙重劈腿', target: 'wife17', client: 'husband17',
    brief: '陳先生和陳太太分別來事務所委託，要查的人竟然是彼此。',
    clues: [
      { name: '201 號房門卡', icon: 'keycard', lie: '我今天在出差，不在台北。' },
      { name: '202 號房門卡', icon: 'keycard', lie: '我先生今天在公司加班。' },
      { name: '同一天的請假單', icon: 'calendar', lie: '我們兩個誰都沒有請假。' },
    ],
    deduce: {
      time: ['今天下午 3 點', '今晚 10 點', '明天中午'],
      place: ['201 與 202 同時', '只有 201', '只有 202'],
      who: ['夫妻各自的情人', '只有老婆的情人', '只有老公的情人'],
    },
    win: '201 和 202 同時開門。陳先生和陳太太在走廊撞個正著，四個人一起愣住。',
    lose: '只開了一間房，另一個人反過來指責委託人。',
  },
  {
    id: 18, route: 'm', chapter: 4, scene: 'library', title: '還書箱裡的信', target: 'xuwife', client: 'xu',
    brief: '許先生發現，老婆每週都去還同一本書，書裡夾著信。',
    clues: [
      { name: '書裡的信', icon: 'letter', lie: '那本書我只是剛好借到。' },
      { name: '還書箱時間', icon: 'receipt', lie: '我很少去圖書館。' },
      { name: '同一個借閱者', icon: 'card', lie: '我不認識那個借書的男人。' },
    ],
    deduce: {
      time: ['每週日 20:00', '每週一早上', '每週六中午'],
      place: ['頂樓露台', '還書箱旁', '兒童閱覽室'],
      who: ['借閱同一本書的男人', '館員', '讀書會成員'],
    },
    win: '破解密碼「頂樓露台 20:00」，大偉抓到現行。',
    lose: '解錯密碼，大偉抓到一對正在求婚的陌生情侶。',
  },
  {
    id: 19, route: 'm', chapter: 4, scene: 'office', title: '蔡姐的過去', target: 'sender', client: 'caijie',
    brief: '有人寄來匿名照片，指控蔡姐當年也介入別人的婚姻。事務所的招牌岌岌可危。',
    clues: [
      { name: '舊報紙', icon: 'newspaper', lie: '照片是當年報紙登的，假不了。' },
      { name: '匿名信郵戳', icon: 'letter', lie: '信是從國外寄來的。' },
      { name: '照片角落的名牌', icon: 'camera', lie: '我跟蔡姐素不相識。' },
    ],
    deduce: {
      time: ['三天前寄出', '三十年前', '昨天'],
      place: ['本市的郵局', '國外', '事務所樓下'],
      who: ['被蔡姐抓過的男人', '蔡姐的前夫', '競爭對手'],
    },
    win: '寄件人是當年被蔡姐抓到劈腿的男人。照片是合成的，蔡姐清白了。',
    lose: '大偉誤信了照片，事務所被迫關門一天。',
  },
  {
    id: 20, route: 'm', chapter: 4, scene: 'park', title: '雲霄飛車最高點', target: 'yaqi', client: 'kevin', boss: true,
    brief: '最後的委託人走進事務所，脫下帽子。是 Kevin。「雅琪……又劈腿了。」',
    clues: [
      { name: '「大哥電信客服 2」', icon: 'chat', lie: '我跟以前那些人都斷了。' },
      { name: '快速通關券', icon: 'ticket', lie: '今晚我在上瑜伽課。' },
      { name: '新的戒指', icon: 'ring', lie: '戒指是學員送的禮物。' },
    ],
    deduce: {
      time: ['今晚 20:00', '明天早上', '上週末'],
      place: ['雲霄飛車最高點', '摩天輪', '園區餐廳'],
      who: ['新的男人', 'Kevin', '瑜伽學員'],
    },
    win: '大偉和 Kevin 聯手。雲霄飛車停在最高點「維修」，雅琪下不來，兩個前任在出口等她。',
    lose: '雅琪混進人群逃走了。',
    ending: '雲霄飛車重新啟動。Kevin 拍拍大偉的肩：「兄弟，對不起。」大偉推了推眼鏡：「Bug 修好了，系統重新上線。」——全劇終',
  },
];

export const LEVELS: Record<Route, Level[]> = { f: F, m: M };

export const CHAPTERS = [
  { n: 1, title: '枕邊人', f: '枕邊人', m: '枕邊人' },
  { n: 2, title: '好姊妹／好兄弟', f: '好姊妹', m: '好兄弟' },
  { n: 3, title: '抓猴事務所', f: '抓猴事務所', m: '抓猴事務所' },
  { n: 4, title: '最後的真相', f: '最後的真相', m: '最後的真相' },
];

export function getLevel(route: Route, id: number): Level {
  const lv = LEVELS[route].find((l) => l.id === id);
  if (!lv) throw new Error(`找不到關卡 ${route}-${id}`);
  return lv;
}

export const HERO: Record<Route, string> = { f: 'xiaojie', m: 'dawei' };
export const SIDEKICK: Record<Route, string> = { f: 'afang', m: 'akai' };
