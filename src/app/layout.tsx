import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Tracking from "./Tracking";

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

/* Arabic glyphs for the landing pages' AR version (Inter has none); only
   downloaded when Arabic text is on the page */
const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
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
  ],
  metadataBase: new URL("https://www.marokkoinvestment.de"),
  openGraph: {
    title: "Marokko Investment — Investiere in das Marokko von morgen",
    description:
      "Exklusiver Zugang zu Private-Equity-Investitionen in Marokko. Begrenzte Plätze.",
    url: "https://www.marokkoinvestment.de",
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
  robots: { index: true, follow: true },
  verification: { google: "KOZTH7Lcl9qRoXpHAvfm-MxpomM6MQoFFgPE-8VBWRw" },
};

export const viewport: Viewport = {
  themeColor: "#0C0A07",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${inter.variable} ${notoArabic.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
        <Tracking />
      </body>
    </html>
  );
}
