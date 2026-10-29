import type { Metadata } from "next";
import DocumentPage from "./DocumentPage";

export const metadata: Metadata = {
  title: "Das vertrauliche Investoren-Memorandum — Marokko Investment",
  description:
    "Marokko 2026: Wohin institutionelles Kapital jetzt fließt und wie qualifizierte Privatinvestoren Zugang bekommen. Vertrauliches Dokument für einen kleinen Kreis.",
  alternates: { canonical: "/memorandum" },
};

export default function MemorandumPage() {
  return <DocumentPage doc="memorandum" />;
}
