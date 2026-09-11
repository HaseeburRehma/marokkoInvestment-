"use client";

import { useState } from "react";
import s from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  return (
    <>
      <section className={s.hero}>
        <div className={s.bgMorocco} />
        <div className={s.dunes} />
        <div className={s.vignette} />

        <div className={s.brandmark}>Marokko Investment</div>

        <div className={s.content}>
          <p className={s.eyebrow}>Nur auf Einladung</p>

          <h1 className={s.headline}>
            Investiere in das
            <br />
            <em>Marokko von morgen.</em>
          </h1>

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
                Begrenzte Plätze · Private Equity · Immobilien, Infrastruktur
                &amp; Energie
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
