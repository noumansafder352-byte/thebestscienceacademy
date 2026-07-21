// Server-only helper to send tutor application rejection emails.
// Sender is configured via env vars. When not configured, the send is
// simulated (status = "skipped") so the workflow works end-to-end
// until a verified domain is connected.

interface SendRejectionEmailArgs {
  to: string;
  applicantName: string;
  reason: string;
  comments?: string | null;
}

interface SendResult {
  status: "sent" | "skipped" | "failed";
  error?: string;
}

const SITE_NAME = "The British Academy";

function buildHtml({ applicantName, reason, comments }: SendRejectionEmailArgs): string {
  const safeName = escapeHtml(applicantName);
  const safeReason = escapeHtml(reason);
  const safeComments = comments ? escapeHtml(comments) : "";

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Application update</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.06);">
            <tr>
              <td style="padding:28px 32px;background:#0f172a;color:#ffffff;">
                <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.75;">${SITE_NAME}</div>
                <div style="margin-top:6px;font-size:20px;font-weight:700;">Application update</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Dear ${safeName},</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
                  Thank you for taking the time to apply to join ${SITE_NAME} as a tutor.
                  After careful review of your application, we regret to inform you that we are unable to move forward at this time.
                </p>
                <div style="margin:20px 0;padding:16px 18px;background:#f8fafc;border-left:3px solid #0f172a;border-radius:8px;">
                  <div style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;font-weight:600;">Reason</div>
                  <div style="margin-top:6px;font-size:14px;color:#0f172a;font-weight:600;">${safeReason}</div>
                  ${safeComments ? `<div style="margin-top:12px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-line;">${safeComments}</div>` : ""}
                </div>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
                  We appreciate the effort that went into your application and encourage you to apply again in the future as our
                  requirements evolve. We wish you every success in your teaching journey.
                </p>
                <p style="margin:24px 0 0;font-size:15px;line-height:1.6;">Warm regards,<br/><strong>${SITE_NAME} — Admissions Team</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background:#f8fafc;color:#94a3b8;font-size:12px;text-align:center;">
                This is an automated message. Please do not reply directly to this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendRejectionEmail(args: SendRejectionEmailArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.REJECTION_FROM_EMAIL;

  // No sender configured yet — simulate. Workflow still completes.
  if (!apiKey || !from) {
    console.info("[rejection-email] Simulated send (no RESEND_API_KEY / REJECTION_FROM_EMAIL set)", {
      to: args.to,
      applicant: args.applicantName,
    });
    return { status: "skipped" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [args.to],
        subject: `Update on your ${SITE_NAME} tutor application`,
        html: buildHtml(args),
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { status: "failed", error: `[${res.status}] ${text.slice(0, 300)}` };
    }
    return { status: "sent" };
  } catch (err: any) {
    return { status: "failed", error: String(err?.message ?? err).slice(0, 300) };
  }
}
