import Parser from "rss-parser";

export async function fetchRssFeed(rssUrl: string) {
  const parser = new Parser({
    timeout: 10000,
    headers: {
      Accept:
        "application/rss+xml, application/xml, application/atom+xml;charset=UTF-8",
    },
  });
  if (!rssUrl) throw new Error("RSS URL is required");

  const feed = await parser.parseURL(rssUrl);

  return feed.items;
}
