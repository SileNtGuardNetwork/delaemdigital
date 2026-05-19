import { Container } from "@/components/ui/Container";
import type { LegalPageContent } from "./legal-content";

type LegalPageLayoutProps = {
  content: LegalPageContent;
};

export function LegalPageLayout({ content }: LegalPageLayoutProps) {
  return (
    <Container className="py-16 md:py-24">
      <article className="prose-legal mx-auto max-w-3xl">
        <p className="text-sm text-text-muted">Обновлено: {content.updatedAt}</p>
        <h1 className="mt-2 font-display text-[length:var(--text-h1)] font-semibold text-text-primary">
          {content.title}
        </h1>
        <p className="mt-4 text-lg text-text-secondary">{content.description}</p>

        {content.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {section.list ? (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>
    </Container>
  );
}
