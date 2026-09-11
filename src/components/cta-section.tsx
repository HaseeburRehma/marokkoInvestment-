"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FadeUp } from "./animated-text";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_KEY",
          email,
          subject: "Warteliste (CTA) — Marokko Investment",
          from_name: "Marokko Investment",
        }),
      });
    } catch {
      // Silent fallback
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(200,120,50,0.12), transparent 70%),
            linear-gradient(180deg, #0a0a0a 0%, #0e0805 50%, #0a0a0a 100%)
          `,
        }}
      />

      <div className="relative max-w-[560px] mx-auto text-center">
        <FadeUp>
          <div className="w-16 h-[1px] bg-[rgba(230,190,140,0.4)] mx-auto mb-8" />

          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl font-medium
            text-[#f5ede0] leading-tight mb-4">
            Bereit für <em className="italic text-[#e6be8c]">den ersten Schritt?</em>
          </h2>

          <p className="text-sm text-white/45 leading-relaxed font-[family-name:var(--font-inter)]
            font-light mb-10 max-w-[400px] mx-auto">
            Der Zugang ist begrenzt. Tragen Sie sich ein und erhalten Sie eine persönliche Einladung,
            sobald ein Platz frei wird.
          </p>
        </FadeUp>

        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-cormorant)] text-xl text-[#e6be8c]"
          >
            Danke — wir melden uns bei Ihnen.
          </motion.p>
        ) : (
          <FadeUp delay={0.2}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[440px] mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ihre E-Mail-Adresse"
                required
                className="flex-1 bg-white/[0.06] border border-[rgba(230,190,140,0.3)] text-white
                  px-5 py-4 rounded-sm font-[family-name:var(--font-inter)] text-[15px] outline-none
                  transition-all duration-200 placeholder:text-white/40
                  focus:border-[rgba(230,190,140,0.8)]"
              />
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="btn-shimmer text-[#1a1008] border-none px-7 py-4 rounded-sm
                  font-[family-name:var(--font-inter)] font-semibold text-sm cursor-pointer
                  whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Anfragen
              </motion.button>
            </form>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
