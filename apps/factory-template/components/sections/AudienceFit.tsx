import { CardSurface } from "@/components/ui/CardSurface";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { siteConfig } from "@/lib/site-config";

export function AudienceFit() {
  const { audience } = siteConfig;

  return (
    <SectionShell id="audience" variant="default" analyticsName="audience">
      <Container>
        <div className="reveal">
          <Eyebrow>{audience.eyebrow}</Eyebrow>
          <SectionHeading title={audience.title} />
          <div className="grid gap-4 md:grid-cols-2">
            {audience.items.map((item, index) => (
              <CardSurface key={item} accent={index === 1}>
                <p className="font-mono text-xs uppercase tracking-widest text-steel">
                  Fit {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item}</p>
              </CardSurface>
            ))}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
