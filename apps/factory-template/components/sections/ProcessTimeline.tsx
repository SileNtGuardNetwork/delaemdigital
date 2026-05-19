import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { siteConfig } from "@/lib/site-config";

export function ProcessTimeline() {
  const { process } = siteConfig;

  return (
    <SectionShell id="process" variant="default" analyticsName="process">
      <Container>
        <div className="reveal">
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <SectionHeading title={process.title} />
          <ol className="relative space-y-8 border-l border-border-subtle pl-8 md:pl-10">
            {process.steps.map((step, index) => (
              <li key={step.title} className="relative">
                <span className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full border border-border-accent bg-elevated font-mono text-xs text-copper md:-left-[2.65rem]">
                  {index + 1}
                </span>
                <h3 className="font-display text-xl font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-text-secondary">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </SectionShell>
  );
}
