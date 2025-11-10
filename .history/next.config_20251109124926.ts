/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: 'http://217.154.181.135:3000/assets/:path*',
      },
      {
        source: '/lite/:path*',
        destination: 'http://217.154.181.135:3000/lite/:path*',
      },
      {
        source: '/api/v1/:path*',
        destination: 'http://217.154.181.135:3000/api/v1/:path*',
      },
      {
        source: '/socket.io/:path*',
        destination: 'http://217.154.181.135:3000/socket.io/:path*',
      },
    ]
  },
  // Importante: Permitir imágenes de Botpress
  images: {
    domains: ['217.154.181.135'],
  },
}

module.exports = nextConfig