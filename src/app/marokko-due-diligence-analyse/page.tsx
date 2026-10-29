import type { Metadata } from "next";
import DocumentPage from "../_document/DocumentPage";

/* Ad landing page: ~90% the same text as the memorandum, so kept out of
   search to avoid duplicate content; links are still followed */
export const metadata: Metadata = {
  title: "Die Due-Diligence-Analyse — Marokko Investment",
  description: "Marokko als Investmentstandort: Chancen, Risiken, rechtliche Struktur und Steuern. Die ehrliche Due-Diligence-Analyse.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/marokko-due-diligence-analyse" },
};

export default function Page() {
  return <DocumentPage doc="due-diligence" />;
}
