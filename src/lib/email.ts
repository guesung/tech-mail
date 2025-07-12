import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailParams) {
  const sender = from || process.env.FROM_EMAIL;
  if (!sender) throw new Error("FROM_EMAIL is not set");
  return resend.emails.send({
    from: sender,
    to,
    subject,
    html,
  });
}
