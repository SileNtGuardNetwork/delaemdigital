import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-sm text-steel">404</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-text-primary">Страница не найдена</h1>
      <p className="mt-4 max-w-lg text-text-secondary">
        Запрошенный адрес не существует. Вернитесь на главную или оставьте заявку.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-button bg-copper px-6 py-3 text-sm font-semibold text-base hover:bg-copper-hover"
      >
        На главную
      </Link>
    </Container>
  );
}
