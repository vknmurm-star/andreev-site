import Link from "next/link";

const menu = [
  { href: "/sudebnaya-praktika", label: "Судебная практика" },
  { href: "/snyat-zapret", label: "Снять запрет на въезд" },
  { href: "/deportatsiya", label: "Отменить депортацию" },
  { href: "/proverit-zapret", label: "Проверить запрет" },
  { href: "/grazhdanstvo", label: "Гражданство" },
  { href: "/vnzh", label: "ВНЖ" },
  { href: "/rvp", label: "РВП" },
  { href: "/stoimost", label: "Стоимость услуг" },
];

export default function Header() {
  return (
    <header className="bg-paper sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-3 shrink-0">
          <span className="font-display text-xl text-ink leading-none">
            Андреев Егор
          </span>
          <span className="hidden sm:inline eyebrow">Миграционный юрист</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5 text-[13px] text-ink-soft">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-seal whitespace-nowrap transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href="tel:+79994702020"
          className="shrink-0 rounded-none border border-ink bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-seal hover:border-seal transition-colors"
        >
          +7 999 470-20-20
        </a>
      </div>
      <div className="letterhead-rule" style={{ borderColor: "var(--line)" }} />
    </header>
  );
}
