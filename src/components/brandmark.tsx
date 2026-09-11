"use client";

import { motion } from "framer-motion";

export function Brandmark() {
  return (
    <motion.div
      className="absolute top-9 left-1/2 -translate-x-1/2 z-10
        font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.3em]
        uppercase text-white/55"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    >
      Marokko Investment
    </motion.div>
  );
}
