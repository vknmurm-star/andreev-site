import Link from "next/link";

export default function RelatedArticles({
  items,
}: {
  items: { slug: string; title: string }[];
}) {
  return (
    <div className="not-prose mt-10 pt-8 border-t border-line">
      <p className="eyebrow mb-3">Похожие статьи</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/sudebnaya-praktika/${item.slug}`}
              className="text-sm text-seal underline underline-offset-4 hover:text-brass-deep"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
