import { LeadForm } from "@/components/forms/LeadForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  const { finalCta } = siteConfig;

  return (
    <SectionShell id="contact" variant="accent" analyticsName="contact">
      <Container>
        <div className="reveal grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>{finalCta.eyebrow}</Eyebrow>
            <SectionHeading title={finalCta.title} subtitle={finalCta.subtitle} className="mb-0" />
          </div>
          <LeadForm />
        </div>
      </Container>
    </SectionShell>
  );
}
