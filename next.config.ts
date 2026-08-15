import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `output: "standalone"` was the template default (for the bundled Dockerfile).
  // It breaks `next start` locally and Vercel does its own output tracing, so it is
  // off. Re-enable it only if you switch to the Docker deploy path.
  redirects() {
    return [
      {
        source: "/codexa",
        destination: "/",
        permanent: true,
      },
      {
        source: "/codexa/:path+",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
  rewrites() {
    return [
      {
        source: "/product/:path*",
        destination: "/codexa/product/:path*",
      },
      {
        source: "/company/:path*",
        destination: "/codexa/company/:path*",
      },
      {
        source: "/legal/:path*",
        destination: "/codexa/legal/:path*",
      },
      {
        source: "/404",
        destination: "/codexa/404",
      },
    ];
  },
};

export default nextConfig;
