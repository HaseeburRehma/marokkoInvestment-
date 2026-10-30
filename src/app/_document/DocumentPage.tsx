"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useCallback, useRef } from "react";
import { trackLead } from "@/lib/tracking";
import { submitLead } from "@/lib/submitLead";
import Logo from "@/components/Logo";
import s from "./doc.module.css";
import { TRANSLATIONS, LANGS, type Lang } from "./i18n";
import { DOCS, withDoc, type DocKey } from "./docs";

/* ══════════════════════════════════════════════════════════
   Lead-magnet landing page (Figma "01 · Memorandum — Desktop" and the
   four variants 02–05): one template, copy from ./i18n + ./docs.
   ══════════════════════════════════════════════════════════ */

const NAV_HREFS = ["#dokument", "#ablauf", "#vertrauen", "#fragen"];
const GRUND_IMG = ["/images/doc/buero.webp", "/images/doc/hafen.webp", "/images/doc/solar.webp"];
const FOOTER_DOC_HREFS = (["memorandum", "dealflow", "due-diligence", "family-office", "thesis"] as const).map((k) => DOCS[k].path);
const FOOTER_CONTACT_HREFS = ["#vertrauen", "#vertrauen", "mailto:kontakt@marokkoinvestment.de"];
const PDF_TAGS = ["DE", "FR", "AR", "EN"];

const Arrow = () => (
  <svg width="11" height="10" viewBox="0 0 11 10" fill="none" className={s.arrow} aria-hidden="true">
    <path d="M1 5h9M6 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Check = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
    <path d="M.85 4.85l3.6 4 6.4-8" stroke="#B08D45" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Lock = () => (
  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
    <path d="M2.85 5.5H.6v6.7h10V5.5H8.35m-5.5 0h5.5m-5.5 0V3.28C2.85 1.38 4.35.6 5.6.6s2.75.78 2.75 2.68V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);
const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArchMark = ({ big }: { big?: boolean }) => <span className={big ? s.archMarkBig : s.archMark} aria-hidden="true" />;

/* ── FAQ item with measured height ── */
function Faq({ q, a, open, onToggle, id }: { q: string; a: string; open: boolean; onToggle: () => void; id: string }) {
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
    <div className={`${s.faq} ${open ? s.faqOpen : ""}`}>
      <button type="button" className={s.faqQ} aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span>{q}</span>
        <span className={s.faqIcon} aria-hidden="true"><i /><i /></span>
      </button>
      <div id={id} className={s.faqA} style={{ height: open ? h : 0 }}>
        <div ref={inner}><p>{a}</p></div>
      </div>
    </div>
  );
}

export default function DocumentPage({ doc }: { doc: DocKey }) {
  const root = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lang, setLang] = useState<Lang>("DE");
  const [langOpen, setLangOpen] = useState(false);
  const [tl, setTl] = useState<number[]>([0, 0, 0]);

  const d = DOCS[doc];
  const t = withDoc(TRANSLATIONS[lang], doc, lang);
  const rtl = lang === "AR";

  /* Form */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* ?lang= on first load */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("lang");
    const found = LANGS.find((l) => l.code.toLowerCase() === (p ?? "").toLowerCase());
    if (found) {
      const id = setTimeout(() => setLang(found.code), 0);
      return () => clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  const changeLang = useCallback((code: Lang) => {
    setLang(code);
    setLangOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", code.toLowerCase());
    window.history.replaceState(null, "", url);
  }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = () => setLangOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langOpen]);

  /* Scroll reveal for everything marked data-reveal; re-run after a language
     switch so any element React re-created is observed too */
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>(`[data-reveal]:not(.${s.in})`) ?? [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add(s.in); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  /* Header glass + timeline rail fill, one rAF per scroll */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        const items = timelineRef.current?.querySelectorAll<HTMLElement>("[data-tl]");
        if (!items) return;
        const vh = window.innerHeight;
        setTl([...items].map((el) => {
          const r = el.getBoundingClientRect();
          return Math.max(0, Math.min(1, (vh * 0.6 - r.top) / Math.max(1, r.height)));
        }));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return;
    if (!name.trim()) { setErrorMsg(t.errName); setFormStatus("error"); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrorMsg(t.errEmail); setFormStatus("error"); return; }
    if (!consent) { setErrorMsg(t.errConsent); setFormStatus("error"); return; }

    setFormStatus("loading");
    setErrorMsg("");
    const n = name.trim();
    const em = email.trim();
    const ph = phone.trim();
    const fullPhone = ph ? (ph.startsWith("+") || ph.startsWith("00") ? ph : `+49 ${ph.replace(/^0/, "")}`) : "";

    const r = await submitLead(
      { form: doc, name: n, email: em, phone: fullPhone, consent, website: hp },
      { subject: `Neue Anfrage: ${d.mail.label} — ${n}`, fields: { Name: n, "E-Mail": em, Telefon: fullPhone || "–", Dokument: d.mail.label } },
    );
    if (r.ok) {
      trackLead(d.mail.label, { email: em, phone: fullPhone, name: n });
      setFormStatus("success"); setName(""); setEmail(""); setPhone("");
    } else {
      setErrorMsg(r.reason === "network" ? t.errNetwork : t.errGeneric);
      setFormStatus("error");
    }
  }, [name, email, phone, hp, consent, t, d, doc]);

  const toTop = (e: React.MouseEvent) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const flat = (v: string) => v.replace(/\n/g, " ");
  const delay = (i: number, step = 90) => ({ "--d": `${i * step}ms` }) as React.CSSProperties;

  return (
    <div ref={root} className={`${s.page} ${rtl ? s.rtl : ""}`} dir={rtl ? "rtl" : "ltr"} lang={lang.toLowerCase()}>

      {/* ═══ HEADER ═══ */}
      <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`}>
        <div className={s.headerInner}>
          <a href="#" onClick={toTop} className={s.logo} aria-label="Marokko Investment"><Logo height={38} /></a>
          <nav className={s.nav} aria-label="Seitennavigation">
            {t.nav.map((label, i) => <a key={NAV_HREFS[i]} href={NAV_HREFS[i]}>{label}</a>)}
          </nav>
          <div className={s.headerRight}>
            <div className={s.langWrap}>
              <button type="button" className={s.langBtn} aria-haspopup="listbox" aria-expanded={langOpen} onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}>
                {LANGS.find((l) => l.code === lang)?.label ?? lang} <Chevron />
              </button>
              {langOpen && (
                <div className={s.langDrop} role="listbox">
                  {LANGS.map((l) => (
                    <button type="button" role="option" aria-selected={lang === l.code} key={l.code} className={`${s.langOpt} ${lang === l.code ? s.langOptOn : ""}`} onClick={() => changeLang(l.code)}>{l.label}</button>
                  ))}
                </div>
              )}
            </div>
            <button type="button" className={s.navCta} onClick={scrollToForm}>{t.cta} <Arrow /></button>
          </div>
          <button type="button" className={s.burger} onClick={() => setMobileNav(!mobileNav)} aria-label="Menü" aria-expanded={mobileNav}><span /><span /></button>
        </div>
        {mobileNav && (
          <div className={s.mobNav}>
            {t.nav.map((label, i) => <a key={NAV_HREFS[i]} href={NAV_HREFS[i]} onClick={() => setMobileNav(false)}>{label}</a>)}
            <div className={s.mobLangs}>
              {LANGS.map((l) => (
                <button type="button" key={l.code} className={lang === l.code ? s.mobLangOn : ""} onClick={() => { changeLang(l.code); setMobileNav(false); }}>{l.label}</button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ═══ HERO ═══ */}
      <section className={s.hero}>
        <img src="/images/doc/hero.webp" alt="" className={s.heroImg} fetchPriority="high" />
        <div className={s.heroScrim} aria-hidden="true" />
        <div className={s.heroContent}>
          <span className={`${s.chip} ${s.intro}`} style={{ "--i": 0 } as React.CSSProperties}><span className={s.chipDot} />{t.eyebrow}</span>
          <h1 className={`${s.heroTitle} ${s.intro}`} style={{ "--i": 1 } as React.CSSProperties}>{flat(t.headline)}</h1>
          <p className={`${s.heroSub} ${s.intro}`} style={{ "--i": 2 } as React.CSSProperties}>{t.sub}</p>
          <button type="button" className={`${s.heroCta} ${s.intro}`} style={{ "--i": 3 } as React.CSSProperties} onClick={scrollToForm}>{t.cta} <Arrow /></button>
        </div>
      </section>

      {/* ═══ ANFRAGE ═══ */}
      <section className={`${s.wrap} ${s.anfrage}`} id="dokument">
        <div className={s.anfrageCopy} data-reveal>
          <h2 className={s.h2a}>{t.anfrageTitle}</h2>
          <p className={s.lead}>{t.anfrageSub}</p>
          <div className={s.docCard}>
            <div className={s.cover} aria-hidden="true"><span className={s.coverArch} /><i /><i /><i /></div>
            <div className={s.docMeta}>
              <strong>{t.pdfTitle}</strong>
              <span>{t.pdfMeta}</span>
              <div className={s.langTags}>{PDF_TAGS.map((l) => <em key={l}>{l}</em>)}</div>
            </div>
          </div>
          <ul className={s.assure}>
            {t.benefits.map((b, i) => <li key={i} data-reveal style={delay(i)}><Check />{b}</li>)}
          </ul>
        </div>

        <div className={s.formCard} ref={formRef} data-reveal style={delay(1, 120)}>
          {formStatus === "success" ? (
            <div className={s.formOk} role="status">
              <span className={s.okIcon}><Check /></span>
              <h3>{t.successTitle}</h3>
              <p>{t.successText}</p>
            </div>
          ) : (
            <>
              <h3 className={s.formTitle}>{t.formTitle}</h3>
              <p className={s.formSub}>{t.formSub}</p>
              <form onSubmit={handleSubmit} className={s.form} noValidate>
                <input type="text" name="_honey" value={hp} onChange={(e) => setHp(e.target.value)} className={s.honey} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <label className={s.field}>
                  <span>{t.labelName}</span>
                  <input type="text" autoComplete="name" placeholder={t.phName} value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className={s.field}>
                  <span>{t.labelEmail}</span>
                  <input type="email" autoComplete="email" inputMode="email" placeholder={t.phEmail} value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" />
                </label>
                <label className={s.field}>
                  <span>{t.labelPhone}</span>
                  <span className={s.phone} dir="ltr">
                    <b>+49</b>
                    <input type="tel" autoComplete="tel-national" inputMode="tel" placeholder={t.phPhone} value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </span>
                </label>
                <label className={s.consent}>
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  <span className={s.box}><Check /></span>
                  <span>{t.consentPre}<a href="/datenschutz" target="_blank" rel="noopener">{t.consentLink}</a>{t.consentPost}</span>
                </label>
                {formStatus === "error" && <p className={s.err} role="alert">{errorMsg}</p>}
                <button type="submit" className={s.primary} disabled={formStatus === "loading"}>
                  {formStatus === "loading" ? t.submitting : <>{t.cta} <Arrow /></>}
                </button>
                <p className={s.secure}><Lock /> {t.lockNote}</p>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ═══ CREDENTIALS ═══ */}
      <div className={s.wrap}>
        <div className={s.strip}>
          {t.strip.map((c, i) => (
            <div key={i} className={s.stripItem} data-reveal style={delay(i)}>
              <strong>{c.title}</strong>
              <span>{c.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ SEKTOREN ═══ */}
      <section className={`${s.wrap} ${s.sektoren}`}>
        <div className={s.headRow} data-reveal>
          <h2 className={s.h2}>{t.sektorenTitle}</h2>
          <p className={s.headSub}>{t.sektorenSub}</p>
        </div>
        <div className={s.bento}>
          <figure className={`${s.photo} ${s.bentoLg}`} data-reveal>
            <img src="/images/doc/solar.webp" alt={t.imgLabelSolar} loading="lazy" />
            <figcaption className={s.caption}><span className={s.chipDot} />{t.imgLabelSolar}</figcaption>
          </figure>
          <div className={s.bentoCol}>
            <figure className={s.photo} data-reveal style={delay(1, 120)}>
              <img src="/images/doc/hafen.webp" alt={t.imgLabelPort} loading="lazy" />
              <figcaption className={s.caption}><span className={s.chipDot} />{t.imgLabelPort}</figcaption>
            </figure>
            <figure className={s.photo} data-reveal style={delay(2, 120)}>
              <img src="/images/doc/casablanca.webp" alt={t.imgLabelCasablanca} loading="lazy" />
              <figcaption className={s.caption}><span className={s.chipDot} />{t.imgLabelCasablanca}</figcaption>
            </figure>
          </div>
        </div>
        <div className={s.sectors}>
          {t.sektoren.map((sk, i) => (
            <div key={i} className={s.sector} data-reveal style={delay(i)}>
              <strong>{sk.name}</strong>
              <span>{sk.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ INHALT ═══ */}
      <section className={`${s.wrap} ${s.inhaltSec}`}>
        <div className={s.inhalt} data-reveal>
          <div className={s.inhaltCopy}>
            <h2 className={s.h2}>{t.inhaltTitle}</h2>
            <p className={s.lead}>{t.inhaltSub}</p>
            <ol className={s.toc}>
              {t.inhaltItems.map((item, i) => (
                <li key={i} data-reveal style={delay(i, 80)}><b>{String(i + 1).padStart(2, "0")}</b><span>{item}</span></li>
              ))}
            </ol>
          </div>
          <div className={s.mock} aria-hidden="true">
            <div className={s.sheetBack} />
            <div className={s.sheetFront}>
              <span className={s.sheetArchOuter} />
              <span className={s.sheetArch} />
              <span className={s.sheetRule} />
              <p className={s.sheetLabel}>{t.pdfMockLabel}</p>
              <p className={s.sheetTitle}>{t.pdfMockTitle.replace(/-/g, "\u2011")}</p>
            </div>
            <div className={s.metaChip}><b>{t.pdfFootPages}</b><i /><b>{t.pdfFootPdf}</b><i /><b>{t.pdfFootDate}</b></div>
          </div>
        </div>
      </section>

      {/* ═══ VERTRAUEN ═══ */}
      <section className={`${s.wrap} ${s.vertrauenSec}`} id="vertrauen">
        <div className={s.vertrauen} data-reveal>
          <div className={s.vHead}>
            <div className={s.vText}>
              <h2 className={s.h2}>{t.vertrauenTitle}</h2>
              <p>{t.vertrauenSub}</p>
            </div>
            <figure className={`${s.photo} ${s.vPhoto}`}>
              <img src="/images/doc/buero.webp" alt={t.officeLabel} loading="lazy" />
              <figcaption className={s.caption}><span className={s.chipDot} />{t.officeLabel}</figcaption>
            </figure>
          </div>
          <div className={s.offices}>
            {t.offices.map((o, i) => (
              <div key={i} className={s.office} data-reveal style={delay(i, 110)}>
                <ArchMark big />
                <h3>{o.city}</h3>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
          <div className={s.arcade} aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <span key={i} style={delay(i, 60)} />)}</div>
        </div>
      </section>

      {/* ═══ GRUNDSÄTZE ═══ */}
      <section className={`${s.wrap} ${s.grund}`}>
        <div className={s.grundHead} data-reveal>
          <span className={s.tag}>{t.grundPill}</span>
          <h2 className={s.h2c}>{t.grundTitle}</h2>
          <p>{t.grundSub}</p>
        </div>
        <div className={s.timeline} ref={timelineRef}>
          {t.grundsaetze.map((g, i) => {
            const right = i % 2 === 1;
            const last = i === t.grundsaetze.length - 1;
            return (
              <div key={i} className={`${s.tlRow} ${right ? s.tlRight : ""} ${last ? s.tlLast : ""}`} data-tl>
                <div className={s.tlCol} data-reveal>
                  <span className={s.tlLabel}>{String(i + 1).padStart(2, "0")} · {g.label}</span>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                  <div className={s.tlImg}><img src={GRUND_IMG[i]} alt="" loading="lazy" /></div>
                </div>
                <div className={s.rail} aria-hidden="true">
                  <span className={`${s.dot} ${tl[i] > 0 ? s.dotOn : ""}`} />
                  {!last && <span className={s.line}><span style={{ transform: `scaleY(${tl[i] ?? 0})` }} /></span>}
                </div>
                <div className={s.tlSpacer} />
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ ABLAUF ═══ */}
      <section className={`${s.wrap} ${s.ablauf}`} id="ablauf">
        <div className={s.headRow} data-reveal>
          <h2 className={s.h2}>{t.ablaufTitle}</h2>
          <p className={s.headSub}>{t.ablaufSub}</p>
        </div>
        <div className={s.steps}>
          {t.ablaufSteps.map((step, i) => (
            <div key={i} className={s.step} data-reveal style={delay(i, 120)}>
              <span className={s.stepNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FRAGEN ═══ */}
      <section className={`${s.wrap} ${s.fragen}`} id="fragen">
        <div className={s.fragenHead} data-reveal>
          <span className={s.tag}>{t.faqPill}</span>
          <h2 className={s.h2}>{t.faqTitle}</h2>
          <p className={s.headSub}>{t.faqSub}</p>
          <a className={s.contact} href="mailto:kontakt@marokkoinvestment.de">
            <span className={s.avatar} aria-hidden="true">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none"><path d="M18.4 33.5c0-4 2.9-6.8 6.6-6.8s6.6 2.8 6.6 6.8M28.8 20c0 2.2-1.7 4-3.8 4s-3.8-1.8-3.8-4 1.7-4 3.8-4 3.8 1.8 3.8 4Z" stroke="#FCFAF5" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </span>
            <span><small>{t.faqCtaSm}</small><strong>{t.faqCtaStrong}</strong></span>
          </a>
        </div>
        <div className={s.faqList} data-reveal style={delay(1, 120)}>
          {t.faqs.map((f, i) => (
            <Faq key={i} id={`faq-${i}`} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
        </div>
      </section>

      {/* ═══ ABSCHLUSS ═══ */}
      <section className={`${s.wrap} ${s.abschlussSec}`}>
        <div className={s.abschluss} data-reveal>
          <div className={`${s.archPhoto} ${s.archL}`} aria-hidden="true"><img src="/images/doc/archL.webp" alt="" loading="lazy" /></div>
          <div className={`${s.archPhoto} ${s.archR}`} aria-hidden="true"><img src="/images/doc/archR.webp" alt="" loading="lazy" /></div>
          <h2 className={s.h2c}>{t.closingTitle}</h2>
          <p className={s.closingSub}>{t.closingSub}</p>
          <div className={s.closingBtns}>
            <button type="button" className={s.primaryInline} onClick={scrollToForm}>{t.cta} <Arrow /></button>
            <a className={s.secondary} href="mailto:kontakt@marokkoinvestment.de">{t.ctaSecondary}</a>
          </div>
          <ul className={s.closingChecks}>
            {t.closingBenefits.map((b, i) => <li key={i}><Check />{b}</li>)}
          </ul>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={s.footer}>
        <div className={s.footInner}>
          <div className={s.footTop}>
            <div className={s.brand}>
              <a href="#" onClick={toTop} aria-label="Marokko Investment"><Logo height={36} /></a>
              <p>{t.footerDesc}</p>
              <div className={s.footLangs}>
                {LANGS.map((l) => (
                  <button type="button" key={l.code} className={lang === l.code ? s.footLangOn : ""} onClick={() => changeLang(l.code)}>{l.label}</button>
                ))}
              </div>
            </div>
            <div className={s.footCol}>
              <h4>{t.footerDocsH}</h4>
              {t.footerDocs.map((label, i) => <a key={i} href={FOOTER_DOC_HREFS[i]} aria-current={FOOTER_DOC_HREFS[i] === d.path ? "page" : undefined}>{label}</a>)}
            </div>
            <div className={s.footCol}>
              <h4>{t.footerContactH}</h4>
              {t.footerContact.map((c, i) => <a key={i} href={FOOTER_CONTACT_HREFS[i]}>{c}</a>)}
            </div>
            <div className={s.footCol}>
              <h4>{t.footerLegalH}</h4>
              <a href="/impressum">{t.footerLegal[0]}</a>
              <a href="/datenschutz">{t.footerLegal[1]}</a>
              <button type="button" onClick={() => window.dispatchEvent(new Event("mi-cookie-settings"))}>{t.footerLegal[2]}</button>
            </div>
          </div>
          <div className={s.footBottom}>
            <p>{t.footerCopyright}</p>
            <p>{t.footerDisclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
