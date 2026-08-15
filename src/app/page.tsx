import Link from "next/link";

const services = [
  {
    href: "/snyat-zapret",
    title: "Снятие запрета на въезд",
    text: "Консультация, оценка перспектив дела, стратегия снятия запрета на въезд в Россию.",
  },
  {
    href: "/deportatsiya",
    title: "Отмена депортации и выдворения",
    text: "Поддержка в отмене депортации и выдворения законными методами.",
  },
  {
    href: "/vnzh",
    title: "ВНЖ и РВП",
    text: "Юридическое сопровождение и точное следование законодательству при оформлении.",
  },
  {
    href: "/grazhdanstvo",
    title: "Гражданство России",
    text: "Сопровождение на всех этапах натурализации.",
  },
];

const situations = [
  {
    title: "Запрет на въезд из-за нарушения режима",
    text: "Решения о запрете не всегда правомерны, есть возможность добиться справедливости.",
  },
  {
    title: "Вступление и выход из гражданства",
    text: "Сложности с РВП, ВНЖ, патентом на работу или другими документами.",
  },
  {
    title: "Трудоустройство иностранных сотрудников",
    text: "Помощь бизнесу при оформлении визового разрешения и приглашения для нерезидентов.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="letterhead-rule w-12 mb-2" style={{ borderColor: "var(--brass)" }} />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <p className="eyebrow mb-3">Адвокат по миграционному праву · Москва</p>
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] text-ink">
            Егор Викторович
            <br />
            Андреев
          </h1>
          <p className="mt-5 text-text-muted text-lg max-w-md leading-relaxed">
            Снятие запрета на въезд, отмена депортации и выдворения,
            оформление РВП, ВНЖ и гражданства России.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="tel:+79994702020"
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
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-64 sm:w-72">
            <div className="aspect-[4/5] bg-paper-raised border border-line flex items-center justify-center overflow-hidden">
              <span className="text-text-muted text-sm text-center px-6">
                [ фото Е.В. Андреева ]
              </span>
            </div>
            <div
              className="absolute -bottom-5 -left-5 w-24 h-24 bg-paper border border-brass rounded-full flex flex-col items-center justify-center text-center shadow-sm"
            >
              <span className="font-display text-xl text-ink leading-none">10+</span>
              <span className="font-mono text-[8px] tracking-wide text-text-muted mt-1">
                ЛЕТ ПРАКТИКИ
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionLabel>Услуги</SectionLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block bg-paper-raised p-6 hover:bg-paper transition-colors"
            >
              <h3 className="font-display text-lg text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{s.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Компетенции */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionLabel>Компетенции</SectionLabel>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {[
            "Представление интересов иностранцев в судах РФ и за границей",
            "Оформление РВП, ВНЖ, гражданства России",
            "Снятие установленного запрета на въезд",
            "Отмена и обжалование выдворения",
            "Отмена депортации",
            "Оспаривание действий отдела миграции МВД в суде",
            "Сопровождение при оформлении разрешения на трудоустройство",
            "Представление интересов в кассации, апелляции, Верховном Суде РФ",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-text">
              <span className="text-brass">§</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Оплата */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionLabel>Условия оплаты</SectionLabel>
        <div className="grid sm:grid-cols-3 gap-px bg-line">
          {[
            ["30%", "При подписании договора"],
            ["30%", "За 5 дней до первого судебного заседания"],
            ["40%", "После получения судебного решения"],
          ].map(([pct, desc]) => (
            <div key={desc} className="bg-paper-raised p-6">
              <p className="font-display text-3xl text-ink">{pct}</p>
              <p className="text-sm text-text-muted mt-2">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-text-muted mt-5 max-w-xl">
          Возможен вариант «всё под ключ»: один платёж, включающий все
          расходы до вынесения решения суда.
        </p>
      </section>

      {/* Типовые ситуации */}
      <section className="py-14" style={{ background: "var(--paper-raised)" }}>
        <div className="mx-auto max-w-6xl px-4">
          <SectionLabel>Когда нужна помощь миграционного юриста</SectionLabel>
          <div className="grid sm:grid-cols-3 gap-8 mt-6">
            {situations.map((s) => (
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
        <SectionLabel>Контакты</SectionLabel>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="space-y-2 text-text">
            <p className="font-display text-lg">
              119017, г. Москва, Малая Ордынка, 5/6 стр. 4, офис 26
            </p>
            <p className="text-text-muted">
              Тел.:{" "}
              <a href="tel:+79994702020" className="text-seal hover:underline">
                +7 (999) 470-20-20
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
          <div className="w-40 aspect-[4/5] bg-paper-raised border border-line flex items-center justify-center">
            <span className="text-text-muted text-xs text-center px-3">
              [ фото ]
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
