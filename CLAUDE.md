# andreev-site

Новый сайт для andreevegor.ru (миграционный юрист Егор Андреев).
Next.js App Router + Tailwind. Все 10 основных страниц наполнены и
актуализированы, тире убраны по всему тексту (кроме дефисов в номере
телефона и числового диапазона в /privacy).

## Блог / судебная практика

Реализовано как markdown-коллекция:
- `content/posts/*.md` — файлы статей (frontmatter: title, date, excerpt;
  тело — markdown после frontmatter)
- `src/lib/posts.ts` — чтение и парсинг файлов через gray-matter
- `/sudebnaya-praktika` — листинг, читает файлы напрямую (не хардкод)
- `/sudebnaya-praktika/[slug]` — страница отдельной статьи, рендерит
  markdown через `marked`

Сейчас перенесено 5 статей из оригинального сайта. Полный архив (80+
материалов) переносится тем же способом — просто добавлением новых .md
файлов в `content/posts/`, дополнительный код не нужен.

## Decap CMS — требует доп. настройки перед использованием

`public/admin/config.yml` и `public/admin/index.html` готовы, коллекция
`posts` указывает на `content/posts/`. НО:

1. **Нужно создать реальное GitHub OAuth App** (Settings → Developer
   settings → OAuth Apps → New OAuth App):
   - Homepage URL: `https://andreev.an51.su`
   - Authorization callback URL: `https://andreev.an51.su/api/callback`
2. **Прописать на сервере в `.env.local`** (НЕ в git):
   ```
   GITHUB_OAUTH_CLIENT_ID=...
   GITHUB_OAUTH_CLIENT_SECRET=...
   SITE_URL=https://andreev.an51.su
   ```
3. `src/app/api/auth/route.ts` и `src/app/api/callback/route.ts` уже
   написаны по стандартному паттерну GitHub OAuth для Decap CMS (redirect
   → обмен code на token → postMessage в окно с CMS), но **не протестированы
   вживую** — при первом использовании `/admin` на живом сайте нужно
   проверить, что логин через GitHub реально работает, и при ошибках
   сверяться с диагностикой в skill vds-nextjs-deploy (раздел 6).
4. После настройки — доступ к CMS по адресу `https://andreev.an51.su/admin`.

## Деплой

Процесс из skill vds-nextjs-deploy. Автодеплоя через cron нет (решили не
настраивать) — обновления на VDS накатываются вручную: git pull, npm
install, npm run build, pm2 restart andreev-site.

## Важно про git при передаче файлов через архив

Если получаете обновления этого проекта архивом (не через git push/pull),
НЕ распаковывайте архив с включённым в него `.git` поверх рабочей копии —
это уже дважды приводило к порче `origin` и расхождению веток main/master.
Применяйте только файлы кода, коммитьте и пушьте сами через уже
настроенный локальный репозиторий.

## Известное

- next/font/google требует доступа к fonts.googleapis.com — на сборочной
  машине с ограниченной сетью это упадёт; на VDS с обычным интернетом
  можно вернуть next/font (сейчас используется системный font-sans).
- Оригинальный сайт (WordPress) содержал битую ссылку /legal-services/
  (404) — не переносить.
