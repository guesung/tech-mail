export interface Article {
  id: string;
  blog_id: string;
  title: string;
  url: string;
  description?: string;
  author?: string;
  published_at: string;
  crawled_at: string;
}
