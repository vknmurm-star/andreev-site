import { NextResponse } from "next/server";
import { sendMail, adminEmail } from "@/lib/mailer";
import { clientIp, maybeCleanup, rateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

interface Body {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  website?: string; // honeypot — люди его не заполняют
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  maybeCleanup();

  // Rate-limit: не более 5 отправок за 10 минут с одного IP.
  const ip = clientIp(req.headers);
  const rl = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Слишком много попыток. Попробуйте позже." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 60) } },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  // Honeypot: если скрытое поле заполнено — это бот, тихо отклоняем.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();
  const consent = body.consent === true;

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Укажите имя, e-mail и телефон" },
      { status: 400 },
    );
  }
  if (!/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: "Некорректный e-mail" }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json(
      { error: "Нужно согласие на обработку персональных данных" },
      { status: 400 },
    );
  }

  const to = adminEmail();
  if (!to) {
    console.error("[contact] ADMIN_EMAIL/SMTP_USER не настроены");
    return NextResponse.json(
      { error: "Форма временно недоступна, позвоните нам напрямую" },
      { status: 500 },
    );
  }

  const html = `
    <p><strong>Новая заявка с сайта andreev-zakon.ru</strong></p>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Сообщение:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>") || "—"}</p>
  `;
  const text = `Новая заявка с сайта andreev-zakon.ru\n\nИмя: ${name}\nE-mail: ${email}\nТелефон: ${phone}\nСообщение: ${message || "—"}`;

  const sent = await sendMail({
    to,
    subject: `Заявка с сайта: ${name}`,
    html,
    text,
    replyTo: email,
  });

  if (!sent) {
    return NextResponse.json(
      { error: "Не удалось отправить заявку, попробуйте позже или позвоните нам" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
