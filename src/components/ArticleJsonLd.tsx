import { SITE_URL } from "@/lib/seo";
import { buildArticleJsonLd } from "@/lib/schema";

export default function ArticleJsonLd({
  title,
  description,
  date,
  slug,
  image,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string;
}) {
  const data = buildArticleJsonLd({
    title,
    description,
    date,
    url: `${SITE_URL}/sudebnaya-praktika/${slug}`,
    image,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
