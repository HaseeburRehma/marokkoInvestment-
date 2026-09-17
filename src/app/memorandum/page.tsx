"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import s from "./memorandum.module.css";

/* ── Scroll-triggered reveal hook ── */
type RevealDir = "up" | "left" | "right" | "scale";
function useReveal(threshold = 0.15, dir: RevealDir = "up") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  const base = dir === "left" ? s.revealLeft : dir === "right" ? s.revealRight : dir === "scale" ? s.revealScale : s.reveal;
  return { ref, cls: visible ? `${base} ${s.revealed}` : base, visible };
}

/* ── Content ── */
const C = {
  eyebrow: "Nur für qualifizierte Investoren",
  headline: "Marokko 2026.\nDas vertrauliche\nInvestoren-Memorandum.",
  sub: "Wohin institutionelles Kapital jetzt fließt — und wie qualifizierte Privatinvestoren Zugang bekommen. Ein vertrauliches Dokument für einen kleinen Kreis.",
  cta: "Memorandum anfordern",
  formTitle: "Dokument anfordern",
  formSub: "Wir versenden das Memorandum erst nach Bestätigung Ihrer Telefonnummer.",
  pdfTitle: "Das vertrauliche Memorandum",
  pdfMeta: "PDF · 28 Seiten · Stand 2026 · Vertraulich",
  benefits: [
    "Kostenfrei und ohne Folgeverpflichtung",
    "Vertrauliche Behandlung Ihrer Angaben",
    "Antwort von uns innerhalb von 24 Stunden",
  ],
  sektorenTitle: "Wohin das Kapital fließt.",
  sektorenSub: "Energie, Infrastruktur, Logistik. Marokko legt gerade die Grundlagen für das nächste Jahrzehnt — und internationales Kapital ist längst vor Ort.",
  sektoren: [
    { name: "Energie", desc: "Solar, Wind und Netzausbau im industriellen Maßstab" },
    { name: "Infrastruktur", desc: "Häfen, Straßen und Schienen für den Export nach Europa" },
    { name: "Immobilien", desc: "Gewerbe und Wohnraum in wachsenden Ballungsräumen" },
    { name: "Logistik", desc: "Die kurze Verbindung zwischen Afrika und der EU" },
  ],
  inhaltTitle: "Was in dem Dokument steht.",
  inhaltSub: "Kein Verkaufsprospekt. Eine nüchterne Einordnung dessen, was in Marokko gerade passiert — und wo qualifizierte Privatinvestoren anschlussfähig sind.",
  inhaltItems: [
    "Welche Sektoren in Marokko das größte Wachstum zeigen",
    "Wohin internationales und institutionelles Kapital fließt",
    "Wie der rechtliche Rahmen für ausländische Investoren aussieht",
    "Chancen und Risiken, ehrlich eingeordnet",
    "Wie qualifizierte Privatinvestoren Zugang bekommen",
  ],
  vertrauenTitle: "Wir bewegen uns in beiden Welten.",
  vertrauenSub: "Hinter Marokko Investment stehen Büros in Casablanca und Düsseldorf — mit direktem Zugang und jahrelanger Erfahrung im Infrastruktur- und Energiesektor Marokkos.",
  offices: [
    { city: "Casablanca", desc: "Deal-Zugang, Behörden und Partner vor Ort. Wir sehen Projekte, bevor sie ausgeschrieben werden." },
    { city: "Düsseldorf", desc: "Ansprechpartner für Investoren im deutschsprachigen Raum. Deutsche Standards, deutsche Verträge." },
    { city: "Seit 2016", desc: "Eigene Projekte in Energie und Infrastruktur. Wir investieren mit — nicht nur nebenher." },
  ],
  grundsaetze: [
    { num: "01", label: "Zugang", title: "Wir sind vor Ort.", text: "Ein Büro in Casablanca, Partner bei Behörden und Entwicklern. Wir sehen Projekte, bevor sie ausgeschrieben werden — und können prüfen, wer tatsächlich dahintersteht.", img: "/images/office-casablanca.jpg" },
    { num: "02", label: "Klarheit", title: "Wir sagen auch, was nicht geht.", text: "Jede Analyse benennt die Risiken so deutlich wie die Chancen. Wer nur gute Nachrichten hören möchte, ist bei uns falsch. Genau deshalb arbeiten Investoren mit uns.", img: "/images/port-logistics.jpg" },
    { num: "03", label: "Beteiligung", title: "Wir investieren mit.", text: "Wir begleiten Projekte nicht nur — wir halten selbst Anteile in Energie und Infrastruktur. Unser eigenes Kapital liegt neben Ihrem, mit demselben Risiko.", img: "/images/solar-farm.jpg" },
  ],
  ablaufSteps: [
    { num: "01", title: "Anfrage", text: "Name, E-Mail und Telefonnummer eintragen. Das dauert weniger als eine Minute." },
    { num: "02", title: "Verifizierung", text: "Sie erhalten einen sechsstelligen Code per SMS und bestätigen damit Ihre Nummer." },
    { num: "03", title: "Zustellung", text: "Das Memorandum kommt direkt per E-Mail. Auf Wunsch folgt ein persönliches Gespräch." },
  ],
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
};

const NAV = [
  { label: "Das Dokument", href: "#dokument" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Über uns", href: "#vertrauen" },
  { label: "Kontakt", href: "#fragen" },
];

/* ── Gold M logo SVG ── */
function LogoSvg({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <rect width="50" height="50" rx="10" fill="none" stroke="#B08D45" strokeWidth="1.5" opacity="0.5" />
      <path d="M12 38V14h2l12 16 12-16h2v24h-4V20l-10 14-10-14v18z" fill="#B08D45" />
    </svg>
  );
}

/* ── Moroccan arch icon for office cards ── */
function ArchIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 38" fill="none">
      <path d="M4 38V16C4 9.37 9.37 4 16 4s12 5.37 12 12v22" stroke="#B08D45" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M9 38V18c0-3.87 3.13-7 7-7s7 3.13 7 7v20" stroke="#B08D45" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

/* ── Decorative Moroccan arch row ── */
function ArchDecor() {
  return (
    <div className={s.archDecor} aria-hidden="true">
      <svg viewBox="0 0 1200 280" fill="none" preserveAspectRatio="xMidYMax meet" className={s.archDecorSvg}>
        {[0, 1, 2, 3, 4].map((i) => {
          const cx = 120 + i * 240;
          return (
            <g key={i}>
              <path d={`M${cx - 105} 280V100C${cx - 105} 42 ${cx - 58} -16 ${cx} -16S${cx + 105} 42 ${cx + 105} 100V280`} stroke="rgba(176,141,69,0.18)" strokeWidth="1.2" />
              <path d={`M${cx - 75} 280V110C${cx - 75} 68 ${cx - 42} 26 ${cx} 26S${cx + 75} 68 ${cx + 75} 110V280`} stroke="rgba(176,141,69,0.10)" strokeWidth="1" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Check icon ── */
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="9" fill="#B08D45" opacity="0.15" />
      <path d="M5.5 9.5l2.5 2.5 5-5" stroke="#B08D45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Branded email: RECEIVER (info@tylotech.de) ── */
function buildReceiverEmail(name: string, email: string, phone: string, ts: string) {
  return `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;background:#0C0A07;color:#f5ede0;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#1A1710,#12100C);padding:40px 40px 32px;border-bottom:1px solid rgba(176,141,69,0.15);">
    <div style="text-align:center;margin-bottom:28px;">
      <span style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#B08D45;font-family:'Courier New',monospace;">✦ Marokko Investment ✦</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:400;color:#f5ede0;font-family:Georgia,'Times New Roman',serif;text-align:center;">Neue Memorandum-Anfrage</h1>
    <p style="margin:0;font-size:14px;color:rgba(245,237,224,0.45);text-align:center;">Ein neuer Interessent möchte das vertrauliche Memorandum erhalten.</p>
  </div>
  <div style="padding:32px 40px;">
    <div style="background:rgba(176,141,69,0.06);border:1px solid rgba(176,141,69,0.15);border-radius:10px;padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 20px;border-bottom:1px solid rgba(176,141,69,0.1);">
            <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(176,141,69,0.7);font-family:'Courier New',monospace;margin-bottom:6px;">Name</div>
            <div style="font-size:17px;color:#f5ede0;font-weight:500;">${name}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 0;border-bottom:1px solid rgba(176,141,69,0.1);">
            <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(176,141,69,0.7);font-family:'Courier New',monospace;margin-bottom:6px;">E-Mail</div>
            <a href="mailto:${email}" style="font-size:16px;color:#B08D45;text-decoration:none;font-weight:500;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 0;border-bottom:1px solid rgba(176,141,69,0.1);">
            <table style="width:100%;border-collapse:collapse;"><tr>
              <td style="width:50%;vertical-align:top;">
                <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(176,141,69,0.7);font-family:'Courier New',monospace;margin-bottom:6px;">Telefon</div>
                <div style="font-size:15px;color:rgba(245,237,224,0.75);">${phone}</div>
              </td>
              <td style="width:50%;vertical-align:top;">
                <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(176,141,69,0.7);font-family:'Courier New',monospace;margin-bottom:6px;">Zeitpunkt</div>
                <div style="font-size:15px;color:rgba(245,237,224,0.75);">${ts}</div>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 0 0;">
            <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(176,141,69,0.7);font-family:'Courier New',monospace;margin-bottom:6px;">Dokument</div>
            <div style="font-size:15px;color:rgba(245,237,224,0.75);">Investoren-Memorandum</div>
          </td>
        </tr>
      </table>
    </div>
    <div style="padding:28px 0 8px;text-align:center;">
      <a href="mailto:${email}?subject=Marokko%20Investment%20%E2%80%94%20Ihr%20Memorandum&body=Sehr%20geehrte(r)%20${encodeURIComponent(name)}%2C%0A%0Avielen%20Dank%20f%C3%BCr%20Ihr%20Interesse%20an%20unserem%20Investoren-Memorandum.%0A%0A"
         style="display:inline-block;background:#B08D45;color:#0C0A07;padding:14px 36px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;">Interessenten antworten →</a>
    </div>
  </div>
  <div style="text-align:center;padding:20px 40px;border-top:1px solid rgba(176,141,69,0.08);">
    <span style="font-size:11px;color:rgba(245,237,224,0.2);">Marokko Investment · marokkoinvestment.de</span>
  </div>
</div>`.trim();
}

/* ── Branded email: SENDER (auto-reply to requester) ── */
function buildSenderEmail(name: string) {
  const firstName = name.split(" ")[0];
  return `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;background:#0C0A07;color:#f5ede0;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#1A1710,#12100C);padding:40px 40px 32px;border-bottom:1px solid rgba(176,141,69,0.15);">
    <div style="text-align:center;margin-bottom:28px;">
      <span style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#B08D45;font-family:'Courier New',monospace;">✦ Marokko Investment ✦</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:400;color:#f5ede0;font-family:Georgia,'Times New Roman',serif;text-align:center;">Ihre Anfrage ist eingegangen</h1>
    <p style="margin:0;font-size:14px;color:rgba(245,237,224,0.45);text-align:center;">Vielen Dank für Ihr Interesse am vertraulichen Investoren-Memorandum.</p>
  </div>
  <div style="padding:36px 40px;">
    <p style="font-size:15px;color:rgba(245,237,224,0.7);line-height:1.8;margin:0 0 24px;">
      Sehr geehrte(r) ${firstName},
    </p>
    <p style="font-size:15px;color:rgba(245,237,224,0.7);line-height:1.8;margin:0 0 24px;">
      wir haben Ihre Anfrage erhalten und prüfen diese persönlich. Sie erhalten das vertrauliche Memorandum in der Regel innerhalb von 24 Stunden per E-Mail.
    </p>
    <div style="background:rgba(176,141,69,0.06);border:1px solid rgba(176,141,69,0.15);border-radius:10px;padding:24px 28px;margin:0 0 24px;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(176,141,69,0.7);font-family:'Courier New',monospace;">Ihr angefordertes Dokument</p>
      <p style="margin:0;font-size:16px;color:#f5ede0;font-weight:500;">Das vertrauliche Investoren-Memorandum</p>
      <p style="margin:8px 0 0;font-size:12px;color:rgba(245,237,224,0.35);font-family:'Courier New',monospace;">PDF · 28 Seiten · Stand 2026 · Vertraulich</p>
    </div>
    <p style="font-size:15px;color:rgba(245,237,224,0.7);line-height:1.8;margin:0 0 24px;">
      <strong style="color:#f5ede0;">Was passiert als Nächstes?</strong>
    </p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
      <tr>
        <td style="padding:12px 16px 12px 0;vertical-align:top;width:32px;">
          <span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:rgba(176,141,69,0.12);color:#B08D45;font-size:11px;font-weight:600;text-align:center;line-height:24px;font-family:'Courier New',monospace;">1</span>
        </td>
        <td style="padding:12px 0;font-size:14px;color:rgba(245,237,224,0.6);border-bottom:1px solid rgba(176,141,69,0.08);">Wir prüfen Ihre Angaben persönlich.</td>
      </tr>
      <tr>
        <td style="padding:12px 16px 12px 0;vertical-align:top;">
          <span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:rgba(176,141,69,0.12);color:#B08D45;font-size:11px;font-weight:600;text-align:center;line-height:24px;font-family:'Courier New',monospace;">2</span>
        </td>
        <td style="padding:12px 0;font-size:14px;color:rgba(245,237,224,0.6);border-bottom:1px solid rgba(176,141,69,0.08);">Sie erhalten ggf. eine kurze Verifizierung per SMS.</td>
      </tr>
      <tr>
        <td style="padding:12px 16px 12px 0;vertical-align:top;">
          <span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:rgba(176,141,69,0.12);color:#B08D45;font-size:11px;font-weight:600;text-align:center;line-height:24px;font-family:'Courier New',monospace;">3</span>
        </td>
        <td style="padding:12px 0;font-size:14px;color:rgba(245,237,224,0.6);">Das Memorandum wird Ihnen per E-Mail zugestellt.</td>
      </tr>
    </table>
    <p style="font-size:14px;color:rgba(245,237,224,0.45);line-height:1.7;margin:0 0 8px;">
      Bei Rückfragen erreichen Sie uns jederzeit unter <a href="mailto:info@tylotech.de" style="color:#B08D45;text-decoration:none;">info@tylotech.de</a>
    </p>
    <p style="font-size:14px;color:rgba(245,237,224,0.45);line-height:1.7;margin:0;">
      Mit freundlichen Grüßen,<br/>
      <strong style="color:rgba(245,237,224,0.6);">Jawad Malloul</strong><br/>
      <span style="font-size:12px;color:rgba(245,237,224,0.3);">Marokko Investment</span>
    </p>
  </div>
  <div style="text-align:center;padding:20px 40px;border-top:1px solid rgba(176,141,69,0.08);">
    <span style="font-size:11px;color:rgba(245,237,224,0.2);">Marokko Investment · marokkoinvestment.de</span>
    <br/>
    <span style="font-size:10px;color:rgba(245,237,224,0.1);line-height:2;">Diese E-Mail wurde automatisch versendet. Bitte antworten Sie nicht direkt auf diese Nachricht.</span>
  </div>
</div>`.trim();
}

const LANGS = [
  { code: "DE", label: "Deutsch" },
  { code: "FR", label: "Français" },
  { code: "AR", label: "العربية" },
  { code: "EN", label: "English" },
] as const;

export default function MemorandumPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lang, setLang] = useState("DE");
  const [langOpen, setLangOpen] = useState(false);

  /* Form */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  /* Timeline scroll progress */
  const timelineRef = useRef<HTMLDivElement>(null);
  const [tlProgress, setTlProgress] = useState(0);
  const [activeDots, setActiveDots] = useState<boolean[]>([false, false, false]);

  useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  /* Close language dropdown on outside click */
  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  /* Scroll-driven timeline progress */
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    const onScroll = () => {
      const rect = tl.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = rect.top - vh * 0.7;
      const end = rect.bottom - vh * 0.3;
      const range = end - start;
      if (range <= 0) return;
      const raw = Math.max(0, Math.min(1, -start / range));
      setTlProgress(raw);
      const items = tl.querySelectorAll("[data-tl-item]");
      const dots: boolean[] = [];
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        dots.push(r.top < vh * 0.6);
      });
      setActiveDots(dots);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reveal refs for each section */
  const r1 = useReveal(0.12, "up");
  const r2 = useReveal(0.12, "up");
  const r3 = useReveal(0.12, "left");
  const r4 = useReveal(0.12, "up");
  const r5 = useReveal(0.12, "up");
  const r6 = useReveal(0.12, "scale");
  const r7 = useReveal(0.12, "up");
  const r8 = useReveal(0.12, "scale");
  const r9 = useReveal(0.12, "up");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return;
    if (!name.trim()) { setErrorMsg("Bitte geben Sie Ihren Namen ein."); setFormStatus("error"); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrorMsg("Bitte geben Sie eine gültige E-Mail-Adresse ein."); setFormStatus("error"); return; }
    if (!consent) { setErrorMsg("Bitte stimmen Sie der Datenschutzerklärung zu."); setFormStatus("error"); return; }

    setFormStatus("loading");
    setErrorMsg("");

    const ts = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const n = name.trim();
    const em = email.trim();
    const ph = phone.trim() || "–";

    try {
      /* ── 1) Notification to info@tylotech.de ── */
      const notif = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "241ac8bf-f24f-4a36-b8f4-364360c35415",
          subject: `Neue Memorandum-Anfrage — ${n}`,
          from_name: "Marokko Investment",
          replyto: em,
          Name: n,
          "E-Mail": em,
          Telefon: ph,
          Dokument: "Investoren-Memorandum",
          Zeitpunkt: ts,
          message: buildReceiverEmail(n, em, ph, ts),
        }),
      });

      /* ── 2) Auto-reply to the sender ── */
      const reply = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "241ac8bf-f24f-4a36-b8f4-364360c35415",
          subject: "Ihre Anfrage — Marokko Investment",
          from_name: "Marokko Investment",
          replyto: "info@tylotech.de",
          to: em,
          message: buildSenderEmail(n),
        }),
      });

      const [res1] = await Promise.all([notif, reply]);
      const data = await res1.json();
      if (data.success) { setFormStatus("success"); setName(""); setEmail(""); setPhone(""); }
      else { setErrorMsg(data.message ?? "Ein Fehler ist aufgetreten."); setFormStatus("error"); }
    } catch { setErrorMsg("Verbindungsfehler. Bitte erneut versuchen."); setFormStatus("error"); }
  }, [name, email, phone, hp, consent]);

  return (
    <div className={`${s.page} ${mounted ? s.mounted : ""}`}>

      {/* ═══ HEADER ═══ */}
      <header className={s.header}>
        <div className={s.headerInner}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={s.logo}><LogoSvg /><span>Marokko Investment</span></a>
          <nav className={s.nav}>
            {NAV.map((l) => <a key={l.href} href={l.href} className={s.navLink}>{l.label}</a>)}
          </nav>
          <div className={s.headerRight}>
            <div className={s.langWrap}>
              <button className={s.langBtn} onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}>{LANGS.find(l => l.code === lang)?.label ?? lang} <ChevronDown /></button>
              {langOpen && (
                <div className={s.langDrop}>
                  {LANGS.map((l) => (
                    <button key={l.code} className={`${s.langOpt} ${lang === l.code ? s.langOptActive : ""}`} onClick={() => { setLang(l.code); setLangOpen(false); }}>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className={s.headerCta} onClick={scrollToForm}>{C.cta} <Arrow /></button>
          </div>
          <button className={s.burger} onClick={() => setMobileNav(!mobileNav)} aria-label="Menü"><span /><span /><span /></button>
        </div>
        {mobileNav && (
          <div className={s.mobNav}>
            {NAV.map((l) => <a key={l.href} href={l.href} className={s.mobNavLink} onClick={() => setMobileNav(false)}>{l.label}</a>)}
            <button className={s.headerCta} onClick={() => { setMobileNav(false); scrollToForm(); }}>{C.cta} <Arrow /></button>
          </div>
        )}
      </header>

      {/* ═══ 1 · HERO ═══ */}
      <section className={s.hero}>
        <img src="/images/hero-moroccan-arch.jpg" alt="" className={s.heroBg} />
        <div className={s.heroOverlay} />
        <div className={`${s.heroContent} ${mounted ? s.heroIn : ""}`}>
          <span className={s.badge}><span className={s.pulse} />{C.eyebrow}</span>
          <h1 className={s.heroH1}>{C.headline}</h1>
          <p className={s.heroSub}>{C.sub}</p>
          <button className={s.heroCta} onClick={scrollToForm}>{C.cta} <Arrow /></button>
        </div>
        <div className={s.scrollHint}>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none"><rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(176,141,69,0.4)" strokeWidth="1.5" /><circle cx="8" cy="8" r="2" fill="#B08D45" className={s.scrollDot} /></svg>
        </div>
      </section>

      {/* ═══ 2 · ANFRAGE / FORM ═══ */}
      <section className={s.anfrage} id="dokument" ref={formRef}>
        <div ref={r1.ref} className={`${s.anfrageGrid} ${s.reveal} ${r1.cls}`}>
          <div className={s.anfrageInfo}>
            <h2 className={s.secTitle}>So erhalten Sie das Dokument.</h2>
            <p className={s.secSub}>Drei Angaben, eine kurze Bestätigung per SMS — und das Dokument ist unterwegs. Wir prüfen jede Anfrage persönlich.</p>
            <div className={s.pdfCard}>
              <div className={s.pdfIcon}><LogoSvg size={36} /></div>
              <div>
                <strong>{C.pdfTitle}</strong>
                <p className={s.pdfMeta}>{C.pdfMeta}</p>
                <div className={s.langTags}>{["DE", "FR", "AR", "EN"].map((l) => <span key={l} className={s.langTag}>{l}</span>)}</div>
              </div>
            </div>
            <ul className={s.checks}>
              {C.benefits.map((b) => <li key={b}><CheckIcon /><span>{b}</span></li>)}
            </ul>
          </div>

          <div className={s.formCard}>
            {formStatus === "success" ? (
              <div className={s.formOk}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#B08D45" opacity="0.12" /><path d="M14 24l7 7 13-13" stroke="#B08D45" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <h3>Anfrage erhalten</h3>
                <p>Wir prüfen Ihre Angaben und melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <>
                <h3 className={s.formTitle}>{C.formTitle}</h3>
                <p className={s.formSub}>{C.formSub}</p>
                <form onSubmit={handleSubmit} className={s.form}>
                  <input type="text" name="_honey" value={hp} onChange={(e) => setHp(e.target.value)} className={s.honey} tabIndex={-1} autoComplete="off" />
                  <label className={s.label}>Name</label>
                  <input type="text" placeholder="Vor- und Nachname" value={name} onChange={(e) => setName(e.target.value)} className={s.input} />
                  <label className={s.label}>E-Mail</label>
                  <input type="email" placeholder="name@unternehmen.de" value={email} onChange={(e) => setEmail(e.target.value)} className={s.input} />
                  <label className={s.label}>Telefonnummer</label>
                  <div className={s.phoneRow}>
                    <span className={s.phonePrefix}>+49</span>
                    <input type="tel" placeholder="151 2345678" value={phone} onChange={(e) => setPhone(e.target.value)} className={s.phoneInput} />
                  </div>
                  <label className={s.consent}>
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className={s.cb} />
                    <span>Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" target="_blank">Datenschutzerklärung</a> zu.</span>
                  </label>
                  {formStatus === "error" && <p className={s.err}>{errorMsg}</p>}
                  <button type="submit" className={s.goldBtnFull} disabled={formStatus === "loading"}>
                    {formStatus === "loading" ? "Wird gesendet…" : <>{C.cta} <Arrow /></>}
                  </button>
                  <p className={s.lockNote}><LockIcon /> SMS-Verifizierung · Keine Weitergabe an Dritte</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══ 3 · CREDENTIALS STRIP ═══ */}
      <div className={s.strip}>
        {[
          { title: "Casablanca & Düsseldorf", sub: "Büros mit direktem Zugang" },
          { title: "ab 100.000 €", sub: "Typische Ticketgröße" },
          { title: "Energie & Infrastruktur", sub: "Unsere Fokussektoren" },
          { title: "DE · FR · AR · EN", sub: "Dokument in vier Sprachen" },
        ].map((c) => (
          <div key={c.title} className={s.stripItem}>
            <div className={s.stripTitle}>{c.title}</div>
            <div className={s.stripSub}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* ═══ 4 · SEKTOREN ═══ */}
      <section className={s.sektoren}>
        <div ref={r2.ref} className={`${s.reveal} ${r2.cls}`}>
          <div className={s.secHeader}>
            <h2 className={s.secTitle}>{C.sektorenTitle}</h2>
            <p className={s.secSub}>{C.sektorenSub}</p>
          </div>

          <div className={s.imgGrid}>
            <div className={s.imgLg}><img src="/images/solar-farm.jpg" alt="Solarthermie im Süden Marokkos" /><span className={s.imgLabel}><span className={s.dot} /> Solarthermie im Süden Marokkos</span></div>
            <div className={s.imgStack}>
              <div className={s.imgSm}><img src="/images/port-logistics.jpg" alt="Hafen- und Logistikinfrastruktur" /><span className={s.imgLabel}><span className={s.dot} /> Hafen- und Logistikinfrastruktur</span></div>
              <div className={s.imgSm}><img src="/images/casablanca-skyline.jpg" alt="Casablanca, Finanzplatz Nordafrikas" /><span className={s.imgLabel}><span className={s.dot} /> Casablanca, Finanzplatz Nordafrikas</span></div>
            </div>
          </div>
          <div className={`${s.sektorCards} ${s.stagger} ${r2.visible ? s.revealed : ""}`}>
            {C.sektoren.map((sk) => (
              <div key={sk.name} className={s.sektorCard}><strong>{sk.name}</strong><p>{sk.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5 · INHALT ═══ */}
      <section className={s.inhalt}>
        <div ref={r3.ref} className={`${s.inhaltInner} ${s.reveal} ${r3.cls}`}>
          <div className={s.inhaltLeft}>
            <h2 className={s.secTitle}>{C.inhaltTitle}</h2>
            <p className={s.secSub}>{C.inhaltSub}</p>
            <ol className={s.inhaltList}>
              {C.inhaltItems.map((item, i) => (
                <li key={i}><span className={s.num}>{String(i + 1).padStart(2, "0")}</span><span>{item}</span></li>
              ))}
            </ol>
          </div>
          <div className={s.inhaltRight}>
            <div className={s.pdfMock}>
              <div className={s.pdfMockBody}>
                <LogoSvg size={48} />
                <div className={s.pdfDivider} />
                <p className={s.pdfMockLabel}>Marokko Investment</p>
                <h4>Das vertrauliche Investoren-Memorandum</h4>
              </div>
              <div className={s.pdfMockFoot}><span>28 Seiten</span><span>PDF</span><span>Stand 2026</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 6 · VERTRAUEN ═══ */}
      <section className={s.vertrauen} id="vertrauen">
        <div ref={r4.ref} className={`${s.reveal} ${r4.cls}`}>
          <div className={s.vHero}>
            <div className={s.vText}>
              <h2 className={s.secTitle}>{C.vertrauenTitle}</h2>
              <p className={s.vSub}>{C.vertrauenSub}</p>
            </div>
            <div className={s.vImg}><img src="/images/office-casablanca.jpg" alt="Büro in Casablanca" /><span className={s.imgLabel}><span className={s.dot} /> Unser Büro in Casablanca</span></div>
          </div>
          <div className={`${s.officeGrid} ${s.stagger} ${r4.visible ? s.revealed : ""}`}>
            {C.offices.map((o) => (
              <div key={o.city} className={s.officeCard}>
                <ArchIcon size={32} />
                <h4>{o.city}</h4>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
          <ArchDecor />
        </div>
      </section>

      {/* ═══ 7 · GRUNDSÄTZE ═══ */}
      <section className={s.grund}>
        <div ref={r5.ref} className={`${r5.cls}`}>
          <div className={s.grundHeader}>
            <span className={s.pill}>Unsere Grundsätze</span>
            <h2 className={s.secTitle}>Wie wir arbeiten. Und warum das für Sie zählt.</h2>
            <p className={s.secSubCenter}>Drei Grundsätze bestimmen jede Entscheidung, die wir in Marokko treffen. Sie erklären auch, warum unsere Dokumente so nüchtern geschrieben sind.</p>
          </div>
          <div className={s.timeline} ref={timelineRef}>
            {C.grundsaetze.map((g, i) => (
              <div key={g.num} className={`${s.tlItem} ${i % 2 !== 0 ? s.tlRight : ""}`} data-tl-item>
                <div className={s.tlContent}>
                  <span className={s.tlLabel}>{g.num} · {g.label}</span>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                  <img src={g.img} alt={g.title} className={s.tlImg} />
                </div>
                <div className={s.tlLine} style={{ "--tl-fill": `${Math.min(100, tlProgress * 100 * 3 - i * 100)}%` } as React.CSSProperties}><span className={`${s.tlDot} ${activeDots[i] ? s.tlDotActive : ""}`} /></div>
                <div className={s.tlSpacer} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8 · ABLAUF ═══ */}
      <section className={s.ablauf} id="ablauf">
        <div ref={r6.ref} className={`${s.reveal} ${r6.cls}`}>
          <div className={s.ablaufHeader}>
            <h2 className={s.secTitle}>In drei Schritten zum Dokument.</h2>
            <p className={s.secSub}>Die Verifizierung hält die Liste sauber. Wir senden das Dokument ausschließlich an bestätigte Kontakte.</p>
          </div>
          <div className={`${s.stepsGrid} ${s.stagger} ${r6.visible ? s.revealed : ""}`}>
            {C.ablaufSteps.map((step) => (
              <div key={step.num} className={s.stepCard}>
                <span className={s.stepNum}>{step.num}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9 · FAQ ═══ */}
      <section className={s.faqSec} id="fragen">
        <div ref={r7.ref} className={`${s.faqGrid} ${s.reveal} ${r7.cls}`}>
          <div className={s.faqLeft}>
            <span className={s.pill}>Häufige Fragen</span>
            <h2 className={s.secTitle}>Vorab geklärt.</h2>
            <p className={s.secSub}>Wir halten es transparent und kurz. Diese Antworten ersparen Ihnen das Nachfragen.</p>
            <div className={s.faqCta}>
              <div className={s.faqCtaIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="#B08D45" strokeWidth="1.3" /><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#B08D45" strokeWidth="1.3" strokeLinecap="round" /></svg>
              </div>
              <div><p className={s.faqCtaSm}>Etwas offen geblieben?</p><strong>Sprechen Sie mit uns</strong></div>
            </div>
          </div>
          <div className={`${s.faqRight} ${s.stagger} ${r7.visible ? s.revealed : ""}`}>
            {C.faqs.map((f, i) => (
              <div key={i} className={`${s.faqItem} ${openFaq === i ? s.faqOpen : ""}`}>
                <button className={s.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span><span className={s.faqToggle}>{openFaq === i ? "−" : "+"}</span>
                </button>
                <div className={s.faqA} style={{ maxHeight: openFaq === i ? 200 : 0 }}><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10 · CLOSING CTA ═══ */}
      <section className={s.closing}>
        <div ref={r8.ref} className={`${s.closingInner} ${s.reveal} ${r8.cls}`}>
          <div className={s.closingImgL}><img src="/images/moroccan-courtyard.jpg" alt="" /></div>
          <div className={s.closingCenter}>
            <h2 className={s.secTitle}>{C.closingTitle}</h2>
            <p className={s.closingSub}>{C.closingSub}</p>
            <div className={s.closingBtns}>
              <button className={s.goldBtn} onClick={scrollToForm}>{C.cta} <Arrow /></button>
              <button className={s.outlineBtn} onClick={scrollToForm}>Rückfragen stellen</button>
            </div>
            <div className={s.closingChecks}>
              {C.closingBenefits.map((b) => <span key={b} className={s.closingCheck}><CheckIcon />{b}</span>)}
            </div>
          </div>
          <div className={s.closingImgR}><img src="/images/moroccan-door.jpg" alt="" /></div>
        </div>
      </section>

      {/* ═══ 11 · FOOTER ═══ */}
      <footer className={s.footer}>
        <div ref={r9.ref} className={`${s.reveal} ${r9.cls}`}>
          <div className={s.footerGrid}>
            <div className={s.footerBrand}>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={s.logo}><LogoSvg size={22} /><span>Marokko Investment</span></a>
              <p className={s.footerDesc}>Zugang zu Investments in marokkanische Energie- und Infrastrukturprojekte. Büros in Casablanca und Düsseldorf.</p>
              <div className={s.langTags}>
                {["Deutsch", "Français", "العربية", "English"].map((l, i) => (
                  <span key={l} className={`${s.langTagFoot} ${i === 0 ? s.langTagActive : ""}`}>{l}</span>
                ))}
              </div>
            </div>
            <div className={s.footerCol}>
              <h5>Dokumente</h5>
              <a href="/memorandum">Das vertrauliche Memorandum</a>
              <a href="/dealflow">Der Deal-Flow-Report</a>
              <a href="/due-diligence">Die Due-Diligence-Analyse</a>
              <a href="/family-office">Das Family-Office-Briefing</a>
              <a href="/thesis">Das Thesis Paper</a>
            </div>
            <div className={s.footerCol}>
              <h5>Kontakt</h5>
              <a href="#">Casablanca</a>
              <a href="#">Düsseldorf</a>
              <a href="mailto:kontakt@marokkoinvestment.de">kontakt@marokkoinvestment.de</a>
            </div>
            <div className={s.footerCol}>
              <h5>Rechtliches</h5>
              <a href="/impressum">Impressum</a>
              <a href="/datenschutz">Datenschutzerklärung</a>
              <a href="/datenschutz#cookies">Cookie-Einstellungen</a>
            </div>
          </div>
          <div className={s.footerBar}>
            <p>© 2026 Marokko Investment · Ein Projekt von TyloTech</p>
            <p className={s.disclaimer}>Diese Seite ist weder ein Angebot noch eine Anlageberatung. Sie enthält keine Renditeversprechen. Investitionen in Sachwerte und Projekte können zum Totalverlust des eingesetzten Kapitals führen.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Tiny inline SVG components ── */
function Arrow() { return <span className={s.arrow}>→</span>; }
function ChevronDown() { return <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function LockIcon() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="6" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M5 6V4a2 2 0 014 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>; }
