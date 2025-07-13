import { getSubscribers } from "@/apis/supabase";
import blogs from "@/data/blogs-with-images.json";
import { sendEmail } from "@/lib/email";
import { fetchRssFeed } from "@/lib/rss-parser";

export const dynamic = "force-dynamic";

const checkRss = async () => {
  const subscribers = await getSubscribers();

  const todayArticles = await Promise.all(
    blogs.map(async (blog) => {
      try {
        const rssArticles = await fetchRssFeed(blog);
        return rssArticles.filter((article) => {
          const publishedAt = new Date(article.publishedAt);
          const today = new Date("2024-06-14");
          return (
            publishedAt.toLocaleDateString() === today.toLocaleDateString()
          );
        });
      } catch (e) {
        console.log(e);
        return [];
      }
    })
  ).then((articles) => articles.flat());

  for (const sub of subscribers) {
    console.log(sub.subscribed_blog_ids, todayArticles);
    const targetArticles = todayArticles.filter((article) =>
      sub.subscribed_blog_ids.includes(article.blogId)
    );

    if (targetArticles.length === 0) continue;

    const html = `<h2>새 글 알림</h2><ul>${targetArticles.map((a) => `<li><a href="${a.url}">${a.title}</a></li>`).join("")}</ul>`;

    try {
      const result = await sendEmail({
        to: sub.email,
        subject: "[TechMail] 구독한 블로그 새 글 알림",
        html,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
      continue;
    }
  }
};

export async function GET() {
  try {
    const result = await checkRss();
    return Response.json({ inserted: result });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
