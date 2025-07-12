import { supabase } from "@/lib/supabase";
import { fetchRssFeed } from "@/lib/rss-parser";
import { sendEmail } from "@/lib/email";
import type { Blog } from "@/types/blog";
import type { Article } from "@/types/article";
import type { Subscriber } from "@/types/subscriber";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // 1. 모든 활성화된 블로그 조회
  const { data: blogs, error: blogError } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true);
  if (blogError)
    return NextResponse.json({ error: blogError.message }, { status: 500 });
  if (!blogs)
    return NextResponse.json({ error: "No blogs found" }, { status: 404 });

  // 2. 모든 구독자 조회
  const { data: subscribers, error: subError } = await supabase
    .from("subscribers")
    .select("*")
    .eq("is_active", true);
  if (subError)
    return NextResponse.json({ error: subError.message }, { status: 500 });
  if (!subscribers)
    return NextResponse.json(
      { error: "No subscribers found" },
      { status: 404 }
    );

  let newArticles: Article[] = [];
  // 3. 각 블로그 RSS 크롤링 및 새 글만 추출
  for (const blog of blogs as Blog[]) {
    try {
      const rssArticles = await fetchRssFeed(blog.rssUrl);
      // 이미 저장된 글 url 조회
      const { data: existing, error: existError } = await supabase
        .from("articles")
        .select("url")
        .eq("blog_id", blog.id);
      if (existError) continue;
      const existingUrls = (existing ?? []).map((a) => a.url);
      // 새 글만 필터
      const fresh = rssArticles
        .filter((a) => !existingUrls.includes(a.url))
        .map((a) => ({
          ...a,
          blog_id: blog.id,
        }));
      if (fresh.length > 0) {
        // DB에 새 글 저장
        await supabase.from("articles").insert(fresh);
        newArticles.push(...fresh);
      }
    } catch (e) {
      // 에러 발생 시 다음 블로그로
      continue;
    }
  }

  // 4. 구독자별로 새 글이 있으면 이메일 발송
  for (const sub of subscribers as Subscriber[]) {
    const targetArticles = newArticles.filter((a) =>
      sub.subscribed_blog_ids.includes(a.blog_id)
    );
    if (targetArticles.length === 0) continue;
    // 간단한 HTML 템플릿
    const html = `<h2>새 글 알림</h2><ul>${targetArticles.map((a) => `<li><a href="${a.url}">${a.title}</a></li>`).join("")}</ul>`;
    try {
      await sendEmail({
        to: sub.email,
        subject: "[TechMail] 구독한 블로그 새 글 알림",
        html,
      });
    } catch (e) {
      // 이메일 발송 실패 무시, 로깅 필요시 추가
      continue;
    }
  }

  return NextResponse.json({ inserted: newArticles.length });
}
