import BLOGS from "../src/data/blogs.json";
import * as cheerio from "cheerio";
import fs from "fs";

console.log(BLOGS);

async function fetchOgImage(websiteUrl: string) {
  try {
    const response = await fetch(websiteUrl);
    const html = await response.text();
    const $ = cheerio.load(html);

    return (
      $('meta[property="og:image"]').attr("content") ??
      $('meta[name="twitter:image"]').attr("content") ??
      $('meta[property="og:image:url"]').attr("content") ??
      $('meta[property="og:image:secure_url"]').attr("href") ??
      $('link[rel="icon"][type="image/svg+xml"]').attr("href") ??
      $('link[rel="apple-touch-icon"]').attr("href") ??
      $('link[rel="shortcut icon"]').attr("href") ??
      $('link[rel="icon"]').attr("href") ??
      $('link[rel="apple-touch-icon-precomposed"]').attr("href") ??
      `${websiteUrl}/favicon.ico` ??
      null
    );
  } catch (error) {
    console.error(`Failed to fetch ${websiteUrl}:`, error);
    return null;
  }
}

async function updateBlogsWithOgImages() {
  const updatedBlogs = [];

  for (const blog of BLOGS) {
    const ogImage = await fetchOgImage(blog.websiteUrl ?? "");
    updatedBlogs.push({
      ...blog,
      ogImage,
    });
  }

  fs.writeFileSync(
    "./src/data/blogs-with-images.json",
    JSON.stringify(updatedBlogs, null, 2)
  );
}

updateBlogsWithOgImages();
