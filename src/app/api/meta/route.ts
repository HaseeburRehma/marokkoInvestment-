import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

/* ── Meta Conversions API relay ──
   The browser posts here after it fires the pixel; we forward the same event
   (same event_id) server-side so ad blockers and iOS don't lose conversions. */

const ALLOWED = new Set([
  "PageView",
  "ViewContent",
  "Lead",
  "CompleteRegistration",
  "Contact",
  "MemorandumRequested",
  "FormStart",
]);

const sha = (v: string) => createHash("sha256").update(v).digest("hex");

export async function POST(req: NextRequest) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return NextResponse.json({ skipped: true });

  let body: {
    event?: string;
    eventId?: string;
    url?: string;
    params?: Record<string, unknown>;
    user?: { email?: string; phone?: string; name?: string };
    fbp?: string;
    fbc?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const { event, eventId, url, params = {}, user = {}, fbp, fbc } = body;
  if (!event || !ALLOWED.has(event) || !eventId || typeof eventId !== "string") {
    return NextResponse.json({ error: "bad event" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined;

  const user_data: Record<string, unknown> = {
    client_ip_address: ip,
    client_user_agent: req.headers.get("user-agent") ?? undefined,
    fbp,
    fbc,
  };
  if (user.email) user_data.em = [sha(user.email.trim().toLowerCase())];
  if (user.phone) {
    const digits = user.phone.replace(/\D/g, "").replace(/^00/, "").replace(/^0/, "49");
    if (digits) user_data.ph = [sha(digits)];
  }
  if (user.name) {
    const [fn, ...rest] = user.name.trim().toLowerCase().split(/\s+/);
    if (fn) user_data.fn = [sha(fn)];
    if (rest.length) user_data.ln = [sha(rest.join(" "))];
  }
  if (user.email) user_data.external_id = [sha(user.email.trim().toLowerCase())];

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId.slice(0, 64),
        event_source_url: typeof url === "string" ? url.slice(0, 500) : undefined,
        action_source: "website",
        user_data,
        custom_data: params,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) },
    );
    if (!res.ok) {
      console.error("Meta CAPI error:", res.status, (await res.text()).slice(0, 300));
      return NextResponse.json({ error: "capi failed" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Meta CAPI fetch failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "capi failed" }, { status: 502 });
  }
}
