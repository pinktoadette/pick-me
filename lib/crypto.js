// Zero-dependency client-side encryption using the Web Crypto API.
//
// The unlock phrase is stretched into an AES-GCM key with PBKDF2, then used to
// encrypt the game payload. The resulting bytes are packed into a single
// URL-safe token. Nothing here ever touches a server: the token lives only in
// the URL fragment (#...) and in the two people's messages to each other.
//
// Envelope layout (before base64url):
//   [ 0x01 version ][ 16-byte salt ][ 12-byte iv ][ ciphertext ]

const enc = new TextEncoder();
const dec = new TextDecoder();

// Forgiving normalization so "Otter Lantern " matches "otter lantern".
function normalizePhrase(phrase) {
  return phrase.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();
}

function b64urlEncode(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const s = atob(padded);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

async function deriveKey(phrase, salt) {
  const base = await crypto.subtle.importKey(
    "raw",
    enc.encode(normalizePhrase(phrase)),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt an object -> URL-safe token.
export async function seal(obj, phrase) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(phrase, salt);
  const ct = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      enc.encode(JSON.stringify(obj))
    )
  );
  const out = new Uint8Array(1 + salt.length + iv.length + ct.length);
  out[0] = 1;
  out.set(salt, 1);
  out.set(iv, 1 + salt.length);
  out.set(ct, 1 + salt.length + iv.length);
  return b64urlEncode(out);
}

// Decrypt a token -> object. Throws if the phrase is wrong or data is corrupt.
export async function unseal(token, phrase) {
  const raw = b64urlDecode(token);
  if (raw[0] !== 1) throw new Error("Unrecognized link version.");
  const salt = raw.slice(1, 17);
  const iv = raw.slice(17, 29);
  const ct = raw.slice(29);
  const key = await deriveKey(phrase, salt);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return JSON.parse(dec.decode(pt));
}
