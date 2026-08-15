# andreev-site

Новый сайт для andreevegor.ru (миграционный юрист Егор Андреев).
Next.js App Router + Tailwind. Контент 10 из 11 страниц перенесён и
актуализирован вручную (см. историю задачи). Раздел /sudebnaya-praktika
пока содержит только 5 демо-статей — полный архив (80+ материалов)
переносится отдельным этапом, желательно через CMS-коллекцию (Decap CMS),
а не хардкодом в компоненте.

## Деплой
Развёрнуто на VDS (kvm.an51.su, root по SSH-ключу) по процессу из skill
vds-nextjs-deploy:
- Репозиторий: https://github.com/vknmurm-star/andreev-site (main)
- Каталог на сервере: `/var/www/andreev-site`
- PM2-процесс: `andreev-site`, слушает `PORT=3003` (3000-3002 заняты
  site-001/market-store/finance-001 на этом же VDS)
- Домен: `https://andreev.an51.su` (HTTPS через certbot, стандартный
  порт 443, редирект с 80 настроен certbot'ом автоматически)
- nginx-конфиг: `/etc/nginx/sites-available/andreev-site`
- Автодеплой: cron `*/2 * * * * /var/www/andreev-site/auto-deploy-check.sh`
  подтягивает новые коммиты из GitHub и гоняет `deploy.sh` (flock +
  git pull + npm install + npm run build + pm2 restart)

CMS (Decap) на этом сайте пока не подключена — раздел
`/sudebnaya-praktika` с полным архивом статей планируется перенести
через неё отдельным этапом (см. ниже). Когда будет подключаться —
использовать ту же схему GitHub OAuth + `SITE_URL`, что и в site-001
(см. skill vds-nextjs-deploy, раздел 6).

## Известное
- Next/font/google требует доступа к fonts.googleapis.com — на сборочной
  машине с ограниченной сетью это упадёт; на VDS с обычным интернетом
  можно вернуть next/font (сейчас используется системный font-sans).
- Оригинальный сайт (WordPress) содержал битую ссылку /legal-services/
  (404) — не переносить.
