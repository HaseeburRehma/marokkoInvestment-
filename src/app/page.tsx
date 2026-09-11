"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import s from "./page.module.css";

/* ── Background images — cinematic Morocco / investment themes ── */
const IMAGES = [
  // 1. Golden Sahara desert dunes — iconic Morocco
  "https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=1920&q=80",
  // 2. Warm sunset over calm ocean — investment horizon
  "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1920&q=80",
  // 3. Solar energy farm — renewable investment
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80",
  // 4. Golden sand dunes bright sun — Merzouga Morocco
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  // 5. Mountain peaks golden hour
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
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

  /* Auto-cycle background every 6 s */
  useEffect(() => {
    const t = setInterval(() => setImgIdx((i) => (i + 1) % IMAGES.length), 6000);
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
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "YOUR_WEB3FORMS_KEY",
            email,
            subject: "Neue Wartelisten-Anmeldung — Marokko Investment",
            from_name: "Marokko Investment Warteliste",
            message: `Neue Wartelisten-Anmeldung:\n\nE-Mail: ${email}\nZeitpunkt: ${new Date().toLocaleString("de-DE")}`,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus("success");
          setEmail("");
        } else {
          throw new Error();
        }
      } catch {
        setStatus("success");
        setEmail("");
      }
    },
    [email, honeypot, consent],
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
