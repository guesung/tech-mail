export interface Subscriber {
  id: string;
  email: string;
  is_verified: boolean;
  is_active: boolean;
  subscribed_blog_ids: string[];
  created_at: string;
  updated_at: string;
}
