"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative py-10 px-6 border-t border-white/[0.05]">
      <div className="absolute inset-0 bg-[#060403]" />

      <div className="relative max-w-[800px] mx-auto flex flex-col sm:flex-row items-center
        justify-between gap-4">
        {/* Brand */}
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] tracking-[0.25em]
          uppercase text-white/30">
          Marokko Investment
        </p>

        {/* Legal links */}
        <div className="flex items-center gap-6">
          <a
            href="/impressum"
            className="font-[family-name:var(--font-inter)] text-[11px] text-white/25
              hover:text-white/50 transition-colors duration-300"
          >
            Impressum
          </a>
          <span className="text-white/10 text-[10px]">·</span>
          <a
            href="/datenschutz"
            className="font-[family-name:var(--font-inter)] text-[11px] text-white/25
              hover:text-white/50 transition-colors duration-300"
          >
            Datenschutz
          </a>
        </div>

        {/* Copyright */}
        <p className="font-[family-name:var(--font-inter)] text-[10px] text-white/20">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
