import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/BABYHG',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
