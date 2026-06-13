import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/lf-studio/" },
      { userAgent: "GPTBot", allow: "/", disallow: "/lf-studio/" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/lf-studio/" },
      { userAgent: "anthropic-ai", allow: "/", disallow: "/lf-studio/" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/lf-studio/" },
      { userAgent: "Google-Extended", allow: "/", disallow: "/lf-studio/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
