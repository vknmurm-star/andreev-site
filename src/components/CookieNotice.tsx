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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <p className="text-sm text-text-muted flex-1">
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
