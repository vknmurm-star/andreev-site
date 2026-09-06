import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/privacy-policy/",
        destination: "/privacy",
        permanent: true,
      },
      // Устранение каннибализации ключевых слов: статьи блога — дословные
      // копии флагманских сервисных страниц или дубли внутри блога.
      {
        source: "/sudebnaya-praktika/kak-poluchit-rvp-2022",
        destination: "/rvp",
        permanent: true,
      },
      {
        source: "/sudebnaya-praktika/kak-poluchit-vnzh-2022",
        destination: "/vnzh",
        permanent: true,
      },
      {
        source: "/sudebnaya-praktika/kak-otmenit-deportatsiyu-2022",
        destination: "/deportatsiya",
        permanent: true,
      },
      {
        source: "/sudebnaya-praktika/instruktsiya-kak-snyat-zapret-2022",
        destination: "/sudebnaya-praktika/protsess-snyatiya-zapreta",
        permanent: true,
      },
      {
        source: "/sudebnaya-praktika/poryadok-otmeny-zapreta-2022",
        destination: "/sudebnaya-praktika/protsess-snyatiya-zapreta",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
