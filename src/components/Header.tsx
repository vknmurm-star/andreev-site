import Link from "next/link";

const menu = [
  { href: "/", label: "Главная" },
  { href: "/sudebnaya-praktika", label: "Судебная практика" },
  { href: "/snyat-zapret", label: "Снять запрет на въезд" },
  { href: "/deportatsiya", label: "Отменить депортацию" },
  { href: "/proverit-zapret", label: "Проверить запрет" },
  { href: "/grazhdanstvo", label: "Гражданство" },
  { href: "/vnzh", label: "ВНЖ" },
  { href: "/rvp", label: "РВП" },
  { href: "/stoimost", label: "Стоимость услуг" },
  { href: "/kontakty", label: "Контакты" },
];

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold text-lg text-neutral-900">
          Андреев Егор
          <span className="block text-xs font-normal text-neutral-500">
            Миграционный юрист
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5 text-sm text-neutral-700">
          {menu.slice(1, 9).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-neutral-950 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href="tel:+79994702020"
          className="shrink-0 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          +7 999 470-20-20
        </a>
      </div>
    </header>
  );
}
