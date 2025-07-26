import Parser from "rss-parser";
import type { Article, Blog } from "@/types";

export async function fetchRssFeed(blog: Blog) {
  const parser = new Parser({
    headers: { Accept: "application/rss+xml" },
  });
  if (!blog.rssUrl) throw new Error("RSS URL is required");

  const feed = await parser.parseURL(blog.rssUrl);

  return (feed.items || []).map(
    (item) =>
      ({
        blogName: blog.name,
        title: item.title ?? "",
        url: item.link ?? "",
        description: item.contentSnippet ?? item.content ?? "",
        author: item.creator ?? item.author ?? "",
        publishedAt: item.isoDate ?? item.pubDate ?? "",
      }) as Article
  );
}
