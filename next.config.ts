import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
    dangerouslyAllowSVG: true, // Enable SVG support
    contentDispositionType: "attachment", // Security measure for SVGs
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Prevent SVG scripts
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;