import { AiFunnelPreview } from "@/components/sections/AiFunnelPreview";
import { ClientFlowMap } from "@/components/sections/ClientFlowMap";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FounderHero } from "@/components/sections/FounderHero";
import { OfferCards } from "@/components/sections/OfferCards";
import { ProblemMap } from "@/components/sections/ProblemMap";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { SiteIncludes } from "@/components/sections/SiteIncludes";

export default function HomePage() {
  return (
    <>
      <FounderHero />
      <ProblemMap />
      <ClientFlowMap />
      <SiteIncludes />
      <AiFunnelPreview />
      <ProcessTimeline />
      <OfferCards />
      <FAQAccordion />
      <FinalCTA />
    </>
  );
}
