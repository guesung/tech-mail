import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  from?: string;
  react: React.ReactNode;
}

export async function sendEmail({ to, subject, react, from }: SendEmailParams) {
  const sender = from || process.env.NEXT_PUBLIC_FROM_EMAIL;
  if (!sender) throw new Error("FROM_EMAIL is not set");
  return resend.emails.send({
    from: sender,
    to,
    subject,
    react,
  });
}
