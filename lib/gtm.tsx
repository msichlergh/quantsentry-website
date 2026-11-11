import Script from "next/script";

// Google Tag Manager container for quantsentry.com. Public by design — it is
// the ID every visitor's browser requests. Removing it silences every tag
// configured in the container. The container must not carry cookie-setting
// tags until the site has a consent surface (see lib/analytics.ts).
const GTM_ID = "GTM-PGX4FJ2M";

// Static reference so Next inlines it. Unset means ON — see lib/analytics.ts.
const DISABLED = process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "1";

// Runs before gtm.js. The `gtm.start` push is what GTM's Page View trigger
// keys off; the gtag() shim and `gtag('js', ...)` are the snippet the
// container was issued with.
const BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
`;

// Both <Script>s are afterInteractive: next/script appends them to <body>
// from useEffect in tree order, so the bootstrap executes before the loader
// element exists (the same ordering @next/third-parties relies on). In the
// server HTML they leave only a <link rel="preload"> for gtm.js in <head>;
// the <noscript> is the one element rendered in place, which is why this is
// mounted first in <body>.
export function GoogleTagManager() {
  if (DISABLED) return null;
  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
      <Script id="gtm-bootstrap" strategy="afterInteractive">
        {BOOTSTRAP}
      </Script>
      <Script
        id="gtm"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
