// Client helpers for the optional "waiting room" — one KV row that lets the
// sender's page auto-refresh instead of waiting for the picker to send a link
// back. Everything stored is the same encrypted reply blob used for
// link-passing, so the KV row holds no readable personal data.
//
// All calls fail soft: if the KV isn't configured (or the network hiccups),
// they return a disabled/empty result and the app falls back to link-passing.

// Write the encrypted reply blob under the room id. Returns true on success.
export async function putReply(room, blob) {
  if (!room || !blob) return false;
  try {
    const res = await fetch("/api/room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: room, blob }),
    });
    const json = await res.json();
    return !!json.ok;
  } catch {
    return false;
  }
}

// Read the reply blob for a room.
// Returns { disabled: true } if the KV isn't set up, else { blob: string|null }.
export async function getReply(room) {
  if (!room) return { disabled: true };
  try {
    const res = await fetch(`/api/room?id=${encodeURIComponent(room)}`, {
      cache: "no-store",
    });
    const json = await res.json();
    if (json.disabled) return { disabled: true };
    return { blob: json.blob || null };
  } catch {
    return { disabled: true };
  }
}
