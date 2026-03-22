import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/lite/:path*',
        destination: 'http://217.154.181.135:3000/lite/:path*',
      },
    ];
  },
};

export default nextConfig;
