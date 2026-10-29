import type { Metadata } from "next";
import DocumentPage from "../_document/DocumentPage";

/* Ad landing page: reachable only from campaigns, kept out of search */
export const metadata: Metadata = {
  title: "Das Thesis Paper — Marokko Investment",
  description: "Warum das nächste Jahrzehnt Nordafrika gehört. Eine Investment-These für qualifizierte Investoren.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/marokko-investment-these" },
};

export default function Page() {
  return <DocumentPage doc="thesis" />;
}
