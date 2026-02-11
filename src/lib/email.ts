import { Resend } from "resend";

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
}) {
  const recipientEmail = process.env.NOTIFICATION_EMAIL;

  if (!recipientEmail) {
    throw new Error("NOTIFICATION_EMAIL environment variable is not set");
  }

  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const result = await resend.emails.send({
    from: "MDJ Studios <admin@messages.mdjstudios.com>",
    to: recipientEmail,
    subject: "New Contact Form Submission — MDJ Studios",
    html: `
<!DOCTYPE html>
<html>
<head>
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.header {
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  color: white;
  padding: 30px;
  border-radius: 8px 8px 0 0;
  text-align: center;
}
.header h1 {
  margin: 0;
  font-size: 24px;
}
.badge {
  display: inline-block;
  background: #eeb30d;
  color: #1f2937;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  margin-top: 10px;
}
.content {
  background: #f9fafb;
  padding: 30px;
  border-radius: 0 0 8px 8px;
}
.field {
  background: white;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 6px;
  border-left: 4px solid #4f46e5;
}
.label {
  font-weight: 600;
  color: #6b7280;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.value {
  color: #1f2937;
  font-size: 16px;
}
.message-value {
  color: #1f2937;
  font-size: 15px;
  white-space: pre-wrap;
  line-height: 1.7;
}
.footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
  color: #6b7280;
  font-size: 14px;
}
.cta-button {
  display: inline-block;
  background: #4f46e5;
  color: white !important;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 20px;
}
</style>
</head>
<body>
<div class="header">
  <h1>New Contact Form Submission</h1>
  <span class="badge">Website Inquiry</span>
</div>

<div class="content">
  <p style="font-size: 16px; color: #1f2937; margin-bottom: 20px;">
    Someone has submitted a contact form on your website.
  </p>

  <div class="field">
    <div class="label">Name</div>
    <div class="value">${data.name}</div>
  </div>

  <div class="field">
    <div class="label">Email Address</div>
    <div class="value">
      <a href="mailto:${data.email}" style="color: #4f46e5; text-decoration: none;">
        ${data.email}
      </a>
    </div>
  </div>

  <div class="field">
    <div class="label">Message</div>
    <div class="message-value">${data.message}</div>
  </div>

  <div class="field">
    <div class="label">Submission Time</div>
    <div class="value">${new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}</div>
  </div>

  <div style="text-align: center; margin-top: 30px;">
    <a href="mailto:${data.email}" class="cta-button">
      Reply to ${data.name}
    </a>
  </div>

  <div class="footer">
    <p>This inquiry has been automatically saved to your Google Sheet.</p>
    <p style="margin-top: 10px;">
      <strong>MDJ Studios</strong><br>
      Web Development Agency &amp; Technical Education<br>
      Fort Worth, TX
    </p>
  </div>
</div>
</body>
</html>
    `,
  });

  return result;
}
