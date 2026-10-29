"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import Logo, { LogoMark } from "@/components/Logo";
import { submitLead } from "@/lib/submitLead";
import { pushDataLayer, trackClarity, trackLead, trackQualifiedLead, trackQuizStep } from "@/lib/tracking";
import s from "./eignung.module.css";
import { ABLAUF, CHANCE, CTA, FAQ, FOOTER, HERO, MODELL, NAV, QUESTIONS, QUIZ, SEKTOREN, SICHERHEIT, STATS, SUBSTANZ } from "./content";

const FORM_NAME = "Eignungs-Check";

/* ── Icons (24px grid, 1.5 stroke, currentColor) ── */
const ICONS: Record<string, React.ReactNode> = {
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  landmark: <><path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7" /><path d="M12 2 20 7H4z" /></>,
  trend: <><path d="M22 7 13.5 15.5 8.5 10.5 2 17" /><path d="M16 7h6v6" /></>,
  scale: <><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></>,
  compass: <><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-1.8 5.41a2 2 0 0 1-1.27 1.27L7.76 16.24l1.8-5.41a2 2 0 0 1 1.27-1.27z" /></>,
  building: <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4" /></>,
  coins: <><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82" /></>,
  pie: <><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></>,
  trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></>,
  train: <><path d="M8 3.1V7a4 4 0 0 0 8 0V3.1M9 15l-1-1M15 15l1-1" /><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" /><path d="m8 19-2 3M16 19l2 3" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
  back: <path d="M19 12H5M12 19l-7-7 7-7" />,
  plus: <path d="M5 12h14M12 5v14" />,
};

function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

/* ── Buttons: every CTA scrolls to the quiz ── */
type BtnTone = "light" | "gold" | "outlineLight" | "outlineDark";
function CtaButton({ tone, where, big, block }: { tone: BtnTone; where: string; big?: boolean; block?: boolean }) {
  const go = () => {
    pushDataLayer("cta_click", { cta_location: where });
    trackClarity("cta_click", { cta: where });
    document.getElementById("eignungs-check")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <button type="button" onClick={go} className={`${s.btn} ${s[`btn_${tone}`]} ${big ? s.btnBig : ""} ${block ? s.btnBlock : ""}`}>
      {CTA} <Icon name="arrow" size={big ? 16 : 14} className={s.btnArrow} />
    </button>
  );
}

/* ── Count-up for the stats bar ── */
function CountUp({ stat, run }: { stat: (typeof STATS)[number]; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run || stat.count === undefined) return;
    const target = stat.count;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setV(target));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1600);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, stat.count]);
  if (stat.count === undefined) return <>{stat.value}</>;
  const n = v.toLocaleString("de-DE", { minimumFractionDigits: stat.decimals ?? 0, maximumFractionDigits: stat.decimals ?? 0 });
  return (
    <>
      {/* reserve the final width so the layout doesn't jump while counting */}
      <span className={s.countGhost} aria-hidden="true">{stat.value}</span>
      <span className={s.countLive}>{stat.prefix}{n}{stat.suffix}</span>
      <span className={s.srOnly}>{stat.value}</span>
    </>
  );
}

/* ── Quiz ── */
type Status = "idle" | "sending" | "error" | "done";

function Quiz() {
  const total = QUESTIONS.length + 1;
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<(string | null)[]>(QUESTIONS.map(() => null));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const isContact = step === QUESTIONS.length;
  const progress = status === "done" ? 1 : (step + 1) / total;

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setErr("");
    setStep(to);
    /* keep the card in view on phones where it is taller than the screen */
    const r = cardRef.current?.getBoundingClientRect();
    if (r && r.top < 0) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const choose = (opt: string) => setAnswers((a) => a.map((v, i) => (i === step ? opt : v)));

  const next = () => {
    const a = answers[step];
    if (!a) return;
    trackQuizStep(FORM_NAME, step + 1, QUESTIONS[step].key, a);
    go(step + 1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return;
    const n = name.trim();
    const em = email.trim();
    const ph = phone.trim();
    if (!n) return setErr(QUIZ.errName);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return setErr(QUIZ.errEmail);
    if (ph.replace(/\D/g, "").length < 6) return setErr(QUIZ.errPhone);
    if (!consent) return setErr(QUIZ.errConsent);

    setStatus("sending");
    setErr("");
    const fullPhone = ph.startsWith("+") || ph.startsWith("00") ? ph : `+49 ${ph.replace(/^0/, "")}`;
    const [volumen, ziel, erfahrung, zeitpunkt] = answers as string[];
    const byKey = Object.fromEntries(QUESTIONS.map((q, i) => [q.key, answers[i] as string]));

    const r = await submitLead(
      { form: "eignungs-check", name: n, email: em, phone: fullPhone, consent, answers: byKey, website: hp },
      {
        subject: `Neuer Eignungs-Check — ${n} (${volumen})`,
        fields: { Name: n, "E-Mail": em, Telefon: fullPhone, ...Object.fromEntries(QUESTIONS.map((q, i) => [q.label, answers[i] as string])) },
      },
    );
    if (!r.ok) {
      setStatus("error");
      setErr(r.reason === "network" ? QUIZ.errNetwork : r.reason === "rate" ? QUIZ.errRate : QUIZ.errInvalid);
      return;
    }
    /* Qualified = wants to invest within ~6 months (every volume option is ≥ 100k) */
    const qualified = zeitpunkt !== "Erst informieren";
    const extra = { volumen, ziel, erfahrung, zeitpunkt };
    const user = { email: em, phone: fullPhone, name: n };
    trackLead(FORM_NAME, user, extra);
    if (qualified) trackQualifiedLead(FORM_NAME, user, extra);
    setStatus("done");
  };

  return (
    <div className={s.quizCard} ref={cardRef}>
      <div className={s.quizHead}>
        <span className={s.quizMark}><LogoMark size={48} /></span>
        <div>
          <h3 className={s.quizTitle}>{QUIZ.title}</h3>
          <p className={s.quizSub}>{QUIZ.sub}</p>
        </div>
      </div>

      <div className={s.progress}>
        <span className={s.progressLabel} aria-live="polite">
          {status === "done" ? "Abgeschlossen" : `Schritt ${step + 1} von ${total}`}
        </span>
        <div className={s.track}><div className={s.trackFill} style={{ transform: `scaleX(${progress})` }} /></div>
      </div>

      {status === "done" ? (
        <div className={`${s.quizBody} ${s.stepIn}`}>
          <div className={s.thanks}>
            <span className={s.thanksIcon}><Icon name="check" size={28} /></span>
            <h4 className={s.thanksTitle}>{QUIZ.thanksTitle}</h4>
            <p className={s.thanksText}>{QUIZ.thanksText}</p>
          </div>
        </div>
      ) : !isContact ? (
        <div key={step} className={`${s.quizBody} ${dir > 0 ? s.stepIn : s.stepBack}`}>
          <p className={s.question} id={`q-${step}`}>{QUESTIONS[step].q}</p>
          <div className={s.options} role="radiogroup" aria-labelledby={`q-${step}`}>
            {QUESTIONS[step].options.map((opt) => {
              const on = answers[step] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={`${s.option} ${on ? s.optionOn : ""}`}
                  onClick={() => choose(opt)}
                >
                  <span className={s.radio} />
                  {opt}
                </button>
              );
            })}
          </div>
          <div className={s.quizNav}>
            {step > 0 ? (
              <button type="button" className={`${s.btn} ${s.btn_ghost}`} onClick={() => go(step - 1)}>
                {QUIZ.back}
              </button>
            ) : <span />}
            <button type="button" className={`${s.btn} ${s.btn_gold}`} onClick={next} disabled={!answers[step]}>
              {QUIZ.next} <Icon name="arrow" size={14} className={s.btnArrow} />
            </button>
          </div>
        </div>
      ) : (
        <form key="contact" className={`${s.quizBody} ${s.stepIn}`} onSubmit={submit} noValidate>
          <p className={s.question}>{QUIZ.contactQ}</p>
          <input type="text" name="website" value={hp} onChange={(e) => setHp(e.target.value)} className={s.honey} tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label className={s.field}>
            <span>{QUIZ.name}</span>
            <input type="text" autoComplete="name" placeholder={QUIZ.namePh} value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className={s.field}>
            <span>{QUIZ.email}</span>
            <input type="email" autoComplete="email" inputMode="email" placeholder={QUIZ.emailPh} value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className={s.field}>
            <span>{QUIZ.phone}</span>
            <span className={s.phoneRow}>
              <span className={s.phonePrefix}>+49</span>
              <input type="tel" autoComplete="tel-national" inputMode="tel" placeholder={QUIZ.phonePh} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </span>
          </label>
          <label className={s.consent}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span className={s.checkbox}><Icon name="check" size={12} /></span>
            <span>
              {QUIZ.consent} <a href="/datenschutz" target="_blank" rel="noopener">{QUIZ.privacy}</a>
            </span>
          </label>
          {err && <p className={s.err} role="alert">{err}</p>}
          <div className={s.quizNav}>
            <button type="button" className={`${s.btn} ${s.btn_ghost}`} onClick={() => go(step - 1)}>{QUIZ.back}</button>
            <button type="submit" className={`${s.btn} ${s.btn_gold}`} disabled={status === "sending"}>
              {status === "sending" ? QUIZ.sending : <>{QUIZ.submit} <Icon name="arrow" size={14} className={s.btnArrow} /></>}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ── FAQ accordion item with measured height ── */
function FaqItem({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
  const inner = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.scrollHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className={`${s.faqItem} ${open ? s.faqOpen : ""}`}>
      <button type="button" className={s.faqQ} aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span>{q}</span>
        <span className={s.faqIcon}><Icon name="plus" size={18} /></span>
      </button>
      <div id={id} className={s.faqA} style={{ height: open ? h : 0 }}>
        <div ref={inner}><p>{a}</p></div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */

export default function EignungsCheck() {
  const root = useRef<HTMLDivElement>(null);
  const heroBg = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [statsIn, setStatsIn] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [theme, setTheme] = useState<"light" | "dark" | undefined>(undefined);

  /* ?theme=dark|light forces a theme (ad previews); otherwise the OS decides */
  useEffect(() => {
    const t = new URLSearchParams(location.search).get("theme");
    if (t === "dark" || t === "light") {
      const id = requestAnimationFrame(() => setTheme(t));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  /* Scroll reveal for everything marked data-reveal */
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add(s.in); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const stats = statsRef.current;
    const so = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsIn(true); so.disconnect(); } }, { threshold: 0.4 });
    if (stats) so.observe(stats);
    return () => { io.disconnect(); so.disconnect(); };
  }, []);

  /* Header state + hero parallax */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        if (!reduce && heroBg.current && y < window.innerHeight * 1.2) heroBg.current.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const toTop = useCallback((e: React.MouseEvent) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div ref={root} className={s.page} data-theme={theme}>
      {/* ═══ HEADER ═══ */}
      <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`}>
        <div className={s.headerInner}>
          <a href="#" onClick={toTop} className={s.logo} aria-label="Marokko Investment"><Logo height={40} /></a>
          <nav className={s.nav} aria-label="Seitennavigation">
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <CtaButton tone="light" where="header" />
        </div>
      </header>

      {/* ═══ §1 HERO ═══ */}
      <section className={s.hero}>
        <div className={s.heroMedia} aria-hidden="true">
          <img ref={heroBg} src="/images/hero-moroccan-arch.jpg" alt="" className={s.heroImg} fetchPriority="high" />
        </div>
        <div className={s.heroShade} aria-hidden="true" />
        <div className={s.heroContent}>
          <span className={`${s.badge} ${s.intro}`} style={{ "--i": 0 } as React.CSSProperties}><span className={s.badgeDot} />{HERO.badge}</span>
          <h1 className={`${s.heroTitle} ${s.intro}`} style={{ "--i": 1 } as React.CSSProperties}>{HERO.title}</h1>
          <p className={`${s.heroSub} ${s.intro}`} style={{ "--i": 2 } as React.CSSProperties}>{HERO.sub}</p>
          <div className={s.intro} style={{ "--i": 3 } as React.CSSProperties}><CtaButton tone="light" where="hero" big /></div>
          <p className={`${s.heroTrust} ${s.intro}`} style={{ "--i": 4 } as React.CSSProperties}><Icon name="shield" size={16} className={s.gold} />{HERO.trust}</p>
        </div>
      </section>

      {/* ═══ §2 STATS ═══ */}
      <section className={s.statsSec}>
        <div className={s.container}>
          <div ref={statsRef} className={s.stats} data-reveal>
            {STATS.map((st) => (
              <div key={st.label} className={s.stat}>
                <div className={s.statValue}><CountUp stat={st} run={statsIn} /></div>
                <div className={s.statLabel}>{st.label}</div>
                <div className={s.statSource}>{st.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §3 CHANCE ═══ */}
      <section id="chancen" className={`${s.section} ${s.sand}`}>
        <div className={s.container}>
          <div className={s.split} data-reveal>
            <h2 className={s.h2}>{CHANCE.title}</h2>
            <div className={s.splitAside}>
              <p className={s.lead}>{CHANCE.text}</p>
              <CtaButton tone="outlineDark" where="chancen" />
            </div>
          </div>
          <div className={s.chanceGrid}>
            <div className={`${s.imgFrame} ${s.chanceImg}`} data-reveal>
              <img src="/images/lp/zug.webp" alt="Hochgeschwindigkeitszug Al Boraq bei Sonnenuntergang" loading="lazy" />
            </div>
            <div>
              <ul className={s.factList}>
                {CHANCE.items.map((it, i) => (
                  <li key={it.text} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                    <span className={s.iconCircle}><Icon name={it.icon} size={18} /></span>
                    <span>{it.text}</span>
                  </li>
                ))}
              </ul>
              <p className={s.source} data-reveal>{CHANCE.source}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §4 SICHERHEIT ═══ */}
      <section id="sicherheit" className={`${s.section} ${s.forest}`}>
        <div className={s.container}>
          <div className={s.headRow} data-reveal>
            <h2 className={s.h2}>{SICHERHEIT.title}</h2>
            <CtaButton tone="outlineLight" where="sicherheit" />
          </div>
          <div className={s.safeGrid}>
            <article className={`${s.card} ${s.ratingCard}`} data-reveal>
              <div className={s.ratingImg}><img src="/images/lp/rabat.webp" alt="Rabat am Bou-Regreg in der Abenddämmerung" loading="lazy" /></div>
              <div className={s.ratingBody}>
                <div className={s.ratingValue}>{SICHERHEIT.rating.value}</div>
                <h3 className={s.h3}>{SICHERHEIT.rating.title}</h3>
                <p className={s.cardText}>{SICHERHEIT.rating.text}</p>
                <p className={s.cardSource}>{SICHERHEIT.rating.source}</p>
              </div>
            </article>
            {SICHERHEIT.cards.map((c, i) => (
              <article key={c.title} className={s.card} data-reveal style={{ "--d": `${(i + 1) * 80}ms` } as React.CSSProperties}>
                <span className={s.iconSquare}><Icon name={c.icon} size={18} /></span>
                <h3 className={s.h3}>{c.title}</h3>
                <p className={s.cardText}>{c.text}</p>
                {"source" in c && <p className={s.cardSource}>{c.source}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §5 MODELL ═══ */}
      <section className={`${s.section} ${s.sand}`}>
        <div className={`${s.container} ${s.modell}`}>
          <div className={`${s.imgFrame} ${s.modellImg}`} data-reveal>
            <img src="/images/lp/baustelle.webp" alt="Eigene Baustelle von Marokko Investment" loading="lazy" />
          </div>
          <div className={s.modellCopy}>
            <h2 className={s.h2} data-reveal>{MODELL.title}</h2>
            <p className={s.lead} data-reveal>{MODELL.text}</p>
            <ul className={s.pillars}>
              {MODELL.items.map((it, i) => (
                <li key={it.title} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                  <span className={s.iconBox}><Icon name={it.icon} size={22} /></span>
                  <span><strong>{it.title}</strong><span>{it.text}</span></span>
                </li>
              ))}
            </ul>
            <div data-reveal><CtaButton tone="gold" where="modell" /></div>
          </div>
        </div>
      </section>

      {/* ═══ §6 SEKTOREN ═══ */}
      <section className={`${s.section} ${s.forest}`}>
        <div className={s.container}>
          <div className={s.headRow} data-reveal>
            <h2 className={s.h2}>{SEKTOREN.title}</h2>
            <CtaButton tone="outlineLight" where="sektoren" />
          </div>
          <div className={s.sectorGrid}>
            {SEKTOREN.cards.map((c, i) => (
              <article key={c.title} className={s.sector} data-reveal style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
                <img src={c.img} alt="" loading="lazy" />
                <div className={s.sectorScrim} />
                <div className={s.sectorCopy}>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §7 ABLAUF ═══ */}
      <section id="ablauf" className={`${s.section} ${s.sand} ${s.ablaufSec}`}>
        <div className={s.container}>
          <div className={s.headRow} data-reveal>
            <h2 className={s.h2}>{ABLAUF.title}</h2>
            <CtaButton tone="gold" where="ablauf" />
          </div>
          <ol className={s.steps}>
            {ABLAUF.steps.map((t, i) => (
              <li key={t} className={s.step} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                <span className={s.stepNum}>{i + 1}</span>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ §8 EIGNUNGS-CHECK ═══ */}
      <section id="eignungs-check" className={`${s.section} ${s.deep}`}>
        <div className={s.container}>
          <div className={s.checkGrid}>
            <div className={`${s.imgFrame} ${s.checkImg}`} data-reveal>
              <img src="/images/lp/fassade.webp" alt="Projekt im Bau mit marokkanischen Bögen" loading="lazy" />
            </div>
            <div className={s.checkCol} data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              <Quiz />
            </div>
          </div>
          <p className={s.checkNote}>{QUIZ.disclaimer}</p>
        </div>
      </section>

      {/* ═══ §9 SUBSTANZ ═══ */}
      <section className={`${s.section} ${s.sand}`}>
        <div className={`${s.container} ${s.substanz}`}>
          <div className={s.collage}>
            <div className={`${s.imgFrame} ${s.collageA}`} data-reveal><img src="/images/lp/bauland.webp" alt="Bauland mit Blick auf den Hohen Atlas" loading="lazy" /></div>
            <div className={`${s.imgFrame} ${s.collageB}`} data-reveal style={{ "--d": "150ms" } as React.CSSProperties}><img src="/images/lp/projekt.webp" alt="Fertiggestelltes Wohnprojekt" loading="lazy" /></div>
          </div>
          <div className={s.substanzCopy}>
            <h2 className={s.h2} data-reveal>{SUBSTANZ.title}</h2>
            <ul className={s.checks}>
              {SUBSTANZ.points.map((p, i) => (
                <li key={p} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                  <span className={s.checkDot}><Icon name="check" size={14} /></span>{p}
                </li>
              ))}
            </ul>
            <div data-reveal><CtaButton tone="gold" where="substanz" /></div>
          </div>
        </div>
      </section>

      {/* ═══ §10 FRAGEN ═══ */}
      <section id="fragen" className={`${s.section} ${s.forest}`}>
        <div className={`${s.container} ${s.faqGrid}`}>
          <div className={s.faqLeft} data-reveal>
            <h2 className={s.h2}>{FAQ.title}</h2>
            <CtaButton tone="outlineLight" where="fragen" />
          </div>
          <div className={s.faqList} data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
            {FAQ.items.map((f, i) => (
              <FaqItem key={f.q} id={`faq-${i}`} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.footerTop}>
            <a href="#" onClick={toTop} aria-label="Marokko Investment"><Logo height={36} /></a>
            <nav className={s.footerLinks}>
              {FOOTER.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
              <button type="button" onClick={() => window.dispatchEvent(new Event("mi-cookie-settings"))}>Cookie-Einstellungen</button>
            </nav>
          </div>
          <div className={s.footerBottom}>
            <p>{FOOTER.disclaimer}</p>
            <p>{FOOTER.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
