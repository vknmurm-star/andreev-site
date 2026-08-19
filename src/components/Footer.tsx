import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24">
      <div className="letterhead-rule" style={{ borderColor: "var(--line)" }} />
      <div className="mx-auto max-w-6xl px-4 py-8 text-[13px] text-text-muted flex flex-col items-center text-center sm:flex-row sm:justify-center sm:text-left gap-4 sm:gap-10">
        <p>© {new Date().getFullYear()} Андреев Егор Викторович</p>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
          <Link href="/privacy" className="hover:text-seal transition-colors">
            Политика конфиденциальности
          </Link>
          <Link href="/kontakty" className="hover:text-seal transition-colors">
            Контакты
          </Link>
        </div>
      </div>
    </footer>
  );
}
