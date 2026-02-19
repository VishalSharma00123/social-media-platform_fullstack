import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/api/:path*",
        destination: "http://api-gateway:8080/api/:path*", // Strip double /api prefix
      },
      {
        source: "/api/:path*",
        destination: "http://api-gateway:8080/api/:path*", // Proxy standard /api requests
      },
    ];
  },
};

export default nextConfig;
