import { buildFaqPageJsonLd, type FaqItem } from "@/lib/schema";

export default function FaqPageJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const data = buildFaqPageJsonLd(faqs);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
