import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tech-mail.shop/introduce",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://tech-mail.shop",
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
}
