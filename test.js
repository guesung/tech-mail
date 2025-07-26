import Parser from "rss-parser";

async function fetchRssFeed(blog) {
  const parser = new Parser({
    headers: { Accept: "application/rss+xml" },
  });
  if (!blog.rssUrl) throw new Error("RSS URL is required");

  const feed = await parser.parseURL(blog.rssUrl);

  return (feed.items || []).map((item) => ({
    blogId: blog.id,
    title: item.title ?? "",
    url: item.link ?? "",
    description: item.contentSnippet ?? item.content ?? "",
    author: item.creator ?? item.author ?? "",
    publishedAt: item.isoDate ?? item.pubDate ?? "",
  }));
}

const naver = "https://d2.naver.com/d2.atom";
const devocean = "https://devocean.sk.com/blog/feed";

const result = await fetchRssFeed({
  id: 1,
  name: "토스",
  rssUrl: devocean,
});

console.log(result);
