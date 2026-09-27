import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sendMail, adminEmail } from "@/lib/mailer";
import { clientIp, maybeCleanup, rateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

// Живой человек не успевает найти форму, прочитать поля и заполнить их
// меньше чем за столько миллисекунд после загрузки страницы; боты обычно
// отправляют форму сразу.
const MIN_FILL_TIME_MS = 3000;

interface Body {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: boolean;
  hp_check?: string; // honeypot — люди его не видят и не заполняют
  loadedAt?: number; // timestamp монтирования формы на клиенте
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Короткий id заявки для логов — не несёт персональных данных, только
 * чтобы можно было сопоставить строки одного запроса при разборе логов. */
function shortId(): string {
  return randomUUID().slice(0, 8);
}

function log(id: string, outcome: string) {
  console.log(`[contact] ${id} ${outcome}`);
}

export async function POST(req: Request) {
  const id = shortId();
  maybeCleanup();

  // Rate-limit: не более 5 отправок за 10 минут с одного IP.
  const ip = clientIp(req.headers);
  const rl = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) {
    log(id, "rate-limited");
    return NextResponse.json(
      { error: "Слишком много попыток. Попробуйте позже." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec ?? 60) } },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    log(id, "validation-failed: bad-json");
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  // Honeypot: если скрытое поле заполнено — это бот, тихо отклоняем (клиент
  // получает обычный успешный ответ, чтобы не спалить ловушку).
  if (body.hp_check && body.hp_check.trim() !== "") {
    log(id, "honeypot: field-filled");
    return NextResponse.json({ ok: true });
  }

  // Проверка по времени: форма отправлена подозрительно быстро после
  // загрузки. loadedAt отсутствует — тоже подозрительно (не настоящий клиент
  // с нашим JS), обрабатываем так же, как слишком быстрое заполнение.
  const elapsedMs = typeof body.loadedAt === "number" ? Date.now() - body.loadedAt : null;
  if (elapsedMs === null || elapsedMs < MIN_FILL_TIME_MS) {
    log(id, `honeypot: too-fast (${elapsedMs ?? "no-timestamp"}ms)`);
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();
  const consent = body.consent === true;

  if (!name || !email || !phone) {
    log(id, "validation-failed: missing-fields");
    return NextResponse.json(
      { error: "Укажите имя, e-mail и телефон" },
      { status: 400 },
    );
  }
  if (!/.+@.+\..+/.test(email)) {
    log(id, "validation-failed: bad-email");
    return NextResponse.json({ error: "Некорректный e-mail" }, { status: 400 });
  }
  if (!consent) {
    log(id, "validation-failed: no-consent");
    return NextResponse.json(
      { error: "Нужно согласие на обработку персональных данных" },
      { status: 400 },
    );
  }

  const to = adminEmail();
  if (!to) {
    log(id, "error: admin-email-not-configured");
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
    log(id, "error: send-failed");
    return NextResponse.json(
      { error: "Не удалось отправить заявку, попробуйте позже или позвоните нам" },
      { status: 502 },
    );
  }

  log(id, "ok");
  return NextResponse.json({ ok: true });
}
