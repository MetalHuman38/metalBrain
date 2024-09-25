import { EmailTemplate } from ".";

// A more flexible EmailTemplateService
class EmailTemplateService {
  private readonly emailTemplates: EmailTemplate[] = [
    {
      id: "welcome",
      subject: "Welcome to our platform!",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1>Welcome to our platform!</h1>
          <p>Hello, {{name}}!</p>
          <p>We're excited to have you. Please click the link below to get started:</p>
          <a href="{{link}}" style="background-color: #4CAF50; color: white; padding: 10px; text-decoration: none;">Get Started</a>
        </div>`,
      placeholders: {
        name: "User",
        link: "https://example.com",
      },
    },
    {
      id: "resetPassword",
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1>Reset your password</h1>
          <p>Click the link below to reset your password:</p>
          <a href="{{link}}" style="background-color: #FF5733; color: white; padding: 10px; text-decoration: none;">Reset Password</a>
        </div>`,
      placeholders: {
        link: "https://example.com/reset-password",
        // ** add more placeholders here ** //
      },
    },
    // ** Add the new Verify Email template here **
    {
      id: "Verify Email",
      subject: "Verify your email",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1>Verify your email</h1>
          <p>Click the link below to verify your email:</p>
          <a href="{{link}}" style="background-color: #FF5733; color: white; padding: 10px; text-decoration: none;">Verify Email</a>
        </div>`,
      placeholders: {
        link: "https://metalbrain.net/verifyEmail",
        // ** add more placeholders here ** //
      },
    },
  ];

  public async getEmailTemplateById(
    id: string,
    placeholders: { [key: string]: string } = {}
  ): Promise<EmailTemplate> {
    const emailTemplate = this.emailTemplates.find(
      (template) => template.id === id
    );
    if (!emailTemplate) {
      throw new Error(`Email template with id ${id} not found`);
    }
    const customEmail = this.fillPlaceholders(emailTemplate.html, placeholders);
    return {
      ...emailTemplate,
      html: customEmail,
    };
  }

  private fillPlaceholders(
    templatehtml: string,
    placeholders: { [key: string]: string }
  ): string {
    let customEmail = templatehtml;
    for (const key in placeholders) {
      if (Object.prototype.hasOwnProperty.call(placeholders, key)) {
        const value = placeholders[key];
        const regex = new RegExp(`{{${key}}}`, "g");
        customEmail = customEmail.replace(regex, value);
      }
      return customEmail;
    }
    throw new Error("Method not implemented.");
  }
}

export default EmailTemplateService;
