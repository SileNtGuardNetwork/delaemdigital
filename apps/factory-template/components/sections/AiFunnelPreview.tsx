import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { siteConfig } from "@/lib/site-config";

export function AiFunnelPreview() {
  const { aiFunnel } = siteConfig;

  return (
    <SectionShell id="ai-funnel" variant="accent" analyticsName="ai-funnel">
      <Container>
        <div className="reveal grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>{aiFunnel.eyebrow}</Eyebrow>
            <SectionHeading title={aiFunnel.title} subtitle={aiFunnel.subtitle} className="mb-6" />
            <SecondaryButton
              href={aiFunnel.cta.href}
              analyticsEvent="audit_bot_clicked"
              analyticsSection="ai-funnel"
            >
              {aiFunnel.cta.label}
            </SecondaryButton>
          </div>

          <div className="surface-panel p-6 md:p-8">
            <p className="text-xs uppercase tracking-widest text-steel">ClientFlow Audit · mini-product</p>
            <ol className="mt-6 space-y-4">
              {aiFunnel.stages.map((stage, index) => (
                <li key={stage} className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-accent bg-copper/10 font-mono text-sm text-copper">
                    {index + 1}
                  </span>
                  <span className="text-sm text-text-primary">{stage}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-text-muted">
              Это логика мини-продукта: без имитации метрик, декоративных дашбордов и обещаний магического роста.
            </p>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
