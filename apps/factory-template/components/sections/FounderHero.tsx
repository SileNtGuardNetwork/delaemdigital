import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionShell } from "@/components/ui/SectionShell";
import { siteConfig } from "@/lib/site-config";

export function FounderHero() {
  const { hero } = siteConfig;

  return (
    <SectionShell id="hero" variant="accent" analyticsName="hero">
      <Container>
        <div className="reveal grid min-h-[min(88vh,860px)] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="max-w-3xl font-display text-[length:var(--text-h1)] font-semibold leading-[1.08] tracking-tight text-text-primary">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary">{hero.subtitle}</p>

            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {hero.proof.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-text-secondary before:h-1.5 before:w-1.5 before:rounded-full before:bg-copper before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryButton
                href={hero.primaryCta.href}
                analyticsEvent={hero.primaryCta.event}
                analyticsSection="hero"
              >
                {hero.primaryCta.label}
              </PrimaryButton>
              <SecondaryButton
                href={hero.secondaryCta.href}
                analyticsEvent={hero.secondaryCta.event}
                analyticsSection="hero"
              >
                {hero.secondaryCta.label}
              </SecondaryButton>
            </div>
          </div>

          <div className="surface-panel surface-panel-accent relative overflow-hidden p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/60 to-transparent" />
            <p className="text-sm font-medium uppercase tracking-widest text-steel">ClientFlow System</p>
            <p className="mt-4 font-display text-2xl font-semibold text-text-primary">
              Управляемый маршрут заявки
            </p>
            <ol className="mt-8 space-y-4 border-l border-border-subtle pl-4">
              {["Оффер", "Доверие", "Форма", "Обработка", "Аналитика"].map((step, index) => (
                <li key={step} className="text-sm text-text-secondary">
                  <span className="mr-2 font-mono text-copper">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-text-muted">
              Превью системы — без имитации реальных метрик и дашбордов.
            </p>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
