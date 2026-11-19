// Google Tag Manager container for quantsentry.com. Public by design — it is
// the ID every visitor's browser requests. Removing it silences every tag
// configured in the container. The container must not carry cookie-setting
// tags until the site has a consent surface (see lib/analytics.ts).
//
// Always on: NEXT_PUBLIC_ANALYTICS_DISABLED does not cover GTM, it only gates
// the Vercel scripts and custom events.
const GTM_ID = "GTM-PGX4FJ2M";

// Verbatim from Linear YPF-1672; QA diffs the rendered HTML against it.
const GTM_BOOTSTRAP = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
`;

// Rendered inside the root layout's <head>. Plain <script> tags, not
// next/script: QA requires both tags in the server-rendered <head>, and
// next/script would inject them into <body> after hydration. React hoists the
// async loader into the head resource block beside Next's chunk scripts; the
// inline bootstrap renders where it is placed. Loader first, then bootstrap,
// as in the ticket.
export function GtmHead() {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
      <script dangerouslySetInnerHTML={{ __html: GTM_BOOTSTRAP }} />
    </>
  );
}

// No-JS fallback. Mounted as the first child of <body>, per Google's placement
// guidance.
export function GtmNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
