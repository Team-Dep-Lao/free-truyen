import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "otruyenapi.com",
      },
      {
        hostname: "sv1.otruyencdn.com",
      },
    ],
  },
};

export default nextConfig;
