"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });

      const json = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error || "Не удалось отправить заявку. Попробуйте позже.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-md mb-14 rounded-lg border border-line bg-paper-raised px-4 py-6">
        <p className="font-medium text-ink mb-1">Заявка отправлена</p>
        <p className="text-sm text-text-muted">
          Спасибо! Мы свяжемся с вами в ближайшее время.
        </p>
      </div>
    );
  }

  return (
    <form className="grid gap-4 max-w-md mb-14" onSubmit={handleSubmit}>
      {/* Honeypot: скрыто от людей, боты часто заполняют все поля подряд */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div>
        <label className="block text-sm text-text-muted mb-1">Ваше имя*</label>
        <input
          name="name"
          className="w-full rounded-none border border-line bg-paper-raised px-3 py-2 focus:outline-none focus:border-ink"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-text-muted mb-1">Ваш e-mail*</label>
        <input
          name="email"
          type="email"
          className="w-full rounded-none border border-line bg-paper-raised px-3 py-2 focus:outline-none focus:border-ink"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-text-muted mb-1">Ваш телефон*</label>
        <input
          name="phone"
          className="w-full rounded-none border border-line bg-paper-raised px-3 py-2 focus:outline-none focus:border-ink"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-text-muted mb-1">Сообщение</label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-none border border-line bg-paper-raised px-3 py-2 focus:outline-none focus:border-ink"
        />
      </div>
      <label className="flex items-start gap-2 text-xs text-text-muted">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        Я даю согласие на обработку моих персональных данных в соответствии
        с <a href="/privacy" className="text-seal underline underline-offset-4">политикой конфиденциальности</a>.
      </label>

      {status === "error" && (
        <p className="text-sm text-seal">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-none bg-ink text-paper px-6 py-3 font-medium hover:bg-seal transition-colors w-fit disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Отправка…" : "Отправить"}
      </button>
    </form>
  );
}
