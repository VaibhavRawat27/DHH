import { NextRequest, NextResponse } from "next/server";

// Presence is kept in process memory: fine for a single `next start` node or
// `next dev`. Each viewer heartbeats every ~15s; anyone we haven't heard from
// in STALE_MS has closed the tab (or lost the network) and drops off the count.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Beat = { lastSeen: number; listening: boolean };

const STALE_MS = 30_000;

// Stash on globalThis so the map survives dev hot-reloads.
const store: Map<string, Beat> =
  (globalThis as typeof globalThis & { __dhhPresence?: Map<string, Beat> })
    .__dhhPresence ?? new Map<string, Beat>();
(globalThis as typeof globalThis & { __dhhPresence?: Map<string, Beat> })
  .__dhhPresence = store;

function tally() {
  const now = Date.now();
  let listening = 0;
  for (const [id, beat] of store) {
    if (now - beat.lastSeen > STALE_MS) {
      store.delete(id);
      continue;
    }
    if (beat.listening) listening++;
  }
  return { online: store.size, listening };
}

export async function GET() {
  return NextResponse.json(tally());
}

export async function POST(req: NextRequest) {
  let body: { id?: unknown; listening?: unknown; leave?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    /* empty / non-JSON body — fall through to the id check */
  }

  const id =
    typeof body.id === "string" && body.id ? body.id.slice(0, 64) : null;
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  if (body.leave === true) {
    store.delete(id);
  } else {
    store.set(id, { lastSeen: Date.now(), listening: body.listening === true });
  }

  return NextResponse.json(tally());
}
