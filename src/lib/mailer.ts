/* ── Outgoing mail via Resend (server only) ──
     RESEND_API_KEY  Resend API key; the domain in EMAIL_FROM must be verified
                     in Resend → Domains
     EMAIL_FROM      sender, e.g. "Marokko Investment <info@tylotech.de>"
     LEAD_INBOX      where new leads go (default info@tylotech.de) */

export type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/* Strips quotes people paste around env values in the Vercel UI */
const clean = (v?: string) => v?.trim().replace(/^["']|["']$/g, "") || undefined;

export const mailConfigured = () => Boolean(clean(process.env.RESEND_API_KEY));
export const leadInbox = () => clean(process.env.LEAD_INBOX) || "info@tylotech.de";
const sender = () => clean(process.env.EMAIL_FROM) || "Marokko Investment <info@tylotech.de>";

/* Sends one email; throws with a short, non-secret reason on failure */
export async function sendMail(mail: Mail): Promise<void> {
  const key = clean(process.env.RESEND_API_KEY);
  if (!key) throw new Error("mail not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: sender(),
      to: [mail.to],
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { name?: string; message?: string } | null;
    throw new Error(`resend ${res.status} ${body?.name ?? ""}: ${body?.message ?? "no body"}`);
  }
}
