// Localization for Pick Me — English + 繁體中文 (TW) + 日本語 + 한국어.
// Strings are plain values or small functions for interpolation.

export const LANGS = [
  { code: "en", label: "EN", locale: "en-US" },
  { code: "zh", label: "中文", locale: "zh-TW" },
  { code: "ja", label: "日本語", locale: "ja-JP" },
  { code: "ko", label: "한국어", locale: "ko-KR" },
];

export function detectLang() {
  if (typeof navigator === "undefined") return "en";
  const l = (navigator.language || "en").toLowerCase();
  if (l.startsWith("zh")) return "zh";
  if (l.startsWith("ja")) return "ja";
  if (l.startsWith("ko")) return "ko";
  return "en";
}

export function localeFor(lang) {
  return (LANGS.find((l) => l.code === lang) || LANGS[0]).locale;
}

const S = {
  /* ------------------------------------------------------------------ */
  en: {
    home_h1: "Pick a card, any card 😊",
    home_sub:
      "Set up a few hidden cards for someone. They tap one, and chance picks the plan — just a little fun.",
    home_make: "Make a deck",
    home_brandmark: "let chance decide",

    examples: ["Coffee ☕", "A walk 🌳", "Movie 🎬", "Ice cream 🍦", "Lunch 🥗", "Bookshop 📚"],
    noteIdeas: [
      "I want to ask you something…",
      "Pick a card, any card 😊",
      "No pressure — just for fun",
      "Been meaning to ask…",
    ],
    steps: [
      { title: "Who's it for?", sub: "Just so they know it's from you." },
      { title: "The cards", sub: "A few things you'd be happy to do." },
      { title: "Little details", sub: "All optional — skip anything you like." },
      { title: "Your secret words", sub: "A sweet little phrase you'll both share." },
    ],

    eyebrow_new: "New deck",
    heading_set: "Set it up",
    sub_set: "Only you see this part. They just get to tap a card.",
    doneTitle: "Your deck is ready 🎉",
    send_deck: "Send the deck",
    create_link: "Create link",
    make_my_deck: "Make my deck",
    shuffling: "Shuffling…",
    nav_back: "← Back",
    nav_next: "Next →",
    send_this_link: (to) => `Send this link to ${to || "them"}.`,

    f_yourName: "Your name",
    f_theirName: "Their name",
    ph_egSam: "e.g. Sam",
    ph_egJordan: "e.g. Jordan",
    f_note: "A little note",
    optional: "optional",
    ph_note: "say something to set the mood…",
    ph_card: "something to do together",
    add_card: "+ card",
    f_when: "When",
    f_where: "Where",
    ph_where: "a place, or leave it open",
    f_sticker: "A sticker for their “yes”",
    sticker_hint: "They'll see it the moment they tap “Works for me.”",
    f_secret: "Secret words",
    ph_secret: "a sweet little phrase 💛",
    secret_shared: "❤️ Shared between both of you.",
    secret_note: (to) =>
      `These ride along inside the link, so ${to || "they"} open it in one tap — no typing. We'll show the words to you both, a little secret to share 💛`,

    counter_eyebrow: "Your turn",
    counter_heading: "Your cards",
    counter_sub: (from) => `Set up your own little deck to send back to ${from || "them"}.`,
    send_it_back: "Send it back",

    share_share: "Share link",
    share_copy: "Copy link",
    share_copied: "Copied ✓",
    div_note: "Note",
    share_secret_note: (phrase) => ({
      pre: "Your secret words are ",
      strong: `“${phrase}”`,
      post: ". Keep them somewhere in case you forget 💛",
    }),
    share_sticker_preview: (who) =>
      `${who || "They"}'ll get this little surprise the moment they say yes 💛`,
    div_now_wait: "Now We Wait",
    share_wait_here: (who) => `Wait for ${who || "their"} answer here →`,
    share_wait_sub: (who) =>
      `Keep this page and it'll update on its own when ${who || "they"} answer — no need for them to send anything back.`,

    op_seeAnswer: "See their answer",
    op_openDeck: "Open the deck",
    op_typePhrase: "Type the phrase you were given to open it.",
    ph_magicWord: "the magic word",
    op_unlock: "Unlock",
    op_opening: "Opening…",
    op_wrong: "Hmm, that phrase didn't work. Give it another try?",
    op_scrambled: "This link looks a bit scrambled.",

    deck_from: (from) => `From ${from}`,
    deck_game: "A little game",
    deck_tap: "Tap a card",
    deck_nice: "Nice pick!",
    deck_dont_overthink: "Any card — don't overthink it 🙂",
    deck_secret: "your secret words:",

    rp_pickBetter: "Pick a time that works better 👇",
    rp_back: "← back",
    rp_works: "Works for me 👍",
    rp_sounds: "Sounds good 👍",
    rp_another: "Another time?",
    rp_sendOwn: "Send my own cards back ↩",
    slot_day1: "A day later",
    slot_day2: "Two days later",
    slot_week1: "Same time next week",

    rr_confirmHead: "You're in! 🎉",
    rr_proposeHead: "Nice — suggest that time 🕘",
    rr_returnHead: "Sent back to reshuffle ↩",
    rr_confirmSub: (from) => `Send this back so ${from || "they"} know it's on.`,
    rr_proposeSub: "Send this back with your suggested time.",
    rr_returnSub: (from) =>
      `No worries. Send it back and let ${from || "them"} take another turn.`,
    rr_getting: "Getting your reply ready…",

    oc_isIn: (who) => `${who} is in!`,
    oc_setFor: "You're set for:",
    oc_dropMsg: (who) => `Drop ${who} a message to say you're looking forward to it.`,
    oc_suggested: (who) => `${who} suggested a time`,
    oc_forPlan: (card) => `For ${card || "the plan"}:`,
    oc_ifWorks: (who) => `If that works, just text ${who} back to lock it in.`,
    oc_sentBack: (who) => `${who} sent the deck back`,
    oc_noStress:
      "No stress — the timing might just not have fit. Want to reshuffle and try a fresh set of cards?",
    oc_makeNew: "Make a new deck",

    wt_recapSummary: (to) => `🃏 What did I send ${to || "them"}?`,
    wt_theirYes: "their “yes” sticker",
    div_theLink: "the link",
    wt_didntSend: (who) => `Didn't send it yet? Here's ${who ? `${who}'s` : "the"} deck link.`,
    wt_waitingFor: (who) => `Waiting for ${who}…`,
    wt_waitingForPlain: (who) => `Waiting for ${who}`,
    wt_waitingSub:
      "This page checks on its own — leave it open, or come back to this link anytime. You'll see their answer here the moment it lands.",
    wt_lastChecked: (time) => `Last checked ${time}`,
    wt_checking: "Checking…",
    wt_disabled: (who) =>
      `Live updates aren't switched on for this deck. As soon as ${who} taps their answer, they'll get a little link to send back to you — open it and you'll see the result here.`,
    wt_deviceNote:
      "💡 The link & recap live on this device. Checking from a different phone or browser? You'll need your secret words to open it there:",
    wt_startOver: "Start over",
  },

  /* ------------------------------------------------------------------ */
  zh: {
    home_h1: "抽一張卡，哪張都好 😊",
    home_sub:
      "為某個人準備幾張蓋著的卡片，對方翻開一張，讓機率決定要做什麼——輕鬆一下就好。",
    home_make: "做一副卡",
    home_brandmark: "交給機率決定",

    examples: ["喝咖啡 ☕", "散步 🌳", "看電影 🎬", "吃冰淇淋 🍦", "吃午餐 🥗", "逛書店 📚"],
    noteIdeas: [
      "我想問你一件事…",
      "抽一張卡，哪張都好 😊",
      "別有壓力——玩玩而已",
      "一直想找機會問你…",
    ],
    steps: [
      { title: "要給誰呢？", sub: "讓對方知道是你送的。" },
      { title: "卡片內容", sub: "放幾個你也會開心的選項。" },
      { title: "小細節", sub: "都可以略過，看你想不想填。" },
      { title: "你們的暗號", sub: "一句只屬於你們的小暗語。" },
    ],

    eyebrow_new: "新的一副",
    heading_set: "來設定吧",
    sub_set: "這部分只有你看得到，對方只要翻卡就好。",
    doneTitle: "你的卡片好了 🎉",
    send_deck: "把卡片傳過去",
    create_link: "產生連結",
    make_my_deck: "做我的卡片",
    shuffling: "洗牌中…",
    nav_back: "← 返回",
    nav_next: "下一步 →",
    send_this_link: (to) => `把這個連結傳給${to || "對方"}。`,

    f_yourName: "你的名字",
    f_theirName: "對方的名字",
    ph_egSam: "例如：小美",
    ph_egJordan: "例如：阿哲",
    f_note: "一句小留言",
    optional: "可選",
    ph_note: "說句話帶點氣氛吧…",
    ph_card: "一起做的一件小事",
    add_card: "＋ 卡片",
    f_when: "時間",
    f_where: "地點",
    ph_where: "填個地點，或先留空",
    f_sticker: "對方答應時的小貼圖",
    sticker_hint: "當對方點下「可以喔」的那一刻就會看到。",
    f_secret: "暗號",
    ph_secret: "一句甜甜的小暗語 💛",
    secret_shared: "❤️ 只屬於你們兩個。",
    secret_note: (to) =>
      `暗號會藏在連結裡，所以${to || "對方"}一點就能打開——不用手動輸入。我們也會把暗號顯示給你們兩個看，當作小秘密 💛`,

    counter_eyebrow: "換你了",
    counter_heading: "你的卡片",
    counter_sub: (from) => `做一副屬於你的小卡片，回傳給${from || "對方"}。`,
    send_it_back: "回傳過去",

    share_share: "分享連結",
    share_copy: "複製連結",
    share_copied: "已複製 ✓",
    div_note: "備註",
    share_secret_note: (phrase) => ({
      pre: "你們的暗號是 ",
      strong: `「${phrase}」`,
      post: "。記起來，免得之後忘了 💛",
    }),
    share_sticker_preview: (who) =>
      `${who || "對方"}答應的那一刻，就會收到這個小驚喜 💛`,
    div_now_wait: "接著等回覆",
    share_wait_here: (who) => `在這裡等${who || "對方"}的回覆 →`,
    share_wait_sub: (who) =>
      `留著這個頁面，${who || "對方"}回覆時會自動更新——不用他們特地回傳。`,

    op_seeAnswer: "看看對方的回覆",
    op_openDeck: "打開卡片",
    op_typePhrase: "輸入拿到的暗號來打開。",
    ph_magicWord: "暗號",
    op_unlock: "解鎖",
    op_opening: "開啟中…",
    op_wrong: "嗯…暗號好像不對，再試一次？",
    op_scrambled: "這個連結好像有點亂掉了。",

    deck_from: (from) => `來自 ${from}`,
    deck_game: "一個小遊戲",
    deck_tap: "翻一張卡",
    deck_nice: "選得好！",
    deck_dont_overthink: "哪張都行——別想太多 🙂",
    deck_secret: "你們的暗號：",

    rp_pickBetter: "挑一個比較方便的時間 👇",
    rp_back: "← 返回",
    rp_works: "可以喔 👍",
    rp_sounds: "聽起來不錯 👍",
    rp_another: "換個時間？",
    rp_sendOwn: "換我出卡片回傳 ↩",
    slot_day1: "晚一天",
    slot_day2: "晚兩天",
    slot_week1: "下週同一時間",

    rr_confirmHead: "你答應了！🎉",
    rr_proposeHead: "好耶——提個時間吧 🕘",
    rr_returnHead: "已回傳、重新洗牌 ↩",
    rr_confirmSub: (from) => `把這個回傳給${from || "對方"}，讓他知道說定了。`,
    rr_proposeSub: "把你提議的時間一起回傳過去。",
    rr_returnSub: (from) => `沒關係，回傳給${from || "對方"}，換他再出一次。`,
    rr_getting: "正在準備你的回覆…",

    oc_isIn: (who) => `${who}答應了！`,
    oc_setFor: "你們約好了：",
    oc_dropMsg: (who) => `傳個訊息給${who}，說你很期待吧。`,
    oc_suggested: (who) => `${who}提了一個時間`,
    oc_forPlan: (card) => `關於${card || "這個計畫"}：`,
    oc_ifWorks: (who) => `如果可以，就回訊息給${who}把它敲定。`,
    oc_sentBack: (who) => `${who}把卡片回傳了`,
    oc_noStress: "別緊張——也許只是時間不巧。要不要重新洗牌，換一組卡片再試試？",
    oc_makeNew: "做一副新的卡片",

    wt_recapSummary: (to) => `🃏 我剛剛傳了什麼給${to || "對方"}？`,
    wt_theirYes: "答應時的貼圖",
    div_theLink: "連結",
    wt_didntSend: (who) => `還沒傳出去嗎？這是要給${who || "對方"}的卡片連結。`,
    wt_waitingFor: (who) => `等著${who}的回覆…`,
    wt_waitingForPlain: (who) => `等著${who}的回覆`,
    wt_waitingSub:
      "這個頁面會自動查看——開著就好，或隨時回到這個連結。對方一回覆，答案就會出現在這裡。",
    wt_lastChecked: (time) => `上次查看 ${time}`,
    wt_checking: "查看中…",
    wt_disabled: (who) =>
      `這副卡片沒有開啟即時更新。等${who}點下回覆後，會拿到一個小連結回傳給你——打開它就能在這裡看到結果。`,
    wt_deviceNote:
      "💡 連結和內容都只存在這個裝置上。換另一支手機或瀏覽器查看嗎？你會需要暗號才能打開：",
    wt_startOver: "重新開始",
  },

  /* ------------------------------------------------------------------ */
  ja: {
    home_h1: "カードを1枚、どれでもどうぞ 😊",
    home_sub:
      "相手のために、伏せたカードをいくつか用意。相手が1枚めくると、偶然が予定を選んでくれます——ほんの遊び心で。",
    home_make: "カードを作る",
    home_brandmark: "偶然にまかせて",

    examples: ["コーヒー ☕", "お散歩 🌳", "映画 🎬", "アイス 🍦", "ランチ 🥗", "本屋さん 📚"],
    noteIdeas: [
      "ちょっと聞きたいことがあって…",
      "カードを1枚、どれでも 😊",
      "気楽にね——ただの遊びだよ",
      "前から誘いたかったんだ…",
    ],
    steps: [
      { title: "だれに送る？", sub: "あなたからだと伝わるように。" },
      { title: "カードの中身", sub: "あなたも嬉しい候補をいくつか。" },
      { title: "こまかい設定", sub: "ぜんぶ任意。飛ばしてもOK。" },
      { title: "ふたりの合言葉", sub: "ふたりだけの、ちいさな合言葉。" },
    ],

    eyebrow_new: "新しいカード",
    heading_set: "設定しよう",
    sub_set: "ここが見えるのはあなただけ。相手はカードをめくるだけ。",
    doneTitle: "カードができました 🎉",
    send_deck: "カードを送る",
    create_link: "リンクを作る",
    make_my_deck: "自分のカードを作る",
    shuffling: "シャッフル中…",
    nav_back: "← もどる",
    nav_next: "次へ →",
    send_this_link: (to) => `このリンクを${to || "相手"}に送ってね。`,

    f_yourName: "あなたの名前",
    f_theirName: "相手の名前",
    ph_egSam: "例：さくら",
    ph_egJordan: "例：はると",
    f_note: "ひとことメモ",
    optional: "任意",
    ph_note: "雰囲気づくりに、ひとこと…",
    ph_card: "いっしょにする、ちいさなこと",
    add_card: "＋ カード",
    f_when: "いつ",
    f_where: "どこで",
    ph_where: "場所を入れる、または空欄のまま",
    f_sticker: "OKのときに出るステッカー",
    sticker_hint: "相手が「いいね」を押した瞬間に見えます。",
    f_secret: "合言葉",
    ph_secret: "甘くてちいさな合言葉 💛",
    secret_shared: "❤️ ふたりだけのもの。",
    secret_note: (to) =>
      `合言葉はリンクの中にそっと入るので、${to || "相手"}はワンタップで開けます——入力は不要。合言葉はふたりに表示します、ちいさな秘密として 💛`,

    counter_eyebrow: "あなたの番",
    counter_heading: "あなたのカード",
    counter_sub: (from) => `自分のカードを作って、${from || "相手"}に送り返そう。`,
    send_it_back: "送り返す",

    share_share: "リンクを共有",
    share_copy: "リンクをコピー",
    share_copied: "コピーしました ✓",
    div_note: "メモ",
    share_secret_note: (phrase) => ({
      pre: "ふたりの合言葉は ",
      strong: `「${phrase}」`,
      post: "。忘れないように控えておいてね 💛",
    }),
    share_sticker_preview: (who) =>
      `${who || "相手"}がOKした瞬間に、このちいさなサプライズが届きます 💛`,
    div_now_wait: "あとは待つだけ",
    share_wait_here: (who) => `ここで${who || "相手"}の返事を待つ →`,
    share_wait_sub: (who) =>
      `このページを開いたままに。${who || "相手"}が答えると自動で更新されます——送り返してもらう必要はありません。`,

    op_seeAnswer: "相手の返事を見る",
    op_openDeck: "カードを開く",
    op_typePhrase: "受け取った合言葉を入れて開いてね。",
    ph_magicWord: "合言葉",
    op_unlock: "開く",
    op_opening: "開いています…",
    op_wrong: "うーん、合言葉が違うみたい。もう一度試してみて？",
    op_scrambled: "このリンクは少し壊れているみたいです。",

    deck_from: (from) => `${from}より`,
    deck_game: "ちいさな遊び",
    deck_tap: "カードを1枚めくって",
    deck_nice: "いい選択！",
    deck_dont_overthink: "どれでもOK——深く考えないで 🙂",
    deck_secret: "ふたりの合言葉：",

    rp_pickBetter: "都合のいい時間を選んでね 👇",
    rp_back: "← もどる",
    rp_works: "いいよ 👍",
    rp_sounds: "いいね 👍",
    rp_another: "別の時間にする？",
    rp_sendOwn: "自分のカードを送り返す ↩",
    slot_day1: "1日あと",
    slot_day2: "2日あと",
    slot_week1: "来週の同じ時間",

    rr_confirmHead: "決まり！🎉",
    rr_proposeHead: "いいね——時間を提案しよう 🕘",
    rr_returnHead: "送り返しました ↩",
    rr_confirmSub: (from) => `これを${from || "相手"}に送り返して、決まったことを伝えてね。`,
    rr_proposeSub: "提案した時間といっしょに送り返してね。",
    rr_returnSub: (from) => `大丈夫。送り返して、${from || "相手"}にもう一度番をゆずろう。`,
    rr_getting: "返事を準備しています…",

    oc_isIn: (who) => `${who}がOKしたよ！`,
    oc_setFor: "予定はこちら：",
    oc_dropMsg: (who) => `${who}に「楽しみにしてる」とメッセージを送ろう。`,
    oc_suggested: (who) => `${who}が時間を提案しました`,
    oc_forPlan: (card) => `${card || "この予定"}について：`,
    oc_ifWorks: (who) => `よければ、${who}に返信して確定しよう。`,
    oc_sentBack: (who) => `${who}がカードを送り返しました`,
    oc_noStress:
      "気にしないで——タイミングが合わなかっただけかも。もう一度シャッフルして、新しいカードで試してみる？",
    oc_makeNew: "新しいカードを作る",

    wt_recapSummary: (to) => `🃏 ${to || "相手"}に何を送ったっけ？`,
    wt_theirYes: "OKのステッカー",
    div_theLink: "リンク",
    wt_didntSend: (who) => `まだ送ってない？ ${who || "相手"}へのカードのリンクはこちら。`,
    wt_waitingFor: (who) => `${who}の返事を待っています…`,
    wt_waitingForPlain: (who) => `${who}の返事を待っています`,
    wt_waitingSub:
      "このページは自動でチェックします——開いたままにするか、いつでもこのリンクに戻ってきてね。返事が届いた瞬間にここに表示されます。",
    wt_lastChecked: (time) => `最終チェック ${time}`,
    wt_checking: "チェック中…",
    wt_disabled: (who) =>
      `このカードはリアルタイム更新がオフです。${who}が返事を押すと、送り返すためのリンクが表示されます——それを開けば結果がここに出ます。`,
    wt_deviceNote:
      "💡 リンクと内容はこの端末に保存されています。別のスマホやブラウザで見る？ そのときは合言葉が必要です：",
    wt_startOver: "最初から",
  },

  /* ------------------------------------------------------------------ */
  ko: {
    home_h1: "카드 한 장, 아무거나 골라요 😊",
    home_sub:
      "누군가를 위해 뒤집힌 카드를 몇 장 준비하세요. 상대가 한 장을 누르면, 우연이 약속을 골라줘요 — 그냥 가벼운 재미로.",
    home_make: "카드 만들기",
    home_brandmark: "우연에 맡겨요",

    examples: ["커피 ☕", "산책 🌳", "영화 🎬", "아이스크림 🍦", "점심 🥗", "서점 📚"],
    noteIdeas: [
      "물어보고 싶은 게 있어…",
      "카드 한 장, 아무거나 😊",
      "부담 없이 — 그냥 재미로",
      "계속 물어보고 싶었어…",
    ],
    steps: [
      { title: "누구에게 보낼까요?", sub: "당신이 보낸 걸 알 수 있게요." },
      { title: "카드 내용", sub: "당신도 좋을 만한 것들 몇 개." },
      { title: "작은 설정들", sub: "모두 선택 사항 — 건너뛰어도 돼요." },
      { title: "둘만의 비밀 단어", sub: "둘만 아는 작고 다정한 암호." },
    ],

    eyebrow_new: "새 카드",
    heading_set: "설정하기",
    sub_set: "이 부분은 당신만 봐요. 상대는 카드만 누르면 돼요.",
    doneTitle: "카드가 준비됐어요 🎉",
    send_deck: "카드 보내기",
    create_link: "링크 만들기",
    make_my_deck: "내 카드 만들기",
    shuffling: "섞는 중…",
    nav_back: "← 뒤로",
    nav_next: "다음 →",
    send_this_link: (to) => `이 링크를 ${to || "상대"}에게 보내세요.`,

    f_yourName: "당신의 이름",
    f_theirName: "상대의 이름",
    ph_egSam: "예: 지민",
    ph_egJordan: "예: 서준",
    f_note: "짧은 메모",
    optional: "선택",
    ph_note: "분위기를 살릴 한마디…",
    ph_card: "함께할 작은 무언가",
    add_card: "＋ 카드",
    f_when: "언제",
    f_where: "어디서",
    ph_where: "장소를 적거나, 비워둬도 돼요",
    f_sticker: "상대가 좋다고 할 때 나올 스티커",
    sticker_hint: "상대가 “좋아요”를 누르는 순간 보여요.",
    f_secret: "비밀 단어",
    ph_secret: "달콤하고 작은 암호 💛",
    secret_shared: "❤️ 둘만의 것이에요.",
    secret_note: (to) =>
      `비밀 단어는 링크 안에 함께 담겨서, ${to || "상대"}는 한 번만 눌러도 열려요 — 입력할 필요 없이. 둘 모두에게 이 단어를 보여드릴게요, 작은 비밀로 💛`,

    counter_eyebrow: "당신 차례",
    counter_heading: "당신의 카드",
    counter_sub: (from) => `당신만의 카드를 만들어 ${from || "상대"}에게 돌려보내요.`,
    send_it_back: "돌려보내기",

    share_share: "링크 공유",
    share_copy: "링크 복사",
    share_copied: "복사됨 ✓",
    div_note: "메모",
    share_secret_note: (phrase) => ({
      pre: "둘의 비밀 단어는 ",
      strong: `“${phrase}”`,
      post: "예요. 잊지 않게 어딘가 적어두세요 💛",
    }),
    share_sticker_preview: (who) =>
      `${who || "상대"}가 좋다고 하는 순간, 이 작은 깜짝 선물을 받게 돼요 💛`,
    div_now_wait: "이제 기다려요",
    share_wait_here: (who) => `여기서 ${who || "상대"}의 답을 기다리기 →`,
    share_wait_sub: (who) =>
      `이 페이지를 열어두세요. ${who || "상대"}가 답하면 저절로 업데이트돼요 — 돌려보낼 필요 없이.`,

    op_seeAnswer: "상대의 답 보기",
    op_openDeck: "카드 열기",
    op_typePhrase: "받은 암호를 입력해 열어요.",
    ph_magicWord: "암호",
    op_unlock: "열기",
    op_opening: "여는 중…",
    op_wrong: "음, 암호가 안 맞네요. 다시 해볼까요?",
    op_scrambled: "이 링크가 조금 손상된 것 같아요.",

    deck_from: (from) => `${from}(으)로부터`,
    deck_game: "작은 게임",
    deck_tap: "카드를 한 장 누르세요",
    deck_nice: "좋은 선택!",
    deck_dont_overthink: "아무거나 — 너무 고민 말아요 🙂",
    deck_secret: "둘의 비밀 단어:",

    rp_pickBetter: "더 편한 시간을 골라요 👇",
    rp_back: "← 뒤로",
    rp_works: "좋아요 👍",
    rp_sounds: "좋네요 👍",
    rp_another: "다른 시간에?",
    rp_sendOwn: "내 카드로 돌려보내기 ↩",
    slot_day1: "하루 뒤",
    slot_day2: "이틀 뒤",
    slot_week1: "다음 주 같은 시간",

    rr_confirmHead: "성사됐어요! 🎉",
    rr_proposeHead: "좋아요 — 그 시간을 제안해요 🕘",
    rr_returnHead: "돌려보냈어요 ↩",
    rr_confirmSub: (from) => `이걸 ${from || "상대"}에게 돌려보내 정해졌다고 알려줘요.`,
    rr_proposeSub: "제안한 시간과 함께 돌려보내요.",
    rr_returnSub: (from) => `괜찮아요. 돌려보내서 ${from || "상대"}에게 다시 차례를 넘겨요.`,
    rr_getting: "답장을 준비하는 중…",

    oc_isIn: (who) => `${who}(이)가 좋대요!`,
    oc_setFor: "이렇게 정해졌어요:",
    oc_dropMsg: (who) => `${who}에게 기대된다고 메시지를 보내요.`,
    oc_suggested: (who) => `${who}(이)가 시간을 제안했어요`,
    oc_forPlan: (card) => `${card || "이 약속"}에 대해:`,
    oc_ifWorks: (who) => `괜찮으면 ${who}에게 답장해 확정해요.`,
    oc_sentBack: (who) => `${who}(이)가 카드를 돌려보냈어요`,
    oc_noStress:
      "괜찮아요 — 그냥 시간이 안 맞았을지도 몰라요. 다시 섞어서 새 카드로 해볼까요?",
    oc_makeNew: "새 카드 만들기",

    wt_recapSummary: (to) => `🃏 내가 ${to || "상대"}에게 뭘 보냈더라?`,
    wt_theirYes: "좋다고 할 때 스티커",
    div_theLink: "링크",
    wt_didntSend: (who) => `아직 안 보냈나요? ${who || "상대"}에게 보낼 카드 링크예요.`,
    wt_waitingFor: (who) => `${who}의 답을 기다리는 중…`,
    wt_waitingForPlain: (who) => `${who}의 답을 기다리는 중`,
    wt_waitingSub:
      "이 페이지는 알아서 확인해요 — 열어두거나, 언제든 이 링크로 돌아오세요. 답이 도착하는 순간 여기에 보여요.",
    wt_lastChecked: (time) => `마지막 확인 ${time}`,
    wt_checking: "확인 중…",
    wt_disabled: (who) =>
      `이 카드는 실시간 업데이트가 꺼져 있어요. ${who}(이)가 답을 누르면 돌려보낼 링크가 생겨요 — 그걸 열면 결과가 여기 보여요.`,
    wt_deviceNote:
      "💡 링크와 요약은 이 기기에 저장돼요. 다른 폰이나 브라우저에서 볼 건가요? 그럴 땐 비밀 단어가 필요해요:",
    wt_startOver: "다시 시작",
  },
};

export function getStrings(lang) {
  return S[lang] || S.en;
}
