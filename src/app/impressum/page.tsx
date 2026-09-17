import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — Marokko Investment",
};

export default function Impressum() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-[600px] mx-auto">
        <Link
          href="/"
          className="inline-block font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.3em]
            uppercase text-white/40 hover:text-[#e6be8c] transition-colors mb-12"
        >
          ← Zurück
        </Link>

        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-medium
          text-[#f5ede0] mb-4">
          Impressum
        </h1>

        <p className="text-sm text-[#e6be8c]/70 mb-10 font-[family-name:var(--font-inter)]">
          Marokko Investment befindet sich derzeit in Gründung (i.&nbsp;G.).
        </p>

        <div className="space-y-8 text-sm text-white/50 leading-relaxed font-[family-name:var(--font-inter)]">
          <section>
            <h2 className="text-white/70 font-medium mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              Marokko Investment (in Gründung)<br />
              Jawad Malloul<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">Kontakt</h2>
            <p>
              E-Mail: info@marokkoinvestment.de
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>Jawad Malloul</p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht.
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">Hinweis zu Finanzinhalten</h2>
            <p>
              Diese Website dient ausschließlich der allgemeinen Information und stellt kein öffentliches
              Angebot, keine Aufforderung zum Erwerb von Finanz- oder Vermögensanlagen und keine Anlage-,
              Rechts- oder Steuerberatung dar. Investitionen sind mit Risiken bis hin zum Totalverlust
              des eingesetzten Kapitals verbunden.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
