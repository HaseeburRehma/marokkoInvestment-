"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import s from "./page.module.css";

/* ── Background images — iconic Morocco landmarks ── */
const IMAGES = [
  "/images/casablanca-finance-city.jpg",   // Casablanca Finance City — modern towers & tram
  "/images/koutoubia-marrakech.jpg",       // Koutoubia Mosque gardens — Marrakech
  "/images/grand-theatre-rabat.jpg",       // Grand Théâtre de Rabat — Bouregreg river
];

type Variant = "a" | "b" | "c";

export default function Home() {
  const [variant, setVariant] = useState<Variant>("a");
  const [imgIdx, setImgIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* Auto-cycle background every 8 s */
  useEffect(() => {
    const t = setInterval(() => setImgIdx((i) => (i + 1) % IMAGES.length), 8000);
    return () => clearInterval(t);
  }, []);

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
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, variant, honeypot }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus("success");
          setEmail("");
        } else {
          setErrorMsg(data.error ?? "Ein Fehler ist aufgetreten.");
          setStatus("error");
        }
      } catch {
        setErrorMsg("Verbindungsfehler. Bitte erneut versuchen.");
        setStatus("error");
      }
    },
    [email, variant, honeypot, consent],
  );

  /* ── Variant-specific content ── */
  const buttonLabel =
    variant === "a" ? "Warteliste" : variant === "b" ? "Anfragen" : "Zugang anfragen";

  return (
    <>
      {/* ── VARIANT SWITCHER ── */}
      <nav className={s.switcher}>
        {(["a", "b", "c"] as const).map((key) => (
          <button
            key={key}
            className={`${s.switchBtn} ${variant === key ? s.switchActive : ""}`}
            onClick={() => setVariant(key)}
          >
            Variante {key.toUpperCase()}
          </button>
        ))}
      </nav>

      <section className={s.hero}>
        {/* ── Background image slider ── */}
        <div className={s.bgSlider}>
          {IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`${s.bgImg} ${i === imgIdx ? s.bgImgActive : ""}`}
              loading="eager"
              decoding="async"
            />
          ))}
        </div>

        {/* Overlays */}
        <div className={s.bgOverlay} />
        <div className={s.dunes} />
        <div className={s.vignette} />

        {/* ── VARIANT A ── */}
        <div
          className={`${s.content} ${variant === "a" ? s.visible : s.hidden}`}
        >
          <p className={s.eyebrow}>Nur auf Einladung</p>
          <h1 className={s.headlineA}>
            Investiere in das
            <br />
            <em>Marokko von morgen.</em>
          </h1>
        </div>

        {/* ── VARIANT B ── */}
        <div
          className={`${s.content} ${variant === "b" ? s.visible : s.hidden}`}
        >
          <p className={s.eyebrow}>Private Equity · Marokko</p>
          <h1 className={s.headlineB}>Ein Markt. Wenige Partner.</h1>
          <p className={s.sub}>
            Wir investieren in Immobilien, Infrastruktur und erneuerbare Energien
            in Marokko.
            <br />
            Der Zugang ist begrenzt. Tragen Sie sich für die Warteliste ein.
          </p>
        </div>

        {/* ── VARIANT C ── */}
        <div
          className={`${s.content} ${s.contentWide} ${variant === "c" ? s.visible : s.hidden}`}
        >
          <p className={s.subLabel}>Private Equity</p>
          <div className={s.line} />
          <h1 className={s.headlineC}>
            Marokko.
            <br />
            <em>Vor allen anderen.</em>
          </h1>
          <div className={s.line} />
        </div>

        {/* ── Shared form (always visible below active variant) ── */}
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
                    {status === "loading" ? "…" : buttonLabel}
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
                {variant === "a"
                  ? "Begrenzte Plätze · Private Equity · Immobilien, Infrastruktur & Energie"
                  : variant === "b"
                    ? "Sie erhalten eine persönliche Einladung, sobald ein Platz frei wird."
                    : "Immobilien · Infrastruktur · Solarparks · Nur nach Prüfung"}
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
    </>
  );
}
