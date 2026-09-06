import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  serverExternalPackages: ["@prisma/client", "bcryptjs", "ioredis"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  // Whitelist local network origins for mobile testing in development
  allowedDevOrigins: [
    '10.252.42.102',
    '10.252.42.102:3000',
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '127.0.0.1:3000',
    '0.0.0.0',
    '0.0.0.0:3000',
  ],
};

export default nextConfig;
