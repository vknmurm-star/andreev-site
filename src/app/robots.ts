import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL || "https://andreev.an51.su";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/wp-login.php",
        "/wp-admin/",
        "/wp-content/",
        "/xmlrpc.php",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
