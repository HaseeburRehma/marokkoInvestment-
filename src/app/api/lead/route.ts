import { NextRequest, NextResponse } from "next/server";
import { DOCS, type DocKey } from "@/app/_document/docs";
import { QUESTIONS } from "@/app/_eignungs-check/content";
import { leadInbox, mailConfigured, sendMail } from "@/lib/mailer";
import {
  docAutoReplyHtml,
  docAutoReplyText,
  notificationHtml,
  quizAutoReplyHtml,
  quizAutoReplyText,
  rowsText,
  type Row,
} from "@/lib/leadEmails";

/* ── Lead form relay: validates on the server, then mails the team (and a
   confirmation to the visitor) through Resend. Replaces the browser calls
   to Web3Forms, which rate-limit and cap submissions on the free plan. ── */

const QUIZ = "eignungs-check";
type Form = DocKey | typeof QUIZ;
const isForm = (v: unknown): v is Form => v === QUIZ || (typeof v === "string" && Object.hasOwn(DOCS, v));

/* Best effort per serverless instance: 5 leads per IP per 10 minutes */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  if (recent.length >= 5) return true;
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;
const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];

export async function POST(req: NextRequest) {
  /* Same-site only: other websites can't post leads through us */
  const origin = req.headers.get("origin");
  let originHost: string | null = null;
  try {
    originHost = origin ? new URL(origin).host : null;
  } catch {}
  if (origin && originHost !== req.headers.get("host")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "bad json" }, { status: 400 });

  /* Honeypot: pretend success so bots don't retry */
  if (str(body.website, 200)) return NextResponse.json({ success: true });

  const form = body.form;
  const name = str(body.name, 100);
  const email = str(body.email, 200).toLowerCase();
  const phone = str(body.phone, 40);
  if (!isForm(form)) return NextResponse.json({ error: "bad form" }, { status: 400 });
  if (name.length < 2) return NextResponse.json({ error: "name" }, { status: 400 });
  if (!EMAIL.test(email)) return NextResponse.json({ error: "email" }, { status: 400 });
  const digits = phone.replace(/\D/g, "");
  if (phone && (digits.length < 6 || digits.length > 16 || /[^\d\s+()/-]/.test(phone))) {
    return NextResponse.json({ error: "phone" }, { status: 400 });
  }
  if (form === QUIZ && !phone) return NextResponse.json({ error: "phone" }, { status: 400 });
  if (body.consent !== true) return NextResponse.json({ error: "consent" }, { status: 400 });

  /* Quiz answers must be one of the offered options */
  const answers: Row[] = [];
  if (form === QUIZ) {
    const a = (body.answers ?? {}) as Record<string, unknown>;
    for (const q of QUESTIONS) {
      const v = a[q.key];
      if (typeof v !== "string" || !(q.options as readonly string[]).includes(v)) {
        return NextResponse.json({ error: `answer ${q.key}` }, { status: 400 });
      }
      answers.push([q.label, v]);
    }
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate" }, { status: 429 });

  /* Not configured yet: tell the browser to use its fallback */
  if (!mailConfigured()) return NextResponse.json({ error: "mail_unconfigured" }, { status: 503 });

  const src = (body.source ?? {}) as Record<string, unknown>;
  const source = ATTR_KEYS.filter((k) => typeof src[k] === "string" && src[k]).map((k) => `${k}=${str(src[k], 200)}`).join(" · ");
  const page = str(body.page, 300);
  const ts = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "short", timeStyle: "short" });

  const zeitpunkt = answers.find(([k]) => k === "Zeitpunkt")?.[1];
  const qualified = form === QUIZ && zeitpunkt !== "Erst informieren";
  const doc = form === QUIZ ? null : DOCS[form];

  const rows: Row[] = [
    ["Name", name],
    ["E-Mail", email],
    ["Telefon", phone || "–"],
    ...(doc ? ([["Dokument", doc.mail.label]] as Row[]) : answers),
    ...(form === QUIZ ? ([["Einschätzung", qualified ? "Qualifiziert (Investition in ≤ 6 Monaten)" : "Möchte sich erst informieren"]] as Row[]) : []),
    ["Quelle", source || "direkt / unbekannt"],
    ["Seite", page || "–"],
    ["Zeitpunkt", ts],
  ];
  const title = doc ? `Neue Anfrage: ${doc.mail.label}` : "Neuer Eignungs-Check";
  const subject = doc ? `Neue Anfrage: ${doc.mail.label} — ${name}` : `Neuer Eignungs-Check — ${name} (${answers[0][1]})`;

  try {
    await sendMail({
      to: leadInbox(),
      replyTo: email,
      subject,
      html: notificationHtml({
        title,
        intro: doc ? `Ein neuer Interessent möchte ${doc.mail.acc} erhalten.` : "Ein Interessent hat den Eignungs-Check abgeschlossen.",
        rows,
        email,
        name,
        replySubject: doc ? `Marokko Investment — ${doc.mail.label}` : "Marokko Investment — Ihr Eignungs-Check",
      }),
      text: rowsText(title, rows),
    });
  } catch (err) {
    console.error("Lead mail failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "mail_failed" }, { status: 502 });
  }

  /* Confirmation to the visitor; the lead is already safe, so failures only log */
  try {
    await sendMail(
      doc
        ? { to: email, replyTo: leadInbox(), subject: "Ihre Anfrage — Marokko Investment", html: docAutoReplyHtml(name, doc.mail), text: docAutoReplyText(name, doc.mail) }
        : { to: email, replyTo: leadInbox(), subject: "Ihr Eignungs-Check — Marokko Investment", html: quizAutoReplyHtml(name, answers), text: quizAutoReplyText(name, answers) },
    );
  } catch (err) {
    console.error("Lead auto-reply failed:", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({ success: true, qualified });
}
