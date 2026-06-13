import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { builtInPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/videos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/brands`, changeFrequency: "monthly", priority: 0.5 },
  ];

  for (const post of builtInPosts) {
    pages.push({
      url: `${site.url}/blog/${post.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return pages;
}
