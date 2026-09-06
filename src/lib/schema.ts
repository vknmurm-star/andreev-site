import { SITE_URL } from "@/lib/seo";

export type FaqItem = {
  question: string;
  answer: string;
};

export type HowToStep = {
  name: string;
  text: string;
};

/**
 * Строит объект FAQPage (schema.org) из списка вопрос-ответ.
 * Используй один и тот же массив FaqItem[] и для видимого блока на странице,
 * и для этой схемы — иначе разметка разойдётся с текстом при следующей правке.
 */
export function buildFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Строит объект HowTo (schema.org) из списка шагов.
 * Шаги должны браться из того же источника (frontmatter статьи), что и
 * видимый текст — не дублируй их вручную в коде компонента.
 */
export function buildHowToJsonLd({
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
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url,
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
    })),
  };
}

export { SITE_URL };
