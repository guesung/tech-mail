import Parser from "rss-parser";

export async function fetchRssFeed(rssUrl: string) {
  const parser = new Parser({
    headers: { Accept: "application/rss+xml" },
  });
  if (!rssUrl) throw new Error("RSS URL is required");

  const feed = await parser.parseURL(rssUrl);

  return feed.items;
}
