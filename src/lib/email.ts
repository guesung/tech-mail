import { CreateEmailOptions, Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(params: CreateEmailOptions) {
  try {
    return resend.emails.send(params);
  } catch (e) {
    console.error(`Failed to send email to ${params.to}: ${e}`);
    return null;
  }
}
