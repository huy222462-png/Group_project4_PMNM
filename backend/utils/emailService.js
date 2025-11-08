import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Cấu hình Nodemailer với Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Email Gmail của bạn
    pass: process.env.EMAIL_PASS, // App Password từ Gmail
  },
});

// ✅ Gửi email reset password
export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">This is an automated email, please do not reply.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent to:", email);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: error.message };
  }
};
