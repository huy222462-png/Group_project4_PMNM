import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 🧪 TEST MODE: Set to true để test mà không cần Gmail
const TEST_MODE = process.env.EMAIL_TEST_MODE === "true";

console.log(`📧 Email Service Mode: ${TEST_MODE ? 'TEST (console only)' : 'PRODUCTION (sending real emails)'}`);
console.log(`📧 Email Configuration:`, {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  user: process.env.EMAIL_USER ? '***' + process.env.EMAIL_USER.slice(-10) : 'NOT SET',
  testMode: TEST_MODE
});

// ✅ Cấu hình Nodemailer với Gmail SMTP
let transporter;

if (!TEST_MODE) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Email Gmail của bạn
      pass: process.env.EMAIL_PASS, // App Password từ Gmail
    },
    tls: {
      rejectUnauthorized: false // Accept self-signed certificates
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000
  });
  
  // Verify transporter on startup
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Email transporter verification failed:", error);
    } else {
      console.log("✅ Email server is ready to send messages");
    }
  });
}

// ✅ Gửi email reset password
export const sendPasswordResetEmail = async (email, resetToken) => {
  // Use production URL from environment variable, fallback to localhost for dev
  const frontendUrl = process.env.CLIENT_URL?.split(',')[0] || 'http://localhost:3000';
  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

  // 🧪 TEST MODE: Chỉ log ra console, không gửi email thật
  if (TEST_MODE) {
    console.log("\n" + "=".repeat(70));
    console.log("🧪 TEST MODE - Email would be sent:");
    console.log("=".repeat(70));
    console.log(`📧 To: ${email}`);
    console.log(`🔗 Reset Link: ${resetUrl}`);
    console.log(`⏰ Token: ${resetToken}`);
    console.log(`⌛ Expires: 1 hour`);
    console.log("=".repeat(70) + "\n");
    return { success: true };
  }

  // ✅ PRODUCTION MODE: Gửi email thật
  const mailOptions = {
    from: `"PMNM User Management" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Password Reset Request - PMNM System",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">🔐 Password Reset</h1>
                    <p style="margin: 10px 0 0 0; color: #f0f0f0; font-size: 14px;">PMNM User Management System</p>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin: 0 0 20px 0; color: #333; font-size: 22px;">Hi there! 👋</h2>
                    <p style="margin: 0 0 20px 0; color: #555; font-size: 16px; line-height: 1.6;">
                      We received a request to reset your password. Click the button below to create a new password:
                    </p>
                    
                    <!-- Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="padding: 20px 0;">
                          <a href="${resetUrl}" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 30px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s;">
                            Reset My Password
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Alternative Link -->
                    <p style="margin: 20px 0; color: #888; font-size: 13px; line-height: 1.6;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>
                    <p style="margin: 0 0 20px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #667eea; border-radius: 4px; word-break: break-all; font-size: 13px; color: #667eea;">
                      ${resetUrl}
                    </p>
                    
                    <!-- Warning -->
                    <div style="margin: 30px 0; padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                      <p style="margin: 0 0 10px 0; color: #856404; font-size: 14px; font-weight: 600;">⚠️ Important:</p>
                      <ul style="margin: 0; padding-left: 20px; color: #856404; font-size: 13px; line-height: 1.6;">
                        <li>This link will expire in <strong>1 hour</strong></li>
                        <li>If you didn't request this, please ignore this email</li>
                        <li>Your password will remain unchanged</li>
                      </ul>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 13px;">
                      This is an automated message from <strong>PMNM User Management System</strong>
                    </p>
                    <p style="margin: 0; color: #adb5bd; font-size: 12px;">
                      Please do not reply to this email
                    </p>
                    <p style="margin: 15px 0 0 0; color: #adb5bd; font-size: 11px;">
                      © 2024 PMNM Team. All rights reserved.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
