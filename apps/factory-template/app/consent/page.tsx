import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { legalPages } from "@/components/legal/legal-content";

const content = legalPages.consent;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: { canonical: "/consent" },
};

export default function ConsentPage() {
  return <LegalPageLayout content={content} />;
}
