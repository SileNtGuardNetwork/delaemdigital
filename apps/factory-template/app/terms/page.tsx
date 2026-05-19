import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { legalPages } from "@/components/legal/legal-content";

const content = legalPages.terms;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPageLayout content={content} />;
}
