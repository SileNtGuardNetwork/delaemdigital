import type { Metadata } from "next";
import { AnalyticsClickListener } from "@/components/analytics/AnalyticsClickListener";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { CookieConsent } from "@/components/legal/CookieConsent";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LegalFooter } from "@/components/legal/LegalFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    siteName: siteConfig.seo.siteName,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.seo.siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <AnalyticsProvider>
          <AnalyticsClickListener>
            <SiteHeader />
            <main>{children}</main>
            <LegalFooter />
            <CookieConsent />
          </AnalyticsClickListener>
        </AnalyticsProvider>
        <JsonLd />
      </body>
    </html>
  );
}
