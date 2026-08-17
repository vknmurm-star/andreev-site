import type { Metadata } from "next";
import { marked } from "marked";
import { getPageBySlug } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import RelatedArticles from "@/components/RelatedArticles";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("deportatsiya");
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: "/deportatsiya",
  });
}

const relatedArticles = [
  { slug: "kak-otmenit-deportatsiyu-2022", title: "Как отменить депортацию из России? Какая разница между депортацией и выдворением" },
  { slug: "chto-takoe-deportatsiya-i-vydvorenie", title: "Что такое депортация и выдворение? В чём их отличие?" },
  { slug: "administrativnoe-vydvorenie-2023", title: "Административное выдворение иностранного гражданина из России" },
];

export default function Page() {
  const page = getPageBySlug("deportatsiya");
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
