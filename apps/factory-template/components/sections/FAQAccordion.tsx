"use client";

import { useState } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/ui/SectionShell";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

export function FAQAccordion() {
  const { faq } = siteConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell id="faq" variant="default" analyticsName="faq">
      <Container>
        <div className="reveal max-w-3xl">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <SectionHeading title={faq.title} />
          <div className="space-y-3">
            {faq.items.map((item, index) => {
              const open = openIndex === index;
              return (
                <div key={item.question} className="surface-panel overflow-hidden">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={open}
                    onClick={() => {
                      setOpenIndex(open ? null : index);
                      trackEvent("faq_item_opened", {
                        section: "faq",
                        label: item.question,
                      });
                    }}
                  >
                    <span className="font-display text-base font-semibold text-text-primary">
                      {item.question}
                    </span>
                    <span className={cn("text-copper transition", open && "rotate-45")}>+</span>
                  </button>
                  {open ? (
                    <div className="border-t border-border-subtle px-5 pb-5 pt-2 text-sm text-text-secondary">
                      {item.answer}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
