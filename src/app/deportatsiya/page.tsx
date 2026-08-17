import type { Metadata } from "next";
import { marked } from "marked";
import { getPageBySlug } from "@/lib/pages";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("deportatsiya");
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

export default function Page() {
  const page = getPageBySlug("deportatsiya");
  if (!page) return null;
  const html = marked.parse(page.content, { async: false }) as string;

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 prose">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
