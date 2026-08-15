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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Миграционный юрист Егор Викторович Андреев
          </h1>
          <p className="mt-4 text-neutral-600 text-lg">
            Снятие запрета на въезд, отмена депортации и выдворения,
            оформление РВП, ВНЖ и гражданства России. Более 10 лет практики
            в Москве.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="tel:+79994702020"
              className="rounded-md bg-neutral-900 px-5 py-3 text-white font-medium hover:bg-neutral-700"
            >
              Позвонить
            </a>
            <Link
              href="/kontakty"
              className="rounded-md border border-neutral-300 px-5 py-3 font-medium hover:bg-neutral-50"
            >
              Написать
            </Link>
          </div>
        </div>
        <div className="aspect-video rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
          [ видео urist-long.mp4 ]
        </div>
      </section>

      {/* Услуги */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Услуги</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block rounded-lg border border-neutral-200 p-5 hover:border-neutral-400 transition-colors"
            >
              <h3 className="font-medium mb-2">{s.title}</h3>
              <p className="text-sm text-neutral-600">{s.text}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Компетенции */}
      <section className="bg-neutral-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-6">Компетенции</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-neutral-700">
            {[
              "Представление интересов иностранцев в судах РФ и за границей",
              "Оформление РВП, ВНЖ, гражданства России",
              "Снятие установленного запрета на въезд",
              "Отмена/обжалование выдворения",
              "Отмена депортации",
              "Оспаривание действий отдела миграции МВД в суде",
              "Сопровождение при оформлении разрешения на трудоустройство",
              "Представление интересов в кассации, апелляции, Верховном Суде РФ",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <span className="text-neutral-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Оплата */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Условия оплаты</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            ["30%", "При подписании договора"],
            ["30%", "За 5 дней до первого судебного заседания"],
            ["40%", "После получения судебного решения"],
          ].map(([pct, desc]) => (
            <div
              key={desc}
              className="rounded-lg border border-neutral-200 p-5"
            >
              <p className="text-2xl font-semibold">{pct}</p>
              <p className="text-sm text-neutral-600 mt-1">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-neutral-500 mt-4">
          Возможен вариант «всё под ключ»: один платёж, включающий все
          расходы до вынесения решения суда.
        </p>
      </section>

      {/* Типовые ситуации */}
      <section className="bg-neutral-50 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold mb-6">
            Когда нужна помощь миграционного юриста
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {situations.map((s) => (
              <div key={s.title} className="rounded-lg bg-white p-5 border border-neutral-200">
                <h3 className="font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-neutral-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">Контакты</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-2 text-neutral-700">
            <p>119017, г. Москва, Малая Ордынка, 5/6 стр. 4, офис 26</p>
            <p>
              Тел.:{" "}
              <a href="tel:+79994702020" className="underline">
                +7 (999) 470-20-20
              </a>{" "}
              (в т.ч. WhatsApp)
            </p>
            <Link
              href="/kontakty"
              className="inline-block mt-3 text-sm underline text-neutral-600"
            >
              Форма обратной связи →
            </Link>
          </div>
          <div className="aspect-[4/3] rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
            [ фото + ссылка на YouTube-канал ]
          </div>
        </div>
      </section>
    </>
  );
}
