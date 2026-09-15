try {
  require("dotenv").config();
} catch (e) {
  // dotenv optional if env vars injected directly
}

const express = require("express");
const { Resend } = require("resend");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
app.set("trust proxy", 1);
const PORT =
  process.env.BACKEND_PORT ||
  (process.env.PORT && process.env.PORT !== "3000" ? process.env.PORT : 8000);

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigin =
      process.env.FRONTEND_ORIGIN || "http://localhost:3000";
    // Allow requests with no origin (like server-to-server or curl requests)
    // or requests that match the configured FRONTEND_ORIGIN
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(bodyParser.json());

// Helper to escape HTML characters in user inputs
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/send-email", contactRateLimiter, async (req, res) => {
  const payload = req.body;
  if (!payload || typeof payload !== "object") {
    return res
      .status(400)
      .json({ error: "Please provide valid contact form details." });
  }

  let { name, email, phone, subject, message } = payload;

  // Basic type checking
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof subject !== "string"
  ) {
    return res
      .status(400)
      .json({ error: "Please provide valid contact form details." });
  }
  if (message !== undefined && typeof message !== "string") {
    return res
      .status(400)
      .json({ error: "Please provide valid contact form details." });
  }

  // Normalize
  name = name.trim();
  email = email.trim();
  phone = phone.trim();
  subject = subject.trim();
  message = message ? message.trim() : "";

  // Check required non-empty
  if (!name || !email || !phone || !subject) {
    return res
      .status(400)
      .json({ error: "Please provide valid contact form details." });
  }

  // Check max lengths
  if (
    name.length > 100 ||
    email.length > 254 ||
    phone.length > 30 ||
    subject.length > 200 ||
    message.length > 5000
  ) {
    return res
      .status(400)
      .json({ error: "Please provide valid contact form details." });
  }

  // Practical email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Please provide valid contact form details." });
  }

  // Permissive phone validation
  const phoneRegex = /^[0-9+\-() ]+$/;
  if (!phoneRegex.test(phone)) {
    return res
      .status(400)
      .json({ error: "Please provide valid contact form details." });
  }

  // Prevent header injection (no CRLF in single-line fields)
  const crlfRegex = /[\r\n]/;
  if (
    crlfRegex.test(name) ||
    crlfRegex.test(email) ||
    crlfRegex.test(phone) ||
    crlfRegex.test(subject)
  ) {
    return res
      .status(400)
      .json({ error: "Please provide valid contact form details." });
  }

  if (
    !process.env.RESEND_API_KEY ||
    !process.env.EMAIL_FROM ||
    !process.env.RECEIVER_EMAIL
  ) {
    console.error(
      "Server Error: Missing email configuration (RESEND_API_KEY, EMAIL_FROM, or RECEIVER_EMAIL).",
    );
    return res.status(500).json({ error: "Failed to send message" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // 1. Send internal enquiry email to company receiver
    const { data: internalData, error: internalError } =
      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        reply_to: email,
        to: process.env.RECEIVER_EMAIL,
        subject: `Nivvis Inquiry: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`,
      });

    if (internalError) {
      console.error(
        "Resend API Error (Internal):",
        internalError.message || internalError,
      );
      return res.status(500).json({ error: "Failed to send message" });
    }

    // 2. ONLY if internal email succeeds: Send acknowledgement to visitor
    let acknowledged = false;
    try {
      // Dynamic subject logic
      let ackSubject = "We’ve Received Your Enquiry — Nivvis Labs";
      const productMatch = subject.match(/^Enquiry:\s*(.+)$/i);
      if (productMatch && productMatch[1].trim()) {
        ackSubject = `We’ve Received Your Enquiry — ${productMatch[1].trim()} | Nivvis Labs`;
      }

      const ackText = `Dear ${name},

Thank you for contacting Nivvis Labs.

We have successfully received your enquiry and the details you provided. Our team will review your request and get in touch with you regarding your enquiry.

We appreciate your interest in Nivvis Labs and look forward to connecting with you.

Stay tuned — our team will be in touch soon.

Regards,

Nivvis Labs Private Limited
Email: nivvislabs2021@gmail.com
Phone: +91 7702998819
Sion, Mumbai – 400022, India`;

      const safeName = escapeHtml(name);
      const safeSubject = escapeHtml(subject);

      const ackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(ackSubject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0F4C81; padding: 28px 32px; text-align: left;">
              <div style="font-size: 20px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.5px;">NIVVIS LABS</div>
              <div style="font-size: 13px; color: #E0E7FF; margin-top: 4px; font-weight: 400;">Pharmaceutical &amp; Healthcare</div>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; font-size: 15px; line-height: 1.65; color: #1E293B;">
              <p style="margin: 0 0 16px 0;">Dear <strong>${safeName}</strong>,</p>
              <p style="margin: 0 0 16px 0;">Thank you for contacting Nivvis Labs.</p>
              <p style="margin: 0 0 16px 0;">We have successfully received your enquiry and the details you provided. Our team will review your request and get in touch with you regarding your enquiry.</p>
              
              <!-- Reference Box -->
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F1F5F9; border-left: 4px solid #0F4C81; border-radius: 4px; margin: 20px 0;">
                <tr>
                  <td style="padding: 14px 18px; font-size: 14px; color: #334155;">
                    <span style="font-weight: 600; color: #0F4C81;">Subject Reference:</span> ${safeSubject}
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0;">We appreciate your interest in Nivvis Labs and look forward to connecting with you.</p>
              <p style="margin: 0 0 24px 0;">Stay tuned &mdash; our team will be in touch soon.</p>

              <p style="margin: 0 0 4px 0; color: #64748B; font-size: 14px;">Regards,</p>
              <p style="margin: 0; font-weight: 600; color: #0F4C81;">Nivvis Labs Private Limited</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748B; line-height: 1.5;">
                Email: <a href="mailto:nivvislabs2021@gmail.com" style="color: #0F4C81; text-decoration: none;">nivvislabs2021@gmail.com</a><br>
                Phone: <a href="tel:+917702998819" style="color: #0F4C81; text-decoration: none;">+91 7702998819</a><br>
                Sion, Mumbai &ndash; 400022, India
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8; text-align: center; line-height: 1.5;">
              This is an automated confirmation of your enquiry. Please do not reply directly to this email.<br>
              &copy; ${new Date().getFullYear()} Nivvis Labs Private Limited. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      const { error: ackError } = await resend.emails.send({
        from: `Nivvis Labs <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: ackSubject,
        text: ackText,
        html: ackHtml,
      });

      if (ackError) {
        console.warn(
          "Acknowledgement delivery failed:",
          ackError.message || ackError,
        );
      } else {
        acknowledged = true;
      }
    } catch (ackErr) {
      console.warn(
        "Acknowledgement delivery failed:",
        ackErr.message || ackErr,
      );
    }

    // 3. Return success response
    res.status(200).json({
      success: true,
      id: internalData?.id,
      acknowledged,
    });
  } catch (err) {
    console.error("Server Error:", err.message || err);
    res.status(500).json({ error: "Failed to send message" });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
