export default function Page() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-semibold mb-8">Контакты</h1>

      <div className="grid sm:grid-cols-2 gap-8 mb-10">
        <div className="space-y-2 text-neutral-700">
          <p className="font-medium">119017, г. Москва</p>
          <p>Малая Ордынка, 5/6 стр. 4, офис 26</p>
          <p className="mt-4">
            Тел.:{" "}
            <a href="tel:+79994702020" className="underline">
              +7 (999) 470-20-20
            </a>{" "}
            (в т.ч. WhatsApp)
          </p>
          <p>
            E-mail:{" "}
            <a href="mailto:AndreevZakon@mail.ru" className="underline">
              AndreevZakon@mail.ru
            </a>
          </p>
        </div>
        <div className="aspect-square rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 text-sm">
          [ фото юриста ]
        </div>
      </div>

      <p className="text-neutral-600 mb-10">
        Возможен выезд в любую точку Российской Федерации с оплатой
        командировочных расходов, а также подготовка документов для отмены
        запрета на въезд для любого суда на территории РФ.
      </p>

      <form className="grid gap-4 max-w-md mb-14">
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Ваше имя*</label>
          <input className="w-full rounded-md border border-neutral-300 px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Ваш e-mail*</label>
          <input type="email" className="w-full rounded-md border border-neutral-300 px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Ваш телефон*</label>
          <input className="w-full rounded-md border border-neutral-300 px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-neutral-600 mb-1">Сообщение</label>
          <textarea rows={4} className="w-full rounded-md border border-neutral-300 px-3 py-2" />
        </div>
        <label className="flex items-start gap-2 text-xs text-neutral-500">
          <input type="checkbox" required className="mt-0.5" />
          Я даю согласие на обработку моих персональных данных в соответствии
          с <a href="/privacy" className="underline">политикой конфиденциальности</a>.
        </label>
        <button
          type="submit"
          className="rounded-md bg-neutral-900 text-white px-5 py-3 font-medium hover:bg-neutral-700 w-fit"
        >
          Отправить
        </button>
      </form>
    </section>
  );
}
