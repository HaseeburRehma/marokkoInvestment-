import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/lib/lenis-provider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marokko Investment — Investiere in das Marokko von morgen",
  description:
    "Exklusiver Zugang zu Private-Equity-Investitionen in Marokko. Immobilien, Infrastruktur & erneuerbare Energien. Nur auf Einladung.",
  keywords: [
    "Marokko Investment",
    "Private Equity",
    "Immobilien Marokko",
    "Infrastruktur",
    "Erneuerbare Energien",
    "Investition",
  ],
  metadataBase: new URL("https://marokkoinvestment.de"),
  openGraph: {
    title: "Marokko Investment — Investiere in das Marokko von morgen",
    description:
      "Exklusiver Zugang zu Private-Equity-Investitionen in Marokko. Begrenzte Plätze.",
    url: "https://marokkoinvestment.de",
    siteName: "Marokko Investment",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marokko Investment",
    description:
      "Investiere in das Marokko von morgen. Private Equity — Nur auf Einladung.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <LenisProvider>
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
