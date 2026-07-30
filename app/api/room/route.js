// Minimal KV endpoint for the optional "waiting room".
//
// Stores one value (an already-encrypted reply blob) per room id, with a TTL.
// Talks to an Upstash-compatible Redis REST API — the same env vars Vercel KV
// and the Upstash Vercel integration inject. If those env vars aren't set, the
// endpoint reports { disabled: true } and the app falls back to link-passing.

export const runtime = "edge";

const TTL_SECONDS = 60 * 60 * 24 * 60; // 60 days
const MAX_BLOB = 6000; // encrypted reply blobs are a few hundred chars
const ID_RE = /^[A-Za-z0-9_-]{16,64}$/;

function creds() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(command) {
  const c = creds();
  const res = await fetch(c.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${c.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!res.ok) throw new Error("kv error");
  const json = await res.json();
  return json.result;
}

export async function GET(req) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id || !ID_RE.test(id)) {
    return Response.json({ error: "bad id" }, { status: 400 });
  }
  if (!creds()) return Response.json({ disabled: true, blob: null });
  try {
    const blob = await redis(["GET", `pm:${id}`]);
    return Response.json({ blob: blob ?? null });
  } catch {
    return Response.json({ error: "kv" }, { status: 502 });
  }
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad json" }, { status: 400 });
  }
  const { id, blob } = body || {};
  if (!id || !ID_RE.test(id) || typeof blob !== "string" || blob.length > MAX_BLOB) {
    return Response.json({ error: "bad input" }, { status: 400 });
  }
  if (!creds()) return Response.json({ disabled: true });
  try {
    await redis(["SET", `pm:${id}`, blob, "EX", String(TTL_SECONDS)]);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "kv" }, { status: 502 });
  }
}
