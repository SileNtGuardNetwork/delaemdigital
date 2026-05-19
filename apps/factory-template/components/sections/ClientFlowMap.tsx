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

          <div className="relative overflow-x-auto pb-2">
            <div className="flex min-w-[720px] items-stretch gap-3 md:min-w-0 md:grid md:grid-cols-6">
              {clientFlow.steps.map((step, index) => (
                <FlowStepCell key={step.label} index={index} total={clientFlow.steps.length}>
                  <div
                    className={cn(
                      "surface-panel h-full p-4",
                      (index === 2 || index === 4) && "surface-panel-accent",
                    )}
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-steel">
                      Этап {index + 1}
                    </p>
                    <p className="mt-2 font-display text-base font-semibold text-text-primary">
                      {step.label}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </FlowStepCell>
              ))}
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
          className="absolute right-[-10px] top-1/2 hidden h-px w-5 -translate-y-1/2 bg-gradient-to-r from-steel/50 to-copper/40 md:block animate-flow-pulse"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
