/* ── Client-side tracking helpers (Meta Pixel + Conversions API + Clarity + GTM/GA4) ──
   Nothing fires until the visitor has accepted the cookie banner. */

export const CONSENT_KEY = "mi_consent";
export const CONSENT_EVENT = "mi-consent";
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1126487640138424";
export const CLARITY_ID = "z4pw3kfntb";
export const GTM_ID = "GTM-P9JSMVLL";

type Fbq = (...args: unknown[]) => void;
type Clarity = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    clarity?: Clarity;
    dataLayer?: Record<string, unknown>[];
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

/* GTM forwards these to GA4 (tag "GA4 Event - Lead & Form Start"). */
export function pushDataLayer(event: string, params: Record<string, unknown> = {}) {
  if (getConsent() !== "granted") return;
  (window.dataLayer = window.dataLayer || []).push({ event, ...params });
}

export function trackClarity(event: string, tags: Record<string, string> = {}) {
  if (getConsent() !== "granted" || !window.clarity) return;
  for (const [k, v] of Object.entries(tags)) window.clarity("set", k, v);
  window.clarity("event", event);
}

/* A completed form: Lead on Meta (pixel + CAPI), event + upgrade on Clarity,
   generate_lead for GA4. `extra` carries form-specific answers. */
export function trackLead(
  form: string,
  user: { email?: string; phone?: string; name?: string },
  extra: Record<string, string | number> = {},
) {
  trackMeta(
    "Lead",
    { content_name: form, content_category: "Marokko Investment", currency: "EUR", value: 0, ...extra },
    user,
  );
  trackMeta("CompleteRegistration", { content_name: form, status: true }, user);
  trackClarity("lead", { form });
  pushDataLayer("generate_lead", { form_name: form, ...extra });
  window.clarity?.("upgrade", "lead");
}

/* Funnel steps of a multi-step form (Eignungs-Check). Custom Meta events
   so ads can optimise on quiz progress, mirrored to GA4 and Clarity. */
export function trackQuizStep(form: string, step: number, question: string, answer: string) {
  if (step === 1) {
    trackMeta("QuizStart", { content_name: form }, {}, true);
    pushDataLayer("quiz_start", { form_name: form });
  }
  trackMeta("QuizStep", { content_name: form, step, question, answer }, {}, true);
  /* numbered event names, so GA4 funnels work without custom dimensions */
  pushDataLayer(`quiz_step_${step}`, { form_name: form, step, question, answer });
  trackClarity("quiz_step", { [`quiz_${question}`]: answer });
}

/* A lead that fits the target profile; worth optimising campaigns on. */
export function trackQualifiedLead(
  form: string,
  user: { email?: string; phone?: string; name?: string },
  extra: Record<string, string | number> = {},
) {
  trackMeta("QualifiedLead", { content_name: form, currency: "EUR", value: 0, ...extra }, user, true);
  pushDataLayer("qualified_lead", { form_name: form, ...extra });
  trackClarity("qualified_lead");
}

/* Campaign attribution (utm_*, fbclid, gclid) read from the landing URL at
   submit time, so the lead email says which ad brought the visitor. Nothing
   is stored on the device. */
const ATTR_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];

export function getAttribution(): Record<string, string> {
  const q = new URLSearchParams(location.search);
  const found: Record<string, string> = {};
  for (const k of ATTR_PARAMS) {
    const v = q.get(k);
    if (v) found[k] = v.slice(0, 200);
  }
  return found;
}
