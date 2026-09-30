const RESEND_API_URL = "https://api.resend.com/emails";
const PLACEHOLDER = "your_resend_api_key";

let warned = false;

// Resend is a transactional email API: instead of logging into a real
// mailbox (SMTP), we just send an authenticated HTTP request with an
// API key. No account credentials touch this server at all.
function isConfigured() {
  const { RESEND_API_KEY } = process.env;
  return Boolean(RESEND_API_KEY) && RESEND_API_KEY !== PLACEHOLDER;
}

// Sends a notification email for a new contact form submission.
// Never throws — failures are logged and swallowed so a broken mail
// config can't take down the /api/messages endpoint.
export async function sendContactNotification({ name, email, phone, company, message }) {
  if (!isConfigured()) {
    if (!warned) {
      console.warn(
        "[mailer] RESEND_API_KEY not set (or still the placeholder) — " +
          "contact form messages will be saved but no notification email will be sent."
      );
      warned = true;
    }
    return { sent: false, reason: "not_configured" };
  }

  // CONTACT_TO_EMAIL is where notifications land (your inbox).
  // CONTACT_FROM_EMAIL is the "From" address Resend sends as — the
  // default onboarding@resend.dev works immediately with no setup,
  // but only delivers to the email you signed up to Resend with.
  // Once you verify your own domain in Resend, switch this to
  // something like notifications@yourdomain.com to send to anyone.
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!to) {
    console.error("[mailer] CONTACT_TO_EMAIL is not set — nowhere to deliver the notification.");
    return { sent: false, reason: "missing_recipient" };
  }

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Portfolio Contact Form <${from}>`,
        to: [to],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          company ? `Company: ${company}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[mailer] Resend API error (${res.status}):`, body);
      return { sent: false, reason: "send_failed" };
    }

    return { sent: true };
  } catch (err) {
    console.error("[mailer] Failed to send contact notification:", err.message);
    return { sent: false, reason: "send_failed" };
  }
}
