import type { Metadata } from "next";
import Image from "next/image";
import { marked } from "marked";
import { getPageBySlug } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("kontakty");
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: "/kontakty",
  });
}

export default function Page() {
  const page = getPageBySlug("kontakty");
  let html = page ? (marked.parse(page.content, { async: false }) as string) : "";
  // marked не проставляет id заголовкам — добавляем точечно якорь для
  // ссылки с главной (блок "Когда нужна помощь миграционного юриста").
  html = html.replace(
    "<h2>Миграционный адвокат: как правильно выбрать</h2>",
    '<h2 id="kak-vybrat-advokata">Миграционный адвокат: как правильно выбрать</h2>',
  );

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="font-display text-3xl text-ink mb-8">Контакты</h1>

      <div className="grid sm:grid-cols-2 gap-8 mb-10">
        <div className="space-y-2 text-text">
          <p className="font-medium">119017, г. Москва</p>
          <p>Малая Ордынка, 5/6 стр. 4, офис 26</p>
          <p className="mt-4">
            Тел.:{" "}
            <a href="tel:+79994702020" className="text-seal underline underline-offset-4">
              +7 (999) 470-20-20
            </a>{" "}
            (в т.ч. WhatsApp)
          </p>
          <p>
            E-mail:{" "}
            <a href="mailto:AndreevZakon@mail.ru" className="text-seal underline underline-offset-4">
              AndreevZakon@mail.ru
            </a>
          </p>
        </div>
        <div className="relative aspect-square border border-line bg-paper-raised overflow-hidden">
          <Image
            src="/images/egor-andreev.jpg"
            alt="Егор Викторович Андреев"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        </div>
      </div>

      <p className="text-text-muted mb-10">
        Возможен выезд в любую точку Российской Федерации с оплатой
        командировочных расходов, а также подготовка документов для отмены
        запрета на въезд для любого суда на территории РФ.
      </p>

      <ContactForm />

      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
