import { CardSurface } from "@/components/ui/CardSurface";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { siteConfig } from "@/lib/site-config";

export function ProblemMap() {
  const { problem } = siteConfig;

  return (
    <SectionShell id="problem" variant="default" analyticsName="problem">
      <Container>
        <div className="reveal">
          <Eyebrow>{problem.eyebrow}</Eyebrow>
          <SectionHeading title={problem.title} subtitle={problem.subtitle} />
          <div className="grid gap-6 md:grid-cols-3">
            {problem.items.map((item, index) => (
              <CardSurface key={item.title} accent={index === 1}>
                <p className="font-mono text-sm text-steel">0{index + 1}</p>
                <h3 className="mt-3 font-display text-xl font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </CardSurface>
            ))}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}