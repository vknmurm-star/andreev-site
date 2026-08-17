import type { Metadata } from "next";
import { marked } from "marked";
import { getPageBySlug } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import RelatedArticles from "@/components/RelatedArticles";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("grazhdanstvo");
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: "/grazhdanstvo",
  });
}

const relatedArticles = [
  { slug: "repatriatsiya-2026", title: "Статус репатриация / репатриант в РФ в 2026 году" },
  { slug: "prekrashenie-grazhdanstva-2025", title: "Правовые рамки прекращения гражданства РФ в 2025 году" },
  { slug: "pravilo-prebyvaniya-2025", title: "Правило пребывания иностранных граждан в России РФ" },
];

export default function Page() {
  const page = getPageBySlug("grazhdanstvo");
  if (!page) return null;
  const html = marked.parse(page.content, { async: false }) as string;

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 prose">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <RelatedArticles items={relatedArticles} />
    </article>
  );
}
