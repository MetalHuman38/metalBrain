import { IEmailService } from ".";
import mailTransport from "./nodemailer.js";
import smtpENV from "../loader/config/smpt.js";

export class EmailService implements IEmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const mailOptions = {
      from: smtpENV.SMTP_USER,
      to,
      subject,
      html: body,
    };

    await mailTransport.sendMail(mailOptions);
    console.log(
      `Sending email to ${to} with subject: ${subject} and body: ${body}`
    );
  }
}

export default EmailService;
