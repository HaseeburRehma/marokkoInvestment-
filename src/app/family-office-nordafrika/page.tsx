import type { Metadata } from "next";
import DocumentPage from "../_document/DocumentPage";

/* Ad landing page: ~90% the same text as the memorandum, so kept out of
   search to avoid duplicate content; links are still followed */
export const metadata: Metadata = {
  title: "Das Family-Office-Briefing — Marokko Investment",
  description: "Wie Family Offices 2026 in Nordafrika allokieren, und was Privatinvestoren daraus lernen können.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/family-office-nordafrika" },
};

export default function Page() {
  return <DocumentPage doc="family-office" />;
}
