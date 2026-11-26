import { SITE_URL } from "@/app/_seo/site";

// Same-origin check for the /demo2 IBMC routes (/api/ibmc-lead and
// /api/ibmc-booking). A copy of the check in app/api/lead/route.ts, kept apart
// on purpose so these test routes do not require refactoring the production one.

const ALLOWED_HOSTS = new Set(
  [SITE_URL, process.env.NEXT_PUBLIC_SITE_URL]
    .filter((v): v is string => Boolean(v))
    .flatMap((value) => {
      try {
        const host = new URL(value).host;
        return host.startsWith("www.") ? [host, host.slice(4)] : [host, `www.${host}`];
      } catch {
        return [];
      }
    }),
);

export function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const candidate = origin || referer;
  if (!candidate || candidate === "null") return !origin && !referer;

  let host: string;
  try {
    host = new URL(candidate).host;
  } catch {
    return false;
  }

  const self = request.headers.get("host");
  if (self && host === self) return true;
  if (ALLOWED_HOSTS.has(host)) return true;

  const hostname = host.split(":")[0];
  if (hostname === "vercel.app" || hostname.endsWith(".vercel.app")) return true;
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") return true;
  return false;
}
