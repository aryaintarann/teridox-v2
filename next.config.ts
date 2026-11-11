import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same network load the dev server's scripts. Dev only.
  allowedDevOrigins: ["192.168.110.2"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
