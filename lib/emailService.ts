import nodemailer from "nodemailer";

const emailUser = process.env.GMAIL_EMAIL;
const emailPass = process.env.GMAIL_APP_PASSWORD;

if (!emailUser || !emailPass) {
  throw new Error("Missing GMAIL_EMAIL or GMAIL_APP_PASSWORD env variables");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export async function sendVerificationCode(email: string, code: string) {
  try {
    await transporter.sendMail({
      from: `DRA Projects <${emailUser}>`,
      to: email,
      subject: "Email Verification - DRA Projects",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Your verification code is:</p>
          <div style="background: #FFB800; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #000; margin: 0; letter-spacing: 5px;">${code}</h1>
          </div>
          <p style="color: #666;">This code will expire in 10 minutes.</p>
          <p style="color: #999; font-size: 12px;">Do not share this code with anyone.</p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Failed to send verification email");
  }
}
