import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getHomePage } from "@/lib/pages";

export function generateMetadata(): Metadata {
  const page = getHomePage();
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="letterhead-rule w-12 mb-2" style={{ borderColor: "var(--brass)" }} />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function phoneHref(display: string) {
  return "tel:" + display.replace(/[^\d+]/g, "");
}

export default function Home() {
  const page = getHomePage();
  if (!page) return null;
  const tel = phoneHref(page.hero.phoneDisplay);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-8 grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <p className="eyebrow mb-3">{page.hero.eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] text-ink">
            {page.hero.headingLine1}
            <br />
            {page.hero.headingLine2}
          </h1>
          <p className="mt-5 text-text-muted text-lg max-w-md leading-relaxed">
            {page.hero.subtitle}
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href={tel}
              className="rounded-none bg-ink px-6 py-3 text-paper font-medium hover:bg-seal transition-colors"
            >
              Позвонить
            </a>
            <Link
              href="/kontakty"
              className="rounded-none border border-ink px-6 py-3 font-medium text-ink hover:border-seal hover:text-seal transition-colors"
            >
              Написать
            </Link>
          </div>
          <p className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-2xl text-ink">{page.hero.statNumber}</span>
            <span className="eyebrow">{page.hero.statLabel}</span>
          </p>
        </div>
        <div className="flex justify-start">
          <div className="relative w-72 sm:w-80">
            <div className="relative aspect-[4/5] bg-paper-raised border border-line overflow-hidden">
              <Image
                src="/images/egor-andreev.jpg"
                alt="Егор Викторович Андреев"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 288px, 320px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Видео */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="relative aspect-video bg-paper-raised border border-line overflow-hidden">
          <video
            src="/videos/urist-intro.mp4"
            controls
            preload="metadata"
            className="w-full h-full object-cover"
          >
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        </div>
      </section>

      {/* Услуги */}
      <section className="mx-auto max-w-6xl px-4 pt-2 pb-14">
        <SectionLabel>{page.servicesLabel}</SectionLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {page.services.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              style={{ animationDelay: `${i * 0.1}s` }}
              className="card-fade-in block border border-transparent bg-paper-raised p-6 transition-all duration-[250ms] ease-[ease] hover:-translate-y-1 hover:border-brass hover:bg-paper hover:shadow-lg"
            >
              <h3 className="font-display text-lg text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{s.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Компетенции */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionLabel>{page.competenciesLabel}</SectionLabel>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {page.competencies.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-text">
              <span className="text-brass">•</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Оплата */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionLabel>{page.paymentLabel}</SectionLabel>
        <div className="grid sm:grid-cols-3 gap-px bg-line">
          {page.paymentTerms.map((term) => (
            <div key={term.description} className="bg-paper-raised p-6">
              <p className="font-display text-3xl text-ink">{term.percent}</p>
              <p className="text-sm text-text-muted mt-2">{term.description}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-text-muted mt-5 max-w-xl">{page.paymentNote}</p>
      </section>

      {/* Типовые ситуации */}
      <section className="py-14" style={{ background: "var(--paper-raised)" }}>
        <div className="mx-auto max-w-6xl px-4">
          <SectionLabel>{page.situationsLabel}</SectionLabel>
          <div className="grid sm:grid-cols-3 gap-8 mt-6">
            {page.situations.map((s) => (
              <div key={s.title}>
                <h3 className="font-display text-lg text-ink mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionLabel>{page.contactsLabel}</SectionLabel>
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 items-center">
          <div className="space-y-2 text-text">
            <p className="font-display text-lg">
              {page.address}
            </p>
            <p className="text-text-muted">
              Тел.:{" "}
              <a href={tel} className="text-seal hover:underline">
                {page.hero.phoneDisplay}
              </a>{" "}
              (в том числе WhatsApp)
            </p>
            <Link
              href="/kontakty"
              className="inline-block mt-3 text-sm text-brass-deep hover:text-seal underline underline-offset-4"
            >
              Форма обратной связи →
            </Link>
          </div>
          <div className="relative w-full aspect-[16/9] bg-paper-raised border border-line overflow-hidden">
            <Image
              src="/images/kontakty-banner.jpg"
              alt="Миграционный юрист Егор Викторович Андреев, тел. 8-999-470-20-20"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
          </div>
        </div>
      </section>
    </>
  );
}
