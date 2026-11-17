import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/Logo";
import { CookieSettingsButton } from "../Tracking";

export const metadata: Metadata = {
  title: "Datenschutz — Marokko Investment",
};

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-6">
      <div className="max-w-[600px] mx-auto">
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
            <h2 className="text-white/70 font-medium mb-2">2. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-3">
              Marokko Investment – ein Projekt von TyloTech<br />
              Inhaber: Ilias El Aradi<br />
              Behrenstrasse 4<br />
              40233 Düsseldorf<br />
              Deutschland<br />
              E-Mail: info@marokkoinvestment.de
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">3. Datenerfassung auf dieser Website</h2>
            <h3 className="text-white/60 text-xs font-medium mb-1 mt-4">Wartelisten-Formular</h3>
            <p>
              Wenn Sie sich über unser Formular für die Warteliste anmelden, erheben wir Ihre
              E-Mail-Adresse. Diese Daten werden ausschließlich zur Kontaktaufnahme bezüglich
              unserer Investmentmöglichkeiten verwendet.
            </p>
            <p className="mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
            <h3 className="text-white/60 text-xs font-medium mb-1 mt-6">Dokument-Anfragen und Eignungs-Check</h3>
            <p>
              Wenn Sie ein Dokument anfordern oder den Eignungs-Check ausfüllen, verarbeiten wir die von
              Ihnen eingegebenen Angaben: Name, E-Mail-Adresse, Telefonnummer und – beim Eignungs-Check –
              Ihre Antworten (Anlagevolumen, Ziel, Erfahrung, Zeitpunkt). Zusätzlich speichern wir, über
              welche Seite und welche Kampagne (z.&nbsp;B. utm-Parameter in der Adresse) Sie zu uns
              gekommen sind. Die Daten nutzen wir ausschließlich, um Ihre Anfrage zu bearbeiten, Ihnen
              eine Eingangsbestätigung zu senden und Sie persönlich zu kontaktieren.
            </p>
            <p className="mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über die Checkbox im Formular)
              und Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Kommunikation auf Ihre Anfrage). Die Daten
              werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine
              gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
            <p className="mt-3">
              Für den Versand der E-Mails setzen wir den Dienst Resend (Resend, Inc., USA) als
              Auftragsverarbeiter ein. Ist dieser Dienst nicht erreichbar, wird die Anfrage ersatzweise
              über den Formulardienst Web3Forms (web3forms.com) an uns übermittelt. Für
              Übermittlungen in Drittländer stützen wir uns auf die Standardvertragsklauseln der
              EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">4. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA)
              gehostet. Beim Aufruf der Seiten verarbeitet Vercel technisch notwendige Daten wie
              IP-Adresse, Zeitpunkt und aufgerufene Adresse in Server-Logfiles. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren, stabilen Betrieb);
              die Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw.
              der Standardvertragsklauseln.
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">5. Ihre Rechte</h2>
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
            <h2 className="text-white/70 font-medium mb-2">6. Widerruf Ihrer Einwilligung</h2>
            <p>
              Die Einwilligung zur Datenverarbeitung können Sie jederzeit per E-Mail an
              info@marokkoinvestment.de widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
              erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>
          </section>

          <section id="cookies">
            <h2 className="text-white/70 font-medium mb-2">7. Cookies, Analyse &amp; Marketing</h2>
            <p>
              Nur wenn Sie im Cookie-Banner „Alle akzeptieren“ wählen, setzen wir die folgenden
              Dienste ein. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO,
              § 25 Abs. 1 TDDDG). Ohne Einwilligung werden keine dieser Dienste geladen.
            </p>
            <h3 className="text-white/60 text-xs font-medium mb-1 mt-4">Meta Pixel &amp; Conversions API</h3>
            <p>
              Anbieter: Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, Irland. Wir messen
              Seitenaufrufe und Formular-Anmeldungen, um die Wirksamkeit unserer Werbung auf
              Facebook und Instagram auszuwerten. Bei einer Anmeldung übermitteln wir Ihre
              E-Mail-Adresse, ggf. Name und Telefonnummer in gehashter (verschlüsselter) Form
              sowie IP-Adresse und Browser-Kennung an Meta, auch serverseitig über die
              Conversions API. Eine Übermittlung in die USA ist möglich; Meta ist unter dem
              EU-US Data Privacy Framework zertifiziert.
            </p>
            <h3 className="text-white/60 text-xs font-medium mb-1 mt-4">Google Analytics 4 &amp; Google Tag Manager</h3>
            <p>
              Anbieter: Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland. Über den
              Google Tag Manager laden wir Google Analytics 4, um Seitenaufrufe, Scrolltiefe,
              Klicks und Formular-Anmeldungen statistisch auszuwerten. IP-Adressen werden von
              Google Analytics 4 nicht gespeichert. Eine Übermittlung in die USA ist möglich;
              Google ist unter dem EU-US Data Privacy Framework zertifiziert.
            </p>
            <h3 className="text-white/60 text-xs font-medium mb-1 mt-4">Microsoft Clarity</h3>
            <p>
              Anbieter: Microsoft Ireland Operations Ltd., One Microsoft Place, Dublin 18, Irland.
              Clarity zeichnet Mausbewegungen, Klicks und Scrollverhalten auf (Heatmaps,
              Sitzungsaufzeichnungen), damit wir die Website verbessern können. Eingaben in
              Formularfelder werden maskiert.
            </p>
            <p className="mt-3">
              Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen:{" "}
              <CookieSettingsButton />
            </p>
          </section>

          <section>
            <h2 className="text-white/70 font-medium mb-2">8. Google Fonts</h2>
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
