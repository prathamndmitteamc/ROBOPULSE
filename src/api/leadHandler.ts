import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export interface ContactLeadData {
  name: string;
  phone: string;
  email: string;
  organization?: string;
  city?: string;
  requirement?: string;
  message?: string;
  timestamp?: string;
}

export const RECIPIENT_EMAIL = "robopulse51@gmail.com";
export const NOTIFICATION_WEBHOOK_URL = process.env.LEAD_NOTIFICATION_WEBHOOK_URL || "";
export const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";

// SMTP Configuration (Hostinger Titan Email / cPanel / Gmail SMTP)
export const SMTP_HOST = process.env.SMTP_HOST || "";
export const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
export const SMTP_SECURE = process.env.SMTP_SECURE !== "false"; // Default true for port 465 SSL
export const SMTP_USER = process.env.SMTP_USER || "";
export const SMTP_PASS = process.env.SMTP_PASS || "";
export const SMTP_FROM = process.env.SMTP_FROM || `Robopulse Intelligence <${SMTP_USER || "leads@robopulseintelligence.com"}>`;

export async function processContactLead(data: ContactLeadData): Promise<{ success: boolean; message: string; emailDelivered?: boolean }> {
  // Validate required fields
  if (!data.name || !data.name.trim()) {
    return { success: false, message: "Please provide your full name." };
  }
  if (!data.phone || !data.phone.trim()) {
    return { success: false, message: "Please provide your phone number." };
  }
  if (!data.email || !data.email.trim()) {
    return { success: false, message: "Please provide your email address." };
  }

  // Validate Indian Phone format (10 digits, optional +91 prefix)
  const cleanPhone = data.phone.replace(/[\s-]/g, "");
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return { success: false, message: "Please enter a valid 10-digit mobile number." };
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const timestamp = data.timestamp || new Date().toISOString();
  const leadRecord = {
    ...data,
    recipientEmail: RECIPIENT_EMAIL,
    timestamp,
  };

  console.log(`[LEAD NOTIFICATION] Dispatching lead to ${RECIPIENT_EMAIL}:`, JSON.stringify(leadRecord, null, 2));

  // Store in server leads log file
  try {
    const logsDir = path.resolve(process.cwd(), "data");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const logFile = path.join(logsDir, "leads.jsonl");
    fs.appendFileSync(logFile, JSON.stringify(leadRecord) + "\n", "utf8");
  } catch (err) {
    console.warn("[LEAD STORAGE] Local file write warning:", err);
  }

  let emailDelivered = false;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>New Robopulse Institutional Enquiry</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #05050A; color: #FFFFFF; padding: 24px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #0D0D18; border: 1px solid #00C9FF; border-radius: 12px; padding: 24px;">
        <h2 style="color: #00C9FF; margin-top: 0; font-size: 20px;">ROBOPULSE INTELLIGENCE // New Institutional Enquiry</h2>
        <p style="color: #A9D4FF; font-size: 14px;">A new enquiry has been submitted on the website.</p>
        <hr style="border: 0; border-top: 1px solid #222238; margin: 16px 0;" />
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #8888AA; width: 160px;"><strong>Full Name:</strong></td>
            <td style="padding: 8px 0; color: #FFFFFF; font-size: 15px; font-weight: bold;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8888AA;"><strong>Mobile Number:</strong></td>
            <td style="padding: 8px 0; color: #00C9FF;"><a href="tel:${cleanPhone}" style="color: #00C9FF; text-decoration: none;">${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8888AA;"><strong>Email Address:</strong></td>
            <td style="padding: 8px 0; color: #FFFFFF;"><a href="mailto:${data.email}" style="color: #A9D4FF; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8888AA;"><strong>School / Organization:</strong></td>
            <td style="padding: 8px 0; color: #FFFFFF;">${data.organization || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8888AA;"><strong>City / Location:</strong></td>
            <td style="padding: 8px 0; color: #FFFFFF;">${data.city || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8888AA;"><strong>Primary Requirement:</strong></td>
            <td style="padding: 8px 0; color: #00C9FF; font-weight: bold;">${data.requirement || "Robotics Education Program"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8888AA; vertical-align: top;"><strong>Message / Details:</strong></td>
            <td style="padding: 8px 0; color: #E0E0FF;">${(data.message || "No additional message provided.").replace(/\n/g, "<br/>")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #8888AA;"><strong>Submission Time:</strong></td>
            <td style="padding: 8px 0; color: #777799; font-size: 12px;">${timestamp}</td>
          </tr>
        </table>
        
        <hr style="border: 0; border-top: 1px solid #222238; margin: 20px 0;" />
        <div style="text-align: center;">
          <a href="https://wa.me/${cleanPhone.startsWith("+") ? cleanPhone.slice(1) : (cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone)}" style="display: inline-block; background-color: #00C9FF; color: #000000; font-weight: bold; padding: 10px 22px; border-radius: 20px; text-decoration: none; font-size: 13px;">Reply to Visitor on WhatsApp</a>
        </div>
      </div>
    </body>
    </html>
  `;

  // 1. Try Standard SMTP (Hostinger Titan / cPanel / Gmail SMTP)
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: SMTP_FROM,
        to: RECIPIENT_EMAIL,
        replyTo: data.email,
        subject: `New Institutional Lead: ${data.name} (${data.organization || data.city || "Website Inquiry"})`,
        html: htmlContent,
      });

      emailDelivered = true;
      console.log(`[LEAD NOTIFICATION] Email successfully delivered via SMTP to ${RECIPIENT_EMAIL}`);
    } catch (smtpErr) {
      console.error("[LEAD NOTIFICATION] SMTP delivery error:", smtpErr);
    }
  }

  // 2. Try Resend API
  if (!emailDelivered && RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Robopulse Leads <leads@robopulseintelligence.com>",
          to: [RECIPIENT_EMAIL],
          reply_to: data.email,
          subject: `New Institutional Lead: ${data.name} (${data.organization || data.city || "Website Inquiry"})`,
          html: htmlContent,
        }),
      });
      if (response.ok) {
        emailDelivered = true;
        console.log(`[LEAD NOTIFICATION] Email sent via Resend to ${RECIPIENT_EMAIL}`);
      } else {
        const errorText = await response.text();
        console.warn(`[LEAD NOTIFICATION] Resend responded status ${response.status}:`, errorText);
      }
    } catch (err) {
      console.error("[LEAD NOTIFICATION] Resend email send error:", err);
    }
  }

  // 3. Try SendGrid API
  if (!emailDelivered && SENDGRID_API_KEY) {
    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: RECIPIENT_EMAIL }] }],
          from: { email: "leads@robopulseintelligence.com", name: "Robopulse Intelligence" },
          reply_to: { email: data.email, name: data.name },
          subject: `New Institutional Lead: ${data.name} - ${data.requirement || "Enquiry"}`,
          content: [
            {
              type: "text/html",
              value: htmlContent,
            },
          ],
        }),
      });
      if (response.ok) {
        emailDelivered = true;
        console.log(`[LEAD NOTIFICATION] Email sent via SendGrid to ${RECIPIENT_EMAIL}`);
      } else {
        console.warn(`[LEAD NOTIFICATION] SendGrid returned status ${response.status}`);
      }
    } catch (err) {
      console.error("[LEAD NOTIFICATION] SendGrid send error:", err);
    }
  }

  // 4. Try Webhook / Google Apps Script
  if (NOTIFICATION_WEBHOOK_URL) {
    try {
      const res = await fetch(NOTIFICATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadRecord),
      });
      if (res.ok) {
        console.log(`[LEAD NOTIFICATION] Webhook triggered successfully to ${NOTIFICATION_WEBHOOK_URL}`);
      }
    } catch (err) {
      console.warn("[LEAD NOTIFICATION] Webhook delivery notice:", err);
    }
  }

  return {
    success: true,
    emailDelivered,
    message: `ENQUIRY TRANSMITTED // Details forwarded to ${RECIPIENT_EMAIL}. Our team will contact you shortly.`,
  };
}
