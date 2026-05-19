"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { COOKIE_CONSENT_KEY } from "@/lib/consent";
import { env } from "@/lib/env";

export function AnalyticsScripts() {
  const [consentAccepted, setConsentAccepted] = useState(false);

  useEffect(() => {
    const read = () => setConsentAccepted(localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted");
    read();
    window.addEventListener("storage", read);
    window.addEventListener("dd-cookie-consent-change", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("dd-cookie-consent-change", read);
    };
  }, []);

  if (!env.NEXT_PUBLIC_ANALYTICS_ENABLED || !consentAccepted) {
    return null;
  }

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";
  const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  return (
    <>
      {posthogKey ? (
        <Script id="posthog-init" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${posthogKey}', { api_host: '${posthogHost}', autocapture: false });
          `}
        </Script>
      ) : null}
      {metrikaId ? (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${metrikaId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
          `}
        </Script>
      ) : null}
    </>
  );
}
