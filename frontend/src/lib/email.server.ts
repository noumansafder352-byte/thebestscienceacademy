// Server-only email module (SMTP via nodemailer).
//
// Configure with environment variables on the server (cPanel → Setup Node.js
// App → Environment variables). When SMTP isn't configured, every send is a
// no-op with status "skipped", so the app keeps working end-to-end until a
// mailbox is connected.
//
//   SMTP_HOST           e.g. mail.thebestscienceacademy.com
//   SMTP_PORT           465 (SSL) or 587 (TLS) — default 465
//   SMTP_SECURE         "true" for 465, "false" for 587 — default: true when port 465
//   SMTP_USER           full mailbox address, e.g. careers@thebestscienceacademy.com
//   SMTP_PASS           mailbox password
//   EMAIL_FROM          optional display sender, e.g. "The Best Science Academy <careers@…>"
//                       (falls back to SMTP_USER)
//   ADMIN_NOTIFY_EMAIL  where new-application alerts are sent (falls back to EMAIL_FROM/SMTP_USER)
//   CONTACT_NOTIFY_EMAIL where contact-form enquiries are sent (falls back to ADMIN_NOTIFY_EMAIL)
//   SMTP_TLS_REJECT_UNAUTHORIZED  "false" to accept a mismatched/self-signed mail
//                       certificate (common on shared cPanel hosting) — default: true
import nodemailer, { type Transporter } from "nodemailer";

const SITE_NAME = "The Best Science Academy";
const BRAND = "#2F2B8F";

export type SendResult = { status: "sent" | "skipped" | "failed"; error?: string };

let _transport: Transporter | null | undefined;

function getTransport(): Transporter | null {
  if (_transport !== undefined) return _transport;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    _transport = null;
    return null;
  }
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = (process.env.SMTP_SECURE ?? (port === 465 ? "true" : "false")) === "true";
  _transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      // Shared cPanel hosts usually present a certificate for the provider's
      // domain (e.g. *.web-hosting.com) rather than mail.<your-domain>, which
      // trips Node's hostname check. Set SMTP_TLS_REJECT_UNAUTHORIZED=false to
      // accept it — the mail server runs on the same machine as this app, so
      // the risk is negligible.
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
    },
    // Fail fast instead of hanging a request if the mail server is unreachable.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return _transport;
}

function fromAddress(): string {
  return process.env.EMAIL_FROM || process.env.SMTP_USER || "";
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const transport = getTransport();
  if (!transport) {
    console.info(`[email] Skipped (SMTP not configured): "${opts.subject}" -> ${opts.to}`);
    return { status: "skipped" };
  }
  if (!opts.to) {
    return { status: "skipped" };
  }
  try {
    await transport.sendMail({
      from: fromAddress(),
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return { status: "sent" };
  } catch (err: any) {
    console.error("[email] Send failed:", err?.message ?? err);
    return { status: "failed", error: String(err?.message ?? err).slice(0, 300) };
  }
}

/* ---------------- Templates ---------------- */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layout(heading: string, bodyHtml: string): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.06);">
            <tr>
              <td style="padding:28px 32px;background:${BRAND};color:#ffffff;">
                <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.8;">${SITE_NAME}</div>
                <div style="margin-top:6px;font-size:20px;font-weight:700;">${escapeHtml(heading)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background:#f8fafc;color:#94a3b8;font-size:12px;text-align:center;">
                This is an automated message from ${SITE_NAME}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">${text}</p>`;
}

/* ---------------- Specific senders ---------------- */

export async function sendApplicantConfirmation({
  to,
  applicantName,
}: {
  to: string;
  applicantName: string;
}): Promise<SendResult> {
  const name = escapeHtml(applicantName);
  const body =
    paragraph(`Dear ${name},`) +
    paragraph(
      `Thank you for applying to join <strong>${SITE_NAME}</strong> as a tutor. We've received your application and our recruitment team will review it carefully.`,
    ) +
    paragraph(`You can expect to hear back from us within <strong>5 working days</strong>.`) +
    paragraph(`Warm regards,<br/><strong>${SITE_NAME} — Admissions Team</strong>`);
  return sendEmail({
    to,
    subject: `We've received your ${SITE_NAME} tutor application`,
    html: layout("Application received", body),
  });
}

export async function sendApprovalEmail({
  to,
  applicantName,
}: {
  to: string;
  applicantName: string;
}): Promise<SendResult> {
  const name = escapeHtml(applicantName);
  const body =
    paragraph(`Dear ${name},`) +
    paragraph(
      `Congratulations! After reviewing your application, we're delighted to welcome you to <strong>${SITE_NAME}</strong> as a tutor.`,
    ) +
    paragraph(
      `Your profile is now being prepared for our platform. Our team will be in touch shortly with your onboarding details and next steps.`,
    ) +
    paragraph(`We're excited to have you on board.`) +
    paragraph(`Warm regards,<br/><strong>${SITE_NAME} — Admissions Team</strong>`);
  return sendEmail({
    to,
    subject: `Welcome to ${SITE_NAME} — your application is approved`,
    html: layout("You're approved 🎉", body),
  });
}

export async function sendRejectionEmail({
  to,
  applicantName,
  reason,
  comments,
}: {
  to: string;
  applicantName: string;
  reason: string;
  comments?: string | null;
}): Promise<SendResult> {
  const name = escapeHtml(applicantName);
  const safeReason = escapeHtml(reason);
  const safeComments = comments ? escapeHtml(comments) : "";
  const body =
    paragraph(`Dear ${name},`) +
    paragraph(
      `Thank you for taking the time to apply to join ${SITE_NAME} as a tutor. After careful review of your application, we regret to inform you that we are unable to move forward at this time.`,
    ) +
    `<div style="margin:20px 0;padding:16px 18px;background:#f8fafc;border-left:3px solid ${BRAND};border-radius:8px;">
       <div style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;font-weight:600;">Reason</div>
       <div style="margin-top:6px;font-size:14px;color:#0f172a;font-weight:600;">${safeReason}</div>
       ${safeComments ? `<div style="margin-top:12px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-line;">${safeComments}</div>` : ""}
     </div>` +
    paragraph(
      `We appreciate the effort that went into your application and encourage you to apply again in the future as our requirements evolve. We wish you every success in your teaching journey.`,
    ) +
    paragraph(`Warm regards,<br/><strong>${SITE_NAME} — Admissions Team</strong>`);
  return sendEmail({
    to,
    subject: `Update on your ${SITE_NAME} tutor application`,
    html: layout("Application update", body),
  });
}

export async function sendNewApplicationNotification(applicant: {
  full_name: string;
  email: string;
  phone?: string | null;
  professional_title?: string | null;
  subjects?: string[] | null;
  country?: string | null;
  city?: string | null;
}): Promise<SendResult> {
  const to = process.env.ADMIN_NOTIFY_EMAIL || fromAddress();
  if (!to) return { status: "skipped" };

  const row = (label: string, value?: string | null) =>
    `<tr>
       <td style="padding:6px 0;color:#64748b;font-size:13px;width:130px;vertical-align:top;">${label}</td>
       <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(value || "—")}</td>
     </tr>`;

  const body =
    paragraph(`A new tutor application has just been submitted.`) +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;">
       ${row("Name", applicant.full_name)}
       ${row("Title", applicant.professional_title)}
       ${row("Email", applicant.email)}
       ${row("Phone", applicant.phone)}
       ${row("Location", [applicant.city, applicant.country].filter(Boolean).join(", "))}
       ${row("Subjects", (applicant.subjects ?? []).slice(0, 6).join(", "))}
     </table>` +
    paragraph(`Review it in the admin dashboard under <strong>Applications</strong>.`);

  return sendEmail({
    to,
    subject: `New tutor application — ${applicant.full_name}`,
    html: layout("New tutor application", body),
    replyTo: applicant.email,
  });
}

export async function sendContactNotification(msg: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}): Promise<SendResult> {
  const to = process.env.CONTACT_NOTIFY_EMAIL || process.env.ADMIN_NOTIFY_EMAIL || fromAddress();
  if (!to) return { status: "skipped" };

  const row = (label: string, value?: string | null) =>
    `<tr>
       <td style="padding:6px 0;color:#64748b;font-size:13px;width:110px;vertical-align:top;">${label}</td>
       <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(value || "—")}</td>
     </tr>`;

  const body =
    paragraph(`You've received a new enquiry from the website contact form.`) +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 16px;">
       ${row("Name", msg.name)}
       ${row("Email", msg.email)}
       ${row("Phone", msg.phone)}
       ${row("Subject", msg.subject)}
     </table>` +
    `<div style="margin:8px 0 16px;padding:16px 18px;background:#f8fafc;border-left:3px solid ${BRAND};border-radius:8px;">
       <div style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;font-weight:600;">Message</div>
       <div style="margin-top:8px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-line;">${escapeHtml(msg.message)}</div>
     </div>` +
    paragraph(`Reply directly to this email to respond to ${escapeHtml(msg.name)}.`);

  return sendEmail({
    to,
    subject: `New enquiry — ${msg.name}`,
    html: layout("New contact enquiry", body),
    replyTo: msg.email,
  });
}
