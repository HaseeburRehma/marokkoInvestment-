import type { Metadata } from "next";
import DocumentPage from "../memorandum/DocumentPage";

/* Ad landing page: reachable only from campaigns, kept out of search */
export const metadata: Metadata = {
  title: "Die Due-Diligence-Analyse — Marokko Investment",
  description: "Marokko als Investmentstandort: Chancen, Risiken, rechtliche Struktur und Steuern. Die ehrliche Due-Diligence-Analyse.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/due-diligence" },
};

export default function Page() {
  return <DocumentPage doc="due-diligence" />;
}
