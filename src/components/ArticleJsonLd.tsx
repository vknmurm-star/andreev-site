import { SITE_URL } from "@/lib/seo";

export default function ArticleJsonLd({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    url: `${SITE_URL}/sudebnaya-praktika/${slug}`,
    author: {
      "@type": "Person",
      name: "Егор Викторович Андреев",
      jobTitle: "Миграционный юрист",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Андреев Егор Викторович — миграционный юрист",
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
