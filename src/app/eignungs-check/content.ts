/* ══════════════════════════════════════════════════════════
   EIGNUNGS-CHECK — copy (Figma "Eignungs-Check · Landing Page")
   ══════════════════════════════════════════════════════════ */

export const NAV = [
  { label: "Chancen", href: "#chancen" },
  { label: "Sicherheit", href: "#sicherheit" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Fragen", href: "#fragen" },
];

export const CTA = "Eignung prüfen";

export const HERO = {
  badge: "Zugang derzeit nur für ausgewählte Investoren",
  title: "Beteiligen Sie sich an realen Sachwerten in einem der dynamischsten Wachstumsmärkte Europas Nachbarschaft.",
  sub: "Immobilien, Infrastruktur und erneuerbare Energien. Projekte, die wir selbst entwickeln. Prüfen Sie in 2 Minuten, ob eine Beteiligung für Sie in Frage kommt.",
  trust: "Marokko: einziges Land Afrikas mit Investment-Grade-Rating (S&P, 2025).",
};

/* `count` drives the count-up; `format` renders the animated value */
export const STATS: { value: string; count?: number; decimals?: number; prefix?: string; suffix?: string; label: string; source: string }[] = [
  { value: "BBB-", label: "Investment-Grade-Rating", source: "Quelle: S&P, Sept. 2025" },
  { value: "~4 %", count: 4, prefix: "~", suffix: " %", label: "Prognostiziertes BIP-Wachstum p. a. (2025–2028)", source: "Quelle: S&P-Prognose" },
  { value: "19,8 Mio.", count: 19.8, decimals: 1, suffix: " Mio.", label: "Touristen 2025 (Rekord)", source: "Quelle: nat. Tourismusdaten 2025/2026" },
  { value: "41 Mrd. US-$", count: 41, suffix: " Mrd. US-$", label: "Infrastruktur-Investitionen bis 2030", source: "Quelle: Reg.-Programm / MENA-Presse 2026" },
];

export const CHANCE = {
  title: "Ein Markt im Aufbruch, direkt vor Europas Haustür.",
  text: "Marokko entwickelt sich zu einem der stabilsten und wachstumsstärksten Investitionsstandorte der Region. Milliardeninvestitionen in Infrastruktur, eine wachsende Mittelschicht und Großereignisse wie die WM 2030 treiben die Nachfrage nach Immobilien, Energie und Infrastruktur.",
  items: [
    { icon: "trophy", text: "WM 2030 (mit Spanien & Portugal): über 34 Mrd. US-$ in rund 35 Großprojekte." },
    { icon: "train", text: "Hochgeschwindigkeitszug Casablanca–Marrakesch, neue Flughäfen, Hafenausbau." },
    { icon: "sun", text: "Noor: eines der größten Solarkraftwerke der Welt. Starker Ausbau erneuerbarer Energien." },
    { icon: "globe", text: "Strategische Lage als Brücke zwischen Europa und Afrika." },
  ],
  source: "Quellen: Reg.-Programm / MENA-Presse 2026",
} as const;

export const SICHERHEIT = {
  title: "Wie sicher ist Marokko als Investitionsstandort?",
  rating: {
    value: "BBB-",
    title: "Investment-Grade-Rating",
    text: "Marokko erhielt 2025 von S&P das Rating BBB- zurück, als einziges Land Afrikas. Fitch bestätigt BB+ mit stabilem Ausblick.",
    source: "Quelle: S&P, Sept. 2025; Fitch, 2025",
  },
  cards: [
    { icon: "landmark", title: "Politische Stabilität", text: "Eine der stabilsten Regierungen der Region, kontinuierliche Reformpolitik." },
    { icon: "trend", title: "Wirtschaftliche Substanz", text: "Solides Wachstum (~4 % p. a. erwartet), wachsende Währungsreserven, sinkendes Haushaltsdefizit.", source: "Quelle: S&P-Prognose 2025–2028" },
    { icon: "scale", title: "Rechtssicherheit", text: "Moderne Investitionsgesetze und Anreize für ausländische Investoren. Enge Handels- und Wirtschaftsbeziehungen zur EU." },
    { icon: "compass", title: "Tourismus als Stabilitätsanker", text: "19,8 Mio. Besucher 2025 (Rekord), 124 Mrd. MAD Einnahmen.", source: "Quelle: nat. Tourismusdaten 2025/2026" },
  ],
} as const;

export const MODELL = {
  title: "Wir sind kein Vermittler.\nWir bauen selbst.",
  text: "Wir entwickeln eigene Projekte in Marokko und investieren eigenes Kapital mit. Sie beteiligen sich nicht an einem abstrakten Fonds, sondern an realen, aktiv gemanagten Sachwerten, mit voller Transparenz über das, worin Ihr Kapital fließt.",
  items: [
    { icon: "building", title: "Entwicklung", text: "Eigene Projektentwicklung vor Ort" },
    { icon: "coins", title: "Eigenes Kapital", text: "Eigener Kapitaleinsatz, gemeinsames Interesse" },
    { icon: "pie", title: "Beteiligung", text: "Beteiligung an realen Sachwerten statt Papierversprechen" },
  ],
} as const;

export const SEKTOREN = {
  title: "Worin Sie investieren.",
  cards: [
    { img: "/images/lp/projekt.webp", title: "Immobilien", text: "Wohn- und Gewerbeprojekte in Wachstumslagen." },
    { img: "/images/lp/hafen.webp", title: "Infrastruktur", text: "Projekte entlang der großen Entwicklungsachsen des Landes." },
    { img: "/images/lp/solar.webp", title: "Erneuerbare Energien", text: "Solar- und Energieprojekte in einem der sonnenreichsten Länder der Welt." },
  ],
};

export const ABLAUF = {
  title: "So läuft es ab.",
  steps: [
    "Sie prüfen in 2 Minuten Ihre Eignung (kurzer Fragebogen).",
    "Passt es, melden wir uns persönlich bei Ihnen.",
    "Im Gespräch zeigen wir Ihnen konkrete Projekte und Beteiligungsmöglichkeiten.",
  ],
};

/* Quiz: `key` names the answer in the lead email and in tracking */
export const QUESTIONS = [
  { key: "volumen", label: "Anlagevolumen", q: "Welches Anlagevolumen ziehen Sie für eine Beteiligung in Betracht?", options: ["100.000–200.000 €", "200.000–350.000 €", "350.000–500.000 €", "500.000 €+"] },
  { key: "ziel", label: "Ziel", q: "Welches Ziel steht für Sie im Vordergrund?", options: ["Diversifikation / Inflationsschutz", "Rendite-Chancen", "Sachwerte & Substanz", "Impact / Entwicklung"] },
  { key: "erfahrung", label: "Erfahrung mit Sachwerten", q: "Haben Sie bereits in Sachwerte investiert (z. B. Immobilien)?", options: ["Ja", "Nein"] },
  { key: "zeitpunkt", label: "Zeitpunkt", q: "Wann möchten Sie investieren?", options: ["Jetzt / dieses Quartal", "In 3–6 Monaten", "Erst informieren"] },
] as const;

export const QUIZ = {
  title: "Eignungs-Check",
  sub: "Ist eine Beteiligung für Sie geeignet?",
  contactQ: "Wie erreichen wir Sie?",
  name: "Name",
  namePh: "Vor- und Nachname",
  email: "E-Mail",
  emailPh: "name@beispiel.de",
  phone: "Telefon",
  phonePh: "151 2345678",
  consent: "Ich willige ein, dass Marokko Investment mich zur Auswertung meines Eignungs-Checks telefonisch oder per E-Mail kontaktiert. Widerruf jederzeit möglich.",
  privacy: "Datenschutzerklärung",
  back: "Zurück",
  next: "Weiter",
  submit: "Eignung absenden",
  sending: "Wird gesendet…",
  thanksTitle: "Vielen Dank.",
  thanksText: "Wir prüfen Ihre Angaben und melden uns persönlich bei Ihnen.",
  errName: "Bitte geben Sie Ihren Namen ein.",
  errEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  errPhone: "Bitte geben Sie eine Telefonnummer ein, unter der wir Sie erreichen.",
  errConsent: "Bitte bestätigen Sie die Einwilligung.",
  errNetwork: "Verbindungsfehler. Bitte erneut versuchen.",
  disclaimer: "Unverbindliche Eignungs-Vorprüfung, keine Anlageberatung. Diese Seite stellt keine Anlageberatung und kein öffentliches Angebot dar. Unternehmerische Beteiligungen sind mit Risiken verbunden, bis hin zum Totalverlust des eingesetzten Kapitals.",
};

export const SUBSTANZ = {
  title: "Substanz statt Versprechen.",
  points: [
    "Reale Projekte, reale Sachwerte.",
    "Eigene Entwicklung und Betreuung vor Ort.",
    "Transparente Strukturen, persönlicher Austausch.",
  ],
};

export const FAQ = {
  title: "Häufige Fragen",
  items: [
    { q: "Was bedeutet „Beteiligung“ konkret?", a: "Sie beteiligen sich unternehmerisch an einem konkreten Projekt, das wir in Marokko selbst entwickeln, nicht an einem Fonds. Struktur, Laufzeit und Risiken besprechen wir im persönlichen Gespräch." },
    { q: "Ab welchem Betrag ist ein Einstieg möglich?", a: "Beteiligungen beginnen in der Regel ab 100.000 €. Die genaue Höhe hängt vom jeweiligen Projekt ab und wird im persönlichen Gespräch geklärt." },
    { q: "Wie sicher ist eine Investition in Marokko?", a: "Marokko gilt als einer der stabilsten Standorte der Region und hat 2025 von S&P wieder ein Investment-Grade-Rating erhalten. Eine unternehmerische Beteiligung bleibt dennoch mit Risiken verbunden, bis hin zum Totalverlust. Diese Risiken besprechen wir offen mit Ihnen." },
    { q: "Welche Rolle spielen Sie als Entwickler?", a: "Wir entwickeln die Projekte selbst, von der Planung bis zur Umsetzung vor Ort, und investieren eigenes Kapital mit. Sie sprechen also direkt mit denen, die bauen." },
    { q: "Wie und wann erfolgt eine mögliche Auszahlung?", a: "Das hängt vom einzelnen Projekt, seiner Laufzeit und Struktur ab. Wir geben keine Renditeversprechen. Wie und wann Rückflüsse möglich sind, erläutern wir projektbezogen im Gespräch." },
    { q: "Was passiert nach dem Eignungs-Check?", a: "Wir prüfen Ihre Angaben und melden uns persönlich bei Ihnen, in der Regel innerhalb von 24 Stunden. Passt es, stellen wir Ihnen konkrete Projekte vor. Der Check ist unverbindlich." },
    { q: "Wie wird mein Kapital verwendet?", a: "Ihr Kapital fließt in ein konkretes, benanntes Projekt in Immobilien, Infrastruktur oder erneuerbaren Energien. Sie wissen vorab, worin Sie investieren." },
    { q: "Kann ich die Projekte vor Ort besichtigen?", a: "Ja. Nach einem ersten Gespräch stimmen wir gern einen Besuch der Projekte in Marokko mit Ihnen ab." },
  ],
};

export const FOOTER = {
  links: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
  disclaimer: "Diese Seite stellt keine Anlageberatung und kein öffentliches Angebot dar. Unternehmerische Beteiligungen sind mit Risiken verbunden, bis hin zum Totalverlust des eingesetzten Kapitals.",
  copyright: "© 2026 Marokko Investment",
};
