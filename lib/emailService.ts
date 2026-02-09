import nodemailer from "nodemailer";

export interface EmailData {
  fullName: string;
  email: string;
  company?: string;
  message: string;
}

export interface EmailConfig {
  service: string;
  user: string;
  password: string;
  to: string;
}

export class EmailService {
  private config: EmailConfig;
  private transporter: nodemailer.Transporter;

  constructor(config?: EmailConfig) {
    this.config = config || this.getDefaultConfig();
    this.transporter = this.createTransporter();
  }

  private getDefaultConfig(): EmailConfig {
    return {
      service: "gmail",
      user: process.env.GMAIL_USER || "",
      password: process.env.GMAIL_PASSWORD || "",
      to: process.env.GMAIL_TO || process.env.GMAIL_USER || "",
    };
  }

  private createTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      service: this.config.service,
      auth: {
        user: this.config.user,
        pass: this.config.password,
      },
    });
  }

  async sendEmail(
    data: EmailData,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // Validate configuration
      if (!this.config.user || !this.config.password) {
        throw new Error("Email configuration is missing");
      }

      const firstName = data.fullName.split(" ")[0] || "";

      const mailOptions = {
        from: `"Portfolio Contact" <${this.config.user}>`,
        to: this.config.to,
        replyTo: data.email,
        subject: `New Portfolio Contact: ${data.fullName}`,
        text: this.generateTextEmail(data),
        html: this.generateHtmlEmail(data, firstName),
      };

      const emailResponse = await this.transporter.sendMail(mailOptions);

      console.log("✅ Email sent successfully:", emailResponse.messageId);

      return {
        success: true,
        messageId: emailResponse.messageId,
      };
    } catch (error) {
      console.error("❌ Email sending failed:", error);

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown email error",
      };
    }
  }

  private generateTextEmail(data: EmailData): string {
    return `
New Contact Form Submission

Name: ${data.fullName}
Email: ${data.email}
Company: ${data.company || "Not provided"}
Message: ${data.message}

This message was sent from your portfolio contact form.
    `;
  }

  private generateHtmlEmail(data: EmailData, firstName: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
        .container { background-color: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border: 1px solid #eaeaea; }
        .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: center; }
        .header h2 { margin: 0; font-size: 22px; font-weight: 600; }
        .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0; }
        .field:last-child { border-bottom: none; }
        .label { font-weight: 600; color: #555; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
        .value { color: #222; font-size: 16px; word-wrap: break-word; }
        .message-box { background-color: #f8f9fa; border-left: 4px solid #dc2626; padding: 15px; margin-top: 10px; border-radius: 4px; white-space: pre-wrap; font-size: 15px; line-height: 1.5; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; font-size: 12px; color: #666; }
        .highlight { background-color: #fef3c7; padding: 8px 12px; border-radius: 6px; margin: 5px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📧 New Portfolio Contact Submission</h2>
        </div>
        
        <div class="field">
            <div class="label">Contact Person</div>
            <div class="value highlight">${data.fullName}</div>
        </div>
        
        <div class="field">
            <div class="label">Email Address</div>
            <div class="value">
                <a href="mailto:${data.email}" style="color: #dc2626; text-decoration: none;">
                    ${data.email}
                </a>
            </div>
        </div>
        
        <div class="field">
            <div class="label">Company/Organization</div>
            <div class="value">${data.company || "<em>Not provided</em>"}</div>
        </div>
        
        <div class="field">
            <div class="label">Message</div>
            <div class="message-box">${data.message}</div>
        </div>
        
        <div class="footer">
            <p>This message was sent via your portfolio contact form at ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
            <p>You can reply directly to this email to contact ${firstName}.</p>
        </div>
    </div>
</body>
</html>
    `;
  }

  // Static method for quick usage
  static async send(
    data: EmailData,
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const service = new EmailService();
    return service.sendEmail(data);
  }
}
