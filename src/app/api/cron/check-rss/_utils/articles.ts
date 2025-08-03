import { fetchRssFeed } from "@/lib/rss-parser";
import { Article, Blog } from "@/types";

const isSameDayInKST = (date1: string, date2: Date) => {
  const kstFormatter = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const date1KST = new Date(date1);
  const date1Formatted = kstFormatter.format(date1KST);
  const date2Formatted = kstFormatter.format(date2);

  return date1Formatted === date2Formatted;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatArticles = (blog: Blog, articles: any[]): Article[] => {
  return articles.map((article) => ({
    blogName: blog.name,
    title: article.title ?? "",
    url: article.link ?? "",
    description: article.contentSnippet ?? article.content ?? "",
    author: article.creator ?? article.author ?? "",
    publishedAt: article.isoDate ?? article.pubDate ?? "",
  }));
};

export const fetchTodayArticles = async (blog: Blog) => {
  try {
    const articles = await fetchRssFeed(blog.rssUrl);
    const formattedArticles = formatArticles(blog, articles);

    const todayArticles = formattedArticles.filter((article) => {
      const today = new Date();
      return isSameDayInKST(article.publishedAt, today);
    });

    return todayArticles;
  } catch (e) {
    console.error(`Failed to fetch articles for ${blog.name}: ${e}`);
    return [];
  }
};
