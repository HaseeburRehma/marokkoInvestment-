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

/* ── Beautiful HTML email template ── */
function buildEmail(email: string, variant: string, timestamp: string): string {
  const variantLabel =
    variant === "a"
      ? "Variante A — Warteliste"
      : variant === "b"
        ? "Variante B — Anfragen"
        : "Variante C — Zugang anfragen";

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Neue Wartelisten-Anmeldung</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0d0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0d0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(230,190,140,0.2);">
              <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#e6be8c;font-family:'Courier New',monospace;">
                Marokko Investment
              </p>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:48px 40px 40px;background:linear-gradient(180deg,#161310 0%,#1a1611 100%);border-left:1px solid rgba(230,190,140,0.08);border-right:1px solid rgba(230,190,140,0.08);">

              <h1 style="margin:0 0 8px;font-size:28px;font-weight:400;color:#f5ede0;font-family:Georgia,'Times New Roman',serif;letter-spacing:-0.01em;">
                Neue Anmeldung
              </h1>
              <p style="margin:0 0 36px;font-size:14px;color:rgba(255,255,255,0.4);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                Ein neuer Interessent hat sich auf die Warteliste eingetragen.
              </p>

              <!-- Data card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(230,190,140,0.12);border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:24px 28px;border-bottom:1px solid rgba(230,190,140,0.08);">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(230,190,140,0.6);font-family:'Courier New',monospace;">
                      E-Mail-Adresse
                    </p>
                    <p style="margin:0;font-size:18px;color:#fff;font-weight:500;">
                      <a href="mailto:${email}" style="color:#e6be8c;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 28px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="vertical-align:top;">
                          <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(230,190,140,0.6);font-family:'Courier New',monospace;">
                            Zeitpunkt
                          </p>
                          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.7);">
                            ${timestamp}
                          </p>
                        </td>
                        <td width="50%" style="vertical-align:top;">
                          <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(230,190,140,0.6);font-family:'Courier New',monospace;">
                            Gesehen auf
                          </p>
                          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.7);">
                            ${variantLabel}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:36px 0 0;">
                <tr>
                  <td style="background:#e6be8c;border-radius:6px;">
                    <a href="mailto:${email}" style="display:inline-block;padding:14px 32px;font-size:13px;font-weight:600;color:#1a1008;text-decoration:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                      Antworten
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px;text-align:center;border-top:1px solid rgba(230,190,140,0.1);">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
                Marokko Investment · marokkoinvestment.de
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
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

    const htmlEmail = buildEmail(email.trim(), variant ?? "a", timestamp);

    /* ── Send via Web3Forms ── */
    const WEB3_KEY = process.env.WEB3FORMS_KEY;
    if (!WEB3_KEY) {
      console.error("WEB3FORMS_KEY env var not set");
      return NextResponse.json(
        { error: "Server-Konfiguration fehlt." },
        { status: 500 },
      );
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3_KEY,
        subject: `Neue Wartelisten-Anmeldung — ${email.trim()}`,
        from_name: "Marokko Investment Warteliste",
        to: "info@tylotech.de",
        message: htmlEmail,
        // Web3Forms fields
        email: email.trim(),
        variant: variant ?? "a",
        timestamp,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      console.error("Web3Forms error:", data);
      return NextResponse.json(
        { error: "Senden fehlgeschlagen." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten." },
      { status: 500 },
    );
  }
}
