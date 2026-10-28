/* ── Client-side tracking helpers (Meta Pixel + Conversions API + Clarity) ──
   Nothing fires until the visitor has accepted the cookie banner. */

export const CONSENT_KEY = "mi_consent";
export const CONSENT_EVENT = "mi-consent";
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const CLARITY_ID = "z4pw3kfntb";

type Fbq = (...args: unknown[]) => void;
type Clarity = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    clarity?: Clarity;
  }
}

export type Consent = "granted" | "denied" | null;

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(v: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}

const newEventId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function readCookie(name: string) {
  return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1];
}

/* Sends the same event to the browser pixel and the server (CAPI) with one
   shared event_id, so Meta deduplicates and keeps whichever arrives. */
export function trackMeta(
  event: string,
  params: Record<string, unknown> = {},
  user: { email?: string; phone?: string; name?: string } = {},
  custom = false,
) {
  if (getConsent() !== "granted") return;
  const eventId = newEventId();

  if (window.fbq && PIXEL_ID) {
    const [fn, ...rest] = (user.name ?? "").trim().toLowerCase().split(/\s+/);
    const am: Record<string, string> = {};
    if (user.email) am.em = user.email.trim().toLowerCase();
    if (user.phone) am.ph = user.phone.replace(/\D/g, "");
    if (fn) am.fn = fn;
    if (rest.length) am.ln = rest.join(" ");
    if (Object.keys(am).length) window.fbq("init", PIXEL_ID, am);
    window.fbq(custom ? "trackCustom" : "track", event, params, { eventID: eventId });
  }

  fetch("/api/meta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      event,
      eventId,
      url: location.href,
      params,
      user,
      fbp: readCookie("_fbp"),
      fbc: readCookie("_fbc"),
    }),
  }).catch(() => {});
}

export function trackClarity(event: string, tags: Record<string, string> = {}) {
  if (getConsent() !== "granted" || !window.clarity) return;
  for (const [k, v] of Object.entries(tags)) window.clarity("set", k, v);
  window.clarity("event", event);
}

/* A completed form: Lead on Meta (pixel + CAPI), event + upgrade on Clarity. */
export function trackLead(
  form: string,
  user: { email?: string; phone?: string; name?: string },
) {
  trackMeta(
    "Lead",
    { content_name: form, content_category: "Marokko Investment", currency: "EUR", value: 0 },
    user,
  );
  trackMeta("CompleteRegistration", { content_name: form, status: true }, user);
  trackClarity("lead", { form });
  window.clarity?.("upgrade", "lead");
}
