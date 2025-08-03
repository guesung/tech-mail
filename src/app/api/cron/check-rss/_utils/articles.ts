import { fetchRssFeed } from "@/lib/rss-parser";
import { Article, Blog } from "@/types";

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

    return formattedArticles.filter((article) => {
      const publishedAt = new Date(article.publishedAt);
      const today = new Date();

      return publishedAt.toLocaleDateString() === today.toLocaleDateString();
    });
  } catch (e) {
    console.error(`Failed to fetch articles for ${blog.name}: ${e}`);
    return [];
  }
};
