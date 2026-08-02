import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/technology`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
