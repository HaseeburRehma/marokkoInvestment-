/* ── Lead emails (server only): branded HTML + plain-text versions ──
   Everything a visitor typed goes through esc() before it lands in HTML. */

import type { DocMail } from "@/app/_document/docs";

export const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/* ── Branded email: RECEIVER (info@tylotech.de) ── */
export type Row = [label: string, value: string];

/* Team notification: any list of fields, newest lead on top of the inbox */
export function notificationHtml(o: { title: string; intro: string; rows: Row[]; email: string; name: string; replySubject: string }) {
  const label = "font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(176,141,69,0.7);font-family:'Courier New',monospace;margin-bottom:6px;";
  const rows = o.rows
    .map(([k, v], i) => {
      const value = k === "E-Mail"
        ? `<a href="mailto:${esc(v)}" style="font-size:16px;color:#B08D45;text-decoration:none;font-weight:500;">${esc(v)}</a>`
        : `<div style="font-size:${i === 0 ? 17 : 15}px;color:${i === 0 ? "#f5ede0" : "rgba(245,237,224,0.75)"};${i === 0 ? "font-weight:500;" : ""}">${esc(v)}</div>`;
      const border = i < o.rows.length - 1 ? "border-bottom:1px solid rgba(176,141,69,0.1);" : "";
      return `<tr><td style="padding:${i === 0 ? "0 0 16px" : "16px 0"};${border}"><div style="${label}">${esc(k)}</div>${value}</td></tr>`;
    })
    .join("");
  const reply = `mailto:${encodeURIComponent(o.email)}?subject=${encodeURIComponent(o.replySubject)}&body=${encodeURIComponent(`Sehr geehrte(r) ${o.name},\n\n`)}`;
  return `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;background:#0C0A07;color:#f5ede0;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#1A1710,#12100C);padding:40px 40px 32px;border-bottom:1px solid rgba(176,141,69,0.15);">
    <div style="text-align:center;margin-bottom:28px;">
      <span style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#B08D45;font-family:'Courier New',monospace;">✦ Marokko Investment ✦</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:400;color:#f5ede0;font-family:Georgia,'Times New Roman',serif;text-align:center;">${esc(o.title)}</h1>
    <p style="margin:0;font-size:14px;color:rgba(245,237,224,0.45);text-align:center;">${esc(o.intro)}</p>
  </div>
  <div style="padding:32px 40px;">
    <div style="background:rgba(176,141,69,0.06);border:1px solid rgba(176,141,69,0.15);border-radius:10px;padding:24px 28px;">
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>
    <div style="padding:28px 0 8px;text-align:center;">
      <a href="${esc(reply)}" style="display:inline-block;background:#B08D45;color:#0C0A07;padding:14px 36px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;">Interessenten antworten →</a>
    </div>
  </div>
  <div style="text-align:center;padding:20px 40px;border-top:1px solid rgba(176,141,69,0.08);">
    <span style="font-size:11px;color:rgba(245,237,224,0.2);">Marokko Investment · marokkoinvestment.de</span>
  </div>
</div>`.trim();
}

export const rowsText = (title: string, rows: Row[]) => [title, "", ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n");

/* ── Branded email: SENDER (auto-reply to requester) ── */
export function docAutoReplyHtml(name: string, d: DocMail) {
  const firstName = name.split(" ")[0];
  return `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;background:#0C0A07;color:#f5ede0;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#1A1710,#12100C);padding:40px 40px 32px;border-bottom:1px solid rgba(176,141,69,0.15);">
    <div style="text-align:center;margin-bottom:28px;">
      <span style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#B08D45;font-family:'Courier New',monospace;">✦ Marokko Investment ✦</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:400;color:#f5ede0;font-family:Georgia,'Times New Roman',serif;text-align:center;">Ihre Anfrage ist eingegangen</h1>
    <p style="margin:0;font-size:14px;color:rgba(245,237,224,0.45);text-align:center;">Vielen Dank für Ihr Interesse an ${d.dat}.</p>
  </div>
  <div style="padding:36px 40px;">
    <p style="font-size:15px;color:rgba(245,237,224,0.7);line-height:1.8;margin:0 0 24px;">
      Sehr geehrte(r) ${esc(firstName)},
    </p>
    <p style="font-size:15px;color:rgba(245,237,224,0.7);line-height:1.8;margin:0 0 24px;">
      wir haben Ihre Anfrage erhalten und prüfen diese persönlich. Sie erhalten ${d.acc} in der Regel innerhalb von 24 Stunden per E-Mail.
    </p>
    <div style="background:rgba(176,141,69,0.06);border:1px solid rgba(176,141,69,0.15);border-radius:10px;padding:24px 28px;margin:0 0 24px;">
      <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(176,141,69,0.7);font-family:'Courier New',monospace;">Ihr angefordertes Dokument</p>
      <p style="margin:0;font-size:16px;color:#f5ede0;font-weight:500;">${d.title}</p>
      <p style="margin:8px 0 0;font-size:12px;color:rgba(245,237,224,0.35);font-family:'Courier New',monospace;">${d.meta}</p>
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
        <td style="padding:12px 0;font-size:14px;color:rgba(245,237,224,0.6);">${d.nom} wird Ihnen per E-Mail zugestellt.</td>
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


export function docAutoReplyText(name: string, d: DocMail) {
  return `Sehr geehrte(r) ${name.split(" ")[0]},

wir haben Ihre Anfrage erhalten und prüfen diese persönlich. Sie erhalten ${d.acc} in der Regel innerhalb von 24 Stunden per E-Mail.

Ihr angefordertes Dokument: ${d.title} (${d.meta})

Bei Rückfragen erreichen Sie uns jederzeit unter info@tylotech.de.

Mit freundlichen Grüßen
Jawad Malloul
Marokko Investment`;
}

/* ── Eignungs-Check confirmation to the visitor ── */
export function quizAutoReplyHtml(name: string, answers: Row[]) {
  const first = esc(name.split(" ")[0]);
  const rows = answers
    .map(([k, v]) => `<tr><td style="padding:10px 0;font-size:13px;color:rgba(245,237,224,0.45);border-bottom:1px solid rgba(176,141,69,0.08);">${esc(k)}</td><td style="padding:10px 0;font-size:14px;color:#f5ede0;text-align:right;border-bottom:1px solid rgba(176,141,69,0.08);">${esc(v)}</td></tr>`)
    .join("");
  return `
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:580px;margin:0 auto;background:#001F00;color:#faf7f0;border-radius:12px;overflow:hidden;">
  <div style="background:#04290A;padding:40px 40px 32px;border-bottom:1px solid #1E4A22;text-align:center;">
    <span style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#E5BD8C;font-family:'Courier New',monospace;">✦ Marokko Investment ✦</span>
    <h1 style="margin:24px 0 8px;font-size:26px;font-weight:500;color:#faf7f0;">Vielen Dank für Ihren Eignungs-Check</h1>
    <p style="margin:0;font-size:14px;color:#A9B8AA;">Wir melden uns persönlich bei Ihnen.</p>
  </div>
  <div style="padding:36px 40px;">
    <p style="font-size:15px;color:rgba(250,247,240,0.8);line-height:1.8;margin:0 0 20px;">Sehr geehrte(r) ${first},</p>
    <p style="font-size:15px;color:rgba(250,247,240,0.8);line-height:1.8;margin:0 0 24px;">
      wir haben Ihre Angaben erhalten und prüfen sie persönlich. In der Regel melden wir uns innerhalb von 24 Stunden telefonisch oder per E-Mail. Passt es, stellen wir Ihnen im Gespräch konkrete Projekte vor.
    </p>
    <div style="background:#0A3410;border:1px solid #1E4A22;border-radius:10px;padding:16px 24px;margin:0 0 24px;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#E5BD8C;font-family:'Courier New',monospace;">Ihre Angaben</p>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>
    <p style="font-size:14px;color:#A9B8AA;line-height:1.7;margin:0 0 20px;">
      Bei Rückfragen erreichen Sie uns jederzeit unter <a href="mailto:info@tylotech.de" style="color:#E5BD8C;text-decoration:none;">info@tylotech.de</a>.
    </p>
    <p style="font-size:14px;color:#A9B8AA;line-height:1.7;margin:0;">Mit freundlichen Grüßen<br/><strong style="color:#faf7f0;">Jawad Malloul</strong><br/>Marokko Investment</p>
  </div>
  <div style="padding:20px 40px;border-top:1px solid #1E4A22;font-size:11px;line-height:1.6;color:rgba(169,184,170,0.6);text-align:center;">
    Unverbindliche Eignungs-Vorprüfung, keine Anlageberatung. Unternehmerische Beteiligungen sind mit Risiken verbunden, bis hin zum Totalverlust des eingesetzten Kapitals.
  </div>
</div>`.trim();
}

export function quizAutoReplyText(name: string, answers: Row[]) {
  return `Sehr geehrte(r) ${name.split(" ")[0]},

wir haben Ihre Angaben erhalten und prüfen sie persönlich. In der Regel melden wir uns innerhalb von 24 Stunden telefonisch oder per E-Mail.

Ihre Angaben:
${answers.map(([k, v]) => `- ${k}: ${v}`).join("\n")}

Bei Rückfragen erreichen Sie uns unter info@tylotech.de.

Mit freundlichen Grüßen
Jawad Malloul
Marokko Investment

Unverbindliche Eignungs-Vorprüfung, keine Anlageberatung. Unternehmerische Beteiligungen sind mit Risiken verbunden, bis hin zum Totalverlust des eingesetzten Kapitals.`;
}
