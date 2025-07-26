import blogs from "@/data/blogs.json";

export type Blog = (typeof blogs)[number];

export interface Article {
  blogName: string;
  title: string;
  url: string;
  description?: string;
  author?: string;
  publishedAt: string;
}
