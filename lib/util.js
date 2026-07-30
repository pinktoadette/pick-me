// Small helpers shared across the app. No dependencies.

// Sweet, warm, easy-to-say words for the auto-generated secret phrase.
const WORDS = [
  "honey", "sugar", "sunshine", "sparkle", "cupid", "darling", "sweetpea",
  "cuddle", "blossom", "moonbeam", "twinkle", "angel", "snuggle", "giggle",
  "bubbly", "cocoa", "dreamy", "lovebug", "cherry", "peaches", "starlight",
  "cutie", "sundae", "sprinkle", "blush", "twirl", "whimsy", "cozy",
  "dumpling", "mochi", "boba", "cookie", "muffin", "cupcake", "sweetie",
  "bonbon", "truffle", "macaron", "gumdrop", "lollipop", "jellybean",
  "marshmallow", "butterfly", "glow", "dazzle", "cinnamon", "caramel",
  "honeybee", "moonlight", "velvet", "sugarplum", "buttercup", "petal",
  "rosy", "sweetheart", "dreamboat", "smitten", "cherub", "sundrop",
];

export function randomPhrase(count = 3) {
  const picks = [];
  const bytes = crypto.getRandomValues(new Uint32Array(count));
  for (let i = 0; i < count; i++) picks.push(WORDS[bytes[i] % WORDS.length]);
  return picks.join(" ");
}

// Encode/decode the secret phrase so it can ride inside the share link.
export function encodePhrase(phrase) {
  return btoa(unescape(encodeURIComponent(phrase)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
export function decodePhrase(s) {
  try {
    return decodeURIComponent(
      escape(atob(s.replace(/-/g, "+").replace(/_/g, "/")))
    );
  } catch {
    return "";
  }
}

// Unguessable id for the optional "waiting room" KV row (16 random bytes).
export function randomRoomId() {
  const b = crypto.getRandomValues(new Uint8Array(16));
  let s = "";
  for (const x of b) s += String.fromCharCode(x);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Short, stable key for localStorage, derived from the token (djb2).
export function tokenKey(token) {
  let h = 5381;
  for (let i = 0; i < token.length; i++) h = ((h << 5) + h + token.charCodeAt(i)) >>> 0;
  return "pac:" + h.toString(36);
}

// Format a 'YYYY-MM-DDTHH:mm' local string for display.
export function formatWhen(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const date = d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} · ${time}`;
}

function toLocalInput(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(
    d.getHours()
  )}:${p(d.getMinutes())}`;
}

// Generate a few gentle alternate slots based on the chosen time.
export function alternativeSlots(when) {
  const base = new Date(when);
  if (Number.isNaN(base.getTime())) return [];
  const offsets = [
    { days: 1, label: "A day later" },
    { days: 2, label: "Two days later" },
    { days: 7, label: "Same time next week" },
  ];
  return offsets.map(({ days, label }) => {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return { value: toLocalInput(d), label };
  });
}
