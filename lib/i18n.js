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

  zh: {
    home_h1: "抽一張卡，抽到哪張都可以 😊",
    home_sub:
      "偷偷幫某個人準備幾張蓋著的卡，對方隨手翻一張，要做什麼就交給運氣——輕鬆玩一下而已啦。",
    home_make: "來做一副卡",
    home_brandmark: "讓運氣幫你決定",

    examples: ["喝手搖 🧋", "去散步 🌳", "看電影 🎬", "吃冰 🍦", "吃飯 🍜", "逛書店 📚"],
    noteIdeas: [
      "欸我想問你一件事…",
      "抽一張卡，哪張都行 😊",
      "別緊張啦——純粹好玩",
      "其實一直想約你…",
    ],
    steps: [
      { title: "要送給誰？", sub: "讓對方知道是你送的啦。" },
      { title: "卡片內容", sub: "放幾個你自己也會想做的。" },
      { title: "一些小細節", sub: "都是選填，不想填就跳過。" },
      { title: "你們的暗號", sub: "一句只屬於你們的小暗語。" },
    ],

    eyebrow_new: "新的一副",
    heading_set: "來設定一下",
    sub_set: "這部分只有你看得到，對方就只要翻卡就好。",
    doneTitle: "你的卡完成囉 🎉",
    send_deck: "把卡傳過去",
    create_link: "產生連結",
    make_my_deck: "做我的卡",
    shuffling: "洗牌中…",
    nav_back: "← 返回",
    nav_next: "下一步 →",
    send_this_link: (to) => `把這個連結傳給${to || "對方"}就對了。`,

    f_yourName: "你的名字",
    f_theirName: "對方的名字",
    ph_egSam: "例如：小美",
    ph_egJordan: "例如：阿哲",
    f_note: "留句話給對方",
    optional: "選填",
    ph_note: "說句話帶點氣氛吧…",
    ph_card: "想一起做的小事",
    add_card: "＋ 加一張",
    f_when: "時間",
    f_where: "地點",
    ph_where: "填個地點，或先空著也行",
    f_sticker: "對方答應時跳出的貼圖",
    sticker_hint: "對方點下「可以喔」的那一秒就會看到。",
    f_secret: "暗號",
    ph_secret: "一句甜甜的小暗語 💛",
    secret_shared: "❤️ 只有你們兩個知道。",
    secret_note: (to) =>
      `暗號會偷偷藏在連結裡，所以${to || "對方"}一點就能打開，完全不用自己打字。我們也會把暗號秀給你們兩個看，當作你們的小秘密 💛`,

    counter_eyebrow: "換你了",
    counter_heading: "你的卡片",
    counter_sub: (from) => `也做一副自己的卡，回傳給${from || "對方"}吧。`,
    send_it_back: "回傳過去",

    share_share: "分享連結",
    share_copy: "複製連結",
    share_copied: "複製好了 ✓",
    div_note: "備註",
    share_secret_note: (phrase) => ({
      pre: "你們的暗號是 ",
      strong: `「${phrase}」`,
      post: "。記一下，免得之後忘記 💛",
    }),
    share_sticker_preview: (who) =>
      `${who || "對方"}答應的那一刻，就會收到這個小驚喜 💛`,
    div_now_wait: "接下來就等囉",
    share_wait_here: (who) => `在這裡等${who || "對方"}回覆 →`,
    share_wait_sub: (who) =>
      `這個頁面先留著，${who || "對方"}一回覆就會自動更新，不用他特地回傳給你。`,

    op_seeAnswer: "看看對方怎麼回",
    op_openDeck: "打開卡片",
    op_typePhrase: "輸入你拿到的暗號就能打開。",
    ph_magicWord: "暗號",
    op_unlock: "解鎖",
    op_opening: "開啟中…",
    op_wrong: "咦…暗號好像不對耶，再試一次？",
    op_scrambled: "這個連結好像怪怪的、有點亂掉了。",

    deck_from: (from) => `來自 ${from}`,
    deck_game: "一個小遊戲",
    deck_tap: "翻一張卡",
    deck_nice: "選得好！",
    deck_dont_overthink: "哪張都可以——別想太多啦 🙂",
    deck_secret: "你們的暗號：",

    rp_pickBetter: "挑一個你比較方便的時間 👇",
    rp_back: "← 返回",
    rp_works: "可以喔 👍",
    rp_sounds: "聽起來不錯 👍",
    rp_another: "改約別的時間？",
    rp_sendOwn: "換我出卡回傳 ↩",
    slot_day1: "晚一天",
    slot_day2: "晚兩天",
    slot_week1: "下週同一時間",

    rr_confirmHead: "你答應了！🎉",
    rr_proposeHead: "好耶——提個時間吧 🕘",
    rr_returnHead: "已回傳、重新洗牌 ↩",
    rr_confirmSub: (from) => `把這個回傳給${from || "對方"}，讓他知道就這樣說定了。`,
    rr_proposeSub: "把你想約的時間一起回傳過去。",
    rr_returnSub: (from) => `沒關係啦，回傳給${from || "對方"}，換他再出一次。`,
    rr_getting: "正在幫你準備回覆…",

    oc_isIn: (who) => `${who}答應了！`,
    oc_setFor: "你們約好了：",
    oc_dropMsg: (who) => `傳個訊息給${who}，跟他說你很期待吧。`,
    oc_suggested: (who) => `${who}提了一個時間`,
    oc_forPlan: (card) => `關於${card || "這個計畫"}：`,
    oc_ifWorks: (who) => `如果OK，回個訊息給${who}把它敲定就好。`,
    oc_sentBack: (who) => `${who}把卡片回傳了`,
    oc_noStress: "別放在心上——搞不好只是時間剛好不巧。要不要重新洗牌，換一組卡再試試？",
    oc_makeNew: "做一副新的卡",

    wt_recapSummary: (to) => `🃏 我剛剛傳了什麼給${to || "對方"}？`,
    wt_theirYes: "答應時的貼圖",
    div_theLink: "連結",
    wt_didntSend: (who) => `還沒傳出去嗎？這是要給${who || "對方"}的卡片連結。`,
    wt_waitingFor: (who) => `等${who}回覆中…`,
    wt_waitingForPlain: (who) => `等${who}回覆中`,
    wt_waitingSub:
      "這個頁面會自己更新——開著就好，或之後隨時再回到這個連結。對方一回覆，答案馬上就會出現在這裡。",
    wt_lastChecked: (time) => `上次確認 ${time}`,
    wt_checking: "確認中…",
    wt_disabled: (who) =>
      `這副卡沒有開即時更新。等${who}點下回覆後，他會拿到一個小連結回傳給你——打開它就能在這裡看到結果。`,
    wt_deviceNote:
      "💡 連結和內容都只存在這支手機裡。想換另一支手機或瀏覽器看嗎？那邊會需要暗號才能打開：",
    wt_startOver: "重新開始",
  },

  ja: {
    home_h1: "カード1枚、どれでもいいよ 😊",
    home_sub:
      "気になる人に、伏せたカードをいくつか用意するだけ。相手が1枚めくったら、あとは運が予定を決めてくれる——ちょっとした遊びだよ。",
    home_make: "カードを作る",
    home_brandmark: "運まかせで",

    examples: ["カフェ ☕", "お散歩 🌳", "映画 🎬", "アイス 🍦", "ごはん 🍜", "本屋さん 📚"],
    noteIdeas: [
      "ちょっと言いたいことがあって…",
      "カード1枚、どれでもどうぞ 😊",
      "気楽にね、ただの遊びだから",
      "前から誘いたかったんだよね…",
    ],
    steps: [
      { title: "だれに送る？", sub: "あなたからだって伝わるように。" },
      { title: "カードの中身", sub: "自分もやりたいことをいくつか。" },
      { title: "こまかいとこ", sub: "ぜんぶ任意だよ。飛ばしてもOK。" },
      { title: "ふたりの合言葉", sub: "ふたりだけの、ちいさな合言葉。" },
    ],

    eyebrow_new: "新しいカード",
    heading_set: "セットしていこ",
    sub_set: "ここが見えるのはあなただけ。相手はカードをめくるだけだよ。",
    doneTitle: "カードできた 🎉",
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
    ph_note: "雰囲気づくりに、ひとことどうぞ…",
    ph_card: "いっしょにやりたいこと",
    add_card: "＋ カード",
    f_when: "いつ",
    f_where: "どこで",
    ph_where: "場所を入れる、空欄でもOK",
    f_sticker: "OKされたときに出るステッカー",
    sticker_hint: "相手が「いいね」を押した瞬間に見えるよ。",
    f_secret: "合言葉",
    ph_secret: "甘くてちいさな合言葉 💛",
    secret_shared: "❤️ ふたりだけのひみつ。",
    secret_note: (to) =>
      `合言葉はリンクの中にそっと入るから、${to || "相手"}はワンタップで開けるよ——入力いらず。合言葉はふたりに表示するね、ちいさな秘密として 💛`,

    counter_eyebrow: "今度はあなたの番",
    counter_heading: "あなたのカード",
    counter_sub: (from) => `自分のカードを作って、${from || "相手"}に送り返そ。`,
    send_it_back: "送り返す",

    share_share: "リンクを共有",
    share_copy: "リンクをコピー",
    share_copied: "コピーした ✓",
    div_note: "メモ",
    share_secret_note: (phrase) => ({
      pre: "ふたりの合言葉は ",
      strong: `「${phrase}」`,
      post: "。忘れないようにどこかに控えておいてね 💛",
    }),
    share_sticker_preview: (who) =>
      `${who || "相手"}がOKした瞬間、このちいさなサプライズが届くよ 💛`,
    div_now_wait: "あとは待つだけ",
    share_wait_here: (who) => `ここで${who || "相手"}の返事を待とう →`,
    share_wait_sub: (who) =>
      `このページ開いたままにしておいてね。${who || "相手"}が答えたら自動で更新されるよ——わざわざ送り返してもらわなくて大丈夫。`,

    op_seeAnswer: "相手の返事を見る",
    op_openDeck: "カードを開く",
    op_typePhrase: "もらった合言葉を入れて開いてね。",
    ph_magicWord: "合言葉",
    op_unlock: "開く",
    op_opening: "開いてるよ…",
    op_wrong: "あれ、合言葉が違うみたい。もう一回試してみて？",
    op_scrambled: "このリンク、ちょっと壊れちゃってるみたい。",

    deck_from: (from) => `${from}より`,
    deck_game: "ちいさな遊び",
    deck_tap: "カードを1枚めくってね",
    deck_nice: "ナイスチョイス！",
    deck_dont_overthink: "どれでもOK、深く考えないで 🙂",
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
    rr_proposeHead: "いいね、時間を提案しよ 🕘",
    rr_returnHead: "送り返したよ ↩",
    rr_confirmSub: (from) => `これを${from || "相手"}に送り返して、決まったって伝えてね。`,
    rr_proposeSub: "提案する時間といっしょに送り返してね。",
    rr_returnSub: (from) => `大丈夫だよ。送り返して、${from || "相手"}にもう一回番をゆずろ。`,
    rr_getting: "返事を準備してるよ…",

    oc_isIn: (who) => `${who}がOKだって！`,
    oc_setFor: "予定はこんな感じ：",
    oc_dropMsg: (who) => `${who}に「楽しみにしてる」ってメッセージ送っちゃお。`,
    oc_suggested: (who) => `${who}が時間を提案してくれたよ`,
    oc_forPlan: (card) => `${card || "この予定"}について：`,
    oc_ifWorks: (who) => `よかったら、${who}に返信して確定しちゃお。`,
    oc_sentBack: (who) => `${who}がカードを送り返してきたよ`,
    oc_noStress:
      "気にしないで——タイミングが合わなかっただけかも。もう一回シャッフルして、新しいカードで試してみる？",
    oc_makeNew: "新しいカードを作る",

    wt_recapSummary: (to) => `🃏 ${to || "相手"}に何送ったっけ？`,
    wt_theirYes: "OKのステッカー",
    div_theLink: "リンク",
    wt_didntSend: (who) => `まだ送ってない？ ${who || "相手"}へのカードのリンクはこれだよ。`,
    wt_waitingFor: (who) => `${who}の返事待ち…`,
    wt_waitingForPlain: (who) => `${who}の返事待ち`,
    wt_waitingSub:
      "このページは自動でチェックしてるよ——開いたままでも、あとでこのリンクに戻ってきてもOK。返事が届いた瞬間にここに出るからね。",
    wt_lastChecked: (time) => `最終チェック ${time}`,
    wt_checking: "チェック中…",
    wt_disabled: (who) =>
      `このカードはリアルタイム更新がオフになってるよ。${who}が返事を押すと、送り返すためのリンクが出てくるから——それを開けば結果がここに出るよ。`,
    wt_deviceNote:
      "💡 リンクと内容はこの端末に保存されてるよ。別のスマホやブラウザで見る？ そのときは合言葉が必要になるからね：",
    wt_startOver: "最初から",
  },

  ko: {
    home_h1: "카드 한 장 골라봐요 😊",
    home_sub:
      "상대 몰래 카드 몇 장만 준비해두면 돼요. 상대가 한 장 톡 누르면, 뭘 할지는 운이 정해줘요 — 그냥 가볍게 즐겨요.",
    home_make: "카드 만들기",
    home_brandmark: "운에 맡기기",

    examples: ["커피 ☕", "산책 🌳", "영화 🎬", "아이스크림 🍦", "밥 한 끼 🥗", "책방 구경 📚"],
    noteIdeas: [
      "사실 나 물어보고 싶은 거 있어…",
      "카드 한 장만 골라봐 😊",
      "부담 갖지 말고, 그냥 재미로!",
      "계속 말 걸어보고 싶었어…",
    ],
    steps: [
      { title: "누구한테 보낼까요?", sub: "당신이 보낸 거라고 알 수 있게요." },
      { title: "카드 채우기", sub: "당신도 같이 하면 좋을 것들로요." },
      { title: "소소한 설정", sub: "다 선택이에요 — 그냥 넘어가도 돼요." },
      { title: "둘만의 암호", sub: "둘만 아는 다정한 한마디예요." },
    ],

    eyebrow_new: "새 카드",
    heading_set: "설정하기",
    sub_set: "이건 당신만 봐요. 상대는 그냥 카드만 누르면 끝!",
    doneTitle: "카드 준비 완료! 🎉",
    send_deck: "카드 보내기",
    create_link: "링크 만들기",
    make_my_deck: "내 카드 만들기",
    shuffling: "섞는 중…",
    nav_back: "← 뒤로",
    nav_next: "다음 →",
    send_this_link: (to) => `${to || "상대"}한테 이 링크 보내주세요.`,

    f_yourName: "내 이름",
    f_theirName: "상대 이름",
    ph_egSam: "예: 지민",
    ph_egJordan: "예: 서준",
    f_note: "짧은 한마디",
    optional: "선택",
    ph_note: "분위기 살릴 한마디 남겨봐요…",
    ph_card: "같이 하면 좋을 거",
    add_card: "＋ 카드",
    f_when: "언제",
    f_where: "어디서",
    ph_where: "장소 적거나, 그냥 비워둬도 돼요",
    f_sticker: "상대가 “좋아” 할 때 뜰 스티커",
    sticker_hint: "상대가 “좋아요” 누르는 순간 바로 보여요.",
    f_secret: "암호",
    ph_secret: "달콤한 한마디 💛",
    secret_shared: "❤️ 둘만의 거예요.",
    secret_note: (to) =>
      `암호는 링크 안에 같이 담겨서, ${to || "상대"}는 한 번만 눌러도 바로 열려요 — 따로 입력할 필요 없이요. 이 한마디는 둘 다한테 보여줄게요, 둘만의 작은 비밀로 💛`,

    counter_eyebrow: "이제 당신 차례",
    counter_heading: "당신의 카드",
    counter_sub: (from) => `당신만의 카드도 만들어서 ${from || "상대"}한테 답장처럼 보내봐요.`,
    send_it_back: "답장 보내기",

    share_share: "링크 공유",
    share_copy: "링크 복사",
    share_copied: "복사됐어요 ✓",
    div_note: "메모",
    share_secret_note: (phrase) => ({
      pre: "둘의 암호는 ",
      strong: `“${phrase}”`,
      post: "예요. 까먹지 않게 어디 적어두면 좋아요 💛",
    }),
    share_sticker_preview: (who) =>
      `${who || "상대"}가 좋다고 하는 순간, 이 깜짝 선물을 받게 돼요 💛`,
    div_now_wait: "이제 기다리기",
    share_wait_here: (who) => `여기서 ${who || "상대"} 답 기다리기 →`,
    share_wait_sub: (who) =>
      `이 페이지 그냥 열어두세요. ${who || "상대"}가 답하면 알아서 새로고침돼요 — 따로 뭘 보내달라고 안 해도 돼요.`,

    op_seeAnswer: "상대 답 보기",
    op_openDeck: "카드 열기",
    op_typePhrase: "받은 암호 입력하면 열려요.",
    ph_magicWord: "암호",
    op_unlock: "열기",
    op_opening: "여는 중…",
    op_wrong: "음, 암호가 안 맞아요. 한 번만 더 해볼까요?",
    op_scrambled: "이 링크가 좀 깨진 것 같아요.",

    deck_from: (from) => `${from}이(가) 보냈어요`,
    deck_game: "가벼운 게임 하나",
    deck_tap: "카드 한 장 눌러봐요",
    deck_nice: "굿 초이스!",
    deck_dont_overthink: "아무거나요 — 너무 고민 말고요 🙂",
    deck_secret: "둘의 암호:",

    rp_pickBetter: "더 편한 시간으로 골라봐요 👇",
    rp_back: "← 뒤로",
    rp_works: "저 좋아요 👍",
    rp_sounds: "좋아요 👍",
    rp_another: "다른 시간은 어때요?",
    rp_sendOwn: "내 카드로 답장하기 ↩",
    slot_day1: "하루 뒤",
    slot_day2: "이틀 뒤",
    slot_week1: "다음 주 같은 시간",

    rr_confirmHead: "약속 성사! 🎉",
    rr_proposeHead: "좋아요 — 그 시간으로 제안해봐요 🕘",
    rr_returnHead: "다시 섞으라고 돌려보냈어요 ↩",
    rr_confirmSub: (from) => `이거 ${from || "상대"}한테 보내서 약속 정해졌다고 알려줘요.`,
    rr_proposeSub: "제안한 시간이랑 같이 보내봐요.",
    rr_returnSub: (from) => `괜찮아요. 그냥 돌려보내서 ${from || "상대"}한테 다시 차례 넘겨줘요.`,
    rr_getting: "답장 준비하는 중…",

    oc_isIn: (who) => `${who}, 콜이래요!`,
    oc_setFor: "이렇게 정해졌어요:",
    oc_dropMsg: (who) => `${who}한테 기대된다고 톡 하나 보내봐요.`,
    oc_suggested: (who) => `${who}이(가) 시간을 제안했어요`,
    oc_forPlan: (card) => `${card || "이 약속"} 관련해서요:`,
    oc_ifWorks: (who) => `괜찮으면 ${who}한테 답장해서 확정해요.`,
    oc_sentBack: (who) => `${who}이(가) 카드를 돌려보냈어요`,
    oc_noStress:
      "괜찮아요 — 그냥 타이밍이 안 맞았을 수도 있어요. 다시 섞어서 새 카드로 해볼래요?",
    oc_makeNew: "새 카드 만들기",

    wt_recapSummary: (to) => `🃏 내가 ${to || "상대"}한테 뭐 보냈더라?`,
    wt_theirYes: "좋다고 할 때 뜰 스티커",
    div_theLink: "링크",
    wt_didntSend: (who) => `아직 안 보냈어요? ${who || "상대"}한테 보낼 카드 링크예요.`,
    wt_waitingFor: (who) => `${who} 답 기다리는 중…`,
    wt_waitingForPlain: (who) => `${who} 답 기다리는 중`,
    wt_waitingSub:
      "이 페이지는 알아서 확인해요 — 그냥 열어두거나, 언제든 이 링크로 다시 오면 돼요. 답 오는 순간 여기 딱 떠요.",
    wt_lastChecked: (time) => `마지막 확인 ${time}`,
    wt_checking: "확인 중…",
    wt_disabled: (who) =>
      `이 카드는 실시간 업데이트가 꺼져 있어요. ${who}이(가) 답을 누르면 당신한테 보낼 링크가 하나 생겨요 — 그걸 열면 결과가 여기 떠요.`,
    wt_deviceNote:
      "💡 링크랑 요약은 이 기기에만 저장돼요. 다른 폰이나 브라우저에서 볼 거예요? 그럴 땐 암호가 있어야 열려요:",
    wt_startOver: "처음부터 다시",
},
};

export function getStrings(lang) {
  return S[lang] || S.en;
}
