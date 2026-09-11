"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "./hero-background";
import { Brandmark } from "./brandmark";
import { WaitlistForm } from "./waitlist-form";
import { FadeUp, LineReveal } from "./animated-text";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <Brandmark />

      <div className="relative z-[5] text-center px-6 sm:px-10 max-w-[720px] mx-auto">
        {/* Eyebrow */}
        <FadeUp delay={0.3}>
          <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.35em]
            uppercase text-[rgba(230,190,140,0.9)] mb-9">
            Nur auf Einladung
          </p>
        </FadeUp>

        {/* Headline */}
        <LineReveal delay={0.4}>
          <h1 className="font-[family-name:var(--font-cormorant)] font-medium text-[#f5ede0]
            tracking-[-0.01em] leading-[1.08] text-hero">
            Investiere in das
            <br />
            <motion.em
              className="italic text-[#e6be8c]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Marokko von morgen.
            </motion.em>
          </h1>
        </LineReveal>

        {/* Waitlist Form */}
        <WaitlistForm />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-transparent to-[rgba(230,190,140,0.4)]"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
