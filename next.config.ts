import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-0f9a7e84f3a04a03b053284be7757572.r2.dev',
        pathname: '/**',
        port: '',
        search: ''
      },
    ],
  },
};

export default nextConfig;
