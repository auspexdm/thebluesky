import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF/WebP are Next's defaults for next/image; listed explicitly for
    // clarity. Add remotePatterns here once real photography is served
    // from a CMS/media host rather than /public.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // TODO: populate from the current live site's URL map before launch.
      // See /docs/seo-redirect-plan.md for the process and a placeholder
      // table to fill in with the resort team / current webmaster.
    ];
  },
};

export default nextConfig;
