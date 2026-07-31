"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { seal, unseal } from "@/lib/crypto";
import {
  randomPhrase,
  randomRoomId,
  tokenKey,
  formatWhen,
  alternativeSlots,
  encodePhrase,
  decodePhrase,
} from "@/lib/util";
import { putReply, getReply } from "@/lib/room";
import { LANGS, detectLang, localeFor, getStrings } from "@/lib/i18n";
import Link from "next/link";

// A card back emoji per position, just for a little variety.
const BACKS = ["🎴", "✨", "🍀", "🌙", "🫶", "🌸"];

// Stickers live in /public/stickers. Sweet/character ones first (they make the
// best "yay" reveal), then activity icons. Art: barnstudio via Flaticon.
const HERO_STICKER = "card-game.png"; // "deal me in" fan of cards
const STICKERS = [
  { file: "symbol.png", label: "Hearts" },
  { file: "kiss.png", label: "Kisses" },
  { file: "panda.png", label: "Miss you" },
  { file: "cat.png", label: "Cat" },
  { file: "puppy.png", label: "Puppy" },
  { file: "rabbit.png", label: "Thank you" },
  { file: "rabbit (1).png", label: "Bunny" },
  { file: "bean.png", label: "Friends" },
  { file: "snail.png", label: "Snail" },
  { file: "cactus.png", label: "Cactus" },
  { file: "coffee-cup.png", label: "Coffee" },
  { file: "cake.png", label: "Cake" },
  { file: "ice-cream.png", label: "Ice cream" },
  { file: "drink.png", label: "Drinks" },
  { file: "strawberry-milk.png", label: "Milk" },
  { file: "pop-corn.png", label: "Popcorn" },
  { file: "movie-ticket.png", label: "Movie" },
  { file: "television.png", label: "TV" },
  { file: "pizza.png", label: "Pizza" },
  { file: "meat.png", label: "BBQ" },
  { file: "japanese-food.png", label: "Sushi" },
  { file: "lollipop.png", label: "Sweets" },
  { file: "chili.png", label: "Spicy" },
  { file: "onion.png", label: "Onion" },
  { file: "bonfire.png", label: "Bonfire" },
  { file: "note-book.png", label: "Study" },
  { file: "envelope.png", label: "Letter" },
  { file: "milk-box.png", label: "Milk box" },
];

function stickerSrc(file) {
  return `/stickers/${encodeURIComponent(file)}`;
}

// Hard reset back to a clean home screen (drops the #hash and reloads).
function resetHome() {
  window.location.href = window.location.pathname;
}

/* ------------------------------------------------------------------ */
/* Language context                                                    */
/* ------------------------------------------------------------------ */

const LangCtx = createContext({
  lang: "en",
  t: getStrings("en"),
  locale: "en-US",
  setLang: () => {},
});
function useT() {
  return useContext(LangCtx);
}

export default function Page() {
  const [phase, setPhase] = useState("boot");
  const [link, setLink] = useState(null); // { kind, token, phrase }
  const [lang, setLangState] = useState("en");

  function setLang(code, persist = true) {
    setLangState(code);
    if (persist) {
      try {
        localStorage.setItem("pmlang", code);
      } catch {
        /* ignore */
      }
    }
  }

  // Read the URL fragment + language once on mount (client only).
  useEffect(() => {
    try {
      const stored = localStorage.getItem("pmlang");
      setLangState(stored || detectLang());
    } catch {
      setLangState(detectLang());
    }

    const hash = window.location.hash.replace(/^#/, "");
    // Links may carry the secret phrase after a "~" so they open in one tap:
    //   #d.<token>~<encodedPhrase>
    const parse = (rest) => {
      const [token, enc] = rest.split("~");
      return { token, phrase: enc ? decodePhrase(enc) : "" };
    };
    if (hash.startsWith("d.")) {
      setLink({ kind: "d", ...parse(hash.slice(2)) });
      setPhase("open");
    } else if (hash.startsWith("r.")) {
      setLink({ kind: "r", ...parse(hash.slice(2)) });
      setPhase("open");
    } else if (hash.startsWith("w.")) {
      setLink({ kind: "w", token: hash.slice(2) });
      setPhase("wait");
    } else {
      setPhase("home");
    }
  }, []);

  const ctx = { lang, t: getStrings(lang), locale: localeFor(lang), setLang };

  if (phase === "boot") {
    return (
      <div className="stage">
        <div className="sheet center">
          <div className="big-emoji" style={{ fontSize: 40 }}>🎴</div>
        </div>
      </div>
    );
  }

  return (
    <LangCtx.Provider value={ctx}>
      <div className="stage">
        <Link
          href="/"
          className="logo"
          aria-label="Pick Me — start over"
          onClick={(e) => {
            e.preventDefault();
            resetHome();
          }}
        >
          <header className="brandbar">Pick Me 💌</header>
        </Link>
        <div className="sheet-wrap">
          <Stickers />
          <div className="sheet">
            {phase === "home" && <Home onCreate={() => setPhase("create")} />}
            {phase === "create" && <Create />}
            {phase === "open" && <Opener link={link} />}
            {phase === "wait" && <Waiting room={link.token} />}
          </div>
        </div>

        <div className="lang-switch">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={`lang-btn ${lang === l.code ? "on" : ""}`}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <footer className="credit">
          Sticker art by{" "}
          <a
            href="https://www.flaticon.com/free-stickers/cute"
            title="cute stickers"
            target="_blank"
            rel="noopener noreferrer"
          >
            barnstudio · Flaticon
          </a>
        </footer>
      </div>
    </LangCtx.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Kawaii stickers — inline SVG, no dependencies                       */
/* ------------------------------------------------------------------ */

function Face({ cx = 32, cy = 34, blush = "#e88181" }) {
  return (
    <>
      <circle cx={cx - 8} cy={cy} r="2.4" fill="#5a4747" />
      <circle cx={cx + 8} cy={cy} r="2.4" fill="#5a4747" />
      <path
        d={`M${cx - 6} ${cy + 5} q6 5 12 0`}
        stroke="#5a4747"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={cx - 13} cy={cy + 3} r="3" fill={blush} opacity="0.55" />
      <circle cx={cx + 13} cy={cy + 3} r="3" fill={blush} opacity="0.55" />
    </>
  );
}

function Stickers() {
  return (
    <div className="stickers" aria-hidden="true">
      {/* Heart */}
      <svg className="sticker s1" viewBox="0 0 64 64" width="60" height="60">
        <path
          d="M32 56C12 42 6 30 6 21 6 13 12 8 19 8c6 0 10 4 13 8 3-4 7-8 13-8 7 0 13 5 13 13 0 9-6 21-26 35z"
          fill="#f4c2c2"
          stroke="#fff"
          strokeWidth="3"
        />
        <Face cy={30} />
      </svg>

      {/* Star */}
      <svg className="sticker s2" viewBox="0 0 64 64" width="54" height="54">
        <path
          d="M32 6l7 15 16 2-12 11 3 16-14-8-14 8 3-16L8 23l16-2z"
          fill="#c2dbf4"
          stroke="#fff"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <Face cy={30} />
      </svg>

      {/* Cloud */}
      <svg className="sticker s3" viewBox="0 0 72 64" width="64" height="56">
        <path
          d="M20 46a13 13 0 010-26 15 15 0 0129-4 12 12 0 013 30z"
          fill="#c2f4f4"
          stroke="#fff"
          strokeWidth="3"
        />
        <Face cx={34} cy={34} />
      </svg>

      {/* Mochi bun */}
      <svg className="sticker s4" viewBox="0 0 64 64" width="52" height="52">
        <rect x="8" y="12" width="48" height="44" rx="20" fill="#c2f4db" stroke="#fff" strokeWidth="3" />
        <Face cy={34} />
      </svg>

      {/* Sparkles */}
      <svg className="sticker s5" viewBox="0 0 40 40" width="34" height="34">
        <path d="M20 2c2 11 5 14 16 18-11 4-14 7-16 18-2-11-5-14-16-18 11-4 14-7 16-18z" fill="#e88181" />
      </svg>
      <svg className="sticker s6" viewBox="0 0 40 40" width="26" height="26">
        <path d="M20 2c2 11 5 14 16 18-11 4-14 7-16 18-2-11-5-14-16-18 11-4 14-7 16-18z" fill="#f4c2c2" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

function Home({ onCreate }) {
  const { t } = useT();
  return (
    <div className="center">
      <img
        className="hero-sticker"
        src={stickerSrc(HERO_STICKER)}
        alt=""
        width="132"
        height="132"
      />
      <h1>{t.home_h1}</h1>
      <p className="sub" style={{ margin: "40px 0px", fontSize: 13.5 }}>
        {t.home_sub}
      </p>
      <button className="btn btn-primary" onClick={onCreate} style={{ marginTop: 50, marginBottom: 50 }}>
        {t.home_make}
      </button>
      <div className="brandmark">{t.home_brandmark}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Create (sender setup)                                               */
/* ------------------------------------------------------------------ */

function Create({ initial, ui } = {}) {
  const { t, lang } = useT();
  const [from, setFrom] = useState(initial?.from || "");
  const [to, setTo] = useState(initial?.to || "");
  const [note, setNote] = useState("");
  const [cards, setCards] = useState(["", "", ""]);
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [sticker, setSticker] = useState("");
  const [phrase, setPhrase] = useState(initial?.phrase || "");
  const [step, setStep] = useState(0);
  const [built, setBuilt] = useState(null); // built link url
  const [builtRoom, setBuiltRoom] = useState(null); // waiting-room id for the sender
  const [busy, setBusy] = useState(false);

  const copy = {
    eyebrow: ui?.eyebrow || t.eyebrow_new,
    heading: ui?.heading || t.heading_set,
    sub: ui?.sub || t.sub_set,
    doneTitle: ui?.doneTitle || t.doneTitle,
    sendVerb: ui?.sendVerb || t.send_deck,
  };

  const filledCards = cards.map((c) => c.trim()).filter(Boolean);
  // Date is optional now — a card can be a plain activity, or have a time/place.
  const ready = from.trim() && to.trim() && filledCards.length >= 2 && phrase.trim();

  function setCard(i, v) {
    setCards((cs) => cs.map((c, idx) => (idx === i ? v : c)));
  }
  function addExampleToFirstEmpty(text) {
    const i = cards.findIndex((c) => !c.trim());
    if (i === -1) setCards((cs) => [...cs, text]);
    else setCard(i, text);
  }

  async function build() {
    setBusy(true);
    try {
      // A room id lets the sender's page auto-refresh for the answer. It travels
      // inside the encrypted payload, so only someone with the phrase learns it.
      const room = randomRoomId();
      const payload = {
        v: 1,
        t: "deck",
        from: from.trim(),
        to: to.trim(),
        note: note.trim(),
        cards: filledCards,
        when,
        where: where.trim(),
        sticker,
        room,
        lang, // so the receiver opens in the same language
      };
      const token = await seal(payload, phrase);
      const url = `${window.location.origin}${window.location.pathname}#d.${token}~${encodePhrase(phrase)}`;
      // Remember the phrase for this room on the sender's device so their
      // waiting page can decrypt the answer without re-entering it.
      try {
        localStorage.setItem(
          `pmroom:${room}`,
          JSON.stringify({
            phrase,
            from: from.trim(),
            to: to.trim(),
            deckUrl: url,
            deck: {
              cards: filledCards,
              note: note.trim(),
              when,
              where: where.trim(),
              sticker,
            },
          })
        );
      } catch {
        /* ignore storage errors */
      }
      setBuiltRoom(room);
      setBuilt(url);
    } finally {
      setBusy(false);
    }
  }

  if (built) {
    return (
      <ShareLink
        url={built}
        title={copy.doneTitle}
        sub={t.send_this_link(to.trim())}
        who={to.trim()}
        phrase={
          phrase.trim() === (initial?.phrase || "").trim() && initial?.phrase
            ? null
            : phrase
        }
        sendVerb={copy.sendVerb}
        stickerPreview={sticker}
        waitRoom={builtRoom}
      />
    );
  }

  const canNext =
    step === 0
      ? !!from.trim() && !!to.trim()
      : step === 1
        ? filledCards.length >= 2
        : true;
  const createLabel = copy.sendVerb === t.send_deck ? t.create_link : t.make_my_deck;
  const meta = t.steps[step];

  return (
    <div>
      <div className="wizard-head">
        <p className="eyebrow">{copy.eyebrow}</p>
        <div className="dots">
          {t.steps.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === step ? "on" : ""} ${i < step ? "done" : ""}`}
            />
          ))}
        </div>
        <h1>{meta.title}</h1>
        <p className="sub">{meta.sub}</p>
      </div>

      {/* Step 0 — who */}
      {step === 0 && (
        <div className="wizard-step">
          <div className="block">
            <label className="field">{t.f_yourName}</label>
            <input
              type="text"
              value={from}
              autoFocus
              placeholder={t.ph_egSam}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="block">
            <label className="field">{t.f_theirName}</label>
            <input
              type="text"
              value={to}
              placeholder={t.ph_egJordan}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="block">
            <label className="field">
              {t.f_note} <span className="opt">{t.optional}</span>
            </label>
            <input
              type="text"
              value={note}
              placeholder={t.ph_note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="chips">
              {t.noteIdeas.map((n) => (
                <button className="chip" key={n} onClick={() => setNote(n)}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 1 — cards */}
      {step === 1 && (
        <div className="wizard-step">
          {cards.map((c, i) => (
            <div className="mini-card" key={i}>
              <div className="num">{i + 1}</div>
              <input
                type="text"
                value={c}
                placeholder={t.ph_card}
                onChange={(e) => setCard(i, e.target.value)}
              />
              {cards.length > 2 && (
                <button
                  className="del"
                  aria-label="remove"
                  onClick={() => setCards((cs) => cs.filter((_, idx) => idx !== i))}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <div className="chips">
            {t.examples.map((ex) => (
              <button className="chip" key={ex} onClick={() => addExampleToFirstEmpty(ex)}>
                {ex}
              </button>
            ))}
            <button className="chip" onClick={() => setCards((cs) => [...cs, ""])}>
              {t.add_card}
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — details */}
      {step === 2 && (
        <div className="wizard-step">
          <div className="block">
            <label className="field">{t.f_when} <span className="opt">{t.optional}</span></label>
            <input
              type="datetime-local"
              style={{
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                boxSizing: "border-box",
                WebkitAppearance: "none",
                appearance: "none",
                textAlign: "left",
              }}
              value={when}
              onChange={(e) => setWhen(e.target.value)}
            />
          </div>
          <div className="block">
            <label className="field">{t.f_where} <span className="opt">{t.optional}</span></label>
            <input
              type="text"
              value={where}
              style={{ width: "100%" }}
              placeholder={t.ph_where}
              onChange={(e) => setWhere(e.target.value)}
            />
          </div>
          <div className="block">
            <label className="field">
              {t.f_sticker} <span className="opt">{t.optional}</span>
            </label>
            <div className="sticker-grid">
              {STICKERS.map((s) => (
                <button
                  key={s.file}
                  className={`sticker-pick ${sticker === s.file ? "on" : ""}`}
                  title={s.label}
                  onClick={() => setSticker(sticker === s.file ? "" : s.file)}
                >
                  <img src={stickerSrc(s.file)} alt={s.label} width="56" height="56" />
                </button>
              ))}
            </div>
            <p className="sub" style={{ margin: "8px 2px 0", fontSize: 13.5 }}>
              {t.sticker_hint}
            </p>
          </div>
        </div>
      )}

      {/* Step 3 — phrase */}
      {step === 3 && (
        <div className="wizard-step">
          <div className="block">
            <label className="field">{t.f_secret}</label>
            <div className="row">
              <input
                type="text"
                value={phrase}
                autoFocus
                placeholder={t.ph_secret}
                onChange={(e) => setPhrase(e.target.value)}
              />
              <button className="chip" onClick={() => setPhrase(randomPhrase())}>
                🎲
              </button>
            </div>
            <hr style={{ margin: "20px 20px" }} />
            <h5 className="sub" style={{ margin: "10px 2px 0" }}>
              {t.secret_shared}
            </h5>
            <p className="sub" style={{ margin: "10px 2px 0", fontSize: 13.5 }}>
              {t.secret_note(to.trim())}
            </p>
          </div>
        </div>
      )}

      <div className="wizard-nav">
        {step > 0 ? (
          <button className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>
            {t.nav_back}
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button
            className="btn btn-primary btn-sm wizard-next"
            disabled={!canNext}
            onClick={() => setStep((s) => s + 1)}
          >
            {t.nav_next}
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm wizard-next"
            disabled={!ready || busy}
            onClick={build}
          >
            {busy ? t.shuffling : createLabel}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Share link screen (used by sender and picker to hand off)           */
/* ------------------------------------------------------------------ */

function ShareLink({ url, title, sub, who, phrase, sendVerb, sticker, stickerPreview, waitRoom }) {
  const { t } = useT();
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  function goWait() {
    window.location.hash = `w.${waitRoom}`;
    window.location.reload();
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      inputRef.current?.select();
      document.execCommand("copy");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ url, text: title });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    copy();
  }

  const secretNote = phrase ? t.share_secret_note(phrase.trim()) : null;

  return (
    <div className="center">
      {sticker ? (
        <img
          className="reveal-sticker"
          src={stickerSrc(sticker)}
          alt=""
          width="160"
          height="160"
        />
      ) : (
        <div style={{ fontSize: 46, marginBottom: 4 }}>💌</div>
      )}
      <h1>{title}</h1>
      <p className="sub">{sub}</p>

      <div className="linkbox">
        <input ref={inputRef} readOnly value={url} onFocus={(e) => e.target.select()} />
      </div>

      <div className="stack">
        <button className="btn btn-primary" onClick={share}>
          {sendVerb || t.share_share}
        </button>
        <button className="btn btn-soft btn-sm" onClick={copy}>
          {copied ? t.share_copied : t.share_copy}
        </button>
      </div>

      {(phrase || stickerPreview) && (
        <div className="hr-or"><span>{t.div_note}</span></div>
      )}

      {secretNote && (
        <div className="note">
          <span className="ic">🔑</span>
          <span className="note-ic">
            {secretNote.pre}
            <strong>{secretNote.strong}</strong>
            {secretNote.post}
          </span>
        </div>
      )}

      {stickerPreview && (
        <div className="sticker-preview">
          <img src={stickerSrc(stickerPreview)} alt="" width="52" height="52" />
          <span>{t.share_sticker_preview(who)}</span>
        </div>
      )}

      {waitRoom && (
        <>
          <div className="hr-or"><span>{t.div_now_wait}</span></div>
          <button className="btn btn-soft btn-sm" onClick={goWait}>
            {t.share_wait_here(who)}
          </button>
          <p className="sub" style={{ margin: "8px 2px 0", fontSize: 13 }}>
            {t.share_wait_sub(who)}
          </p>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Opener — unlocks a token, then routes to deck or outcome            */
/* ------------------------------------------------------------------ */

function Opener({ link }) {
  const { t, setLang } = useT();
  const storeKey = useMemo(() => tokenKey(link.token), [link.token]);
  const [phrase, setPhrase] = useState("");
  const [data, setData] = useState(null);
  const [usedPhrase, setUsedPhrase] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function remember(p) {
    try {
      const prev = JSON.parse(localStorage.getItem(storeKey) || "null") || {};
      localStorage.setItem(storeKey, JSON.stringify({ ...prev, phrase: p }));
    } catch {
      /* ignore storage errors */
    }
  }

  function onOpened(d) {
    // Match the sender's language for the whole exchange (not persisted).
    if (d.lang) setLang(d.lang, false);
    setData(d);
  }

  // Auto-unlock: prefer the phrase riding in the link, then a remembered one.
  useEffect(() => {
    const candidate = link.phrase || safeRead(storeKey)?.phrase;
    if (!candidate) return;
    unseal(link.token, candidate)
      .then((d) => {
        remember(candidate);
        setUsedPhrase(candidate);
        onOpened({ ...d, _saved: safeRead(storeKey) });
      })
      .catch(() => { });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeKey, link.token, link.phrase]);

  async function tryOpen(e) {
    e?.preventDefault();
    if (!phrase.trim()) return;
    setBusy(true);
    setError("");
    try {
      const d = await unseal(link.token, phrase);
      remember(phrase);
      setUsedPhrase(phrase);
      onOpened({ ...d, _saved: safeRead(storeKey) });
    } catch {
      setError(t.op_wrong);
    } finally {
      setBusy(false);
    }
  }

  if (data) {
    if (data.t === "deck")
      return <DeckGame data={data} storeKey={storeKey} phrase={usedPhrase} />;
    if (data.t === "reply") return <Outcome data={data} />;
    return <p className="error">{t.op_scrambled}</p>;
  }

  const opening = link.kind === "r" ? t.op_seeAnswer : t.op_openDeck;
  return (
    <form className="center" onSubmit={tryOpen}>
      <div style={{ fontSize: 46, marginBottom: 4 }}>🔒</div>
      <h1>{opening}</h1>
      <p className="sub">{t.op_typePhrase}</p>
      <div className="block">
        <input
          type="text"
          autoFocus
          value={phrase}
          placeholder={t.ph_magicWord}
          onChange={(e) => setPhrase(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={busy}>
        {busy ? t.op_opening : t.op_unlock}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

function safeRead(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}
function saveProgress(key, patch) {
  try {
    const prev = safeRead(key) || {};
    localStorage.setItem(key, JSON.stringify({ ...prev, ...patch }));
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Deck game (picker)                                                  */
/* ------------------------------------------------------------------ */

function DeckGame({ data, storeKey, phrase }) {
  const { t } = useT();
  const saved = data._saved || {};
  const [picked, setPicked] = useState(
    typeof saved.picked === "number" ? saved.picked : null
  );
  const [flipped, setFlipped] = useState(typeof saved.picked === "number");
  const [response, setResponse] = useState(saved.response || null);
  const [proposed, setProposed] = useState(saved.proposed || null);
  const initialStep = saved.response === "return"
    ? "counter"
    : saved.response
      ? "done"
      : picked !== null
        ? "respond"
        : "pick";
  const [step, setStep] = useState(initialStep);

  function pick(i) {
    if (picked !== null) return;
    setPicked(i);
    setFlipped(true);
    saveProgress(storeKey, { picked: i });
    setTimeout(() => setStep("respond"), 750);
  }

  const activity = picked !== null ? data.cards[picked] : "";

  if (step === "done") {
    return (
      <ReplyReady
        data={data}
        response={response}
        proposed={proposed}
        activity={data.cards[picked ?? saved.picked ?? 0]}
      />
    );
  }

  // "Send the deck back" turns into a counter-invite: the picker builds their
  // own deck and volleys it back, reusing the shared unlock phrase.
  if (step === "counter") {
    return (
      <Create
        initial={{ from: data.to || "", to: data.from || "", phrase: mostRecentPhrase() }}
        ui={{
          eyebrow: t.counter_eyebrow,
          heading: t.counter_heading,
          sub: t.counter_sub(data.from),
          doneTitle: t.doneTitle,
          sendVerb: t.send_it_back,
        }}
      />
    );
  }

  return (
    <div>
      <div className="center">
        <p className="eyebrow">{data.from ? t.deck_from(data.from) : t.deck_game}</p>
        {step === "pick" && data.note ? (
          <p className="intro">{data.note}</p>
        ) : null}
        <h1>{step === "pick" ? t.deck_tap : t.deck_nice}</h1>
      </div>

      <div className="deck">
        {data.cards.map((c, i) => {
          const isThis = picked === i;
          const dimmed = picked !== null && !isThis;
          return (
            <button
              key={i}
              className={`flip ${data.cards.length > 3 ? "small" : ""} ${isThis && flipped ? "is-flipped" : ""
                }`}
              style={{ opacity: dimmed ? 0.35 : 1, pointerEvents: picked !== null ? "none" : "auto" }}
              disabled={picked !== null}
              onClick={() => pick(i)}
            >
              <span className="face back">
                <span className="emoji">{BACKS[i % BACKS.length]}</span>
              </span>
              <span className="face front">
                <span className="act">{c}</span>
              </span>
            </button>
          );
        })}
      </div>

      {step === "pick" && <p className="hint">{t.deck_dont_overthink}</p>}

      {step === "respond" && (
        <Respond
          data={data}
          activity={activity}
          onDecide={(resp, prop) => {
            setResponse(resp);
            setProposed(prop || null);
            saveProgress(storeKey, { response: resp, proposed: prop || null });
            setStep(resp === "return" ? "counter" : "done");
          }}
        />
      )}

      {step === "pick" && phrase && (
        <p className="secret-words">
          🔑 {t.deck_secret} <strong>{phrase}</strong>
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Respond (confirm / propose / send back)                             */
/* ------------------------------------------------------------------ */

function Respond({ data, activity, onDecide }) {
  const { t, locale } = useT();
  const [mode, setMode] = useState("main"); // 'main' | 'propose'
  const slots = useMemo(() => alternativeSlots(data.when), [data.when]);

  if (mode === "propose") {
    return (
      <div style={{ marginTop: 18 }}>
        <p className="hint" style={{ marginBottom: 12 }}>
          {t.rp_pickBetter}
        </p>
        <div className="stack">
          {slots.map((s) => (
            <button
              key={s.value}
              className="slot"
              onClick={() => onDecide("propose", s.value)}
            >
              <div className="slot-when">{formatWhen(s.value, locale)}</div>
              <div className="slot-label">{t[s.key]}</div>
            </button>
          ))}
        </div>
        <div className="spacer" />
        <button className="btn btn-ghost" onClick={() => setMode("main")}>
          {t.rp_back}
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 18 }}>
      <div className="reveal">
        <div className="pill-row">
          {data.when && <span className="when">{formatWhen(data.when, locale)}</span>}
          {data.where && <span className="where">📍 {data.where}</span>}
        </div>
      </div>
      <div className="spacer" />
      <div className="stack">
        <button className="btn btn-primary" onClick={() => onDecide("confirm")}>
          {data.when ? t.rp_works : t.rp_sounds}
        </button>
        {data.when && (
          <button className="btn btn-soft btn-sm" onClick={() => setMode("propose")}>
            {t.rp_another}
          </button>
        )}
      </div>
      <button
        className="btn btn-ghost"
        onClick={() => onDecide("return")}
        style={{ marginTop: 8 }}
      >
        {t.rp_sendOwn}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ReplyReady — build the return link for the picker to send back      */
/* ------------------------------------------------------------------ */

function ReplyReady({ data, response, proposed, activity }) {
  const { t } = useT();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const payload = {
      v: 1,
      t: "reply",
      kind: response,
      from: data.to || "",
      to: data.from || "",
      card: activity || "",
      when: response === "propose" ? proposed : data.when,
      where: data.where || "",
      sticker: data.sticker || "",
      lang: data.lang || "", // carry the deck's language onto the reply
    };
    // Reuse the same phrase the picker just used (kept in localStorage), so the
    // sender can open the reply with the same word — no new secret to share.
    const phrase = mostRecentPhrase();
    seal(payload, phrase).then((token) => {
      setUrl(
        `${window.location.origin}${window.location.pathname}#r.${token}~${encodePhrase(phrase)}`
      );
      // Also drop the encrypted reply in the waiting room (best-effort) so the
      // sender's page can pick it up without a manual resend. No-ops if the KV
      // isn't configured — link-passing still works either way.
      putReply(data.room, token);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headline =
    response === "confirm"
      ? t.rr_confirmHead
      : response === "propose"
        ? t.rr_proposeHead
        : t.rr_returnHead;

  const sub =
    response === "confirm"
      ? t.rr_confirmSub(data.from)
      : response === "propose"
        ? t.rr_proposeSub
        : t.rr_returnSub(data.from);

  if (!url) {
    return (
      <div className="center">
        <div style={{ fontSize: 40 }}>💫</div>
        <p className="sub">{t.rr_getting}</p>
      </div>
    );
  }

  return (
    <ShareLink
      url={url}
      title={headline}
      sub={sub}
      who={data.from}
      sendVerb={t.send_it_back}
      sticker={response === "confirm" ? data.sticker : ""}
    />
  );
}

// The picker's phrase is stored under the deck token's localStorage key; the
// reply is sealed with that same phrase so both sides share one secret.
function mostRecentPhrase() {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith("pac:")) {
        const v = JSON.parse(localStorage.getItem(k) || "null");
        if (v?.phrase) return v.phrase;
      }
    }
  } catch {
    /* ignore */
  }
  return "";
}

/* ------------------------------------------------------------------ */
/* Outcome — sender opens the returned reply link                      */
/* ------------------------------------------------------------------ */

function Outcome({ data }) {
  const { t, locale } = useT();
  const who = data.from || "They";
  if (data.kind === "confirm") {
    return (
      <div className="center reveal">
        {data.sticker ? (
          <img className="reveal-sticker" src={stickerSrc(data.sticker)} alt="" width="160" height="160" />
        ) : (
          <div className="big-emoji">🎉</div>
        )}
        <h1>{t.oc_isIn(who)}</h1>
        <p className="sub">{t.oc_setFor}</p>
        <div className="activity">{data.card}</div>
        <div className="pill-row">
          {data.when && <span className="when">{formatWhen(data.when, locale)}</span>}
          {data.where && <span className="where">📍 {data.where}</span>}
        </div>
        <div className="note" style={{ marginTop: 22, textAlign: "left" }}>
          <span className="ic">💬</span>
          <span>{t.oc_dropMsg(who)}</span>
        </div>
      </div>
    );
  }
  if (data.kind === "propose") {
    return (
      <div className="center reveal">
        <div className="big-emoji">🕘</div>
        <h1>{t.oc_suggested(who)}</h1>
        <p className="sub">{t.oc_forPlan(data.card)}</p>
        <div className="pill-row">
          {data.when && <span className="when">{formatWhen(data.when, locale)}</span>}
          {data.where && <span className="where">📍 {data.where}</span>}
        </div>
        <div className="note" style={{ marginTop: 22, textAlign: "left" }}>
          <span className="ic">👍</span>
          <span>{t.oc_ifWorks(who)}</span>
        </div>
      </div>
    );
  }
  // return / bounce-back
  return (
    <div className="center reveal">
      <div className="big-emoji">🔄</div>
      <h1>{t.oc_sentBack(who)}</h1>
      <p className="sub">{t.oc_noStress}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          window.location.hash = "";
          window.location.reload();
        }}
      >
        {t.oc_makeNew}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Waiting — the sender's page that auto-refreshes for the answer      */
/* ------------------------------------------------------------------ */

// Collapsible "what did I actually send?" recap for peace of mind.
function SentRecap({ deck, to }) {
  const { t, locale } = useT();
  if (!deck) return null;
  return (
    <details className="recap">
      <summary>{t.wt_recapSummary(to)}</summary>
      <div className="recap-body">
        {deck.note && <p className="intro">{deck.note}</p>}
        <div className="recap-cards">
          {deck.cards.map((c, i) => (
            <span className="recap-card" key={i}>
              {c}
            </span>
          ))}
        </div>
        {(deck.when || deck.where) && (
          <div className="pill-row">
            {deck.when && <span className="when">{formatWhen(deck.when, locale)}</span>}
            {deck.where && <span className="where">📍 {deck.where}</span>}
          </div>
        )}
        {deck.sticker && (
          <div className="recap-sticker">
            <img src={stickerSrc(deck.sticker)} width="44" height="44" alt="" />
            <span>{t.wt_theirYes}</span>
          </div>
        )}
      </div>
    </details>
  );
}

// Compact "here's the link again" block for the waiting screen.
function ResendLink({ url, who }) {
  const { t } = useT();
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  if (!url) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      inputRef.current?.select();
      document.execCommand("copy");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ url });
        return;
      } catch {
        /* fall through */
      }
    }
    copy();
  }

  return (
    <div style={{ marginTop: 22, width: "100%" }}>
      <div className="hr-or"><span>{t.div_theLink}</span></div>
      <p className="sub" style={{ fontSize: 13.5, marginBottom: 10 }}>
        {t.wt_didntSend(who)}
      </p>
      <div className="linkbox">
        <input ref={inputRef} readOnly value={url} onFocus={(e) => e.target.select()} />
      </div>
      <div className="stack">
        <button className="btn btn-primary btn-sm" onClick={share}>
          {t.send_deck}
        </button>
        <button className="btn btn-soft btn-sm" onClick={copy}>
          {copied ? t.share_copied : t.share_copy}
        </button>
      </div>
    </div>
  );
}

function Waiting({ room }) {
  const { t, locale } = useT();
  const record = useMemo(() => safeRead(`pmroom:${room}`), [room]);
  const [phrase, setPhrase] = useState(record?.phrase || "");
  const [data, setData] = useState(null); // decrypted reply
  const [disabled, setDisabled] = useState(false); // KV not configured
  const [checkedAt, setCheckedAt] = useState(null);
  const who = record?.to || "them";

  useEffect(() => {
    if (!phrase) return;
    let stopped = false;
    let timer;

    async function tick() {
      const res = await getReply(room);
      if (stopped) return;
      if (res.disabled) {
        setDisabled(true);
        return; // stop polling; fall back to link-passing
      }
      setCheckedAt(new Date());
      if (res.blob) {
        try {
          const d = await unseal(res.blob, phrase);
          if (!stopped) {
            setData(d);
            return; // done — stop polling
          }
        } catch {
          /* wrong phrase or partial write; keep polling */
        }
      }
      timer = setTimeout(tick, 4000);
    }

    tick();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [room, phrase]);

  if (data) return <Outcome data={data} />;

  // Different device (no saved phrase): ask for it, same as opening a deck.
  if (!phrase) {
    return (
      <PhraseGate
        title={t.op_seeAnswer}
        onPhrase={(p) => setPhrase(p)}
        // We can't verify until a reply exists; accept and start polling.
        verify={async () => true}
      />
    );
  }

  if (disabled) {
    return (
      <div className="center">
        <div className="big-emoji">📬</div>
        <h1>{t.wt_waitingForPlain(who)}</h1>
        <p className="sub">{t.wt_disabled(who)}</p>
        <SentRecap deck={record?.deck} to={who} />
        <ResendLink url={record?.deckUrl} who={who} />
        <WaitingFooter hasLocal={!!record?.deckUrl} phrase={phrase} />
      </div>
    );
  }

  return (
    <div className="center">
      <div className="big-emoji waiting-pulse">💌</div>
      <h1>{t.wt_waitingFor(who)}</h1>
      <p className="sub">{t.wt_waitingSub}</p>
      <p className="sub" style={{ fontSize: 13, opacity: 0.8 }}>
        {checkedAt
          ? t.wt_lastChecked(
              checkedAt.toLocaleTimeString(locale, {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
              })
            )
          : t.wt_checking}
      </p>
      <SentRecap deck={record?.deck} to={who} />
      <ResendLink url={record?.deckUrl} who={who} />
      <WaitingFooter hasLocal={!!record?.deckUrl} phrase={phrase} />
    </div>
  );
}

// Device note (+ secret words) and start-over at the bottom of the waiting screen.
function WaitingFooter({ hasLocal, phrase }) {
  const { t } = useT();
  return (
    <>
      {hasLocal && (
        <div className="device-note">
          <p className="sub" style={{ margin: 0, fontSize: 12.5 }}>
            {t.wt_deviceNote}
          </p>
          {phrase && <p className="secret-words">🔑 {phrase}</p>}
        </div>
      )}
      <button className="btn btn-ghost btn-sm" onClick={resetHome}>
        {t.wt_startOver}
      </button>
    </>
  );
}

// Small reusable phrase prompt.
function PhraseGate({ title, onPhrase, verify }) {
  const { t } = useT();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e?.preventDefault();
    if (!value.trim()) return;
    setBusy(true);
    setError("");
    const ok = await verify(value);
    setBusy(false);
    if (ok) onPhrase(value);
    else setError(t.op_wrong);
  }

  return (
    <form className="center" onSubmit={submit}>
      <div style={{ fontSize: 46, marginBottom: 4 }}>🔒</div>
      <h1>{title}</h1>
      <p className="sub">{t.op_typePhrase}</p>
      <div className="block">
        <input
          type="text"
          autoFocus
          value={value}
          placeholder={t.ph_magicWord}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={busy}>
        {busy ? t.op_opening : t.op_unlock}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
