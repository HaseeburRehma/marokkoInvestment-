"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CLARITY_ID,
  CONSENT_EVENT,
  GTM_ID,
  PIXEL_ID,
  getConsent,
  setConsent,
  trackClarity,
  trackMeta,
} from "@/lib/tracking";

/* ── Load Microsoft Clarity + Meta Pixel once consent is granted ── */
function loadScripts() {
  const w = window as unknown as Record<string, unknown>;

  if (!w.clarity) {
    (function (c: Record<string, unknown>, l: Document, a: string, r: string, i: string) {
      c[a] =
        c[a] ||
        function (...args: unknown[]) {
          ((c[a] as { q?: unknown[] }).q = (c[a] as { q?: unknown[] }).q || []).push(args);
        };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode!.insertBefore(t, y);
    })(w, document, "clarity", "script", CLARITY_ID);
    window.clarity!("consentv2", { ad_Storage: "granted", analytics_Storage: "granted" });
  }

  if (!document.getElementById("gtm-script")) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const t = document.createElement("script");
    t.id = "gtm-script";
    t.async = true;
    t.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
    document.head.appendChild(t);
  }

  if (PIXEL_ID && !w.fbq) {
    /* Standard Meta Pixel bootstrap */
    const n = function (...args: unknown[]) {
      const self = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
      if (self.callMethod) self.callMethod(...args);
      else self.queue.push(args);
    } as unknown as Record<string, unknown>;
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(t);
    window.fbq!("init", PIXEL_ID);
  }
}

/* Ad landing pages: each sends ViewContent so campaigns can retarget per page */
const LANDING_PAGES: Record<string, string> = {
  "/marokko-investoren-memorandum": "Investoren-Memorandum",
  "/marokko-investment-chancen": "Deal-Flow-Report",
  "/marokko-due-diligence-analyse": "Due-Diligence-Analyse",
  "/family-office-nordafrika": "Family-Office-Briefing",
  "/marokko-investment-these": "Thesis Paper",
  "/marokko-investieren-eignungscheck": "Eignungs-Check",
};

export default function Tracking() {
  const pathname = usePathname();
  const [consent, setLocal] = useState<"granted" | "denied" | null | "unknown">("unknown");

  useEffect(() => {
    const timer = setTimeout(() => setLocal(getConsent()), 0);
    const on = (e: Event) => setLocal((e as CustomEvent).detail);
    const reopen = () => setLocal(null);
    window.addEventListener(CONSENT_EVENT, on);
    window.addEventListener("mi-cookie-settings", reopen);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, on);
      window.removeEventListener("mi-cookie-settings", reopen);
    };
  }, []);

  /* Page view on every route once consented */
  useEffect(() => {
    if (consent !== "granted") return;
    loadScripts();
    trackMeta("PageView");
    const landing = LANDING_PAGES[pathname?.replace(/\/$/, "") ?? ""];
    if (landing) trackMeta("ViewContent", { content_name: landing, content_type: "landing_page" });
    trackClarity("page_view", { page: pathname ?? "/" });
  }, [consent, pathname]);

  /* First interaction with any form on the page → FormStart */
  useEffect(() => {
    if (consent !== "granted") return;
    let fired = false;
    const onFocus = (e: FocusEvent) => {
      if (fired || !(e.target as HTMLElement)?.closest?.("form")) return;
      fired = true;
      trackMeta("FormStart", { page: pathname ?? "/" }, {}, true);
      trackClarity("form_start");
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, [consent, pathname]);

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Einstellungen"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 9999,
        maxWidth: 520,
        margin: "0 auto",
        background: "rgba(14,12,10,0.96)",
        border: "1px solid rgba(230,190,140,0.25)",
        borderRadius: 10,
        padding: "18px 20px",
        color: "#f5ede0",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: 13,
        lineHeight: 1.55,
        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p style={{ margin: 0, color: "rgba(245,237,224,0.8)" }}>
        Wir nutzen Cookies und ähnliche Technologien (Google Analytics, Meta Pixel, Microsoft Clarity), um die
        Website zu verbessern und unsere Werbung zu messen. Details in der{" "}
        <a href="/datenschutz#cookies" style={{ color: "#e6be8c" }}>
          Datenschutzerklärung
        </a>
        .
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button
          onClick={() => setConsent("granted")}
          style={{
            flex: "1 1 140px",
            background: "#e6be8c",
            color: "#1a1008",
            border: 0,
            borderRadius: 6,
            padding: "10px 16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Alle akzeptieren
        </button>
        <button
          onClick={() => setConsent("denied")}
          style={{
            flex: "1 1 140px",
            background: "transparent",
            color: "rgba(245,237,224,0.75)",
            border: "1px solid rgba(230,190,140,0.3)",
            borderRadius: 6,
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Nur notwendige
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("mi-cookie-settings"))}
      style={{ color: "#e6be8c", textDecoration: "underline", cursor: "pointer", background: "none", border: 0, padding: 0 }}
    >
      Cookie-Einstellungen ändern
    </button>
  );
}
