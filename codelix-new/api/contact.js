import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

/* One endpoint for every public form on the site: the contact form, the
   careers application, and the consultation booking.

   Each submission is written to Supabase first and emailed second. That order
   is deliberate — email is a notification, not the record. Before this, the
   only copy of an enquiry was a message in an inbox, so a failed send, a spam
   filter or a deleted mail lost it silently and there was no way to know how
   many enquiries the site had ever produced.

   Every secret here is server-side. Vercel env vars WITHOUT the VITE_ prefix
   never reach the browser, which is what makes an SMTP app password safe to
   use at all — a VITE_ variable is compiled into the bundle and readable by
   anyone who opens devtools. */

const RECEIVERS = {
  contact: () => process.env.SALES_RECEIVER || process.env.CONTACT_RECEIVER,
  booking: () => process.env.SALES_RECEIVER || process.env.CONTACT_RECEIVER,
  careers: () => process.env.HR_RECEIVER || process.env.CONTACT_RECEIVER,
};

const LABELS = {
  contact: "Contact Form",
  booking: "Consultation Booking",
  careers: "Careers Application",
};

/* Interpolating raw form input into an HTML email lets a submitter inject
   markup into whatever you read it in. Escape everything. */
const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/* Per-instance and therefore imperfect — serverless spreads traffic across
   instances, so this is a speed bump rather than a wall. It still stops the
   common case of one bot hammering the endpoint on a single warm instance. */
const hits = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip) {
  const now = Date.now();
  const seen = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  seen.push(now);
  hits.set(ip, seen);
  if (hits.size > 500) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(k);
  }
  return seen.length > RATE_LIMIT;
}

const ALLOWED_HOSTS = [
  "codelixitsolutions.com",
  "www.codelixitsolutions.com",
  "localhost",
  "127.0.0.1",
];

function originAllowed(req) {
  const raw = req.headers.origin || req.headers.referer;
  if (!raw) return false;
  try {
    return ALLOWED_HOSTS.includes(new URL(raw).hostname);
  } catch {
    return false;
  }
}

const row = (label, value) => `
  <tr>
    <td style="padding:10px 12px;color:#64748b;font-weight:600;width:150px;vertical-align:top;">${esc(label)}</td>
    <td style="padding:10px 12px;color:#1e293b;white-space:pre-wrap;">${esc(value || "—")}</td>
  </tr>`;

function buildEmail(formType, d) {
  const heading = LABELS[formType];
  const rows =
    formType === "careers"
      ? [
          row("Name", d.name),
          row("Email", d.email),
          row("Phone", d.phone || d.contact),
          row("Discipline", d.discipline),
          row("Portfolio / Links", d.portfolio),
          row("Message", d.message || d.aboutProject),
        ]
      : formType === "booking"
        ? [
            row("Name", d.name),
            row("Email", d.email),
            row("Phone", d.phone),
            row("Company", d.company),
            row("Service", d.service),
            row("Requested date", d.bookingDate),
            row("Requested time", d.bookingTime),
            row("Message", d.message),
          ]
        : [
            row("Name", d.name),
            row("Phone / Contact", d.phone || d.contact),
            row("Email", d.email),
            row("Company", d.company),
            row("Designation", d.designation),
            row("Service", d.service),
            row("About project", d.message || d.aboutProject),
            row("Budget", d.budget),
            row("Timeline", d.timeline),
            row("How they heard about us", d.referral),
          ];

  return `
  <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;">
    <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);padding:28px;text-align:center;border-radius:8px 8px 0 0;">
      <h1 style="color:#ffffff;margin:0;font-size:22px;">New ${esc(heading)}</h1>
      <p style="color:#a0aec0;margin:8px 0 0;">codelixitsolutions.com</p>
    </div>
    <div style="padding:28px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
      <table style="width:100%;border-collapse:collapse;">${rows.join("")}</table>
      <div style="margin-top:26px;padding:16px;background:#f0f9ff;border-left:4px solid #3b82f6;border-radius:4px;">
        <p style="margin:0;color:#1e40af;font-size:14px;">
          <strong>Reply directly</strong> to this email to reach ${esc(d.name)} at ${esc(d.email)}.
        </p>
      </div>
    </div>
  </div>`;
}

async function persist(formType, d) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  /* Optional on purpose: without these the endpoint still emails, so a missing
     variable degrades to the old behaviour instead of dropping the enquiry. */
  if (!url || !key) return { stored: false, reason: "supabase env not set" };

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("enquiries").insert({
    form_type: formType,
    name: d.name,
    email: d.email,
    phone: d.phone || d.contact || null,
    company: d.company || null,
    designation: d.designation || null,
    service: d.service || null,
    budget: d.budget || null,
    timeline: d.timeline || null,
    message: d.message || d.aboutProject || null,
    discipline: d.discipline || null,
    booking_date: d.bookingDate || null,
    booking_time: d.bookingTime || null,
    referral: d.referral || null,
  });
  return { stored: !error, reason: error?.message };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!originAllowed(req)) return res.status(403).json({ error: "Forbidden" });

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (rateLimited(ip)) return res.status(429).json({ error: "Too many submissions. Please try again later." });

  const d = req.body || {};

  /* Hidden field no human fills in. Answer 200 so a bot cannot tell it was
     caught and start probing for the real shape. */
  if (d._hp) return res.status(200).json({ message: "ok" });

  const formType = ["contact", "careers", "booking"].includes(d.formType) ? d.formType : "contact";

  if (!d.name || !d.email) {
    return res.status(400).json({ error: "Please provide at least a name and an email address." });
  }

  const to = RECEIVERS[formType]();
  if (!to || !process.env.SMTP_HOST || !process.env.SMTP_EMAIL) {
    /* Log for us, stay vague for the caller — an error response should never
       tell a stranger which secrets are configured. */
    console.error("contact: mail not configured", {
      formType,
      receiver: !!to,
      host: !!process.env.SMTP_HOST,
    });
    return res.status(500).json({ error: "Unable to send your message right now. Please email us directly." });
  }

  /* Store first: if the mail fails, the enquiry still exists. */
  const persisted = await persist(formType, d);
  if (!persisted.stored && persisted.reason !== "supabase env not set") {
    console.error("contact: supabase insert failed", persisted.reason);
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASSWORD },
    });

    const who = String(d.name).slice(0, 60);
    const subject =
      formType === "careers"
        ? `New Application — ${who}${d.discipline ? ` — ${d.discipline}` : ""}`
        : formType === "booking"
          ? `New Consultation Booking — ${who}${d.bookingDate ? ` — ${d.bookingDate} ${d.bookingTime || ""}` : ""}`
          : `New Enquiry — ${who}`;

    await transporter.sendMail({
      from: `"Codelix ${LABELS[formType]}" <${process.env.SMTP_EMAIL}>`,
      to,
      replyTo: d.email,
      subject,
      html: buildEmail(formType, d),
    });

    return res.status(200).json({ message: "sent", stored: persisted.stored });
  } catch (error) {
    /* Never echo error.message to the client: SMTP errors routinely contain
       the host and account name. */
    console.error("contact: send failed", error.message);
    return res.status(persisted.stored ? 200 : 500).json(
      persisted.stored
        ? { message: "received", stored: true, emailed: false }
        : { error: "Unable to send your message right now. Please email us directly." }
    );
  }
}
