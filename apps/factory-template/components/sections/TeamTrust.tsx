import { CardSurface } from "@/components/ui/CardSurface";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { siteConfig } from "@/lib/site-config";

export function TeamTrust() {
  const { team } = siteConfig;

  return (
    <SectionShell id="team" variant="elevated" analyticsName="team">
      <Container>
        <div className="reveal grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>{team.eyebrow}</Eyebrow>
            <SectionHeading title={team.title} subtitle={team.subtitle} className="mb-0" />
          </div>

          <CardSurface accent className="grid gap-6 overflow-hidden p-4 md:grid-cols-[0.9fr_1fr] md:p-5">
            <div
              className="relative min-h-[360px] overflow-hidden rounded-card border border-border-subtle bg-elevated md:min-h-[440px]"
              aria-label={team.founder.photoAlt}
            >
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(91,124,157,0.24),transparent_34%),linear-gradient(145deg,rgba(16,18,24,0.2),rgba(8,9,12,0.96))] bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(8,9,12,0.02), rgba(8,9,12,0.74)), url(${team.founder.photo})` }}
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-base/70 p-4 backdrop-blur-md">
                <p className="font-display text-lg font-semibold text-text-primary">{team.founder.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-steel">{team.founder.role}</p>
              </div>
            </div>

            <div className="relative flex flex-col justify-between p-2 md:p-3">
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-steel/10 blur-3xl"
                aria-hidden
              />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-steel">Founder-led trust</p>
                <p className="mt-3 font-display text-2xl font-semibold text-text-primary">
                  Сайт и техническое исполнение — главный открытый кейс
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{team.founder.caption}</p>
                <ul className="mt-6 space-y-3">
                  {team.principles.map((principle) => (
                    <li key={principle} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden />
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 border-t border-border-subtle pt-4 text-xs text-text-muted">
                Founder-led production: один контур решений от стратегии и упаковки до сайта, заявок, аналитики и QA.
              </p>
            </div>
          </CardSurface>
        </div>
      </Container>
    </SectionShell>
  );
}
