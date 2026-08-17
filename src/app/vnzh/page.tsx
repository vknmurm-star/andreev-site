import type { Metadata } from "next";
import { marked } from "marked";
import { getPageBySlug } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import RelatedArticles from "@/components/RelatedArticles";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("vnzh");
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: "/vnzh",
  });
}

const relatedArticles = [
  { slug: "kak-poluchit-vnzh-2023", title: "Как получить вид на жительство ВНЖ в 2023 году" },
  { slug: "kto-imeet-pravo-poluchit-vnzh-2023", title: "Кто имеет право получить ВНЖ в 2023 году" },
  { slug: "prichiny-otkaza-vnzh-2023", title: "Причины отказа в выдаче ВНЖ в России 2023 год" },
];

export default function Page() {
  const page = getPageBySlug("vnzh");
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
