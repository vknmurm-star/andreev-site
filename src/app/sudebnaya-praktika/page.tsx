import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Судебная практика | Миграционный юрист Егор Андреев",
  description:
    "Разборы реальных дел и правовые гиды по миграционному законодательству от юриста Егора Андреева.",
  path: "/sudebnaya-praktika",
});

const serviceLinks = [
  { href: "/snyat-zapret", label: "Снять запрет" },
  { href: "/deportatsiya", label: "Отменить депортацию" },
  { href: "/proverit-zapret", label: "Проверить запрет" },
  { href: "/grazhdanstvo", label: "Гражданство" },
  { href: "/rvp", label: "РВП" },
  { href: "/vnzh", label: "ВНЖ" },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function Page() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl text-ink mb-2">Судебная практика</h1>
      <p className="text-text-muted mb-4">
        Разборы реальных дел и правовые гиды по миграционному законодательству.
      </p>
      <p className="text-sm text-text-muted mb-10">
        Также смотрите:{" "}
        {serviceLinks.map((s, i) => (
          <span key={s.href}>
            <Link href={s.href} className="text-seal underline underline-offset-4">
              {s.label}
            </Link>
            {i < serviceLinks.length - 1 && " · "}
          </span>
        ))}
      </p>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-line pb-6">
            <p className="text-xs text-brass mb-1">
              {formatDate(post.date)}
            </p>
            <h2 className="text-lg font-medium mb-2">
              <Link
                href={`/sudebnaya-praktika/${post.slug}`}
                className="hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-text-muted">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
