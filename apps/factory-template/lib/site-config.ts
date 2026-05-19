export const siteConfig = {
  brand: {
    name: "Делаем Диджитал",
    tagline: "Фабрика premium ClientFlow-сайтов",
    legalName: "ИП Примеров П.П.",
    inn: "000000000000",
    ogrnip: "000000000000000",
    email: "hello@delaemdigital.ru",
    telegram: "https://t.me/delaemdigital",
  },
  seo: {
    siteName: "Делаем Диджитал",
    defaultTitle: "Делаем Диджитал — premium ClientFlow-сайты под заявки",
    titleTemplate: "%s · Делаем Диджитал",
    description:
      "Проектируем и собираем premium ClientFlow-сайты: оффер, конверсия, форма, аналитика, legal-слой и готовность к трафику. Не шаблонный лендинг — управляемая система заявок.",
    locale: "ru_RU",
    ogImage: "/og/default-og.svg",
  },
  navigation: [
    { label: "Проблема", href: "#problem" },
    { label: "ClientFlow", href: "#clientflow" },
    { label: "Состав", href: "#includes" },
    { label: "ИИ-воронка", href: "#ai-funnel" },
    { label: "Процесс", href: "#process" },
    { label: "Продукты", href: "#offers" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    eyebrow: "Фабрика сайтов · ClientFlow System",
    title: "Premium-сайт, который ведёт клиента к заявке — а не просто «красиво смотрится»",
    subtitle:
      "Собираем управляемый маршрут: оффер, структура, copy, дизайн, форма, consent, аналитика и подготовка к трафику. Для B2B и экспертов, которым нужен предсказуемый поток заявок.",
    primaryCta: { label: "Разобрать проект", href: "#contact", event: "hero_primary_cta_clicked" },
    secondaryCta: {
      label: "Как устроена система",
      href: "#clientflow",
      event: "hero_secondary_cta_clicked",
    },
    proof: [
      "Оффер и структура до кода",
      "Форма с consent и состояниями",
      "Готовность к SEO и трафику",
    ],
  },
  problem: {
    eyebrow: "Карта проблемы",
    title: "Сайт есть, а заявки не складываются в систему",
    subtitle:
      "Чаще всего проблема не в «дизайне ради дизайна», а в разорванном маршруте: слабый первый экран, нет ясного CTA, форма без доверия, нет аналитики и обработки лидов.",
    items: [
      {
        title: "Оффер не считывается за 5 секунд",
        description:
          "Посетитель не понимает, для кого продукт и какой следующий шаг — уходит без действия.",
      },
      {
        title: "Страница не ведёт к действию",
        description:
          "Много блоков, одинаковые карточки, нет иерархии — CTA теряется на mobile.",
      },
      {
        title: "Заявка не становится процессом",
        description:
          "Нет consent, статусов формы, уведомления владельцу и фиксации источника трафика.",
      },
    ],
  },
  clientFlow: {
    eyebrow: "ClientFlow System",
    title: "Маршрут от внимания до квалифицированной заявки",
    subtitle:
      "Сайт — центр маршрута. Вокруг него выстраиваются форма, аналитика, legal-слой и будущая ИИ-автоворонка.",
    steps: [
      { label: "Трафик", description: "SEO, реклама, контент" },
      { label: "Первый экран", description: "Оффер и CTA" },
      { label: "Доверие", description: "Структура, FAQ, legal" },
      { label: "Заявка", description: "Форма и consent" },
      { label: "Обработка", description: "Уведомление и CRM" },
      { label: "Улучшение", description: "Аналитика и итерации" },
    ],
  },
  includes: {
    eyebrow: "Что входит в Делаем Сайт",
    title: "Не лендинг-страница, а production-каркас под заявки",
    items: [
      "Архитектура оффера и конверсионный blueprint",
      "Production copy и premium UI",
      "Адаптив и mobile-first контроль",
      "LeadForm с consent и состояниями",
      "Legal pages и cookie consent",
      "SEO metadata и техническая база",
      "Analytics hooks и UTM-заготовка",
      "QA Gate перед запуском трафика",
    ],
  },
  aiFunnel: {
    eyebrow: "ИИ-автоворонка",
    title: "Подготовка к квалификации лидов без «магического» интерфейса",
    subtitle:
      "В v0.1 — схема маршрута. В v0.3 подключаются Telegram-бот, welcome-цепочка и карточка лида владельцу.",
    stages: [
      "Заявка с сайта",
      "Приветствие в Telegram",
      "Уточняющие вопросы",
      "Lead score",
      "Карточка владельцу",
    ],
  },
  process: {
    eyebrow: "Процесс работы",
    title: "От диагностики до запуска — по этапам фабрики",
    steps: [
      {
        title: "Диагностика и оффер",
        description: "Фиксируем нишу, боли, оффер и критерии качества заявки.",
      },
      {
        title: "Blueprint и copy",
        description: "Структура страницы, тексты, SEO-требования и CTA-логика.",
      },
      {
        title: "Дизайн и Next.js",
        description: "Premium UI, адаптив, компоненты и технический каркас.",
      },
      {
        title: "Интеграции и QA",
        description: "Форма, аналитика, legal, проверки и handoff.",
      },
    ],
  },
  offers: {
    eyebrow: "Продукты",
    title: "Три уровня — от сайта до системы",
    cards: [
      {
        name: "Делаем Сайт",
        description:
          "Premium ClientFlow-сайт: оффер, конверсия, форма, legal, SEO-база и аналитика.",
        features: ["Blueprint + copy", "Premium UI", "LeadForm + consent"],
        cta: { label: "Обсудить сайт", event: "offer_card_clicked" },
        highlighted: false,
      },
      {
        name: "Делаем Трафик",
        description:
          "Сайт + рекламный маршрут, UTM-контур, события и оптимизация заявок.",
        features: ["Всё из «Сайт»", "UTM и события", "Готовность к трафику"],
        cta: { label: "Обсудить трафик", event: "offer_card_clicked" },
        highlighted: true,
      },
      {
        name: "Делаем Систему",
        description:
          "Сайт + ИИ-автоворонка + Telegram-бот + обработка лидов и улучшения.",
        features: ["Всё из «Трафик»", "ИИ-воронка", "Telegram-контур"],
        cta: { label: "Обсудить систему", event: "offer_card_clicked" },
        highlighted: false,
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Частые вопросы",
    items: [
      {
        question: "Это шаблонный лендинг?",
        answer:
          "Нет. Каждый проект собирается по ClientFlow: оффер, blueprint, copy и premium UI под вашу нишу. Шаблон фабрики — только производственный каркас.",
      },
      {
        question: "Можно ли запустить только дизайн?",
        answer:
          "Мы не делаем «красивую картинку» без конверсионной логики. Сначала — смысл и маршрут заявки, затем визуал и код.",
      },
      {
        question: "Когда подключается форма и Telegram?",
        answer:
          "В v0.1 каркас уже содержит UI формы и legal. Боевая отправка, Supabase и Telegram — этап v0.2 по стандарту фабрики.",
      },
      {
        question: "Сайт будет готов к SEO и рекламе?",
        answer:
          "Да, закладываем metadata, структуру заголовков, FAQ, legal и analytics hooks до запуска трафика.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Следующий шаг",
    title: "Разберём ваш проект и соберём маршрут заявки",
    subtitle:
      "Оставьте контакт — вернёмся с понятным предложением по этапам, срокам и составу ClientFlow-системы.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
