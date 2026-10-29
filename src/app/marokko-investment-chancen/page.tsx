import type { Metadata } from "next";
import DocumentPage from "../_document/DocumentPage";

/* Ad landing page: ~90% the same text as the memorandum, so kept out of
   search to avoid duplicate content; links are still followed */
export const metadata: Metadata = {
  title: "Der Deal-Flow-Report — Marokko Investment",
  description: "7 Investment-Chancen in Marokko, die institutionelle Investoren gerade sichern. Vertraulicher Report für qualifizierte Investoren.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/marokko-investment-chancen" },
};

export default function Page() {
  return <DocumentPage doc="dealflow" />;
}
