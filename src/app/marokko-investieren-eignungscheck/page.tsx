import type { Metadata } from "next";
import EignungsCheck from "../_eignungs-check/EignungsCheck";

/* Ad landing page: reachable only from campaigns, kept out of search */
export const metadata: Metadata = {
  title: "Eignungs-Check — Marokko Investment",
  description:
    "Beteiligen Sie sich an realen Sachwerten in Marokko: Immobilien, Infrastruktur und erneuerbare Energien. Prüfen Sie in 2 Minuten, ob eine Beteiligung für Sie in Frage kommt.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/marokko-investieren-eignungscheck" },
  openGraph: {
    title: "Eignungs-Check — Marokko Investment",
    description: "Prüfen Sie in 2 Minuten, ob eine Beteiligung an realen Sachwerten in Marokko für Sie in Frage kommt.",
    url: "https://www.marokkoinvestment.de/marokko-investieren-eignungscheck",
    images: [{ url: "/images/lp/projekt.webp" }],
  },
};

export default function Page() {
  return <EignungsCheck />;
}
