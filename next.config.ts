import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/privacy-policy/",
        destination: "/privacy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
