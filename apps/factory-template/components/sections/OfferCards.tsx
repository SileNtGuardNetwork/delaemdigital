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
                className={cn("relative flex min-h-full flex-col", card.highlighted && "lg:-translate-y-1")}
              >
                {card.highlighted ? (
                  <p className="absolute right-5 top-5 rounded-full border border-border-accent bg-copper/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-copper">
                    Core offer
                  </p>
                ) : null}
                <div className="pr-24">
                  <p className="text-sm font-medium text-steel">{card.name}</p>
                  <p className="mt-3 font-display text-2xl font-semibold text-text-primary">{card.price}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{card.description}</p>
                <ul className="mt-6 space-y-3">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-text-primary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
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
