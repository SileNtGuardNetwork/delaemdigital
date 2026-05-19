import { siteConfig } from "@/lib/site-config";
import { env } from "@/lib/env";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.brand.name,
    description: siteConfig.seo.description,
    url: env.NEXT_PUBLIC_SITE_URL,
    email: siteConfig.brand.email,
    areaServed: "RU",
    brand: {
      "@type": "Brand",
      name: siteConfig.brand.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
