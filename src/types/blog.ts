export interface Blog {
  id: string;
  name: string;
  url: string;
  logo?: string;
  rssUrl?: string;
}

export interface Article {
  blogId: string;
  title: string;
  url: string;
  description?: string;
  author?: string;
  publishedAt: string;
}
