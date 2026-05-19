# factory-template v0.1

Базовый premium ClientFlow-шаблон фабрики Делаем Диджитал.

## Запуск

```bash
# из корня репозитория
npm install
npm run dev
```

Откройте http://localhost:3000

## Проверки

```bash
npm run build
npm run typecheck
npm run lint
```

## v0.1 включает

- Next.js App Router, TypeScript strict, Tailwind
- Design tokens и UI-примитивы
- 9 секций главной страницы
- LeadForm (mock submit) с validation и consent
- CookieConsent v1
- Legal pages
- SEO metadata, robots, sitemap
- Organization / ProfessionalService JSON-LD

## Не входит в v0.1

- Supabase, Telegram, PostHog, Яндекс.Метрика
- `app/api/leads`
- production deploy
- AI runtime

## QA mock формы

Для проверки failure state: `/?form_mock_failure=1`
