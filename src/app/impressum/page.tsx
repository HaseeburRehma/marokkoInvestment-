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
          text-[#f5ede0] mb-10">
          Impressum
        </h1>

        <div className="space-y-8 text-sm text-white/50 leading-relaxed font-[family-name:var(--font-inter)]">
          <section>
            <h2 className="text-white/70 font-medium mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              Marokko Investment<br />
              [Vollständiger Name / Firma eintragen]<br />
              [Straße und Hausnummer]<br />
              [PLZ Ort]<br />
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
            <p>
              [Name eintragen]<br />
              [Anschrift eintragen]
            </p>
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
        </div>
      </div>
    </main>
  );
}
