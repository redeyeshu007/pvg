import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  typescript: {
    // Typecheck is run explicitly via `npm run typecheck` to avoid Windows child_process spawn UNKNOWN
    ignoreBuildErrors: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
