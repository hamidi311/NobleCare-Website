// api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const lines = Object.entries(body || {}).map(([k, v]) => `${k}: ${v}`);
    const text = lines.join("\n");

    // Email via Gmail (App Password required)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO || process.env.MAIL_FROM,
      subject: "New Ride Request",
      text
    });

    // Optional SMS via Twilio (only if env vars are present)
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, SMS_TO } = process.env;
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM && SMS_TO) {
      const twilio = (await import("twilio")).default;
      const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
      const preview = `Ride: ${body["Pickup Address"] || ""} -> ${body["Dropoff Address"] || ""} @ ${body.Time || ""}`;
      await client.messages.create({
        from: TWILIO_FROM,
        to: SMS_TO,
        body: preview.slice(0, 150)
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error sending message." });
  }
}
