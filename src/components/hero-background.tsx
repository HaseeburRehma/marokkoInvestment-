"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Particle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "0%",
        background: `rgba(230, 190, 140, ${0.2 + Math.random() * 0.3})`,
      }}
      animate={{
        y: [0, -window?.innerHeight || -800],
        x: [0, (Math.random() - 0.5) * 60],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 6,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

export function HeroBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    x: Math.random() * 100,
    size: 1 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Morocco desert gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 70% 20%, rgba(200,120,50,0.35), transparent 55%),
            radial-gradient(ellipse at 20% 80%, rgba(120,50,30,0.45), transparent 60%),
            linear-gradient(180deg, #1a1008 0%, #0e0805 55%, #060403 100%)
          `,
        }}
      />

      {/* SVG wave shape from haikei-style */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "40%" }}
      >
        <defs>
          <linearGradient id="duneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(10,6,4,0.8)" />
          </linearGradient>
        </defs>
        <path
          d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,208C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#duneGrad)"
          opacity="0.6"
        />
        <path
          d="M0,288L60,272C120,256,240,224,360,218.7C480,213,600,235,720,234.7C840,235,960,213,1080,202.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          fill="rgba(10,6,4,0.9)"
          opacity="0.8"
        />
      </svg>

      {/* Dune silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%]">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.5))",
          }}
        />
        <div
          className="absolute bottom-0 left-[-10%] right-[-10%] h-[60%]"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 30% 100%, #0a0604 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-[-10%] right-[-10%] h-[45%]"
          style={{
            background:
              "radial-gradient(ellipse 90% 100% at 75% 100%, #120a05 45%, transparent 72%)",
          }}
        />
      </div>

      {/* Floating particles */}
      {mounted &&
        particles.map((p) => (
          <Particle key={p.id} delay={p.delay} x={p.x} size={p.size} />
        ))}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Subtle light ray */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(230,190,140,0.08), transparent 70%)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
