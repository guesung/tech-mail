import { sendEmail } from "@/lib/email";
import { fetchRssFeed } from "@/lib/rss-parser";
import { supabase } from "@/lib/supabase";
import type { Article } from "@/types/article";
import type { Blog } from "@/types/blog";
import type { Subscriber } from "@/types/subscriber";

export const dynamic = "force-dynamic";

export const getBlogs = async (): Promise<Blog[]> => {
  const { data: blogs, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true);
  if (blogError) throw new Error(blogError.message);
  if (!blogs) throw new Error("No blogs found");
  return blogs;
};

export const getSubscribers = async (): Promise<Subscriber[]> => {
  const { data: subscribers, error: subError } = await supabase
    .from("subscribers")
    .select("*")
    .eq("is_active", true);
  if (subError) throw new Error(subError.message);
  if (!subscribers) throw new Error("No subscribers found");
  return subscribers;
};

export const checkRss = async () => {
  // const blogs = await getBlogs();
  // const subscribers = await getSubscribers();

  // let newArticles: Article[] = [];
  // for (const blog of blogs) {
  //   try {
  //     const rssArticles = await fetchRssFeed(blog.rss_url);
  //     const { data: existing, error: existError } = await supabase
  //       .from("articles")
  //       .select("url")
  //       .eq("blog_id", blog.id);
  //     if (existError) continue;

  //     const existingUrls = (existing ?? []).map((a) => a.url);
  //     const fresh = rssArticles
  //       .filter((a) => !existingUrls.includes(a.url))
  //       .map((a) => ({
  //         ...a,
  //         blog_id: blog.id,
  //       }));

  //     if (fresh.length > 0) {
  //       await supabase.from("articles").insert(fresh);
  //       newArticles.push(...fresh);
  //     }
  //   } catch (e) {
  //     continue;
  //   }
  // }

  const subscribers = await getSubscribers();
  const newArticles: Article[] = [
    {
      blog_id: "https://teamdable.github.io/techblog/feed.xml",
      published_at: new Date().toISOString(),
      crawled_at: new Date().toISOString(),
      id: "1",
      title: "test",
      url: "https://test.com",
      description: "test",
      author: "test",
    },
    {
      blog_id: "1",
      published_at: new Date().toISOString(),
      crawled_at: new Date().toISOString(),
      id: "2",
      title: "test",
      url: "https://test.com",
      description: "test",
      author: "test",
    },
  ];

  for (const sub of subscribers) {
    const targetArticles = newArticles.filter((a) =>
      sub.subscribed_blog_ids.includes(a.blog_id)
    );
    if (targetArticles.length === 0) continue;
    const html = `<h2>새 글 알림</h2><ul>${targetArticles.map((a) => `<li><a href="${a.url}">${a.title}</a></li>`).join("")}</ul>`;

    try {
      await sendEmail({
        to: sub.email,
        subject: "[TechMail] 구독한 블로그 새 글 알림",
        html,
      });
      console.log(html);
    } catch (e) {
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
