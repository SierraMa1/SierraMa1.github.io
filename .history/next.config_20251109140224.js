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
      {
        source: '/assets/:path*',
        destination: '/api/botpress/assets/:path*',
      },
      // --- REGLA PARA WEBSOCKETS ---
      {
        source: '/socket.io/:path*',
        destination: '/api/botpress/socket.io/:path*',
      },
      // --- REGLA PARA EL ERROR DE SINTAXIS ---
      {
        source: '/env.js',
        destination: '/api/botpress/env.js',
      },
    ]
  },
}

module.exports = nextConfig