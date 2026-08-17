import Link from "next/link";
import Image from "next/image";

export default function AuthorBio() {
  return (
    <div className="not-prose mt-12 pt-8 border-t border-line flex gap-4 items-start">
      <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden border border-line">
        <Image
          src="/images/egor-andreev.jpg"
          alt="Егор Викторович Андреев"
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div>
        <p className="font-medium text-ink">Егор Викторович Андреев</p>
        <p className="text-sm text-text-muted">
          Миграционный юрист, опыт работы более 10 лет. Специализация —
          снятие запрета на въезд, отмена депортации и выдворения,
          оформление РВП, ВНЖ и гражданства РФ.
        </p>
        <Link
          href="/kontakty"
          className="text-sm text-seal underline underline-offset-4 mt-1 inline-block"
        >
          Задать вопрос →
        </Link>
      </div>
    </div>
  );
}
