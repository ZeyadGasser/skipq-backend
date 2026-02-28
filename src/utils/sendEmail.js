import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: `"SkipQ" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log("Email sent to", to);
  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw error;
  }
}
