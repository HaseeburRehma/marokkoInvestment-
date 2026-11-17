import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Impressum — Marokko Investment",
  alternates: { canonical: "/impressum" },
};

const H2 = "text-white/80 font-medium mb-2";

export default function Impressum() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-[680px] mx-auto">
        <Link href="/" aria-label="Marokko Investment" className="inline-flex mb-10">
          <Logo height={40} />
        </Link>
        <br />
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

        <div className="space-y-8 text-sm text-white/55 leading-relaxed font-[family-name:var(--font-inter)]">
          <section>
            <h2 className={H2}>Angaben gemäß § 5 DDG</h2>
            <p>
              Marokko Investment – ein Projekt von TyloTech<br />
              Inhaber: Ilias El Aradi<br />
              Behrenstrasse 4<br />
              40233 Düsseldorf<br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className={H2}>Kontakt</h2>
            <p>
              E-Mail:{" "}
              <a href="mailto:info@marokkoinvestment.de" className="text-[#e6be8c] hover:underline">
                info@marokkoinvestment.de
              </a>
            </p>
          </section>

          <section>
            <h2 className={H2}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              Ilias El Aradi<br />
              Behrenstrasse 4<br />
              40233 Düsseldorf
            </p>
          </section>

          <section>
            <h2 className={H2}>Haftung für Inhalte</h2>
            <p>
              Marokko Investment ist ein reines Informationsprojekt von TyloTech. Als Diensteanbieter
              sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-3">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>

          <section>
            <h2 className={H2}>Haftung für Links</h2>
            <p>
              Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte
              wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
              Betreiber verantwortlich.
            </p>
          </section>

          <section>
            <h2 className={H2}>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

          <section id="finanzthemen">
            <h2 className={H2}>Hinweis zu Inhalten und Finanzthemen</h2>
            <p>
              Marokko Investment ist ein Informationsprojekt von TyloTech (Inhaber: Ilias El Aradi) und
              dient ausschließlich allgemeinen Informations- und Bildungszwecken rund um das Thema
              Marokko – insbesondere zu Land, Wirtschaft, Kultur, Gesellschaft, Markt und allgemeinen
              wirtschaftlichen Entwicklungen.
            </p>
            <p className="mt-3">
              Die bereitgestellten Inhalte stellen ausdrücklich keine Anlageberatung, Anlagevermittlung,
              Finanzberatung, Steuerberatung oder Rechtsberatung dar. Es handelt sich weder um ein
              öffentliches Angebot noch um eine Aufforderung zum Erwerb, zur Zeichnung oder zum Verkauf
              von Finanzinstrumenten, Vermögensanlagen, Wertpapieren, Unternehmensbeteiligungen oder
              sonstigen Kapitalanlagen im Sinne des Wertpapierhandelsgesetzes (WpHG), des
              Vermögensanlagengesetzes (VermAnlG), des Wertpapierprospektgesetzes (WpPG) oder des
              Kapitalanlagegesetzbuchs (KAGB).
            </p>
            <p className="mt-3">
              Marokko Investment erbringt keine erlaubnispflichtigen Finanzdienstleistungen im Sinne des
              Kreditwesengesetzes (KWG) oder des Wertpapierinstitutsgesetzes (WpIG). Es werden keine
              Gelder oder Vermögenswerte Dritter entgegengenommen, verwaltet, vermittelt oder angelegt.
              Marokko Investment unterliegt keiner Aufsicht durch die Bundesanstalt für
              Finanzdienstleistungsaufsicht (BaFin) und steht in keiner Verbindung zu dieser.
            </p>
            <p className="mt-3">
              Sämtliche Inhalte sind unverbindlich und ersetzen keine individuelle, professionelle
              Beratung durch entsprechend qualifizierte und zugelassene Stellen (z. B. zugelassene
              Anlageberater, Steuerberater oder Rechtsanwälte). Jede Entscheidung auf Grundlage der hier
              bereitgestellten Informationen erfolgt eigenverantwortlich und auf eigenes Risiko.
            </p>
            <p className="mt-3">
              Investitionen jeder Art sind mit erheblichen Risiken bis hin zum Totalverlust des
              eingesetzten Kapitals verbunden. Historische oder beispielhafte Darstellungen lassen keine
              Rückschlüsse auf zukünftige Entwicklungen zu. Für die Richtigkeit, Vollständigkeit und
              Aktualität der bereitgestellten Informationen wird keine Gewähr übernommen.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
