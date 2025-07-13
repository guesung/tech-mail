export interface Subscriber {
  id: string;
  email: string;
  is_verified: boolean;
  is_active: boolean;
  subscribed_blog_ids: string[];
  created_at: string;
  updated_at: string;
}

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
