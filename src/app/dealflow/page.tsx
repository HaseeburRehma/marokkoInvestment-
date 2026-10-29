import type { Metadata } from "next";
import DocumentPage from "../memorandum/DocumentPage";

/* Ad landing page: reachable only from campaigns, kept out of search */
export const metadata: Metadata = {
  title: "Der Deal-Flow-Report — Marokko Investment",
  description: "7 Investment-Chancen in Marokko, die institutionelle Investoren gerade sichern. Vertraulicher Report für qualifizierte Investoren.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/dealflow" },
};

export default function Page() {
  return <DocumentPage doc="dealflow" />;
}
