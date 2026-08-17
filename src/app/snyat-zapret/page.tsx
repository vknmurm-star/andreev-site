import type { Metadata } from "next";
import Link from "next/link";
import { marked } from "marked";
import { getPageBySlug } from "@/lib/pages";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("snyat-zapret");
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

export default function Page() {
  const page = getPageBySlug("snyat-zapret");
  if (!page) return null;
  const html = marked.parse(page.content, { async: false }) as string;

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 prose">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <div className="not-prose mt-10 rounded-lg border border-line p-6">
        <p className="font-medium mb-2">
          119017, г. Москва, Малая Ордынка, 5/6 стр. 4, офис 26
        </p>
        <p className="text-sm text-text-muted mb-4">
          +7 (999) 470-20-20 (в том числе WhatsApp)
        </p>
        <Link href="/kontakty" className="text-sm underline">
          Написать письмо →
        </Link>
      </div>
    </article>
  );
}
