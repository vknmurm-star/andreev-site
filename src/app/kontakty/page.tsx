import type { Metadata } from "next";
import Image from "next/image";
import { marked } from "marked";
import { getPageBySlug } from "@/lib/pages";

export function generateMetadata(): Metadata {
  const page = getPageBySlug("kontakty");
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

export default function Page() {
  const page = getPageBySlug("kontakty");
  const html = page ? (marked.parse(page.content, { async: false }) as string) : "";

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

      <form className="grid gap-4 max-w-md mb-14">
        <div>
          <label className="block text-sm text-text-muted mb-1">Ваше имя*</label>
          <input className="w-full rounded-none border border-line bg-paper-raised px-3 py-2 focus:outline-none focus:border-ink" required />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">Ваш e-mail*</label>
          <input type="email" className="w-full rounded-none border border-line bg-paper-raised px-3 py-2 focus:outline-none focus:border-ink" required />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">Ваш телефон*</label>
          <input className="w-full rounded-none border border-line bg-paper-raised px-3 py-2 focus:outline-none focus:border-ink" required />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">Сообщение</label>
          <textarea rows={4} className="w-full rounded-none border border-line bg-paper-raised px-3 py-2 focus:outline-none focus:border-ink" />
        </div>
        <label className="flex items-start gap-2 text-xs text-text-muted">
          <input type="checkbox" required className="mt-0.5" />
          Я даю согласие на обработку моих персональных данных в соответствии
          с <a href="/privacy" className="text-seal underline underline-offset-4">политикой конфиденциальности</a>.
        </label>
        <button
          type="submit"
          className="rounded-none bg-ink text-paper px-6 py-3 font-medium hover:bg-seal transition-colors w-fit"
        >
          Отправить
        </button>
      </form>

      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
