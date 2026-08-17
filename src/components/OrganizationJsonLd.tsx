import { SITE_URL } from "@/lib/seo";

export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Андреев Егор Викторович — миграционный юрист",
    image: `${SITE_URL}/images/egor-andreev.jpg`,
    url: SITE_URL,
    telephone: "+7-999-470-20-20",
    priceRange: "от 5000 ₽",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Малая Ордынка, 5/6 стр. 4, офис 26",
      addressLocality: "Москва",
      postalCode: "119017",
      addressCountry: "RU",
    },
    areaServed: "RU",
    knowsAbout: [
      "Миграционное право",
      "Снятие запрета на въезд",
      "Отмена депортации и выдворения",
      "РВП",
      "ВНЖ",
      "Гражданство РФ",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
