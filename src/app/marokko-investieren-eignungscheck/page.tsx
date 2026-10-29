import type { Metadata } from "next";
import EignungsCheck from "../_eignungs-check/EignungsCheck";

/* Campaign landing page, not linked from the site; indexed via the sitemap */
export const metadata: Metadata = {
  title: "In Marokko investieren: Eignungs-Check für Beteiligungen — Marokko Investment",
  description:
    "Beteiligen Sie sich an realen Sachwerten in Marokko: Immobilien, Infrastruktur und erneuerbare Energien. Prüfen Sie in 2 Minuten, ob eine Beteiligung für Sie in Frage kommt.",
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
