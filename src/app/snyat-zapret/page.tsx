import type { Metadata } from "next";
import Link from "next/link";
import { marked } from "marked";
import { getPageBySlug } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import RelatedArticles from "@/components/RelatedArticles";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("snyat-zapret");
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: "/snyat-zapret",
  });
}

const relatedArticles = [
  { slug: "kak-snyat-zapret-cena-2022", title: "Как снять запрет на въезд в Россию РФ" },
  { slug: "protsess-snyatiya-zapreta", title: "Процесс снятия запрета на въезд в Россию: ключевые аспекты" },
  { slug: "dosudebny-poryadok-otmena-zapreta", title: "Досудебный порядок за 30 дней: отмена запрета на въезд в Россию РФ" },
];

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

      <RelatedArticles items={relatedArticles} />
    </article>
  );
}
