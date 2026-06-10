import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

export function ClientFlowMap() {
  const { clientFlow } = siteConfig;

  return (
    <SectionShell id="clientflow" variant="elevated" analyticsName="clientflow">
      <Container>
        <div className="reveal">
          <Eyebrow>{clientFlow.eyebrow}</Eyebrow>
          <SectionHeading title={clientFlow.title} subtitle={clientFlow.subtitle} />

          <div className="surface-panel surface-panel-accent overflow-hidden p-4 md:p-6">
            <div className="grid gap-3 md:grid-cols-6">
              {clientFlow.steps.map((step, index) => (
                <FlowStepCell key={step.label} index={index} total={clientFlow.steps.length}>
                  <div
                    className={cn(
                      "relative h-full min-h-[150px] rounded-card border p-4",
                      index === 3
                        ? "border-copper/55 bg-copper/10"
                        : index === 4
                          ? "border-steel/45 bg-steel/10"
                          : "border-border-subtle bg-base/40",
                    )}
                  >
                    <p className="font-mono text-xs text-text-muted">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-4 font-display text-base font-semibold text-text-primary">{step.label}</p>
                    <p className="mt-2 text-xs leading-relaxed text-text-secondary">{step.description}</p>
                    <div className="absolute bottom-3 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border-accent to-transparent" />
                  </div>
                </FlowStepCell>
              ))}
            </div>

            <div className="mt-5 grid gap-3 border-t border-border-subtle pt-5 md:grid-cols-3">
              <p className="text-sm leading-relaxed text-text-secondary">
                <span className="text-text-primary">Не отдельные инструменты.</span> Каждый этап передаёт контекст следующему.
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                <span className="text-text-primary">Не обещание магии.</span> Видно, где теряются заявки и что улучшать.
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                <span className="text-text-primary">Не шаблон.</span> Маршрут собирается под продукт, трафик и обработку.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}

function FlowStepCell({
  children,
  index,
  total,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
}) {
  return (
    <div className="relative flex-1">
      {children}
      {index < total - 1 ? (
        <span
          className="absolute -right-2 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-gradient-to-r from-steel/50 to-copper/50 md:block animate-flow-pulse"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
