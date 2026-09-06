import { buildHowToJsonLd, type HowToStep } from "@/lib/schema";

export default function HowToJsonLd({
  name,
  description,
  url,
  steps,
}: {
  name: string;
  description: string;
  url: string;
  steps: HowToStep[];
}) {
  const data = buildHowToJsonLd({ name, description, url, steps });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
