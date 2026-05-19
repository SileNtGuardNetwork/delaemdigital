import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionShell } from "@/components/ui/SectionShell";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

export function FounderHero() {
  const { hero } = siteConfig;

  return (
    <SectionShell
      id="hero"
      variant="accent"
      analyticsName="hero"
      className="!py-8 md:!py-10 lg:!py-11"
    >
      <Container>
        <div className="reveal grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:items-center">
          <div className="max-w-3xl">
            <Eyebrow className="mb-3">{hero.eyebrow}</Eyebrow>
            <h1 className="font-display text-[length:var(--text-h1)] font-semibold leading-[1.06] tracking-tight text-text-primary">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {hero.subtitle}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
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

            <ul className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
              {hero.proof.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-text-secondary before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-copper before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <HeroRoutePanel steps={hero.routeSteps} />
        </div>
      </Container>
    </SectionShell>
  );
}

type RouteStep = (typeof siteConfig.hero.routeSteps)[number];

function HeroRoutePanel({ steps }: { steps: readonly RouteStep[] }) {
  const activeIndex = steps.findIndex((step) => "active" in step && step.active);

  return (
    <div className="surface-panel surface-panel-accent relative overflow-hidden p-5 md:p-6">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-copper/10 blur-3xl"
        aria-hidden
      />

      <p className="text-xs font-medium uppercase tracking-[0.16em] text-steel">ClientFlow System</p>
      <p className="mt-2 font-display text-xl font-semibold text-text-primary md:text-2xl">
        Маршрут к заявке
      </p>
      <p className="mt-1 text-sm text-text-secondary">Схема этапов — без метрик и дашбордов</p>

      <div className="relative mt-6">
        <div
          className="absolute left-3 right-3 top-5 hidden h-px bg-gradient-to-r from-steel/30 via-copper/50 to-steel/20 sm:block"
          aria-hidden
        />
        <ol className="grid gap-3 sm:grid-cols-5 sm:gap-2">
          {steps.map((step, index) => {
            const isActive = "active" in step && step.active;
            const isPast = activeIndex >= 0 && index < activeIndex;

            return (
              <li key={step.id} className="relative">
                <div
                  className={cn(
                    "rounded-card border px-3 py-3 transition-colors sm:min-h-[5.5rem]",
                    isActive
                      ? "border-copper/50 bg-copper/10 shadow-glow-copper"
                      : isPast
                        ? "border-border-accent/40 bg-white/[0.03]"
                        : "border-border-subtle bg-base/40",
                  )}
                >
                  <div className="flex items-center gap-2 sm:block">
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs sm:mb-2",
                        isActive
                          ? "border-copper bg-copper/20 text-copper"
                          : "border-border-subtle text-text-muted",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isActive ? "text-text-primary" : "text-text-secondary",
                        )}
                      >
                        {step.label}
                      </p>
                      <p className="mt-0.5 text-xs text-text-muted">{step.hint}</p>
                    </div>
                  </div>
                  {isActive ? (
                    <p className="mt-2 hidden text-[11px] font-medium uppercase tracking-wide text-copper sm:block">
                      Текущий этап
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-border-subtle pt-4 text-xs text-text-muted">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-copper animate-flow-pulse" aria-hidden />
        Активный маршрут: от первого экрана к форме заявки
      </div>
    </div>
  );
}
