import { NextRequest, NextResponse } from "next/server";

/* ── Rate-limit map (IP → timestamps) ── */
const limiter = new Map<string, number[]>();
const RATE_WINDOW = 60_000; // 1 min
const RATE_MAX = 3;         // max 3 submissions per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (limiter.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW);
  if (hits.length >= RATE_MAX) return true;
  hits.push(now);
  limiter.set(ip, hits);
  return false;
}

/* ── POST handler ── */
export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { email, variant, honeypot } = body;

    /* Bot check */
    if (honeypot) {
      return NextResponse.json({ success: true }); // silently ignore bots
    }

    /* Validate email */
    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse." },
        { status: 400 },
      );
    }

    const timestamp = new Date().toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const variantLabel =
      variant === "a"
        ? "Warteliste"
        : variant === "b"
          ? "Anfragen"
          : "Zugang anfragen";

    /* ── Send via Web3Forms ── */
    const WEB3_KEY = process.env.WEB3FORMS_KEY;
    if (!WEB3_KEY) {
      console.error("WEB3FORMS_KEY env var not set");
      return NextResponse.json(
        { error: "Server-Konfiguration fehlt." },
        { status: 500 },
      );
    }

    console.log("Sending to Web3Forms with key:", WEB3_KEY.slice(0, 8) + "...");

    const payload = {
      access_key: WEB3_KEY,
      subject: `Neue Wartelisten-Anmeldung — ${email.trim()}`,
      from_name: "Marokko Investment",
      replyto: email.trim(),
      "E-Mail": email.trim(),
      "Formular": variantLabel,
      "Zeitpunkt": timestamp,
      "Quelle": "marokkoinvestment.de",
      message: buildEmailBody(email.trim(), variantLabel, timestamp),
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    /* Handle non-JSON responses gracefully */
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Web3Forms returned non-JSON:", res.status, text.slice(0, 500));
      return NextResponse.json(
        { error: `Web3Forms-Fehler (${res.status}). Bitte erneut versuchen.` },
        { status: 502 },
      );
    }

    const data = await res.json();

    if (!data.success) {
      console.error("Web3Forms error:", data);
      return NextResponse.json(
        { error: data.message ?? "Senden fehlgeschlagen. Bitte erneut versuchen." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Waitlist API error:", message, err);
    return NextResponse.json(
      { error: `Ein Fehler ist aufgetreten. Bitte erneut versuchen. [${message}]` },
      { status: 500 },
    );
  }
}

/* ── Branded HTML email body ── */
function buildEmailBody(
  email: string,
  formLabel: string,
  timestamp: string,
): string {
  return `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#f5ede0;">

  <!-- Header bar -->
  <div style="text-align:center;padding:28px 0 20px;border-bottom:1px solid rgba(230,190,140,0.25);">
    <span style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#e6be8c;font-family:'Courier New',monospace;">
      ✦ &nbsp;Marokko Investment&nbsp; ✦
    </span>
  </div>

  <!-- Title -->
  <div style="padding:36px 0 12px;">
    <h2 style="margin:0;font-size:26px;font-weight:400;color:#f5ede0;font-family:Georgia,'Times New Roman',serif;">
      Neue Wartelisten-Anmeldung
    </h2>
    <p style="margin:8px 0 0;font-size:14px;color:rgba(245,237,224,0.5);">
      Ein neuer Interessent möchte auf die Warteliste.
    </p>
  </div>

  <!-- Data card -->
  <div style="background:rgba(230,190,140,0.06);border:1px solid rgba(230,190,140,0.15);border-radius:8px;padding:24px 28px;margin:20px 0;">
    <table style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="padding:0 0 18px;border-bottom:1px solid rgba(230,190,140,0.1);">
          <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(230,190,140,0.7);font-family:'Courier New',monospace;margin-bottom:6px;">
            E-Mail-Adresse
          </div>
          <a href="mailto:${email}" style="font-size:17px;color:#e6be8c;text-decoration:none;font-weight:500;">
            ${email}
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:18px 0 0;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="width:50%;vertical-align:top;">
                <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(230,190,140,0.7);font-family:'Courier New',monospace;margin-bottom:6px;">
                  Zeitpunkt
                </div>
                <div style="font-size:14px;color:rgba(245,237,224,0.75);">
                  ${timestamp}
                </div>
              </td>
              <td style="width:50%;vertical-align:top;">
                <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(230,190,140,0.7);font-family:'Courier New',monospace;margin-bottom:6px;">
                  Formular
                </div>
                <div style="font-size:14px;color:rgba(245,237,224,0.75);">
                  ${formLabel}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>

  <!-- CTA button -->
  <div style="padding:8px 0 32px;">
    <a href="mailto:${email}?subject=Marokko%20Investment%20%E2%80%94%20Ihre%20Wartelisten-Anfrage&body=Sehr%20geehrte%20Damen%20und%20Herren%2C%0A%0Avielen%20Dank%20f%C3%BCr%20Ihr%20Interesse%20an%20Marokko%20Investment.%0A%0A"
       style="display:inline-block;background:#e6be8c;color:#1a1008;padding:14px 36px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
      Interessenten antworten →
    </a>
  </div>

  <!-- Footer -->
  <div style="text-align:center;padding:20px 0;border-top:1px solid rgba(230,190,140,0.12);">
    <span style="font-size:11px;color:rgba(245,237,224,0.25);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
      Marokko Investment · marokkoinvestment.de
    </span>
  </div>

</div>`.trim();
}
