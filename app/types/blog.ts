export interface Blog {
  id: string;
  name: string;
  rss_url: string;
  website_url?: string;
  description?: string;
  category?: string;
  logo_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
