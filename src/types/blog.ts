export interface Blog {
  id: number;
  name: string;
  url: string;
  logo: string;
  rssUrl: string;
}

export interface Article {
  blogId: Blog["id"];
  title: string;
  url: string;
  description?: string;
  author?: string;
  publishedAt: string;
}
