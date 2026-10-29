/* ── Browser side of /api/lead ──
   If the server can't send mail (Resend not configured or down), the lead is
   still delivered as a plain Web3Forms notification so nothing gets lost. */

import { getAttribution } from "./tracking";

const WEB3FORMS_KEY = "241ac8bf-f24f-4a36-b8f4-364360c35415";

export type LeadPayload = {
  form: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
  answers?: Record<string, string>;
  website?: string; // honeypot
};

export type LeadResult = { ok: true; qualified?: boolean } | { ok: false; reason: "invalid" | "rate" | "network" };

export async function submitLead(lead: LeadPayload, fallback: { subject: string; fields: Record<string, string> }): Promise<LeadResult> {
  const source = getAttribution();
  const page = location.href.split("?")[0];
  let status = 0;
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, source, page }),
    });
    status = res.status;
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      return { ok: true, qualified: data.qualified };
    }
    if (status === 400) return { ok: false, reason: "invalid" };
    if (status === 429) return { ok: false, reason: "rate" };
  } catch {
    /* network error: fall through to the fallback */
  }

  /* 502/503 (mail not configured or provider down) or no connection */
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: fallback.subject,
        from_name: "Marokko Investment",
        replyto: lead.email,
        ...fallback.fields,
        Quelle: Object.entries(source).map(([k, v]) => `${k}=${v}`).join(" · ") || "direkt / unbekannt",
        Seite: page,
      }),
    });
    const data = await res.json();
    if (data.success) return { ok: true };
  } catch {}
  return { ok: false, reason: "network" };
}
