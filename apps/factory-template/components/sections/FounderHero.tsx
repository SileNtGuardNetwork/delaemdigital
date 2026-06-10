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
      className="relative isolate overflow-hidden !py-10 md:!py-12 lg:!py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(184,115,51,0.08),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(91,124,157,0.16),transparent_34%)]"
        aria-hidden
      />
      <Container>
        <div className="reveal grid items-start gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:gap-12 xl:items-center">
          <div className="max-w-3xl">
            <Eyebrow className="mb-4">{hero.eyebrow}</Eyebrow>
            <h1 className="font-display text-[length:var(--text-h1)] font-semibold leading-[1.04] tracking-tight text-text-primary">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {hero.subtitle}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
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

            <ul className="mt-6 grid gap-2 text-sm text-text-secondary sm:grid-cols-3">
              {hero.proof.map((item) => (
                <li key={item} className="surface-panel flex items-center gap-2 px-3 py-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden />
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
    <div className="surface-panel surface-panel-accent relative overflow-hidden p-5 md:p-6 lg:p-7">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-copper/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-steel/10 blur-3xl" aria-hidden />

      <div className="relative flex items-start justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-steel">ClientFlow control room</p>
          <p className="mt-2 font-display text-2xl font-semibold text-text-primary md:text-3xl">
            Маршрут к заявке
          </p>
        </div>
        <div className="rounded-full border border-border-accent bg-copper/10 px-3 py-1 text-xs font-semibold text-copper">
          Live route
        </div>
      </div>

      <div className="relative mt-7">
        <div
          className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-gradient-to-r from-steel/30 via-copper/70 to-steel/30 sm:block"
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
                    "group relative min-h-[7rem] rounded-card border p-3 transition-colors",
                    isActive
                      ? "border-copper/60 bg-copper/10 shadow-glow-copper"
                      : isPast
                        ? "border-border-accent/45 bg-white/[0.035]"
                        : "border-border-subtle bg-base/45",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border font-mono text-xs",
                      isActive
                        ? "border-copper bg-copper/20 text-copper"
                        : "border-border-subtle bg-base text-text-muted",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className={cn("mt-4 text-sm font-semibold", isActive ? "text-text-primary" : "text-text-secondary")}>
                    {step.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-text-muted">{step.hint}</p>
                  {isActive ? (
                    <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-copper animate-flow-pulse" aria-hidden />
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 grid gap-3 border-t border-border-subtle pt-5 sm:grid-cols-3">
        {[
          ["Entry", "сайт + CTA"],
          ["Qualify", "квиз + AI-аудит"],
          ["Handoff", "Telegram / CRM"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-card border border-border-subtle bg-base/35 p-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">{label}</p>
            <p className="mt-1 text-sm font-medium text-text-primary">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
