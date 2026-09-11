"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        ease: "easeOut",
      });
      const unsubscribe = rounded.on("change", (v) => setDisplay(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, count, rounded, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

const stats = [
  { value: 6.2, suffix: "%", label: "BIP-Wachstum", prefix: "" },
  { value: 47, suffix: "Mrd $", label: "FDI bis 2030", prefix: "" },
  { value: 3, suffix: "×", label: "Rendite vs. EU", prefix: "" },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28 px-6" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#080604]" />

      {/* Subtle horizontal line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r
          from-transparent via-[rgba(230,190,140,0.2)] to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: "60%" } : { width: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative max-w-[800px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.7,
                delay: i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <p className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl
                font-medium text-[#e6be8c] mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={2 + i * 0.3}
                />
              </p>
              <p className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.25em]
                uppercase text-white/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r
          from-transparent via-[rgba(230,190,140,0.15)] to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: "40%" } : { width: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      />
    </section>
  );
}
