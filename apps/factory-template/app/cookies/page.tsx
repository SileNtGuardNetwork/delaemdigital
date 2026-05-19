import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { legalPages } from "@/components/legal/legal-content";

const content = legalPages.cookies;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return <LegalPageLayout content={content} />;
}
