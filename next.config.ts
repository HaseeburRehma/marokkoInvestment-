import type { NextConfig } from "next";

/* Landing pages moved to keyword URLs; old links (ads, emails) keep working */
const MOVED: Record<string, string> = {
  "/memorandum": "/marokko-investoren-memorandum",
  "/dealflow": "/marokko-investment-chancen",
  "/due-diligence": "/marokko-due-diligence-analyse",
  "/family-office": "/family-office-nordafrika",
  "/thesis": "/marokko-investment-these",
  "/eignungs-check": "/marokko-investieren-eignungscheck",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(MOVED).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
