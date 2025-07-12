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
