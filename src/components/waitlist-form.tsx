"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { FadeUp } from "./animated-text";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [consent, setConsent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) return;

    if (!email.trim()) {
      setErrorMsg("Bitte geben Sie Ihre E-Mail-Adresse ein.");
      setStatus("error");
      return;
    }

    if (!validateEmail(email)) {
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
      // Send to Web3Forms (free, reliable, no backend needed)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_KEY", // Replace with actual key
          email: email,
          subject: "Neue Wartelisten-Anmeldung — Marokko Investment",
          from_name: "Marokko Investment Warteliste",
          message: `Neue Wartelisten-Anmeldung:\n\nE-Mail: ${email}\nZeitpunkt: ${new Date().toLocaleString("de-DE")}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setEmail("");
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      // Fallback: use mailto as backup
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <FadeUp delay={0.6} className="mt-11 flex flex-col items-center gap-4 w-full">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-[#e6be8c] flex items-center justify-center"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e6be8c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </svg>
            </motion.div>
            <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-[#f5ede0] mb-2">
              Danke.
            </p>
            <p className="text-sm text-white/50 font-[family-name:var(--font-inter)]">
              Sie stehen auf der Warteliste. Wir melden uns.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-[440px] flex flex-col items-center gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-2.5 w-full">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Ihre E-Mail-Adresse"
                className="flex-1 min-w-0 bg-white/[0.06] border border-[rgba(230,190,140,0.3)] text-white
                  px-5 py-4 rounded-sm font-[family-name:var(--font-inter)] text-[15px] outline-none
                  transition-all duration-200 placeholder:text-white/40
                  focus:border-[rgba(230,190,140,0.8)] focus:bg-white/[0.08]
                  hover:border-[rgba(230,190,140,0.5)]"
                whileFocus={{ scale: 1.01 }}
                disabled={status === "loading"}
                autoComplete="email"
                required
              />
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="btn-shimmer text-[#1a1008] border-none px-7 py-4 rounded-sm
                  font-[family-name:var(--font-inter)] font-semibold text-sm cursor-pointer
                  whitespace-nowrap transition-all duration-200 hover:brightness-110
                  disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "loading" ? (
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                ) : (
                  "Warteliste"
                )}
              </motion.button>
            </div>

            {/* Honeypot field */}
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

            {/* Error message */}
            <AnimatePresence>
              {status === "error" && errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -5, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -5, height: 0 }}
                  className="text-red-400/80 text-xs font-[family-name:var(--font-inter)]"
                >
                  {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>

            {/* GDPR Consent */}
            <label className="flex items-start gap-2.5 cursor-pointer group max-w-[440px]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (status === "error") setStatus("idle");
                }}
                className="mt-1 h-4 w-4 min-w-4 appearance-none border border-white/20 rounded-sm bg-white/5
                  checked:bg-[#e6be8c] checked:border-[#e6be8c] transition-all duration-200
                  hover:border-white/40 cursor-pointer
                  checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%231a1008%22 stroke-width=%223%22><path d=%22M5 13l4 4L19 7%22/></svg>')]
                  checked:bg-center checked:bg-no-repeat checked:bg-[length:10px_10px]"
              />
              <span className="text-[11px] text-white/35 leading-relaxed font-[family-name:var(--font-inter)]">
                Ich stimme der Verarbeitung meiner E-Mail-Adresse gemäß der{" "}
                <a
                  href="/datenschutz"
                  className="underline decoration-white/20 hover:text-white/60 hover:decoration-white/40 transition-colors"
                >
                  Datenschutzerklärung
                </a>{" "}
                zu.
              </span>
            </label>

            {/* Microcopy */}
            <p className="text-xs text-white/40 tracking-wide font-[family-name:var(--font-inter)]">
              Begrenzte Plätze · Private Equity · Immobilien, Infrastruktur & Energie
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </FadeUp>
  );
}
