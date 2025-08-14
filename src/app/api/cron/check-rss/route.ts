import { getSubscribers } from "@/apis/supabase";
import blogs from "@/data/blogs.json";
import { fetchTodayArticles } from "./_utils/articles";
import { sendEmail } from "@/lib/email";
import EmailTemplate from "./_components/EmailTemplate";
import { Article } from "@/types";

export const dynamic = "force-dynamic";

const sendDailyArticleEmails = async () => {
  const subscribers = await getSubscribers();
  const todayArticles: Article[] = [];

  for (const blog of blogs) {
    if (!blog.show) continue;
    const articles = await fetchTodayArticles(blog);
    todayArticles.push(...articles);
  }

  if (todayArticles.length === 0) return;

  for (const subscriber of subscribers) {
    const targetArticles = todayArticles.filter(
      (article) =>
        subscriber.subscribedBlogIds?.includes(article.blogName) ?? false
    );

    await sendEmail({
      from: process.env.NEXT_PUBLIC_FROM_EMAIL!,
      to: subscriber.email,
      subject: "[TechMail] 구독한 블로그 새 글 알림",
      react: EmailTemplate({ targetArticles }),
    });
  }
};

export async function GET() {
  try {
    const result = await sendDailyArticleEmails();
    return Response.json({ inserted: result });
  } catch (error) {
    console.error(`Failed to check RSS: ${error}`);
    return Response.json({ error }, { status: 500 });
  }
}
