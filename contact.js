import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const message = Object.entries(data || {})
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

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
      text: message
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
}
