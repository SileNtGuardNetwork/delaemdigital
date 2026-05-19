import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { siteConfig } from "@/lib/site-config";

export function SiteIncludes() {
  const { includes } = siteConfig;

  return (
    <SectionShell id="includes" variant="default" analyticsName="includes">
      <Container>
        <div className="reveal grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>{includes.eyebrow}</Eyebrow>
            <SectionHeading title={includes.title} className="mb-0" />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {includes.items.map((item) => (
              <li
                key={item}
                className="surface-panel flex items-start gap-3 p-4 text-sm text-text-secondary"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </SectionShell>
  );
}
