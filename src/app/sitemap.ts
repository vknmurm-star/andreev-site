import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

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
  "/kak-vybrat-advokata",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${BASE_URL}/sudebnaya-praktika/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticEntries, ...postEntries];
}
