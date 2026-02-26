import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    contact,
    email,
    company,
    designation,
    service,
    project,
    budget,
    timeline,
    referral,
  } = req.body;

  if (!name || !contact || !email || !company || !designation || !service || !project) {
    return res.status(400).json({ error: "Please fill in all required fields." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="color: #a0aec0; margin: 8px 0 0;">from codelix.com</p>
      </div>

      <div style="padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        <h2 style="color: #1a1a2e; font-size: 18px; margin: 0 0 20px; padding-bottom: 10px; border-bottom: 2px solid #3b82f6;">Contact Details</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; width: 140px; vertical-align: top;">Name</td>
            <td style="padding: 10px 12px; color: #1e293b;">${name}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; vertical-align: top;">Phone / Contact</td>
            <td style="padding: 10px 12px; color: #1e293b;">${contact}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; vertical-align: top;">Email</td>
            <td style="padding: 10px 12px; color: #1e293b;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; vertical-align: top;">Company</td>
            <td style="padding: 10px 12px; color: #1e293b;">${company}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; vertical-align: top;">Designation</td>
            <td style="padding: 10px 12px; color: #1e293b;">${designation}</td>
          </tr>
        </table>

        <h2 style="color: #1a1a2e; font-size: 18px; margin: 30px 0 20px; padding-bottom: 10px; border-bottom: 2px solid #3b82f6;">Project Details</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; width: 140px; vertical-align: top;">Service</td>
            <td style="padding: 10px 12px; color: #1e293b;">${service}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; vertical-align: top;">About Project</td>
            <td style="padding: 10px 12px; color: #1e293b; white-space: pre-wrap;">${project}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; vertical-align: top;">Budget</td>
            <td style="padding: 10px 12px; color: #1e293b;">${budget || "Not specified"}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; vertical-align: top;">Timeline</td>
            <td style="padding: 10px 12px; color: #1e293b;">${timeline || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; color: #64748b; font-weight: 600; vertical-align: top;">How they heard about us</td>
            <td style="padding: 10px 12px; color: #1e293b;">${referral || "Not specified"}</td>
          </tr>
        </table>

        <div style="margin-top: 30px; padding: 16px; background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
          <p style="margin: 0; color: #1e40af; font-size: 14px;">
            <strong>Reply directly</strong> to this email to respond to <strong>${name}</strong> at <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
          </p>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Codelix Contact Form" <${process.env.SMTP_EMAIL}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `New Contact Form Submission - ${name}`,
      html: htmlBody,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
}
