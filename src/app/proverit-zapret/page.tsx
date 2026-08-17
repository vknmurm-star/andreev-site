import type { Metadata } from "next";
import { marked } from "marked";
import { getPageBySlug } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import RelatedArticles from "@/components/RelatedArticles";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("proverit-zapret");
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: "/proverit-zapret",
  });
}

const relatedArticles = [
  { slug: "kak-proverit-zapret-mvd-2022", title: "Как проверить запрет на въезд через сайт МВД России" },
  { slug: "kak-proverit-zapret-2023-04", title: "Как проверить запрет на въезд в Россию РФ" },
  { slug: "iz-za-kakih-narusheniy-zapret-2022", title: "Из-за каких административных нарушений иностранцу запретят въезд в РФ" },
];

export default function Page() {
  const page = getPageBySlug("proverit-zapret");
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
