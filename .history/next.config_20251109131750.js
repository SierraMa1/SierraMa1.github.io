/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/lite/:path*',
        destination: '/api/botpress/lite/:path*',
      },
      {
        source: '/api/v1/:path*',
        destination: '/api/botpress/api/v1/:path*',
      },
    ]
  },
}

module.exports = nextConfig