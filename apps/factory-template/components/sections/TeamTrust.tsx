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
        <div className="reveal grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Eyebrow>{team.eyebrow}</Eyebrow>
            <SectionHeading title={team.title} subtitle={team.subtitle} className="mb-0" />
          </div>

          <CardSurface accent className="relative overflow-hidden p-6 md:p-8">
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-steel/10 blur-3xl"
              aria-hidden
            />
            <p className="text-xs uppercase tracking-[0.18em] text-steel">Founder-led trust</p>
            <p className="mt-3 font-display text-2xl font-semibold text-text-primary">
              Сайт и техническое исполнение — главный открытый кейс
            </p>
            <ul className="mt-6 space-y-3">
              {team.principles.map((principle) => (
                <li key={principle} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden />
                  {principle}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border-subtle pt-4 text-xs text-text-muted">
              Фото founder-блока подключается после передачи файла в public assets. Текущая секция готова под безопасное добавление изображения без изменения структуры.
            </p>
          </CardSurface>
        </div>
      </Container>
    </SectionShell>
  );
}
