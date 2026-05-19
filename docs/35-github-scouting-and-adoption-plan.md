# GitHub scouting и план внедрения внешних паттернов — 2026-05-19

Статус: v1 adoption plan
Назначение: зафиксировать, какие внешние GitHub-репозитории и паттерны полезны для фабрики сайтов Делаем Диджитал, что внедряем, что не внедряем и в каком порядке.

## 1. Принцип

Мы не превращаем фабрику Делаем Диджитал в сборную солянку чужих фреймворков.

Мы берём только паттерны, которые усиливают:

- управляемость разработки;
- повторяемость сайтов;
- premium-дизайн;
- QA;
- SEO / traffic-ready слой;
- agent workflow;
- media / hero motion;
- интеграции.

Запрещено:

- подключать тяжёлые фреймворки без production-пользы;
- ставить всё подряд;
- дублировать уже созданные правила;
- менять стек без решения GPT Business;
- нарушать текущий порядок: сначала v0.2 QA, потом внедрение новых слоёв.

## 2. Что уже было проанализировано

### github/spec-kit

Решение: взять как основу spec-driven процесса.

Что берём:

- constitution;
- specify;
- plan;
- tasks;
- checklist;
- analyze;
- implement.

Внедрение:

```text
docs/specs/
docs/plans/
docs/tasks/
docs/checklists/
```

Назначение для фабрики:

```text
каждый сайт начинается не с кода, а со спецификации, плана и задач
```

### obra/superpowers

Решение: взять методологию, не устанавливать целиком.

Что берём:

- brainstorming before code;
- writing plans;
- isolated branches/worktrees;
- code review gate;
- verification before completion;
- finishing branch workflow.

Внедрение:

```text
усилить Cursor rules
добавить Workflow Gate
```

### anthropics/skills

Решение: взять формат `SKILL.md`.

Что берём:

- self-contained skill folder;
- YAML frontmatter;
- repeatable workflow;
- examples and guidelines.

Внедрение:

```text
factory-skills/
```

### nowork-studio/toprank

Решение: взять модель SEO / Ads / GEO agent layer.

Что берём:

- SEO analysis;
- keyword research;
- meta tags optimization;
- schema markup generator;
- broken link checker;
- GEO optimizer;
- landing page audit.

Внедрение:

```text
docs/40-seo-traffic-agent-standard.md
factory-skills/seo-traffic-audit/
factory-skills/landing-quality-score/
factory-skills/geo-optimizer/
```

### Anil-matcha/Open-Generative-AI

Решение: взять как media pipeline reference.

Что берём:

- image studio model registry idea;
- video studio idea;
- cinema controls idea;
- workflow pipeline idea;
- image-to-video / text-to-video / lip sync awareness.

Внедрение:

```text
docs/39-ai-media-pipeline.md
packages/media/
```

### affaan-m/ECC / everything-claude-code

Решение: выборочно взять rules/security/session/status patterns.

Что берём:

- session status snapshot;
- security scanning mindset;
- research-first development;
- quality gate idea;
- context / rules discipline.

Не берём:

- полную установку;
- все hooks;
- весь runtime;
- все команды.

### msitarzewski/agency-agents

Решение: взять ролевую модель как справочник.

Что берём:

- role definition format;
- success metrics;
- deliverable-focused agent descriptions;
- QA roles;
- design roles;
- marketing / paid media roles.

Внедрение:

```text
factory-agents/
```

## 3. Новые найденные репозитории

### bmad-code-org/BMAD-METHOD

Полезность: 9/10.

Суть:

AI-driven agile development framework with specialized agents, structured workflows, scale-domain-adaptive planning, complete lifecycle from brainstorming to deployment.

Что берём:

- lifecycle thinking;
- scale-adaptive planning;
- specialized agents;
- bmad-help style guidance;
- workflow modules;
- PM / Architect / Developer / UX separation.

Что не берём:

- полную установку BMad;
- замену нашей фабрики;
- чужой нейминг;
- лишние модули.

Внедрение:

```text
factory-agents/
  product-architect.md
  conversion-copywriter.md
  premium-designer.md
  nextjs-engineer.md
  qa-gate-auditor.md
  seo-traffic-specialist.md
  ai-funnel-architect.md
```

Срок внедрения: 1 день.

Ожидаемый эффект:

```text
агентная система фабрики: 45% -> 75%
управляемость задач: +15-20%
```

### intellectronica/ruler

Полезность: 8.5/10.

Суть:

Single source of truth for AI coding assistant instructions. Distributes central `.ruler/` rules into Cursor, Claude Code, Codex, Copilot, Windsurf and other agent configs.

Что берём:

- single source of truth для правил;
- nested rules для monorepo;
- автоматическую генерацию AGENTS.md / Cursor rules в будущем;
- принцип трассировки source для каждого rule.

Что не делаем прямо сейчас:

- не ставим CLI до закрытия v0.2;
- не меняем текущие `.cursor/rules` автоматически;
- не генерируем правила без ревью.

Внедрение:

```text
docs/41-ai-rules-single-source-of-truth.md
.ruler/  // позже, отдельным PR
```

Срок внедрения: 0.5-1 день.

Ожидаемый эффект:

```text
риск рассинхрона правил: -50%
масштабирование под другие IDE/агенты: +30%
```

### philipbankier/awesome-agent-skills

Полезность: 8/10.

Суть:

Curated directory of Agent Skills, MCP servers, Cursor rules, Windsurf rules, Gemini extensions, Copilot extensions, OpenClaw skills, LangChain tools, CrewAI tools, n8n nodes and marketplaces.

Что берём:

- использовать как навигационный индекс;
- не искать вручную каждый раз;
- раз в неделю проходить по разделам:
  - Agent Skills;
  - MCP Servers;
  - Cursor Rules;
  - n8n Nodes;
  - Directories & Marketplaces.

Внедрение:

```text
docs/42-agent-skills-and-mcp-registry.md
```

Срок внедрения: 0.5 дня.

Ожидаемый эффект:

```text
скорость поиска новых полезных инструментов: +40%
```

### microsoft/playwright-mcp

Полезность: 9/10 для QA.

Суть:

MCP server for browser automation using Playwright. Allows LLMs to interact with pages through structured accessibility snapshots instead of screenshots.

Что берём:

- browser QA через Playwright;
- проверка формы;
- проверка mobile layout;
- проверка CTA;
- проверка cookie banner;
- проверка accessibility tree;
- возможная интеграция в Cursor MCP.

Важно:

Для coding agents сам README отмечает, что CLI + skills может быть токен-эффективнее, чем MCP. Поэтому для нашей фабрики primary route:

```text
Playwright CLI / tests
MCP optional
```

Внедрение:

```text
apps/factory-template/playwright.config.ts
apps/factory-template/tests/e2e/
docs/43-playwright-qa-gate.md
```

Срок внедрения: 1-2 дня.

Ожидаемый эффект:

```text
QA готовность: 40% -> 80%
визуальные регрессии: риск -30%
ручная проверка mobile: -50%
```

### browser-use/browser-use

Полезность: 7.5/10.

Суть:

Open-source AI browser agent. Может выполнять реальные browser tasks: form filling, browser state, click, type, screenshots, scripted custom tools.

Что берём:

- как reference для автономного браузерного QA;
- сценарии заполнения форм;
- сценарии проверки пользовательского пути;
- возможный future layer для “AI QA operator”.

Что не берём сейчас:

- не подключаем как dependency;
- не строим автономного браузерного агента в v0.2;
- не используем cloud до решения по политике данных.

Внедрение позже:

```text
docs/44-ai-browser-qa-operator.md
```

Срок внедрения: позже, 1-2 дня после Playwright QA.

Ожидаемый эффект:

```text
end-to-end QA automation: +20-30%
```

### firecrawl/firecrawl

Полезность: 8/10 для SEO / audits.

Суть:

Search, scrape, crawl and clean web pages for AI agents. Produces clean Markdown, structured JSON, screenshots, crawl/map/batch scrape, supports JS-heavy pages.

Что берём:

- competitor page crawl;
- SEO page extraction;
- landing audit input;
- content analysis;
- future GEO / AI search preparation;
- client site audit before redesign.

Что не берём сейчас:

- не подключаем API key;
- не строим crawler в v0.2;
- не добавляем внешние paid dependencies без решения.

Внедрение:

```text
docs/45-site-audit-and-crawl-layer.md
factory-skills/site-audit-crawl/
```

Срок внедрения: 1 день после v0.2.

Ожидаемый эффект:

```text
Discovery / SEO audit quality: +25%
```

## 4. Приоритет внедрения

### Нельзя делать до v0.2 QA

- менять Cursor rules массово;
- добавлять Playwright tests в текущий PR #2;
- подключать новые API ключи;
- ставить внешние CLI в production pipeline;
- начинать первый сайт.

### После v0.2 merge

Приоритет 1:

```text
Spec-driven слой + BMAD-style factory-agents
```

Приоритет 2:

```text
Playwright QA Gate
```

Приоритет 3:

```text
Premium Design / Expert Photo / Hero Motion docs
```

Приоритет 4:

```text
SEO / traffic / crawl layer
```

Приоритет 5:

```text
Skills registry + Ruler single-source-of-truth
```

## 5. Дорожная карта по дням

### День 1-2

Закрыть v0.2:

- Supabase dev project;
- migration;
- `.env.local`;
- real submit;
- Telegram QA;
- PR #2 merge.

Готовность фабрики:

```text
45-50% -> 70-75%
```

### День 3

Внедрить spec-driven + agent role layer:

- `docs/specs/`;
- `docs/tasks/`;
- `factory-agents/`;
- адаптация BMAD / spec-kit / agency-agents.

Готовность фабрики:

```text
70-75% -> 78-82%
```

### День 4-5

Внедрить Playwright QA Gate:

- e2e smoke tests;
- form tests;
- mobile viewport tests;
- cookie banner tests;
- QA checklist.

Готовность фабрики:

```text
78-82% -> 82-86%
```

### День 6-7

Внедрить premium design / photo / motion documents:

- Premium Design Factory;
- Expert Photo System;
- Hero Motion Video System;
- AI Media Pipeline.

Готовность фабрики:

```text
82-86% -> 86-90%
```

### День 8-12

Внедрить v0.3 ИИ-автоворонку:

- Telegram bot;
- lead magnet;
- welcome chain;
- AI core;
- owner card v2;
- tripwire skeleton.

Готовность фабрики:

```text
86-90% -> 90-94%
```

## 6. Итоговое решение

Новые must-use паттерны:

1. `github/spec-kit` — spec-driven workflow.
2. `bmad-code-org/BMAD-METHOD` — агентный lifecycle и роли.
3. `obra/superpowers` — дисциплина planning / review / verification.
4. `anthropics/skills` — формат factory-skills.
5. `intellectronica/ruler` — единый источник правил для разных агентов.
6. `microsoft/playwright-mcp` / Playwright CLI — QA Gate.
7. `firecrawl/firecrawl` — SEO / crawl / audit layer.
8. `browser-use/browser-use` — future AI browser QA operator.
9. `nowork-studio/toprank` — SEO / Ads / GEO agent reference.
10. `Open-Generative-AI` — media pipeline / hero video reference.

Главное ограничение:

```text
сначала закрываем v0.2, потом внедряем новые слои отдельными PR
```

## 7. Следующее действие

После включения ноутбука:

```text
git checkout main
git pull
```

Но работу с телефона можно продолжать прямо сейчас:

- управленческие решения;
- GitHub-документы;
- PR-комментарии;
- планы;
- архитектура;
- ревью;
- постановки задач для Cursor.

Локальные действия, которые требуют ноутбук:

- `npm run build`;
- `npm run typecheck`;
- `npm run lint`;
- `.env.local`;
- Supabase local/dev QA;
- browser QA;
- запуск Cursor.
