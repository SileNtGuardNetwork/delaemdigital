import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { CardSurface } from "@/components/ui/CardSurface";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

export function OfferCards() {
  const { offers } = siteConfig;

  return (
    <SectionShell id="offers" variant="elevated" analyticsName="offers">
      <Container>
        <div className="reveal">
          <Eyebrow>{offers.eyebrow}</Eyebrow>
          <SectionHeading title={offers.title} />
          <div className="grid gap-6 lg:grid-cols-3">
            {offers.cards.map((card) => (
              <CardSurface
                key={card.name}
                accent={card.highlighted}
                className={cn(card.highlighted && "lg:-translate-y-1")}
              >
                <p className="text-sm font-medium text-steel">{card.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{card.description}</p>
                <ul className="mt-6 space-y-2">
                  {card.features.map((feature) => (
                    <li key={feature} className="text-sm text-text-primary">
                      — {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <PrimaryButton
                    href="#contact"
                    analyticsEvent={card.cta.event}
                    analyticsSection="offers"
                    analyticsLabel={card.name}
                    className="w-full"
                  >
                    {card.cta.label}
                  </PrimaryButton>
                </div>
              </CardSurface>
            ))}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
