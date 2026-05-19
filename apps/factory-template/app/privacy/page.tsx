import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { legalPages } from "@/components/legal/legal-content";

const content = legalPages.privacy;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPageLayout content={content} />;
}
