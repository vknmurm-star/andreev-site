import type { MetadataRoute } from "next";
import { execSync } from "child_process";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = process.env.SITE_URL || "https://andreev.an51.su";

// Для каждой статичной страницы — путь к её page.tsx и (если контент
// редактируется через Decap CMS) путь к соответствующему content/pages/*.md.
// lastmod страницы — более поздняя из дат последнего коммита этих файлов,
// а не момент сборки: иначе lastmod "прыгает" на текущую дату при каждом
// деплое, даже если контент страницы не менялся.
const routeFiles: Record<string, string[]> = {
  "": ["src/app/page.tsx", "content/pages/home.md"],
  "/sudebnaya-praktika": ["src/app/sudebnaya-praktika/page.tsx"],
  "/snyat-zapret": ["src/app/snyat-zapret/page.tsx", "content/pages/snyat-zapret.md"],
  "/deportatsiya": ["src/app/deportatsiya/page.tsx", "content/pages/deportatsiya.md"],
  "/proverit-zapret": ["src/app/proverit-zapret/page.tsx", "content/pages/proverit-zapret.md"],
  "/grazhdanstvo": ["src/app/grazhdanstvo/page.tsx", "content/pages/grazhdanstvo.md"],
  "/vnzh": ["src/app/vnzh/page.tsx", "content/pages/vnzh.md"],
  "/rvp": ["src/app/rvp/page.tsx", "content/pages/rvp.md"],
  "/stoimost": ["src/app/stoimost/page.tsx", "content/pages/stoimost.md"],
  "/kontakty": ["src/app/kontakty/page.tsx", "content/pages/kontakty.md"],
  "/kak-vybrat-advokata": ["src/app/kak-vybrat-advokata/page.tsx", "content/pages/kak-vybrat-advokata.md"],
  "/privacy": ["src/app/privacy/page.tsx"],
};

function lastCommitDate(paths: string[]): Date {
  let latest = 0;
  for (const path of paths) {
    try {
      const iso = execSync(`git log -1 --format=%aI -- ${path}`, {
        encoding: "utf8",
      }).trim();
      if (iso) {
        const time = new Date(iso).getTime();
        if (time > latest) latest = time;
      }
    } catch {
      // git недоступен (например, сборка вне репозитория) — просто
      // пропускаем этот файл, а не валим сборку целиком.
    }
  }
  // Если ни по одному файлу не удалось получить дату (git недоступен
  // вообще), лучше отдать текущий момент, чем невалидную дату эпохи.
  return latest > 0 ? new Date(latest) : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = Object.entries(routeFiles).map(([route, files]) => ({
    url: `${BASE_URL}${route}`,
    lastModified: lastCommitDate(files),
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${BASE_URL}/sudebnaya-praktika/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticEntries, ...postEntries];
}
