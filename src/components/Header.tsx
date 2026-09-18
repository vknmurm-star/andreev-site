import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

const menu = [
  { href: "/sudebnaya-praktika", label: "Судебная практика" },
  { href: "/snyat-zapret", label: "Снять запрет на въезд" },
  { href: "/deportatsiya", label: "Отменить депортацию" },
  { href: "/proverit-zapret", label: "Проверить запрет" },
  { href: "/grazhdanstvo", label: "Гражданство" },
  { href: "/rvp", label: "РВП" },
  { href: "/vnzh", label: "ВНЖ" },
  { href: "/stoimost", label: "Стоимость услуг" },
];

export default function Header() {
  return (
    <header className="bg-paper sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 pt-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image
            src="/images/logo-az.png"
            alt="Миграционный юрист Егор Андреев"
            width={34}
            height={34}
            className="shrink-0"
            priority
          />
          <span className="font-display text-lg sm:text-xl leading-none truncate">
            <span className="sm:hidden text-seal">Егор Андреев</span>
            <span className="hidden sm:inline">
              <span className="text-ink-soft">Миграционный юрист </span>
              <span className="text-seal">Егор Андреев</span>
            </span>
          </span>
        </Link>
        <a
          href="tel:+79994702020"
          className="shrink-0 rounded-none border border-ink bg-ink px-3 sm:px-4 py-2 text-sm font-medium text-paper hover:bg-seal hover:border-seal transition-colors"
          aria-label="+7 999 470-20-20"
        >
          <Phone className="w-4 h-4 sm:hidden" />
          <span className="hidden sm:inline">+7 999 470-20-20</span>
        </a>
      </div>
      <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14.5px] font-medium text-ink">
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
      <div className="letterhead-rule" style={{ borderColor: "var(--line)" }} />
    </header>
  );
}
