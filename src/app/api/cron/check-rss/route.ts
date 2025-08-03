import { getSubscribers } from "@/apis/supabase";
import blogs from "@/data/blogs.json";
import { fetchTodayArticles } from "./_utils/articles";
import { sendEmail } from "@/lib/email";
import EmailTemplate from "./_components/EmailTemplate";

export const dynamic = "force-dynamic";

const checkRss = async () => {
  const subscribers = await getSubscribers();

  const todayArticles = await Promise.all(
    blogs.map(async (blog) => {
      try {
        return await fetchTodayArticles(blog);
      } catch (e) {
        console.error(`Failed to fetch articles for ${blog.name}: ${e}`);
        return [];
      }
    })
  ).then((articles) => articles.flat());

  for (const subscriber of subscribers) {
    const targetArticles = todayArticles.filter(
      (article) =>
        subscriber.subscribedBlogIds?.includes(article.blogName) ?? false
    );

    try {
      return await sendEmail({
        to: subscriber.email,
        subject: "[TechMail] 구독한 블로그 새 글 알림",
        react: EmailTemplate({ targetArticles }),
      });
    } catch (e) {
      console.error(`Failed to send email to ${subscriber.email}: ${e}`);
      continue;
    }
  }
};

export async function GET() {
  try {
    const result = await checkRss();
    return Response.json({ inserted: result });
  } catch (error) {
    console.error(`Failed to check RSS: ${error}`);
    return Response.json({ error }, { status: 500 });
  }
}
