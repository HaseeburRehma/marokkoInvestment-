import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz — Marokko Investment",
};

export default function Datenschutz() {
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
          Datenschutzerklärung
        </h1>

        <div className="space-y-8 text-sm text-white/50 leading-relaxed font-[family-name:var(--font-inter)]">
          <section>
            <h2 className="text-white/70 font-medium mb-2">1. Datenschutz auf einen Blick</h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">2. Datenerfassung auf dieser Website</h2>
            <h3 className="text-white/60 text-xs font-medium mb-1 mt-4">Wartelisten-Formular</h3>
            <p>
              Wenn Sie sich über unser Formular für die Warteliste anmelden, erheben wir Ihre
              E-Mail-Adresse. Diese Daten werden ausschließlich zur Kontaktaufnahme bezüglich
              unserer Investmentmöglichkeiten verwendet.
            </p>
            <p className="mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">3. Hosting</h2>
            <p>
              Diese Website wird bei einem externen Dienstleister gehostet (Hoster).
              Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den
              Servern des Hosters gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">4. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der
              Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung
              dieser Daten.
            </p>
            <p className="mt-3">
              Kontakt: info@marokkoinvestment.de
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">5. Widerruf Ihrer Einwilligung</h2>
            <p>
              Die Einwilligung zur Datenverarbeitung können Sie jederzeit per E-Mail an
              info@marokkoinvestment.de widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
              erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">6. Google Fonts</h2>
            <p>
              Diese Seite nutzt Google Fonts. Die Google Fonts werden lokal eingebunden
              oder über die Server von Google geladen. Dabei werden Daten an Google
              übertragen. Weitere Informationen finden Sie in der Datenschutzerklärung
              von Google.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
