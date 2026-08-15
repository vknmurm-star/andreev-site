import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600 flex flex-col sm:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} AndreevEgor.ru. Все права защищены.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-neutral-900">
            Политика конфиденциальности
          </Link>
          <Link href="/kontakty" className="hover:text-neutral-900">
            Контакты
          </Link>
        </div>
      </div>
    </footer>
  );
}
