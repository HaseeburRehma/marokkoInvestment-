"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "./animated-text";

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="20" width="12" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="24" y="12" width="16" height="28" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 24h4M12 28h4M12 32h4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M28 16h8M28 20h8M28 24h8M28 28h8M28 32h8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M4 40h40" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Immobilien",
    desc: "Premium-Lagen in Casablanca, Marrakesch und Tanger.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 36l8-8 6 4 8-12 10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 40h40" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="36" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M36 11v6M33 14h6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    title: "Infrastruktur",
    desc: "Straßen, Häfen, Logistik — das Rückgrat des Wachstums.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 13l3 3M32 32l3 3M13 35l3-3M32 16l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    title: "Energie",
    desc: "Solarparks und erneuerbare Energien in der Wüste.",
  },
];

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group relative flex flex-col items-center text-center p-8 md:p-10
        border border-white/[0.06] rounded-sm bg-white/[0.02]
        hover:bg-white/[0.04] hover:border-[rgba(230,190,140,0.15)]
        transition-all duration-500"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-b from-[rgba(230,190,140,0.03)] to-transparent rounded-sm pointer-events-none" />

      <motion.div
        className="text-[#e6be8c] mb-5"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {pillar.icon}
      </motion.div>

      <h3 className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl font-medium
        text-[#f5ede0] mb-3 tracking-wide">
        {pillar.title}
      </h3>

      <p className="text-sm text-white/45 leading-relaxed font-[family-name:var(--font-inter)] font-light max-w-[240px]">
        {pillar.desc}
      </p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#e6be8c]"
        initial={{ width: 0 }}
        whileHover={{ width: "60%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export function InvestmentPillars() {
  return (
    <section className="relative py-24 md:py-32 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060403] via-[#0a0a0a] to-[#0a0a0a]" />

      <div className="relative max-w-[960px] mx-auto">
        <FadeUp className="text-center mb-16 md:mb-20">
          <p className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-[0.3em]
            uppercase text-[rgba(230,190,140,0.6)] mb-4">
            Investmentbereiche
          </p>
          <div className="w-12 h-[1px] bg-[rgba(230,190,140,0.3)] mx-auto" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
