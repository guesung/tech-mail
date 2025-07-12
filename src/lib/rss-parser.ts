import Parser from "rss-parser";
import type { Article } from "@/types";

export async function fetchRssFeed(url: string) {
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  return feed.items.map(
    (item) =>
      ({
        blog_id: "",
        title: item.title ?? "",
        url: item.link ?? "",
        description: item.contentSnippet ?? item.content ?? "",
        author: item.creator ?? item.author ?? "",
        published_at: item.isoDate ?? item.pubDate ?? "",
        crawled_at: new Date().toISOString(),
      }) as Article
  );
}
