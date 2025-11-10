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
      // --- AÑADIR ESTA REGLA ---
      {
        source: '/assets/:path*',
        destination: '/api/botpress/assets/:path*',
      },
      // --------------------------
    ]
  },
}

module.exports = nextConfig