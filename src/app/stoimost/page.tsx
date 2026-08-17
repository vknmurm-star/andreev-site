import type { Metadata } from "next";
import { getStoimostPage, type PriceRow } from "@/lib/pages";

export function generateMetadata(): Metadata {
  const page = getStoimostPage();
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

function Table({ title, rows }: { title: string; rows: PriceRow[] }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-xl text-ink mb-3">{title}</h2>
      <div className="rounded-lg border border-line divide-y divide-line">
        {rows.map((row, i) => (
          <div key={i} className="px-4 py-3 flex flex-col sm:flex-row sm:items-start sm:gap-6">
            <span className="text-text text-sm sm:flex-1 sm:min-w-0">{row.service}</span>
            <span className="font-medium text-sm sm:text-right shrink-0 sm:max-w-[45%] mt-1 sm:mt-0">
              {row.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const page = getStoimostPage();
  if (!page) return null;

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl text-ink mb-8">{page.title}</h1>

      {page.groups.map((group) => (
        <Table key={group.title} title={group.title} rows={group.rows} />
      ))}

      <p className="text-sm text-text-muted border-t border-line pt-6">
        {page.footnote}
      </p>
    </section>
  );
}
