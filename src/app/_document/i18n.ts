/* ══════════════════════════════════════════════════════════
   MEMORANDUM — translations (DE · FR · AR · EN)
   Structural constants (image paths, hrefs, numbers) live in the
   page component; only human-readable text is translated here.
   ══════════════════════════════════════════════════════════ */

export type Lang = "DE" | "FR" | "AR" | "EN";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "DE", label: "Deutsch" },
  { code: "FR", label: "Français" },
  { code: "AR", label: "العربية" },
  { code: "EN", label: "English" },
];

export interface Content {
  eyebrow: string;
  headline: string;
  sub: string;
  cta: string;
  ctaSecondary: string;

  anfrageTitle: string;
  anfrageSub: string;
  formTitle: string;
  formSub: string;
  pdfTitle: string;
  pdfMeta: string;
  benefits: string[];

  labelName: string;
  labelEmail: string;
  labelPhone: string;
  phName: string;
  phEmail: string;
  phPhone: string;
  consentPre: string;
  consentLink: string;
  consentPost: string;
  submitting: string;
  lockNote: string;
  successTitle: string;
  successText: string;
  errName: string;
  errEmail: string;
  errConsent: string;
  errGeneric: string;
  errNetwork: string;

  strip: { title: string; sub: string }[];

  sektorenTitle: string;
  sektorenSub: string;
  sektoren: { name: string; desc: string }[];
  imgLabelSolar: string;
  imgLabelPort: string;
  imgLabelCasablanca: string;

  inhaltTitle: string;
  inhaltSub: string;
  inhaltItems: string[];
  pdfMockLabel: string;
  pdfMockTitle: string;
  pdfFootPages: string;
  pdfFootPdf: string;
  pdfFootDate: string;

  vertrauenTitle: string;
  vertrauenSub: string;
  officeLabel: string;
  offices: { city: string; desc: string }[];

  grundPill: string;
  grundTitle: string;
  grundSub: string;
  grundsaetze: { label: string; title: string; text: string }[];

  ablaufTitle: string;
  ablaufSub: string;
  ablaufSteps: { title: string; text: string }[];

  faqPill: string;
  faqTitle: string;
  faqSub: string;
  faqCtaSm: string;
  faqCtaStrong: string;
  faqs: { q: string; a: string }[];

  closingTitle: string;
  closingSub: string;
  closingBenefits: string[];

  nav: string[];

  footerDesc: string;
  footerDocsH: string;
  footerDocs: string[];
  footerContactH: string;
  footerContact: string[];
  footerLegalH: string;
  footerLegal: string[];
  footerCopyright: string;
  footerDisclaimer: string;
}

export const TRANSLATIONS: Record<Lang, Content> = {
  /* ─────────────── DEUTSCH ─────────────── */
  DE: {
    eyebrow: "Nur für qualifizierte Investoren",
    headline: "Marokko 2026.\nDas vertrauliche\nInvestoren-Memorandum.",
    sub: "Wohin institutionelles Kapital jetzt fließt — und wie qualifizierte Privatinvestoren Zugang bekommen. Ein vertrauliches Dokument für einen kleinen Kreis.",
    cta: "Memorandum anfordern",
    ctaSecondary: "Rückfragen stellen",
    anfrageTitle: "So erhalten Sie das Dokument.",
    anfrageSub: "Drei Angaben, eine kurze Bestätigung per SMS — und das Dokument ist unterwegs. Wir prüfen jede Anfrage persönlich.",
    formTitle: "Dokument anfordern",
    formSub: "Wir versenden das Memorandum erst nach Bestätigung Ihrer Telefonnummer.",
    pdfTitle: "Das vertrauliche Memorandum",
    pdfMeta: "PDF · 28 Seiten · Stand 2026 · Vertraulich",
    benefits: [
      "Kostenfrei und ohne Folgeverpflichtung",
      "Vertrauliche Behandlung Ihrer Angaben",
      "Antwort von uns innerhalb von 24 Stunden",
    ],
    labelName: "Name",
    labelEmail: "E-Mail",
    labelPhone: "Telefonnummer",
    phName: "Vor- und Nachname",
    phEmail: "name@unternehmen.de",
    phPhone: "151 2345678",
    consentPre: "Ich stimme der Verarbeitung meiner Daten gemäß der ",
    consentLink: "Datenschutzerklärung",
    consentPost: " zu.",
    submitting: "Wird gesendet…",
    lockNote: "SMS-Verifizierung · Keine Weitergabe an Dritte",
    successTitle: "Anfrage erhalten",
    successText: "Wir prüfen Ihre Angaben und melden uns innerhalb von 24 Stunden bei Ihnen.",
    errName: "Bitte geben Sie Ihren Namen ein.",
    errEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    errConsent: "Bitte stimmen Sie der Datenschutzerklärung zu.",
    errGeneric: "Ein Fehler ist aufgetreten.",
    errNetwork: "Verbindungsfehler. Bitte erneut versuchen.",
    strip: [
      { title: "Casablanca & Düsseldorf", sub: "Büros mit direktem Zugang" },
      { title: "ab 100.000 €", sub: "Typische Ticketgröße" },
      { title: "Energie & Infrastruktur", sub: "Unsere Fokussektoren" },
      { title: "DE · FR · AR · EN", sub: "Dokument in vier Sprachen" },
    ],
    sektorenTitle: "Wohin das Kapital fließt.",
    sektorenSub: "Energie, Infrastruktur, Logistik. Marokko legt gerade die Grundlagen für das nächste Jahrzehnt — und internationales Kapital ist längst vor Ort.",
    sektoren: [
      { name: "Energie", desc: "Solar, Wind und Netzausbau im industriellen Maßstab" },
      { name: "Infrastruktur", desc: "Häfen, Straßen und Schienen für den Export nach Europa" },
      { name: "Immobilien", desc: "Gewerbe und Wohnraum in wachsenden Ballungsräumen" },
      { name: "Logistik", desc: "Die kurze Verbindung zwischen Afrika und der EU" },
    ],
    imgLabelSolar: "Solarthermie im Süden Marokkos",
    imgLabelPort: "Hafen- und Logistikinfrastruktur",
    imgLabelCasablanca: "Casablanca, Finanzplatz Nordafrikas",
    inhaltTitle: "Was in dem Dokument steht.",
    inhaltSub: "Kein Verkaufsprospekt. Eine nüchterne Einordnung dessen, was in Marokko gerade passiert — und wo qualifizierte Privatinvestoren anschlussfähig sind.",
    inhaltItems: [
      "Welche Sektoren in Marokko das größte Wachstum zeigen",
      "Wohin internationales und institutionelles Kapital fließt",
      "Wie der rechtliche Rahmen für ausländische Investoren aussieht",
      "Chancen und Risiken, ehrlich eingeordnet",
      "Wie qualifizierte Privatinvestoren Zugang bekommen",
    ],
    pdfMockLabel: "Marokko Investment",
    pdfMockTitle: "Das vertrauliche Investoren-Memorandum",
    pdfFootPages: "28 Seiten",
    pdfFootPdf: "PDF",
    pdfFootDate: "Stand 2026",
    vertrauenTitle: "Wir bewegen uns in beiden Welten.",
    vertrauenSub: "Hinter Marokko Investment stehen Büros in Casablanca und Düsseldorf — mit direktem Zugang und jahrelanger Erfahrung im Infrastruktur- und Energiesektor Marokkos.",
    officeLabel: "Unser Büro in Casablanca",
    offices: [
      { city: "Casablanca", desc: "Deal-Zugang, Behörden und Partner vor Ort. Wir sehen Projekte, bevor sie ausgeschrieben werden." },
      { city: "Düsseldorf", desc: "Ansprechpartner für Investoren im deutschsprachigen Raum. Deutsche Standards, deutsche Verträge." },
      { city: "Seit 2016", desc: "Eigene Projekte in Energie und Infrastruktur. Wir investieren mit — nicht nur nebenher." },
    ],
    grundPill: "Unsere Grundsätze",
    grundTitle: "Wie wir arbeiten. Und warum das für Sie zählt.",
    grundSub: "Drei Grundsätze bestimmen jede Entscheidung, die wir in Marokko treffen. Sie erklären auch, warum unsere Dokumente so nüchtern geschrieben sind.",
    grundsaetze: [
      { label: "Zugang", title: "Wir sind vor Ort.", text: "Ein Büro in Casablanca, Partner bei Behörden und Entwicklern. Wir sehen Projekte, bevor sie ausgeschrieben werden — und können prüfen, wer tatsächlich dahintersteht." },
      { label: "Klarheit", title: "Wir sagen auch, was nicht geht.", text: "Jede Analyse benennt die Risiken so deutlich wie die Chancen. Wer nur gute Nachrichten hören möchte, ist bei uns falsch. Genau deshalb arbeiten Investoren mit uns." },
      { label: "Beteiligung", title: "Wir investieren mit.", text: "Wir begleiten Projekte nicht nur — wir halten selbst Anteile in Energie und Infrastruktur. Unser eigenes Kapital liegt neben Ihrem, mit demselben Risiko." },
    ],
    ablaufTitle: "In drei Schritten zum Dokument.",
    ablaufSub: "Die Verifizierung hält die Liste sauber. Wir senden das Dokument ausschließlich an bestätigte Kontakte.",
    ablaufSteps: [
      { title: "Anfrage", text: "Name, E-Mail und Telefonnummer eintragen. Das dauert weniger als eine Minute." },
      { title: "Verifizierung", text: "Sie erhalten einen sechsstelligen Code per SMS und bestätigen damit Ihre Nummer." },
      { title: "Zustellung", text: "Das Memorandum kommt direkt per E-Mail. Auf Wunsch folgt ein persönliches Gespräch." },
    ],
    faqPill: "Häufige Fragen",
    faqTitle: "Vorab geklärt.",
    faqSub: "Wir halten es transparent und kurz. Diese Antworten ersparen Ihnen das Nachfragen.",
    faqCtaSm: "Etwas offen geblieben?",
    faqCtaStrong: "Sprechen Sie mit uns",
    faqs: [
      { q: "Was kostet das Dokument?", a: "Nichts. Wir stellen es qualifizierten Investoren kostenfrei zur Verfügung. Es entstehen keine Folgekosten und kein Abonnement." },
      { q: "Warum brauchen Sie meine Telefonnummer?", a: "Zur Verifizierung per SMS. So stellen wir sicher, dass nur echte Anfragen durchkommen. Ihre Nummer wird nicht für Werbung verwendet." },
      { q: "Wer bekommt meine Daten?", a: "Nur das Team von Marokko Investment. Keine Weitergabe an Dritte, kein Weiterverkauf." },
      { q: "Ab welcher Summe ist ein Investment sinnvoll?", a: "Unsere Projekte richten sich an Investoren mit einem Mindestticket von 100.000 €. Details stehen im Memorandum." },
      { q: "Ist das eine Anlageberatung?", a: "Nein. Wir vermitteln Zugang zu Informationen und Projekten. Eine individuelle Anlageberatung bieten wir nicht an." },
      { q: "In welchen Sprachen gibt es das Dokument?", a: "Das Memorandum ist auf Deutsch, Französisch, Arabisch und Englisch verfügbar." },
      { q: "Was passiert nach der Anfrage?", a: "Sie erhalten das Dokument per E-Mail. Auf Wunsch vereinbaren wir ein persönliches Gespräch." },
    ],
    closingTitle: "Sichern Sie sich das vertrauliche Memorandum.",
    closingSub: "Nur für qualifizierte Investoren. Wir prüfen jede Anfrage persönlich und melden uns innerhalb von 24 Stunden.",
    closingBenefits: ["Keine Renditeversprechen", "Vertrauliche Behandlung", "Antwort innerhalb von 24 Stunden"],
    nav: ["Das Dokument", "Ablauf", "Über uns", "Kontakt"],
    footerDesc: "Zugang zu Investments in marokkanische Energie- und Infrastrukturprojekte. Büros in Casablanca und Düsseldorf.",
    footerDocsH: "Dokumente",
    footerDocs: ["Das vertrauliche Memorandum", "Der Deal-Flow-Report", "Die Due-Diligence-Analyse", "Das Family-Office-Briefing", "Das Thesis Paper"],
    footerContactH: "Kontakt",
    footerContact: ["Casablanca", "Düsseldorf", "kontakt@marokkoinvestment.de"],
    footerLegalH: "Rechtliches",
    footerLegal: ["Impressum", "Datenschutzerklärung", "Cookie-Einstellungen"],
    footerCopyright: "© 2026 Marokko Investment · Ein Projekt von TyloTech",
    footerDisclaimer: "Diese Seite ist weder ein Angebot noch eine Anlageberatung. Sie enthält keine Renditeversprechen. Investitionen in Sachwerte und Projekte können zum Totalverlust des eingesetzten Kapitals führen.",
  },

  /* ─────────────── FRANÇAIS ─────────────── */
  FR: {
    eyebrow: "Réservé aux investisseurs qualifiés",
    headline: "Maroc 2026.\nLe mémorandum\nconfidentiel des investisseurs.",
    sub: "Où affluent aujourd'hui les capitaux institutionnels — et comment les investisseurs privés qualifiés y accèdent. Un document confidentiel réservé à un cercle restreint.",
    cta: "Demander le mémorandum",
    ctaSecondary: "Poser une question",
    anfrageTitle: "Comment recevoir le document.",
    anfrageSub: "Trois informations, une brève confirmation par SMS — et le document est en route. Nous examinons chaque demande personnellement.",
    formTitle: "Demander le document",
    formSub: "Nous n'envoyons le mémorandum qu'après confirmation de votre numéro de téléphone.",
    pdfTitle: "Le mémorandum confidentiel",
    pdfMeta: "PDF · 28 pages · Édition 2026 · Confidentiel",
    benefits: [
      "Gratuit et sans engagement",
      "Traitement confidentiel de vos données",
      "Une réponse de notre part sous 24 heures",
    ],
    labelName: "Nom",
    labelEmail: "E-mail",
    labelPhone: "Numéro de téléphone",
    phName: "Prénom et nom",
    phEmail: "nom@entreprise.com",
    phPhone: "151 2345678",
    consentPre: "J'accepte le traitement de mes données conformément à la ",
    consentLink: "politique de confidentialité",
    consentPost: ".",
    submitting: "Envoi en cours…",
    lockNote: "Vérification par SMS · Aucune transmission à des tiers",
    successTitle: "Demande reçue",
    successText: "Nous examinons vos informations et vous répondrons sous 24 heures.",
    errName: "Veuillez saisir votre nom.",
    errEmail: "Veuillez saisir une adresse e-mail valide.",
    errConsent: "Veuillez accepter la politique de confidentialité.",
    errGeneric: "Une erreur s'est produite.",
    errNetwork: "Erreur de connexion. Veuillez réessayer.",
    strip: [
      { title: "Casablanca & Düsseldorf", sub: "Bureaux avec accès direct" },
      { title: "à partir de 100 000 €", sub: "Ticket type" },
      { title: "Énergie & infrastructure", sub: "Nos secteurs clés" },
      { title: "DE · FR · AR · EN", sub: "Document en quatre langues" },
    ],
    sektorenTitle: "Où va le capital.",
    sektorenSub: "Énergie, infrastructure, logistique. Le Maroc pose les fondations de la prochaine décennie — et les capitaux internationaux sont déjà sur place.",
    sektoren: [
      { name: "Énergie", desc: "Solaire, éolien et extension du réseau à l'échelle industrielle" },
      { name: "Infrastructure", desc: "Ports, routes et rails pour l'export vers l'Europe" },
      { name: "Immobilier", desc: "Locaux commerciaux et logements dans des zones urbaines en croissance" },
      { name: "Logistique", desc: "Le lien court entre l'Afrique et l'UE" },
    ],
    imgLabelSolar: "Solaire thermique dans le sud du Maroc",
    imgLabelPort: "Infrastructure portuaire et logistique",
    imgLabelCasablanca: "Casablanca, place financière de l'Afrique du Nord",
    inhaltTitle: "Ce que contient le document.",
    inhaltSub: "Pas une brochure commerciale. Une analyse sobre de ce qui se passe actuellement au Maroc — et des points d'entrée pour les investisseurs privés qualifiés.",
    inhaltItems: [
      "Quels secteurs affichent la plus forte croissance au Maroc",
      "Où affluent les capitaux internationaux et institutionnels",
      "Comment fonctionne le cadre juridique pour les investisseurs étrangers",
      "Opportunités et risques, évalués honnêtement",
      "Comment les investisseurs privés qualifiés y accèdent",
    ],
    pdfMockLabel: "Marokko Investment",
    pdfMockTitle: "Le mémorandum confidentiel des investisseurs",
    pdfFootPages: "28 pages",
    pdfFootPdf: "PDF",
    pdfFootDate: "Édition 2026",
    vertrauenTitle: "Nous évoluons dans les deux mondes.",
    vertrauenSub: "Derrière Marokko Investment, des bureaux à Casablanca et à Düsseldorf — avec un accès direct et des années d'expérience dans les secteurs de l'infrastructure et de l'énergie au Maroc.",
    officeLabel: "Notre bureau à Casablanca",
    offices: [
      { city: "Casablanca", desc: "Accès aux transactions, administrations et partenaires sur place. Nous voyons les projets avant leur mise en appel d'offres." },
      { city: "Düsseldorf", desc: "Interlocuteur pour les investisseurs de l'espace germanophone. Standards allemands, contrats allemands." },
      { city: "Depuis 2016", desc: "Nos propres projets dans l'énergie et l'infrastructure. Nous investissons avec vous — pas seulement à côté." },
    ],
    grundPill: "Nos principes",
    grundTitle: "Comment nous travaillons. Et pourquoi cela compte pour vous.",
    grundSub: "Trois principes guident chaque décision que nous prenons au Maroc. Ils expliquent aussi pourquoi nos documents sont rédigés de façon si sobre.",
    grundsaetze: [
      { label: "Accès", title: "Nous sommes sur place.", text: "Un bureau à Casablanca, des partenaires auprès des administrations et des promoteurs. Nous voyons les projets avant leur mise en appel d'offres — et pouvons vérifier qui se trouve réellement derrière." },
      { label: "Clarté", title: "Nous disons aussi ce qui ne marche pas.", text: "Chaque analyse nomme les risques aussi clairement que les opportunités. Qui ne veut entendre que de bonnes nouvelles se trompe d'adresse. C'est précisément pour cela que les investisseurs travaillent avec nous." },
      { label: "Engagement", title: "Nous investissons avec vous.", text: "Nous n'accompagnons pas seulement les projets — nous détenons nous-mêmes des parts dans l'énergie et l'infrastructure. Notre propre capital est aux côtés du vôtre, au même risque." },
    ],
    ablaufTitle: "Trois étapes vers le document.",
    ablaufSub: "La vérification garde la liste propre. Nous n'envoyons le document qu'aux contacts confirmés.",
    ablaufSteps: [
      { title: "Demande", text: "Saisissez votre nom, votre e-mail et votre numéro de téléphone. Cela prend moins d'une minute." },
      { title: "Vérification", text: "Vous recevez un code à six chiffres par SMS et confirmez ainsi votre numéro." },
      { title: "Livraison", text: "Le mémorandum arrive directement par e-mail. Sur demande, un entretien personnel suit." },
    ],
    faqPill: "Questions fréquentes",
    faqTitle: "Clarifié à l'avance.",
    faqSub: "Nous restons transparents et concis. Ces réponses vous évitent de devoir demander.",
    faqCtaSm: "Une question en suspens ?",
    faqCtaStrong: "Parlez-nous",
    faqs: [
      { q: "Combien coûte le document ?", a: "Rien. Nous le mettons gratuitement à disposition des investisseurs qualifiés. Aucun coût ultérieur, aucun abonnement." },
      { q: "Pourquoi avez-vous besoin de mon numéro de téléphone ?", a: "Pour la vérification par SMS. Nous garantissons ainsi que seules les demandes réelles aboutissent. Votre numéro n'est pas utilisé à des fins publicitaires." },
      { q: "Qui reçoit mes données ?", a: "Uniquement l'équipe de Marokko Investment. Aucune transmission à des tiers, aucune revente." },
      { q: "À partir de quel montant un investissement est-il pertinent ?", a: "Nos projets s'adressent à des investisseurs avec un ticket minimum de 100 000 €. Les détails figurent dans le mémorandum." },
      { q: "S'agit-il d'un conseil en investissement ?", a: "Non. Nous donnons accès à des informations et à des projets. Nous ne proposons pas de conseil en investissement individuel." },
      { q: "Dans quelles langues le document est-il disponible ?", a: "Le mémorandum est disponible en allemand, français, arabe et anglais." },
      { q: "Que se passe-t-il après la demande ?", a: "Vous recevez le document par e-mail. Sur demande, nous organisons un entretien personnel." },
    ],
    closingTitle: "Obtenez le mémorandum confidentiel.",
    closingSub: "Réservé aux investisseurs qualifiés. Nous examinons chaque demande personnellement et répondons sous 24 heures.",
    closingBenefits: ["Aucune promesse de rendement", "Traitement confidentiel", "Réponse sous 24 heures"],
    nav: ["Le document", "Déroulement", "À propos", "Contact"],
    footerDesc: "Accès à des investissements dans des projets marocains d'énergie et d'infrastructure. Bureaux à Casablanca et à Düsseldorf.",
    footerDocsH: "Documents",
    footerDocs: ["Le mémorandum confidentiel", "Le rapport de deal-flow", "L'analyse de due diligence", "Le briefing family-office", "Le document de thèse"],
    footerContactH: "Contact",
    footerContact: ["Casablanca", "Düsseldorf", "kontakt@marokkoinvestment.de"],
    footerLegalH: "Mentions légales",
    footerLegal: ["Mentions légales", "Politique de confidentialité", "Paramètres des cookies"],
    footerCopyright: "© 2026 Marokko Investment · Un projet de TyloTech",
    footerDisclaimer: "Ce site n'est ni une offre ni un conseil en investissement. Il ne contient aucune promesse de rendement. Les investissements dans des actifs réels et des projets peuvent entraîner une perte totale du capital investi.",
  },

  /* ─────────────── العربية ─────────────── */
  AR: {
    eyebrow: "للمستثمرين المؤهلين فقط",
    headline: "المغرب 2026.\nمذكرة المستثمرين\nالسرّية.",
    sub: "إلى أين يتدفّق رأس المال المؤسسي الآن — وكيف يحصل المستثمرون الخاصّون المؤهلون على الوصول. وثيقة سرّية لدائرة صغيرة.",
    cta: "اطلب المذكرة",
    ctaSecondary: "اطرح سؤالاً",
    anfrageTitle: "كيف تحصل على الوثيقة.",
    anfrageSub: "ثلاث معلومات، وتأكيد قصير عبر رسالة نصية — وتكون الوثيقة في طريقها إليك. نراجع كل طلب شخصياً.",
    formTitle: "اطلب الوثيقة",
    formSub: "لا نرسل المذكرة إلا بعد تأكيد رقم هاتفك.",
    pdfTitle: "المذكرة السرّية",
    pdfMeta: "PDF · 28 صفحة · إصدار 2026 · سرّي",
    benefits: [
      "مجاناً ودون أي التزام لاحق",
      "معالجة سرّية لبياناتك",
      "ردّ منّا خلال 24 ساعة",
    ],
    labelName: "الاسم",
    labelEmail: "البريد الإلكتروني",
    labelPhone: "رقم الهاتف",
    phName: "الاسم الأول واسم العائلة",
    phEmail: "name@company.com",
    phPhone: "151 2345678",
    consentPre: "أوافق على معالجة بياناتي وفقاً لـ",
    consentLink: "سياسة الخصوصية",
    consentPost: ".",
    submitting: "جارٍ الإرسال…",
    lockNote: "تحقّق عبر الرسائل النصية · دون مشاركة مع أطراف ثالثة",
    successTitle: "تم استلام الطلب",
    successText: "نراجع بياناتك وسنعود إليك خلال 24 ساعة.",
    errName: "يرجى إدخال اسمك.",
    errEmail: "يرجى إدخال عنوان بريد إلكتروني صالح.",
    errConsent: "يرجى الموافقة على سياسة الخصوصية.",
    errGeneric: "حدث خطأ.",
    errNetwork: "خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
    strip: [
      { title: "الدار البيضاء ودوسلدورف", sub: "مكاتب بوصول مباشر" },
      { title: "ابتداءً من 100.000 €", sub: "حجم الاستثمار النموذجي" },
      { title: "الطاقة والبنية التحتية", sub: "قطاعاتنا الأساسية" },
      { title: "DE · FR · AR · EN", sub: "الوثيقة بأربع لغات" },
    ],
    sektorenTitle: "إلى أين يتدفّق رأس المال.",
    sektorenSub: "الطاقة والبنية التحتية والخدمات اللوجستية. يضع المغرب الآن أسس العقد القادم — ورأس المال الدولي موجود على الأرض منذ زمن.",
    sektoren: [
      { name: "الطاقة", desc: "الطاقة الشمسية والرياح وتوسيع الشبكة على نطاق صناعي" },
      { name: "البنية التحتية", desc: "موانئ وطرق وسكك حديدية للتصدير إلى أوروبا" },
      { name: "العقارات", desc: "مساحات تجارية وسكنية في مناطق حضرية متنامية" },
      { name: "الخدمات اللوجستية", desc: "الرابط القصير بين أفريقيا والاتحاد الأوروبي" },
    ],
    imgLabelSolar: "الطاقة الشمسية الحرارية في جنوب المغرب",
    imgLabelPort: "البنية التحتية للموانئ والخدمات اللوجستية",
    imgLabelCasablanca: "الدار البيضاء، المركز المالي لشمال أفريقيا",
    inhaltTitle: "ما تحتويه الوثيقة.",
    inhaltSub: "ليست نشرة مبيعات. تقييم واقعي لما يجري في المغرب الآن — وأين يمكن للمستثمرين الخاصّين المؤهلين الانخراط.",
    inhaltItems: [
      "القطاعات التي تُظهر أكبر نموّ في المغرب",
      "إلى أين تتدفّق رؤوس الأموال الدولية والمؤسسية",
      "كيف يبدو الإطار القانوني للمستثمرين الأجانب",
      "الفرص والمخاطر، بتقييم صادق",
      "كيف يحصل المستثمرون الخاصّون المؤهلون على الوصول",
    ],
    pdfMockLabel: "Marokko Investment",
    pdfMockTitle: "مذكرة المستثمرين السرّية",
    pdfFootPages: "28 صفحة",
    pdfFootPdf: "PDF",
    pdfFootDate: "إصدار 2026",
    vertrauenTitle: "نتحرّك في العالمَين معاً.",
    vertrauenSub: "خلف Marokko Investment مكاتب في الدار البيضاء ودوسلدورف — بوصول مباشر وسنوات من الخبرة في قطاعَي البنية التحتية والطاقة في المغرب.",
    officeLabel: "مكتبنا في الدار البيضاء",
    offices: [
      { city: "الدار البيضاء", desc: "الوصول إلى الصفقات والجهات الرسمية والشركاء على الأرض. نرى المشاريع قبل طرحها." },
      { city: "دوسلدورف", desc: "جهة الاتصال للمستثمرين في المنطقة الناطقة بالألمانية. معايير ألمانية وعقود ألمانية." },
      { city: "منذ 2016", desc: "مشاريعنا الخاصة في الطاقة والبنية التحتية. نستثمر معكم — لا على الهامش فحسب." },
    ],
    grundPill: "مبادئنا",
    grundTitle: "كيف نعمل. ولماذا يهمّك ذلك.",
    grundSub: "ثلاثة مبادئ توجّه كل قرار نتّخذه في المغرب. وهي تفسّر أيضاً لماذا تُكتب وثائقنا بهذا القدر من الواقعية.",
    grundsaetze: [
      { label: "الوصول", title: "نحن على الأرض.", text: "مكتب في الدار البيضاء وشركاء لدى الجهات الرسمية والمطوّرين. نرى المشاريع قبل طرحها — ويمكننا التحقّق ممّن يقف وراءها فعلاً." },
      { label: "الوضوح", title: "نقول أيضاً ما لا يصلح.", text: "كل تحليل يذكر المخاطر بوضوح كما الفرص. من يريد سماع الأخبار الجيدة فقط فهو في المكان الخطأ. ولهذا بالضبط يعمل المستثمرون معنا." },
      { label: "المشاركة", title: "نستثمر معكم.", text: "لا نرافق المشاريع فحسب — بل نملك حصصاً بأنفسنا في الطاقة والبنية التحتية. رأس مالنا إلى جانب رأس مالكم، بالمخاطرة نفسها." },
    ],
    ablaufTitle: "ثلاث خطوات للحصول على الوثيقة.",
    ablaufSub: "التحقّق يبقي القائمة نظيفة. نرسل الوثيقة إلى جهات الاتصال المؤكَّدة فقط.",
    ablaufSteps: [
      { title: "الطلب", text: "أدخل اسمك وبريدك الإلكتروني ورقم هاتفك. يستغرق ذلك أقل من دقيقة." },
      { title: "التحقّق", text: "تتلقّى رمزاً من ستة أرقام عبر رسالة نصية وتؤكّد به رقمك." },
      { title: "التسليم", text: "تصل المذكرة مباشرة عبر البريد الإلكتروني. وعند الطلب يتبعها حديث شخصي." },
    ],
    faqPill: "أسئلة شائعة",
    faqTitle: "موضَّح مسبقاً.",
    faqSub: "نبقيه شفّافاً وموجزاً. هذه الأجوبة تغنيك عن السؤال.",
    faqCtaSm: "بقي شيء غير واضح؟",
    faqCtaStrong: "تحدّث إلينا",
    faqs: [
      { q: "كم تكلّف الوثيقة؟", a: "لا شيء. نوفّرها للمستثمرين المؤهلين مجاناً. لا تكاليف لاحقة ولا اشتراك." },
      { q: "لماذا تحتاجون رقم هاتفي؟", a: "للتحقّق عبر الرسائل النصية. بذلك نضمن مرور الطلبات الحقيقية فقط. لا يُستخدم رقمك لأغراض الدعاية." },
      { q: "من يحصل على بياناتي؟", a: "فريق Marokko Investment فقط. لا مشاركة مع أطراف ثالثة ولا إعادة بيع." },
      { q: "ابتداءً من أي مبلغ يكون الاستثمار مجدياً؟", a: "تستهدف مشاريعنا المستثمرين بحدّ أدنى قدره 100.000 €. التفاصيل في المذكرة." },
      { q: "هل هذه استشارة استثمارية؟", a: "لا. نوفّر الوصول إلى المعلومات والمشاريع. لا نقدّم استشارة استثمارية فردية." },
      { q: "بأي اللغات تتوفّر الوثيقة؟", a: "المذكرة متوفّرة بالألمانية والفرنسية والعربية والإنجليزية." },
      { q: "ماذا يحدث بعد الطلب؟", a: "تتلقّى الوثيقة عبر البريد الإلكتروني. وعند الطلب نرتّب حديثاً شخصياً." },
    ],
    closingTitle: "احصل على المذكرة السرّية.",
    closingSub: "للمستثمرين المؤهلين فقط. نراجع كل طلب شخصياً ونردّ خلال 24 ساعة.",
    closingBenefits: ["دون وعود بالعوائد", "معالجة سرّية", "ردّ خلال 24 ساعة"],
    nav: ["الوثيقة", "الخطوات", "من نحن", "اتصل بنا"],
    footerDesc: "الوصول إلى استثمارات في مشاريع الطاقة والبنية التحتية المغربية. مكاتب في الدار البيضاء ودوسلدورف.",
    footerDocsH: "الوثائق",
    footerDocs: ["المذكرة السرّية", "تقرير تدفّق الصفقات", "تحليل العناية الواجبة", "إحاطة المكاتب العائلية", "ورقة الأطروحة"],
    footerContactH: "اتصل بنا",
    footerContact: ["الدار البيضاء", "دوسلدورف", "kontakt@marokkoinvestment.de"],
    footerLegalH: "قانوني",
    footerLegal: ["بيانات النشر", "سياسة الخصوصية", "إعدادات ملفات تعريف الارتباط"],
    footerCopyright: "© 2026 Marokko Investment · مشروع من TyloTech",
    footerDisclaimer: "هذا الموقع ليس عرضاً ولا استشارة استثمارية. ولا يتضمّن أي وعود بالعوائد. قد تؤدّي الاستثمارات في الأصول العينية والمشاريع إلى خسارة كاملة لرأس المال المستثمر.",
  },

  /* ─────────────── ENGLISH ─────────────── */
  EN: {
    eyebrow: "For qualified investors only",
    headline: "Morocco 2026.\nThe confidential\ninvestor memorandum.",
    sub: "Where institutional capital is flowing now — and how qualified private investors gain access. A confidential document for a small circle.",
    cta: "Request memorandum",
    ctaSecondary: "Ask a question",
    anfrageTitle: "How to receive the document.",
    anfrageSub: "Three details, a short confirmation by SMS — and the document is on its way. We review every request personally.",
    formTitle: "Request document",
    formSub: "We only send the memorandum once your phone number is confirmed.",
    pdfTitle: "The confidential memorandum",
    pdfMeta: "PDF · 28 pages · As of 2026 · Confidential",
    benefits: [
      "Free and with no further obligation",
      "Confidential handling of your details",
      "A reply from us within 24 hours",
    ],
    labelName: "Name",
    labelEmail: "Email",
    labelPhone: "Phone number",
    phName: "First and last name",
    phEmail: "name@company.com",
    phPhone: "151 2345678",
    consentPre: "I agree to the processing of my data in accordance with the ",
    consentLink: "privacy policy",
    consentPost: ".",
    submitting: "Sending…",
    lockNote: "SMS verification · No sharing with third parties",
    successTitle: "Request received",
    successText: "We are reviewing your details and will get back to you within 24 hours.",
    errName: "Please enter your name.",
    errEmail: "Please enter a valid email address.",
    errConsent: "Please agree to the privacy policy.",
    errGeneric: "An error occurred.",
    errNetwork: "Connection error. Please try again.",
    strip: [
      { title: "Casablanca & Düsseldorf", sub: "Offices with direct access" },
      { title: "from €100,000", sub: "Typical ticket size" },
      { title: "Energy & infrastructure", sub: "Our focus sectors" },
      { title: "DE · FR · AR · EN", sub: "Document in four languages" },
    ],
    sektorenTitle: "Where the capital flows.",
    sektorenSub: "Energy, infrastructure, logistics. Morocco is laying the foundations for the next decade — and international capital is already on the ground.",
    sektoren: [
      { name: "Energy", desc: "Solar, wind and grid expansion at industrial scale" },
      { name: "Infrastructure", desc: "Ports, roads and rail for export to Europe" },
      { name: "Real estate", desc: "Commercial and residential space in growing urban areas" },
      { name: "Logistics", desc: "The short link between Africa and the EU" },
    ],
    imgLabelSolar: "Solar thermal in southern Morocco",
    imgLabelPort: "Port and logistics infrastructure",
    imgLabelCasablanca: "Casablanca, financial hub of North Africa",
    inhaltTitle: "What the document contains.",
    inhaltSub: "Not a sales brochure. A sober assessment of what is happening in Morocco right now — and where qualified private investors can plug in.",
    inhaltItems: [
      "Which sectors in Morocco show the strongest growth",
      "Where international and institutional capital flows",
      "How the legal framework for foreign investors works",
      "Opportunities and risks, honestly assessed",
      "How qualified private investors gain access",
    ],
    pdfMockLabel: "Marokko Investment",
    pdfMockTitle: "The confidential investor memorandum",
    pdfFootPages: "28 pages",
    pdfFootPdf: "PDF",
    pdfFootDate: "As of 2026",
    vertrauenTitle: "We move in both worlds.",
    vertrauenSub: "Behind Marokko Investment stand offices in Casablanca and Düsseldorf — with direct access and years of experience in Morocco's infrastructure and energy sector.",
    officeLabel: "Our office in Casablanca",
    offices: [
      { city: "Casablanca", desc: "Deal access, authorities and partners on the ground. We see projects before they are tendered." },
      { city: "Düsseldorf", desc: "Point of contact for investors in the German-speaking region. German standards, German contracts." },
      { city: "Since 2016", desc: "Our own projects in energy and infrastructure. We invest alongside you — not just on the side." },
    ],
    grundPill: "Our principles",
    grundTitle: "How we work. And why it matters to you.",
    grundSub: "Three principles guide every decision we make in Morocco. They also explain why our documents are written so soberly.",
    grundsaetze: [
      { label: "Access", title: "We are on the ground.", text: "An office in Casablanca, partners at authorities and developers. We see projects before they are tendered — and can check who actually stands behind them." },
      { label: "Clarity", title: "We also say what won't work.", text: "Every analysis names the risks as clearly as the opportunities. If you only want to hear good news, you're in the wrong place. That is exactly why investors work with us." },
      { label: "Commitment", title: "We invest alongside you.", text: "We don't just accompany projects — we hold stakes ourselves in energy and infrastructure. Our own capital sits beside yours, at the same risk." },
    ],
    ablaufTitle: "Three steps to the document.",
    ablaufSub: "Verification keeps the list clean. We send the document only to confirmed contacts.",
    ablaufSteps: [
      { title: "Request", text: "Enter your name, email and phone number. It takes less than a minute." },
      { title: "Verification", text: "You receive a six-digit code by SMS and confirm your number with it." },
      { title: "Delivery", text: "The memorandum arrives directly by email. On request, a personal conversation follows." },
    ],
    faqPill: "Frequently asked",
    faqTitle: "Cleared up in advance.",
    faqSub: "We keep it transparent and short. These answers save you the follow-up questions.",
    faqCtaSm: "Something still open?",
    faqCtaStrong: "Talk to us",
    faqs: [
      { q: "What does the document cost?", a: "Nothing. We provide it to qualified investors free of charge. There are no follow-up costs and no subscription." },
      { q: "Why do you need my phone number?", a: "For verification by SMS. This ensures only genuine requests get through. Your number is not used for advertising." },
      { q: "Who receives my data?", a: "Only the Marokko Investment team. No sharing with third parties, no resale." },
      { q: "From what amount does an investment make sense?", a: "Our projects are aimed at investors with a minimum ticket of €100,000. Details are in the memorandum." },
      { q: "Is this investment advice?", a: "No. We provide access to information and projects. We do not offer individual investment advice." },
      { q: "In which languages is the document available?", a: "The memorandum is available in German, French, Arabic and English." },
      { q: "What happens after the request?", a: "You receive the document by email. On request, we arrange a personal conversation." },
    ],
    closingTitle: "Secure the confidential memorandum.",
    closingSub: "For qualified investors only. We review every request personally and respond within 24 hours.",
    closingBenefits: ["No return promises", "Confidential handling", "Reply within 24 hours"],
    nav: ["The document", "Process", "About us", "Contact"],
    footerDesc: "Access to investments in Moroccan energy and infrastructure projects. Offices in Casablanca and Düsseldorf.",
    footerDocsH: "Documents",
    footerDocs: ["The confidential memorandum", "The deal-flow report", "The due-diligence analysis", "The family-office briefing", "The thesis paper"],
    footerContactH: "Contact",
    footerContact: ["Casablanca", "Düsseldorf", "kontakt@marokkoinvestment.de"],
    footerLegalH: "Legal",
    footerLegal: ["Imprint", "Privacy policy", "Cookie settings"],
    footerCopyright: "© 2026 Marokko Investment · A project by TyloTech",
    footerDisclaimer: "This site is neither an offer nor investment advice. It contains no return promises. Investments in real assets and projects can lead to a total loss of the capital invested.",
  },
};
