import type { Metadata } from "next";
import EignungsCheck from "./EignungsCheck";

/* Ad landing page: reachable only from campaigns, kept out of search */
export const metadata: Metadata = {
  title: "Eignungs-Check — Marokko Investment",
  description:
    "Beteiligen Sie sich an realen Sachwerten in Marokko: Immobilien, Infrastruktur und erneuerbare Energien. Prüfen Sie in 2 Minuten, ob eine Beteiligung für Sie in Frage kommt.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/eignungs-check" },
  openGraph: {
    title: "Eignungs-Check — Marokko Investment",
    description: "Prüfen Sie in 2 Minuten, ob eine Beteiligung an realen Sachwerten in Marokko für Sie in Frage kommt.",
    url: "https://www.marokkoinvestment.de/eignungs-check",
    images: [{ url: "/images/lp/projekt.webp" }],
  },
};

export default function Page() {
  return <EignungsCheck />;
}
