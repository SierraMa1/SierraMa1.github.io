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
      // --- AÑADE ESTA REGLA PARA LA CONEXIÓN EN TIEMPO REAL ---
      {
        source: '/socket.io/:path*',
        destination: '/api/botpress/socket.io/:path*',
      },
      // -----------------------------------------------------
    ]
  },
}

module.exports = nextConfig