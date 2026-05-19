# AI Rules Single Source of Truth — Делаем Диджитал

Статус: v1 standard
Назначение: зафиксировать будущую систему единого источника правил для GPT, Cursor и других AI-инструментов.

## 1. Главная проблема

Если правила живут в разных местах, они начинают расходиться:

```text
AGENTS.md
CLAUDE.md
.cursor/rules/*.mdc
project docs
prompts
GitHub PR comments
```

Риск:

```text
один агент знает стандарт
другой агент его не знает
Cursor делает по старым правилам
GPT принимает по новым правилам
```

## 2. Решение

Создать единый источник правил:

```text
.ai-rules-source/
```

И уже из него генерировать / синхронизировать:

```text
AGENTS.md
.cursor/rules/*.mdc
factory-skills/*/SKILL.md
future Codex / Copilot / other agent configs
```

## 3. Внешний паттерн

Референс: `intellectronica/ruler`.

Что берём:

- centralised rule management;
- nested rules;
- multi-agent output;
- source traceability;
- MCP config awareness.

Что не берём сейчас:

- автоматическую установку CLI;
- генерацию без ревью;
- массовую перезапись текущих `.cursor/rules`.

## 4. Предлагаемая структура

```text
.ai-rules-source/
  00-project-role.md
  10-product-principles.md
  20-nextjs-engineering.md
  30-premium-design.md
  40-leads-analytics-legal.md
  50-qa-gates.md
  60-agent-workflow.md
```

## 5. Правило трассировки

Каждый сгенерированный файл должен иметь указание источника:

```text
Source: .ai-rules-source/[file].md
Generated / adapted for: Cursor
```

## 6. Порядок внедрения

Только после v0.2 merge:

```text
1. создать отдельную ветку ai-rules-source
2. перенести текущие правила в .ai-rules-source
3. вручную собрать Cursor .mdc из source
4. проверить diff
5. Cursor review
6. GPT Business review
7. merge
```

## 7. Запреты

- не удалять текущие `.cursor/rules` без миграции;
- не подключать CLI, если он переписывает файлы без контроля;
- не держать разные версии правил в разных местах;
- не делать Claude-specific правила, если Claude исключён из production stack.

## 8. Эффект

Ожидаемый эффект:

```text
риск рассинхрона правил: -50%
скорость адаптации под новые AI-инструменты: +30%
качество Cursor-постановок: +15%
```
