import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

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

/**
 * Строит объект Article (schema.org). У статей блога сейчас нет собственных
 * обложек во frontmatter (поля image/cover/thumbnail не заведены) — пока
 * используется дефолтное изображение сайта (то же, что уже стоит в og:image
 * на всех страницах через buildMetadata), чтобы у Google был валидный `image`.
 * Если у статьи появится своя обложка (image), достаточно передать её вместо
 * дефолтной, поле уже поддерживается.
 */
export function buildArticleJsonLd({
  title,
  description,
  date,
  url,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished: date,
    dateModified: date,
    url,
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
}

export { SITE_URL, DEFAULT_OG_IMAGE };
