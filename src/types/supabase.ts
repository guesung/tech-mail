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
  category?: string;
  logo_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

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
