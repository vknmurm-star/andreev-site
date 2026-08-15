import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL || "https://andreev.an51.su";

const routes = [
  "",
  "/sudebnaya-praktika",
  "/snyat-zapret",
  "/deportatsiya",
  "/proverit-zapret",
  "/grazhdanstvo",
  "/vnzh",
  "/rvp",
  "/stoimost",
  "/kontakty",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
