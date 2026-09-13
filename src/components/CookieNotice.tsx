"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent-accepted";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    // Позиция намеренно смещена в левый нижний угол (а не во всю ширину)
    // и приподнята над нижним краем на мобильных — виджет Jivo живёт в
    // правом нижнем углу (и разворачивается там же в окно чата), z-index
    // у него выставляется динамически самим виджетом, поэтому надёжнее
    // развести баннер и чат по разным углам, чем гнаться за z-index.
    <div className="fixed left-4 right-4 bottom-20 z-50 sm:left-6 sm:right-auto sm:bottom-6 sm:w-full sm:max-w-md border border-line bg-paper-raised shadow-lg">
      <div className="px-4 py-4 flex flex-col gap-3">
        <p className="text-sm text-text-muted">
          Мы используем cookie-файлы для наилучшего представления нашего
          сайта. Продолжая использовать этот сайт, вы соглашаетесь с{" "}
          <a
            href="/privacy"
            className="text-seal underline underline-offset-4 hover:text-brass-deep"
          >
            политикой конфиденциальности
          </a>
          .
        </p>
        <button
          onClick={accept}
          className="rounded-none bg-ink text-paper px-6 py-2.5 text-sm font-medium hover:bg-seal transition-colors shrink-0 w-fit"
        >
          Хорошо
        </button>
      </div>
    </div>
  );
}
