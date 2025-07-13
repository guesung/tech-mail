export interface Blog {
  id: string;
  name: string;
  rssUrl: string;
  websiteUrl?: string;
  description?: string;
  category?: string[];
  thumbnailUrl?: string;
}

export interface Article {
  blogId: string;
  title: string;
  url: string;
  description?: string;
  author?: string;
  publishedAt: string;
}
