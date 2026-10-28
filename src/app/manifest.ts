import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marokko Investment",
    short_name: "Marokko Inv.",
    description: "Exklusiver Zugang zu Private-Equity-Investitionen in Marokko.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C0A07",
    theme_color: "#0C0A07",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
