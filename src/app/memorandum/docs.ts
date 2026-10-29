/* ══════════════════════════════════════════════════════════
   LEAD-MAGNET DOCUMENTS — one landing page template, five documents.
   Each document overrides only the copy that names it; everything
   else comes from the memorandum translations in ./i18n.
   ══════════════════════════════════════════════════════════ */

import type { Content, Lang } from "./i18n";

export type DocKey = "memorandum" | "dealflow" | "due-diligence" | "family-office" | "thesis";

/* German wording for the notification and auto-reply emails */
export interface DocMail {
  label: string; // "Deal-Flow-Report"
  title: string; // "Der Deal-Flow-Report"
  acc: string; // "den Deal-Flow-Report"
  dat: string; // "unserem Deal-Flow-Report"
  nom: string; // "Der Report"
  meta: string; // "PDF · 22 Seiten · Stand 2026 · Vertraulich"
}

interface DocCopy {
  cta: string;
  headline: string;
  sub: string;
  formSub: string;
  pdfTitle: string;
  pages: string; // "22 Seiten"
  inhaltTitle: string;
  inhaltSub: string;
  inhaltItems: string[];
  vertrauenTitle: string;
  vertrauenSub: string;
  ablaufTitle: string;
  delivery: string;
  closingTitle: string;
  closingSub?: string;
  faqDetails: string; // last sentence of the "minimum ticket" answer
  faqLangs: string; // answer to "which languages"
}

export const DOCS: Record<DocKey, { path: string; mail: DocMail; copy?: Record<Lang, DocCopy> }> = {
  memorandum: {
    path: "/memorandum",
    mail: {
      label: "Investoren-Memorandum",
      title: "Das vertrauliche Investoren-Memorandum",
      acc: "das vertrauliche Memorandum",
      dat: "unserem Investoren-Memorandum",
      nom: "Das Memorandum",
      meta: "PDF · 28 Seiten · Stand 2026 · Vertraulich",
    },
  },

  /* ─────────────── 02 · DEAL-FLOW-REPORT ─────────────── */
  dealflow: {
    path: "/dealflow",
    mail: {
      label: "Deal-Flow-Report",
      title: "Der Deal-Flow-Report",
      acc: "den Deal-Flow-Report",
      dat: "unserem Deal-Flow-Report",
      nom: "Der Report",
      meta: "PDF · 22 Seiten · Stand 2026 · Vertraulich",
    },
    copy: {
      DE: {
        cta: "Report anfordern",
        headline: "7 Investment-Chancen in Marokko,\ndie institutionelle Investoren\ngerade sichern.",
        sub: "Für Investoren, die früh dabei sein wollen. Nicht erst dann, wenn alle es schon wissen.",
        formSub: "Wir versenden den Report erst nach Bestätigung Ihrer Telefonnummer.",
        pdfTitle: "Der Deal-Flow-Report",
        pages: "22 Seiten",
        inhaltTitle: "Was in dem Report steht.",
        inhaltSub: "Kein Verkaufsprospekt. Sieben Chancen, die wir aus erster Hand sehen, mit den Fragen, die man vorher stellen muss.",
        inhaltItems: [
          "7 konkrete Chancen aus Energie, Infrastruktur und Immobilien",
          "Warum gerade jetzt der richtige Zeitpunkt ist",
          "Welche Regionen und Sektoren das Kapital anziehen",
          "Worauf man bei jeder Chance achten muss",
        ],
        vertrauenTitle: "Wir sehen den Deal Flow aus erster Hand.",
        vertrauenSub: "Durch unsere Präsenz in Casablanca und unser Netzwerk im marokkanischen Infrastruktur- und Energiesektor sehen wir Projekte, bevor sie öffentlich werden.",
        ablaufTitle: "In drei Schritten zum Report.",
        delivery: "Der Report kommt direkt per E-Mail. Auf Wunsch folgt ein persönliches Gespräch.",
        closingTitle: "Sehen Sie die Chancen, bevor der Markt sie entdeckt.",
        faqDetails: "Details stehen im Report.",
        faqLangs: "Der Report ist auf Deutsch, Französisch, Arabisch und Englisch verfügbar.",
      },
      FR: {
        cta: "Demander le rapport",
        headline: "7 opportunités d'investissement\nau Maroc que les investisseurs\ninstitutionnels sécurisent.",
        sub: "Pour les investisseurs qui veulent être là tôt. Pas quand tout le monde le sait déjà.",
        formSub: "Nous n'envoyons le rapport qu'après confirmation de votre numéro de téléphone.",
        pdfTitle: "Le rapport de deal-flow",
        pages: "22 pages",
        inhaltTitle: "Ce que contient le rapport.",
        inhaltSub: "Pas un prospectus de vente. Sept opportunités que nous voyons de première main, avec les questions à se poser avant.",
        inhaltItems: [
          "7 opportunités concrètes dans l'énergie, les infrastructures et l'immobilier",
          "Pourquoi le moment est maintenant",
          "Quelles régions et quels secteurs attirent les capitaux",
          "Ce à quoi il faut veiller pour chaque opportunité",
        ],
        vertrauenTitle: "Nous voyons le deal-flow de première main.",
        vertrauenSub: "Grâce à notre présence à Casablanca et à notre réseau dans les secteurs marocains des infrastructures et de l'énergie, nous voyons les projets avant qu'ils ne deviennent publics.",
        ablaufTitle: "Le rapport en trois étapes.",
        delivery: "Le rapport arrive directement par e-mail. Sur demande, un entretien personnel suit.",
        closingTitle: "Voyez les opportunités avant que le marché ne les découvre.",
        faqDetails: "Les détails figurent dans le rapport.",
        faqLangs: "Le rapport est disponible en allemand, français, arabe et anglais.",
      },
      AR: {
        cta: "اطلب التقرير",
        headline: "7 فرص استثمارية في المغرب\nيؤمّنها المستثمرون المؤسسيون\nالآن.",
        sub: "للمستثمرين الذين يريدون الدخول مبكراً. لا عندما يعرف الجميع.",
        formSub: "لا نرسل التقرير إلا بعد تأكيد رقم هاتفك.",
        pdfTitle: "تقرير تدفّق الصفقات",
        pages: "22 صفحة",
        inhaltTitle: "ما يتضمّنه التقرير.",
        inhaltSub: "ليس نشرة بيع. سبع فرص نراها مباشرة، مع الأسئلة التي يجب طرحها مسبقاً.",
        inhaltItems: [
          "7 فرص ملموسة في الطاقة والبنية التحتية والعقارات",
          "لماذا الآن هو التوقيت المناسب",
          "المناطق والقطاعات التي تجذب رأس المال",
          "ما يجب الانتباه إليه في كل فرصة",
        ],
        vertrauenTitle: "نرى تدفّق الصفقات مباشرة.",
        vertrauenSub: "بفضل حضورنا في الدار البيضاء وشبكتنا في قطاعَي البنية التحتية والطاقة في المغرب، نرى المشاريع قبل أن تصبح علنية.",
        ablaufTitle: "التقرير في ثلاث خطوات.",
        delivery: "يصل التقرير مباشرة عبر البريد الإلكتروني. وعند الطلب يتبعه حديث شخصي.",
        closingTitle: "شاهد الفرص قبل أن يكتشفها السوق.",
        faqDetails: "التفاصيل في التقرير.",
        faqLangs: "التقرير متوفّر بالألمانية والفرنسية والعربية والإنجليزية.",
      },
      EN: {
        cta: "Request report",
        headline: "7 investment opportunities in Morocco\nthat institutional investors\nare securing right now.",
        sub: "For investors who want to be early. Not once everyone already knows.",
        formSub: "We only send the report once your phone number is confirmed.",
        pdfTitle: "The deal-flow report",
        pages: "22 pages",
        inhaltTitle: "What's in the report.",
        inhaltSub: "Not a sales prospectus. Seven opportunities we see first-hand, with the questions you need to ask beforehand.",
        inhaltItems: [
          "7 concrete opportunities in energy, infrastructure and real estate",
          "Why now is the right time",
          "Which regions and sectors are attracting capital",
          "What to watch out for with each opportunity",
        ],
        vertrauenTitle: "We see the deal flow first-hand.",
        vertrauenSub: "Through our presence in Casablanca and our network in Morocco's infrastructure and energy sector, we see projects before they become public.",
        ablaufTitle: "The report in three steps.",
        delivery: "The report arrives directly by email. On request, a personal conversation follows.",
        closingTitle: "See the opportunities before the market discovers them.",
        faqDetails: "Details are in the report.",
        faqLangs: "The report is available in German, French, Arabic and English.",
      },
    },
  },

  /* ─────────────── 03 · DUE-DILIGENCE-ANALYSE ─────────────── */
  "due-diligence": {
    path: "/due-diligence",
    mail: {
      label: "Due-Diligence-Analyse",
      title: "Die Due-Diligence-Analyse",
      acc: "die Due-Diligence-Analyse",
      dat: "unserer Due-Diligence-Analyse",
      nom: "Die Analyse",
      meta: "PDF · 34 Seiten · Stand 2026 · Vertraulich",
    },
    copy: {
      DE: {
        cta: "Analyse anfordern",
        headline: "Marokko als Investmentstandort.\nDie ehrliche Due Diligence.",
        sub: "Chancen, Risiken, rechtliche Struktur, Steuern. Alles, was ein seriöser Investor vorher wissen muss.",
        formSub: "Wir versenden die Analyse erst nach Bestätigung Ihrer Telefonnummer.",
        pdfTitle: "Die Due-Diligence-Analyse",
        pages: "34 Seiten",
        inhaltTitle: "Was in der Analyse steht.",
        inhaltSub: "Ohne Schönfärberei. Wir benennen, was in Marokko funktioniert, und was nicht. Beides gehört in eine Entscheidung.",
        inhaltItems: [
          "Die realen Chancen und die realen Risiken",
          "Rechtliche Struktur für ausländische Investoren",
          "Steuerliche Aspekte bei Investments in Marokko",
          "Worauf man bei der Standort- und Partnerwahl achten muss",
        ],
        vertrauenTitle: "Wir sagen Ihnen, was funktioniert. Und was nicht.",
        vertrauenSub: "Diese Ehrlichkeit ist die Basis jeder guten Investment-Entscheidung. Büros in Casablanca und Düsseldorf, mit Erfahrung in beiden Rechtsräumen.",
        ablaufTitle: "In drei Schritten zur Analyse.",
        delivery: "Die Analyse kommt direkt per E-Mail. Auf Wunsch folgt ein persönliches Gespräch.",
        closingTitle: "Treffen Sie eine informierte Entscheidung.",
        closingSub: "Die ehrliche Analyse, nur für qualifizierte Investoren. Wir melden uns innerhalb von 24 Stunden.",
        faqDetails: "Details stehen in der Analyse.",
        faqLangs: "Die Analyse ist auf Deutsch, Französisch, Arabisch und Englisch verfügbar.",
      },
      FR: {
        cta: "Demander l'analyse",
        headline: "Le Maroc comme place d'investissement.\nLa due diligence honnête.",
        sub: "Opportunités, risques, structure juridique, fiscalité. Tout ce qu'un investisseur sérieux doit savoir avant.",
        formSub: "Nous n'envoyons l'analyse qu'après confirmation de votre numéro de téléphone.",
        pdfTitle: "L'analyse de due diligence",
        pages: "34 pages",
        inhaltTitle: "Ce que contient l'analyse.",
        inhaltSub: "Sans enjolivement. Nous disons ce qui fonctionne au Maroc, et ce qui ne fonctionne pas. Les deux font partie d'une décision.",
        inhaltItems: [
          "Les opportunités réelles et les risques réels",
          "La structure juridique pour les investisseurs étrangers",
          "Les aspects fiscaux des investissements au Maroc",
          "Ce à quoi veiller dans le choix du site et des partenaires",
        ],
        vertrauenTitle: "Nous vous disons ce qui fonctionne. Et ce qui ne fonctionne pas.",
        vertrauenSub: "Cette honnêteté est la base de toute bonne décision d'investissement. Des bureaux à Casablanca et Düsseldorf, avec une expérience dans les deux systèmes juridiques.",
        ablaufTitle: "L'analyse en trois étapes.",
        delivery: "L'analyse arrive directement par e-mail. Sur demande, un entretien personnel suit.",
        closingTitle: "Prenez une décision éclairée.",
        closingSub: "L'analyse honnête, réservée aux investisseurs qualifiés. Nous revenons vers vous sous 24 heures.",
        faqDetails: "Les détails figurent dans l'analyse.",
        faqLangs: "L'analyse est disponible en allemand, français, arabe et anglais.",
      },
      AR: {
        cta: "اطلب التحليل",
        headline: "المغرب كوجهة استثمارية.\nالعناية الواجبة بصدق.",
        sub: "الفرص والمخاطر والهيكل القانوني والضرائب. كل ما يجب أن يعرفه المستثمر الجادّ مسبقاً.",
        formSub: "لا نرسل التحليل إلا بعد تأكيد رقم هاتفك.",
        pdfTitle: "تحليل العناية الواجبة",
        pages: "34 صفحة",
        inhaltTitle: "ما يتضمّنه التحليل.",
        inhaltSub: "بلا تجميل. نسمّي ما ينجح في المغرب وما لا ينجح. كلاهما جزء من القرار.",
        inhaltItems: [
          "الفرص الحقيقية والمخاطر الحقيقية",
          "الهيكل القانوني للمستثمرين الأجانب",
          "الجوانب الضريبية للاستثمار في المغرب",
          "ما يجب مراعاته عند اختيار الموقع والشركاء",
        ],
        vertrauenTitle: "نقول لك ما ينجح. وما لا ينجح.",
        vertrauenSub: "هذه الصراحة هي أساس كل قرار استثماري جيد. مكاتب في الدار البيضاء ودوسلدورف، مع خبرة في النظامين القانونيين.",
        ablaufTitle: "التحليل في ثلاث خطوات.",
        delivery: "يصل التحليل مباشرة عبر البريد الإلكتروني. وعند الطلب يتبعه حديث شخصي.",
        closingTitle: "اتّخذ قراراً مبنياً على المعرفة.",
        closingSub: "التحليل الصريح، للمستثمرين المؤهَّلين فقط. نعود إليك خلال 24 ساعة.",
        faqDetails: "التفاصيل في التحليل.",
        faqLangs: "التحليل متوفّر بالألمانية والفرنسية والعربية والإنجليزية.",
      },
      EN: {
        cta: "Request analysis",
        headline: "Morocco as an investment location.\nThe honest due diligence.",
        sub: "Opportunities, risks, legal structure, taxes. Everything a serious investor needs to know beforehand.",
        formSub: "We only send the analysis once your phone number is confirmed.",
        pdfTitle: "The due-diligence analysis",
        pages: "34 pages",
        inhaltTitle: "What's in the analysis.",
        inhaltSub: "No sugar-coating. We name what works in Morocco, and what doesn't. Both belong in a decision.",
        inhaltItems: [
          "The real opportunities and the real risks",
          "Legal structure for foreign investors",
          "Tax aspects of investing in Morocco",
          "What to look for when choosing location and partners",
        ],
        vertrauenTitle: "We tell you what works. And what doesn't.",
        vertrauenSub: "This honesty is the basis of every good investment decision. Offices in Casablanca and Düsseldorf, with experience in both legal systems.",
        ablaufTitle: "The analysis in three steps.",
        delivery: "The analysis arrives directly by email. On request, a personal conversation follows.",
        closingTitle: "Make an informed decision.",
        closingSub: "The honest analysis, for qualified investors only. We get back to you within 24 hours.",
        faqDetails: "Details are in the analysis.",
        faqLangs: "The analysis is available in German, French, Arabic and English.",
      },
    },
  },

  /* ─────────────── 04 · FAMILY-OFFICE-BRIEFING ─────────────── */
  "family-office": {
    path: "/family-office",
    mail: {
      label: "Family-Office-Briefing",
      title: "Das Family-Office-Briefing",
      acc: "das Family-Office-Briefing",
      dat: "unserem Family-Office-Briefing",
      nom: "Das Briefing",
      meta: "PDF · 24 Seiten · Stand 2026 · Vertraulich",
    },
    copy: {
      DE: {
        cta: "Briefing anfordern",
        headline: "Wie Family Offices 2026\nin Nordafrika allokieren.",
        sub: "Und was Privatinvestoren daraus lernen können. Ein Blick in die Strategie der größten Vermögen.",
        formSub: "Wir versenden das Briefing erst nach Bestätigung Ihrer Telefonnummer.",
        pdfTitle: "Das Family-Office-Briefing",
        pages: "24 Seiten",
        inhaltTitle: "Was in dem Briefing steht.",
        inhaltSub: "Wie das große Geld denkt, übersetzt für Investoren mit kleineren Tickets. Strategie statt Schlagzeilen.",
        inhaltItems: [
          "Wie Family Offices Nordafrika aktuell bewerten",
          "Welche Sektoren sie priorisieren",
          "Welche Strategien sich auf Privatinvestoren übertragen lassen",
          "Wo die Chancen für kleinere Tickets liegen",
        ],
        vertrauenTitle: "Wir arbeiten an der Schnittstelle.",
        vertrauenSub: "Zwischen großem Kapital und dem marokkanischen Markt. Wir teilen, was wir dort sehen, und ordnen es für Privatinvestoren ein.",
        ablaufTitle: "In drei Schritten zum Briefing.",
        delivery: "Das Briefing kommt direkt per E-Mail. Auf Wunsch folgt ein persönliches Gespräch.",
        closingTitle: "Investieren Sie wie ein Family Office.",
        faqDetails: "Details stehen im Briefing.",
        faqLangs: "Das Briefing ist auf Deutsch, Französisch, Arabisch und Englisch verfügbar.",
      },
      FR: {
        cta: "Demander le briefing",
        headline: "Comment les family offices\ninvestissent en Afrique du Nord en 2026.",
        sub: "Et ce que les investisseurs privés peuvent en apprendre. Un regard sur la stratégie des plus grandes fortunes.",
        formSub: "Nous n'envoyons le briefing qu'après confirmation de votre numéro de téléphone.",
        pdfTitle: "Le briefing family-office",
        pages: "24 pages",
        inhaltTitle: "Ce que contient le briefing.",
        inhaltSub: "Comment pense le grand capital, traduit pour des investisseurs aux tickets plus modestes. La stratégie plutôt que les gros titres.",
        inhaltItems: [
          "Comment les family offices évaluent actuellement l'Afrique du Nord",
          "Quels secteurs ils privilégient",
          "Quelles stratégies sont transposables aux investisseurs privés",
          "Où se trouvent les opportunités pour des tickets plus modestes",
        ],
        vertrauenTitle: "Nous travaillons à l'interface.",
        vertrauenSub: "Entre le grand capital et le marché marocain. Nous partageons ce que nous y voyons et le replaçons dans son contexte pour les investisseurs privés.",
        ablaufTitle: "Le briefing en trois étapes.",
        delivery: "Le briefing arrive directement par e-mail. Sur demande, un entretien personnel suit.",
        closingTitle: "Investissez comme un family office.",
        faqDetails: "Les détails figurent dans le briefing.",
        faqLangs: "Le briefing est disponible en allemand, français, arabe et anglais.",
      },
      AR: {
        cta: "اطلب الإحاطة",
        headline: "كيف توزّع المكاتب العائلية\nاستثماراتها في شمال أفريقيا عام 2026.",
        sub: "وما يمكن أن يتعلّمه المستثمرون الأفراد من ذلك. نظرة على استراتيجية أكبر الثروات.",
        formSub: "لا نرسل الإحاطة إلا بعد تأكيد رقم هاتفك.",
        pdfTitle: "إحاطة المكاتب العائلية",
        pages: "24 صفحة",
        inhaltTitle: "ما تتضمّنه الإحاطة.",
        inhaltSub: "كيف يفكّر رأس المال الكبير، مترجَماً لمستثمرين بمبالغ أصغر. استراتيجية بدل العناوين.",
        inhaltItems: [
          "كيف تقيّم المكاتب العائلية شمال أفريقيا حالياً",
          "القطاعات التي تعطيها الأولوية",
          "الاستراتيجيات القابلة للنقل إلى المستثمرين الأفراد",
          "أين تكمن الفرص للمبالغ الأصغر",
        ],
        vertrauenTitle: "نعمل عند نقطة الالتقاء.",
        vertrauenSub: "بين رأس المال الكبير والسوق المغربية. نشارك ما نراه هناك ونضعه في سياقه للمستثمرين الأفراد.",
        ablaufTitle: "الإحاطة في ثلاث خطوات.",
        delivery: "تصل الإحاطة مباشرة عبر البريد الإلكتروني. وعند الطلب يتبعها حديث شخصي.",
        closingTitle: "استثمر كما يستثمر مكتب عائلي.",
        faqDetails: "التفاصيل في الإحاطة.",
        faqLangs: "الإحاطة متوفّرة بالألمانية والفرنسية والعربية والإنجليزية.",
      },
      EN: {
        cta: "Request briefing",
        headline: "How family offices\nare allocating in North Africa in 2026.",
        sub: "And what private investors can learn from it. A look into the strategy of the largest fortunes.",
        formSub: "We only send the briefing once your phone number is confirmed.",
        pdfTitle: "The family-office briefing",
        pages: "24 pages",
        inhaltTitle: "What's in the briefing.",
        inhaltSub: "How big money thinks, translated for investors with smaller tickets. Strategy instead of headlines.",
        inhaltItems: [
          "How family offices currently assess North Africa",
          "Which sectors they prioritise",
          "Which strategies carry over to private investors",
          "Where the opportunities for smaller tickets lie",
        ],
        vertrauenTitle: "We work at the interface.",
        vertrauenSub: "Between large capital and the Moroccan market. We share what we see there and put it in context for private investors.",
        ablaufTitle: "The briefing in three steps.",
        delivery: "The briefing arrives directly by email. On request, a personal conversation follows.",
        closingTitle: "Invest like a family office.",
        faqDetails: "Details are in the briefing.",
        faqLangs: "The briefing is available in German, French, Arabic and English.",
      },
    },
  },

  /* ─────────────── 05 · THESIS PAPER ─────────────── */
  thesis: {
    path: "/thesis",
    mail: {
      label: "Thesis Paper",
      title: "Das Thesis Paper",
      acc: "das Thesis Paper",
      dat: "unserem Thesis Paper",
      nom: "Die These",
      meta: "PDF · 18 Seiten · Stand 2026 · Vertraulich",
    },
    copy: {
      DE: {
        cta: "These lesen",
        headline: "Warum das nächste Jahrzehnt\nNordafrika gehört.",
        sub: "Eine Investment-These und wie man daran teilhat, bevor sie Konsens wird.",
        formSub: "Wir versenden die These erst nach Bestätigung Ihrer Telefonnummer.",
        pdfTitle: "Das Thesis Paper",
        pages: "18 Seiten",
        inhaltTitle: "Was in der These steht.",
        inhaltSub: "Die makroökonomische Grundlage, die Treiber dahinter, und der Zeitraum, über den wir denken.",
        inhaltItems: [
          "Die makroökonomische These hinter Marokkos Aufstieg",
          "Warum Energie und Infrastruktur die Treiber sind",
          "Was das für die nächsten zehn Jahre bedeutet",
          "Wie Investoren früh teilhaben können",
        ],
        vertrauenTitle: "Wir glauben an diese These. Und setzen sie um.",
        vertrauenSub: "Mit eigenen Projekten in Marokko, in Energie und Infrastruktur. Nicht Theorie, sondern gelebte Überzeugung.",
        ablaufTitle: "In drei Schritten zur These.",
        delivery: "Die These kommt direkt per E-Mail. Auf Wunsch folgt ein persönliches Gespräch.",
        closingTitle: "Lesen Sie die These, bevor sie Konsens wird.",
        faqDetails: "Details stehen in der These.",
        faqLangs: "Die These ist auf Deutsch, Französisch, Arabisch und Englisch verfügbar.",
      },
      FR: {
        cta: "Lire la thèse",
        headline: "Pourquoi la prochaine décennie\nappartient à l'Afrique du Nord.",
        sub: "Une thèse d'investissement, et comment y participer avant qu'elle ne fasse consensus.",
        formSub: "Nous n'envoyons la thèse qu'après confirmation de votre numéro de téléphone.",
        pdfTitle: "Le document de thèse",
        pages: "18 pages",
        inhaltTitle: "Ce que contient la thèse.",
        inhaltSub: "Le fondement macroéconomique, les moteurs qui le portent, et l'horizon sur lequel nous raisonnons.",
        inhaltItems: [
          "La thèse macroéconomique derrière l'essor du Maroc",
          "Pourquoi l'énergie et les infrastructures en sont les moteurs",
          "Ce que cela signifie pour les dix prochaines années",
          "Comment les investisseurs peuvent y participer tôt",
        ],
        vertrauenTitle: "Nous croyons à cette thèse. Et nous la mettons en œuvre.",
        vertrauenSub: "Avec nos propres projets au Maroc, dans l'énergie et les infrastructures. Pas de la théorie, mais une conviction vécue.",
        ablaufTitle: "La thèse en trois étapes.",
        delivery: "La thèse arrive directement par e-mail. Sur demande, un entretien personnel suit.",
        closingTitle: "Lisez la thèse avant qu'elle ne fasse consensus.",
        faqDetails: "Les détails figurent dans la thèse.",
        faqLangs: "La thèse est disponible en allemand, français, arabe et anglais.",
      },
      AR: {
        cta: "اقرأ الأطروحة",
        headline: "لماذا سيكون العقد القادم\nلشمال أفريقيا.",
        sub: "أطروحة استثمارية، وكيف تشارك فيها قبل أن تصبح رأياً سائداً.",
        formSub: "لا نرسل الأطروحة إلا بعد تأكيد رقم هاتفك.",
        pdfTitle: "ورقة الأطروحة",
        pages: "18 صفحة",
        inhaltTitle: "ما تتضمّنه الأطروحة.",
        inhaltSub: "الأساس الاقتصادي الكلّي، والمحرّكات وراءه، والأفق الزمني الذي نفكّر فيه.",
        inhaltItems: [
          "الأطروحة الاقتصادية الكلّية وراء صعود المغرب",
          "لماذا تُعدّ الطاقة والبنية التحتية المحرّكين",
          "ماذا يعني ذلك للسنوات العشر القادمة",
          "كيف يمكن للمستثمرين المشاركة مبكراً",
        ],
        vertrauenTitle: "نؤمن بهذه الأطروحة. ونطبّقها.",
        vertrauenSub: "بمشاريعنا الخاصة في المغرب، في الطاقة والبنية التحتية. ليست نظرية، بل قناعة نعيشها.",
        ablaufTitle: "الأطروحة في ثلاث خطوات.",
        delivery: "تصل الأطروحة مباشرة عبر البريد الإلكتروني. وعند الطلب يتبعها حديث شخصي.",
        closingTitle: "اقرأ الأطروحة قبل أن تصبح رأياً سائداً.",
        faqDetails: "التفاصيل في الأطروحة.",
        faqLangs: "الأطروحة متوفّرة بالألمانية والفرنسية والعربية والإنجليزية.",
      },
      EN: {
        cta: "Read the thesis",
        headline: "Why the next decade\nbelongs to North Africa.",
        sub: "An investment thesis, and how to take part before it becomes consensus.",
        formSub: "We only send the thesis once your phone number is confirmed.",
        pdfTitle: "The thesis paper",
        pages: "18 pages",
        inhaltTitle: "What's in the thesis.",
        inhaltSub: "The macroeconomic foundation, the drivers behind it, and the time horizon we think in.",
        inhaltItems: [
          "The macroeconomic thesis behind Morocco's rise",
          "Why energy and infrastructure are the drivers",
          "What this means for the next ten years",
          "How investors can take part early",
        ],
        vertrauenTitle: "We believe in this thesis. And we act on it.",
        vertrauenSub: "With our own projects in Morocco, in energy and infrastructure. Not theory, but conviction in practice.",
        ablaufTitle: "The thesis in three steps.",
        delivery: "The thesis arrives directly by email. On request, a personal conversation follows.",
        closingTitle: "Read the thesis before it becomes consensus.",
        faqDetails: "Details are in the thesis.",
        faqLangs: "The thesis is available in German, French, Arabic and English.",
      },
    },
  },
};

/* Merge a document's copy into the base (memorandum) translation */
export function withDoc(base: Content, doc: DocKey, lang: Lang): Content {
  const c = DOCS[doc].copy?.[lang];
  if (!c) return base;
  const pdfMeta = base.pdfMeta.replace(base.pdfFootPages, c.pages);
  return {
    ...base,
    cta: c.cta,
    headline: c.headline,
    sub: c.sub,
    formSub: c.formSub,
    pdfTitle: c.pdfTitle,
    pdfMeta: pdfMeta === base.pdfMeta ? `PDF · ${c.pages}` : pdfMeta,
    inhaltTitle: c.inhaltTitle,
    inhaltSub: c.inhaltSub,
    inhaltItems: c.inhaltItems,
    pdfMockTitle: c.pdfTitle,
    pdfFootPages: c.pages,
    vertrauenTitle: c.vertrauenTitle,
    vertrauenSub: c.vertrauenSub,
    ablaufTitle: c.ablaufTitle,
    ablaufSteps: base.ablaufSteps.map((s, i) => (i === base.ablaufSteps.length - 1 ? { ...s, text: c.delivery } : s)),
    faqs: base.faqs.map((f, i) =>
      i === 3 ? { ...f, a: f.a.replace(/[^.。]*[.。]?\s*$/u, "").trimEnd() + " " + c.faqDetails } : i === 5 ? { ...f, a: c.faqLangs } : f,
    ),
    closingTitle: c.closingTitle,
    closingSub: c.closingSub ?? base.closingSub,
  };
}
