"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp } from "./animated-text";

const reasons = [
  {
    number: "01",
    title: "Strategische Lage",
    desc: "Tor zwischen Europa und Afrika. Freihandelsabkommen mit 56 Ländern.",
  },
  {
    number: "02",
    title: "Stabiles Wachstum",
    desc: "Eines der am schnellsten wachsenden Volkswirtschaften Nordafrikas.",
  },
  {
    number: "03",
    title: "Infrastruktur-Boom",
    desc: "Tanger Med, Hochgeschwindigkeitszug, neue Wirtschaftszonen.",
  },
  {
    number: "04",
    title: "Erneuerbare Energien",
    desc: "Weltgrößter Solarpark Noor. Ziel: 52% erneuerbare bis 2030.",
  },
];

function ReasonRow({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group flex items-start gap-6 md:gap-10 py-8 border-b border-white/[0.06]
        hover:border-[rgba(230,190,140,0.15)] transition-colors duration-500 cursor-default"
    >
      <span className="font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(230,190,140,0.5)]
        mt-1 min-w-[28px]">
        {reason.number}
      </span>
      <div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl font-medium
          text-[#f5ede0] mb-1.5 group-hover:text-[#e6be8c] transition-colors duration-300">
          {reason.title}
        </h3>
        <p className="text-sm text-white/40 leading-relaxed font-[family-name:var(--font-inter)] font-light">
          {reason.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function WhyMorocco() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      <div className="relative max-w-[640px] mx-auto">
        <FadeUp className="mb-12 md:mb-16">
          <p className="font-[family-name:var(--font-jetbrains)] text-[11px] tracking-[0.3em]
            uppercase text-[rgba(230,190,140,0.6)] mb-5">
            Warum Marokko
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-medium
            text-[#f5ede0] leading-tight">
            Ein Markt. <em className="italic text-[#e6be8c]">Wenige Partner.</em>
          </h2>
        </FadeUp>

        {/* Scroll progress line */}
        <motion.div
          className="absolute left-0 top-[200px] w-[1px] bg-[rgba(230,190,140,0.2)] hidden md:block"
          style={{ height: lineHeight, maxHeight: "400px" }}
        />

        <div className="flex flex-col">
          {reasons.map((reason, i) => (
            <ReasonRow key={reason.number} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
