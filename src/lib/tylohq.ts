/* ── Every lead → TyloHQ (www.tylohq.de), as a lead of the Marokko Investment partner ──
     TYLOHQ_LEADS_URL  the "Website / API" lead source URL from TyloHQ (Leads → Lead sources)
     TYLOHQ_LEADS_KEY  that source's key, sent as the X-Lead-Key header (kept out of URLs
                       and logs). Both live in the environment only, never in the code.
   Never throws: TyloHQ being slow or down must not cost a visitor their enquiry. */

export type Field = { label: string; value: string };

/* Ad attribution as /api/lead received it (already length-capped) */
export type Attribution = Partial<Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term" | "gclid" | "fbclid", string>> & {
  page?: string;
};

/* Strips spaces and quotes people paste around values in the Vercel UI */
const clean = (v?: string) => v?.trim().replace(/^["']+|["']+$/g, "").trim() || undefined;
const leadsUrl = () => clean(process.env.TYLOHQ_LEADS_URL);

export const tylohqConfigured = () => {
  const url = leadsUrl();
  if (url && !/^https:\/\//.test(url)) console.error("tylohq: TYLOHQ_LEADS_URL is set but is not an https:// URL");
  return Boolean(url && /^https:\/\//.test(url));
};

/* The TyloHQ webhook body: answers as label/value pairs, form name, ad attribution.
   utm_campaign / utm_term / utm_content carry the Meta campaign, ad set and ad names,
   which TyloHQ matches against the connected ad account. */
export function tylohqPayload(form: string, fields: Field[], a: Attribution, id: string, now = new Date()) {
  const extra: Field[] = [
    { label: "Seite", value: a.page ?? "" },
    { label: "Meta Klick-ID", value: a.fbclid ?? "" },
    { label: "Google Klick-ID", value: a.gclid ?? "" },
    { label: "UTM Medium", value: a.utm_medium ?? "" },
    { label: "UTM Term", value: a.utm_term ?? "" },
    { label: "UTM Content", value: a.utm_content ?? "" },
  ].filter((f) => f.value);
  return {
    form_name: form,
    submission_id: id,
    submitted_at: now.toISOString(),
    ...(a.utm_campaign ? { utm_campaign: a.utm_campaign } : {}),
    // Without UTM tags the lead's platform is simply "website".
    ...(a.utm_source ? { utm_source: a.utm_source } : {}),
    fields: [...fields.filter((f) => f.label && f.value).map((f) => ({ label: f.label.slice(0, 120), value: f.value.slice(0, 4000) })), ...extra],
  };
}

/* POST the lead to TyloHQ. true when TyloHQ stored it (or already had it). */
export async function sendToTyloHQ(form: string, fields: Field[], a: Attribution): Promise<boolean> {
  const url = leadsUrl();
  if (!url || !/^https:\/\//.test(url)) return false;
  const key = clean(process.env.TYLOHQ_LEADS_KEY);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(key ? { "X-Lead-Key": key } : {}) },
      body: JSON.stringify(tylohqPayload(form, fields, a, crypto.randomUUID())),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("tylohq: lead not stored", res.status);
    else console.log("tylohq: lead stored", res.status);
    return res.ok;
  } catch (err) {
    console.error("tylohq: lead not sent", err instanceof Error ? err.name : "error");
    return false;
  }
}
