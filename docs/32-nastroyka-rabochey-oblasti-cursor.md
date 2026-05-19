# Настройка рабочей области Cursor

Статус: v1 foundation
Назначение: быстро поднять локальную рабочую область Cursor для фабрики сайтов.

## 1. Локальная папка

Папка проекта на Windows:

```text
C:\Users\Acer\Desktop\Проекты\Вайбкодинг\Проекты\Фабрика сайтов
```

Эта папка будет локальной рабочей областью.

## 2. Что должно лежать внутри

Рекомендуемая структура:

```text
Фабрика сайтов/
  delaemdigital/
  cursor-workspace/
    delaem-digital-factory.code-workspace
  notes/
```

Где:

- `delaemdigital` — клонированный GitHub-репозиторий;
- `cursor-workspace` — настройки рабочей области;
- `notes` — локальные заметки, если нужны.

## 3. Команды для PowerShell

Открыть PowerShell и выполнить:

```powershell
cd "C:\Users\Acer\Desktop\Проекты\Вайбкодинг\Проекты\Фабрика сайтов"

git clone https://github.com/SileNtGuardNetwork/delaemdigital.git

mkdir cursor-workspace
mkdir notes
```

Если репозиторий уже клонирован:

```powershell
cd "C:\Users\Acer\Desktop\Проекты\Вайбкодинг\Проекты\Фабрика сайтов\delaemdigital"
git pull
```

## 4. Workspace file

Создать файл:

```text
C:\Users\Acer\Desktop\Проекты\Вайбкодинг\Проекты\Фабрика сайтов\cursor-workspace\delaem-digital-factory.code-workspace
```

Содержимое:

```json
{
  "folders": [
    {
      "name": "delaemdigital",
      "path": "../delaemdigital"
    }
  ],
  "settings": {
    "files.encoding": "utf8",
    "editor.formatOnSave": true,
    "typescript.tsdk": "delaemdigital/node_modules/typescript/lib",
    "search.exclude": {
      "**/node_modules": true,
      "**/.next": true,
      "**/dist": true,
      "**/build": true
    },
    "files.exclude": {
      "**/.next": true,
      "**/node_modules": true
    }
  }
}
```

## 5. Как открыть в Cursor

Вариант 1:

```powershell
cursor "C:\Users\Acer\Desktop\Проекты\Вайбкодинг\Проекты\Фабрика сайтов\cursor-workspace\delaem-digital-factory.code-workspace"
```

Вариант 2:

- открыть Cursor;
- File -> Open Workspace from File;
- выбрать `delaem-digital-factory.code-workspace`.

## 6. Как подключить правила Cursor

Пока правила лежат здесь:

```text
docs/cursor-rules/
```

Их нужно перенести или скопировать в:

```text
.cursor/rules/
```

Целевые файлы:

```text
.cursor/rules/00-obshchie-pravila.mdc
.cursor/rules/10-nextjs-i-kachestvo-koda.mdc
.cursor/rules/20-dizayn-i-verstka.mdc
.cursor/rules/30-lidy-analitika-legal.mdc
.cursor/rules/40-otchet-posle-raboty.mdc
```

Если Cursor не читает `.md`, использовать `.mdc`.

## 7. Команды для переноса правил

PowerShell из корня репозитория:

```powershell
cd "C:\Users\Acer\Desktop\Проекты\Вайбкодинг\Проекты\Фабрика сайтов\delaemdigital"

mkdir .cursor
mkdir .cursor\rules

copy docs\cursor-rules\00-obshchie-pravila.md .cursor\rules\00-obshchie-pravila.mdc
copy docs\cursor-rules\10-nextjs-i-kachestvo-koda.md .cursor\rules\10-nextjs-i-kachestvo-koda.mdc
copy docs\cursor-rules\20-dizayn-i-verstka.md .cursor\rules\20-dizayn-i-verstka.mdc
copy docs\cursor-rules\30-lidy-analitika-legal.md .cursor\rules\30-lidy-analitika-legal.mdc
copy docs\cursor-rules\40-otchet-posle-raboty.md .cursor\rules\40-otchet-posle-raboty.mdc
```

После переноса:

```powershell
git add .cursor/rules
git commit -m "Add Cursor project rules"
git push
```

## 8. Первое сообщение Cursor

После открытия проекта в Cursor отправить:

```text
Прочитай AGENTS.md, docs/30-usilenie-ai-steka.md, docs/31-plan-sozdaniya-factory-template.md и все файлы в docs/cursor-rules. Ничего не меняй. Сначала дай краткий отчёт: понял ли ты роль проекта, какие правила обязательны и какой первый технический спринт нужно выполнить.
```

## 9. Второе сообщение Cursor

После отчёта:

```text
Подготовь план реализации apps/factory-template v0.1 по docs/31-plan-sozdaniya-factory-template.md. Не пиши код сразу. Сначала перечисли структуру файлов, компоненты, страницы, зависимости, риски и команды проверки.
```

## 10. Только потом код

После согласования плана:

```text
Реализуй apps/factory-template v0.1 по согласованному плану. Не подключай боевые сервисы, не трогай секреты, не делай production deploy. После работы запусти build/typecheck, если проект позволяет, и дай отчёт по docs/cursor-rules/40-otchet-posle-raboty.md.
```

## 11. Контроль качества

После работы Cursor GPT Business проводит ревью:

- структура;
- дизайн;
- mobile;
- speed;
- SEO;
- форма;
- legal;
- соответствие стандартам;
- готовность к v0.2.

## 12. Решение

Рабочая область Cursor должна быть настроена до первого кода.

Cursor не должен начинать реализацию без чтения правил и плана технического спринта.
