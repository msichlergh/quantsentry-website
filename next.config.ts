import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `output: "standalone"` was the template default (for the bundled Dockerfile).
  // It breaks `next start` locally and Vercel does its own output tracing, so it is
  // off. Re-enable it only if you switch to the Docker deploy path.
};

export default nextConfig;
