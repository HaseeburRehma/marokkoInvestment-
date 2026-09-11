"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import s from "./page.module.css";

/* ── Background images — water (Rabat) first ── */
const IMAGES = [
  "/images/grand-theatre-rabat.jpg",       // Grand Théâtre de Rabat — Bouregreg river & boats
  "/images/casablanca-finance-city.jpg",   // Casablanca Finance City — modern towers & tram
  "/images/koutoubia-marrakech.jpg",       // Koutoubia Mosque gardens — Marrakech
];

export default function Home() {
  const [imgIdx, setImgIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* Enable transitions after first paint (avoids strict-mode flash) */
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Auto-cycle background every 8 s — only after mount */
  useEffect(() => {
    if (!mounted) return;
    const t = setInterval(() => setImgIdx((i) => (i + 1) % IMAGES.length), 8000);
    return () => clearInterval(t);
  }, [mounted]);

  /* Form submit */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (honeypot) return;

      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMsg("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        setStatus("error");
        return;
      }
      if (!consent) {
        setErrorMsg("Bitte stimmen Sie der Datenschutzerklärung zu.");
        setStatus("error");
        return;
      }

      setStatus("loading");
      setErrorMsg("");

      try {
        /* Submit directly to Web3Forms (free plan requires client-side) */
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "241ac8bf-f24f-4a36-b8f4-364360c35415",
            subject: `Neue Wartelisten-Anmeldung — ${email.trim()}`,
            from_name: "Marokko Investment",
            replyto: email.trim(),
            "E-Mail": email.trim(),
            "Formular": "Warteliste",
            "Zeitpunkt": new Date().toLocaleString("de-DE", {
              timeZone: "Europe/Berlin",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            "Quelle": "marokkoinvestment.de",
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus("success");
          setEmail("");
        } else {
          setErrorMsg(data.message ?? "Ein Fehler ist aufgetreten.");
          setStatus("error");
        }
      } catch {
        setErrorMsg("Verbindungsfehler. Bitte erneut versuchen.");
        setStatus("error");
      }
    },
    [email, honeypot, consent],
  );

  return (
    <section className={s.hero}>
      {/* ── Background image slider ── */}
      <div className={s.bgSlider}>
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={s.bgImg}
            style={{
              opacity: i === imgIdx ? 1 : 0,
              transition: mounted ? "opacity 2.5s ease-in-out" : "none",
            }}
            loading="eager"
            decoding="async"
          />
        ))}
      </div>

      {/* Overlays */}
      <div className={s.bgOverlay} />
      <div className={s.dunes} />
      <div className={s.vignette} />

      {/* ── Content ── */}
      <div className={s.content}>
        <p className={s.eyebrow}>Nur auf Einladung</p>
        <h1 className={s.headlineA}>
          Investiere in das
          <br />
          <em>Marokko von morgen.</em>
        </h1>
      </div>

      {/* ── Form ── */}
      <div className={s.formSection}>
        {status === "success" ? (
          <div className={s.successMsg}>
            <p className={s.successTitle}>
              Danke — Sie stehen auf der Warteliste.
            </p>
            <p className={s.successSub}>Wir melden uns bei Ihnen.</p>
          </div>
        ) : (
          <div className={s.formWrap}>
            <form onSubmit={handleSubmit} className={s.formInner}>
              <div className={s.formRow}>
                <input
                  type="email"
                  className={s.formInput}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Ihre E-Mail-Adresse"
                  autoComplete="email"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  className={s.formButton}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "…" : "Warteliste"}
                </button>
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {status === "error" && errorMsg && (
                <p className={s.errorMsg}>{errorMsg}</p>
              )}

              <label className={s.consentLabel}>
                <input
                  type="checkbox"
                  className={s.consentCheckbox}
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (status === "error") setStatus("idle");
                  }}
                />
                <span className={s.consentText}>
                  Ich stimme der Verarbeitung meiner E-Mail-Adresse gemäß der{" "}
                  <a href="/datenschutz">Datenschutzerklärung</a> zu.
                </span>
              </label>
            </form>

            <p className={s.microcopy}>
              Begrenzte Plätze · Private Equity · Immobilien, Infrastruktur &
              Energie
            </p>
          </div>
        )}
      </div>

      <footer className={s.footer}>
        <a href="/impressum">Impressum</a>
        <span className={s.dot}>·</span>
        <a href="/datenschutz">Datenschutz</a>
      </footer>
    </section>
  );
}
