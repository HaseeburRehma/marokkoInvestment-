import type { Metadata } from "next";
import DocumentPage from "../_document/DocumentPage";

/* Ad landing page: reachable only from campaigns, kept out of search */
export const metadata: Metadata = {
  title: "Das Family-Office-Briefing — Marokko Investment",
  description: "Wie Family Offices 2026 in Nordafrika allokieren, und was Privatinvestoren daraus lernen können.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/family-office-nordafrika" },
};

export default function Page() {
  return <DocumentPage doc="family-office" />;
}
