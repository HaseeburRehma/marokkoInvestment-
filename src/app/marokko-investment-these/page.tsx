import type { Metadata } from "next";
import DocumentPage from "../_document/DocumentPage";

/* Ad landing page: ~90% the same text as the memorandum, so kept out of
   search to avoid duplicate content; links are still followed */
export const metadata: Metadata = {
  title: "Das Thesis Paper — Marokko Investment",
  description: "Warum das nächste Jahrzehnt Nordafrika gehört. Eine Investment-These für qualifizierte Investoren.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/marokko-investment-these" },
};

export default function Page() {
  return <DocumentPage doc="thesis" />;
}
