import { Resend } from 'resend';

/**
 * An object representing a request to send a HTML formatted email to
 * multiple recipients. Does not include CC and BCC.
 */
export type SendEmailRequest = {
  recipientEmail : string[];
  subject: string;
  html: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send bulk email via Resend.
 * @param recipientEmail, an array of email addresses to receive email
 * @param subject, the title of the email
 * @param html, the body of the email in HTML
 */
// eslint-disable-next-line import/prefer-default-export
export async function sendEmail({
  recipientEmail,
  subject,
  html,
} : SendEmailRequest) {
  try {
    const result = await resend.emails.send({
      from: 'Wonkes Market <onboarding@resend.dev>',
      to: recipientEmail,
      subject,
      html,
    });
    return { ok: true, result };
  } catch (error : any) {
    console.error('Email failed:', error);
    return { ok: false, error };
  }
}
