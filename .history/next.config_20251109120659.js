/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        // Proxy para los assets de Botpress
        {
          source: '/assets/:path*',
          destination: 'http://217.154.181.135:3000/assets/:path*',
        },
        // Proxy para el webchat lite
        {
          source: '/lite/:path*',
          destination: 'http://217.154.181.135:3000/lite/:path*',
        },
        // Proxy para la API de Botpress
        {
          source: '/api/v1/:path*',
          destination: 'http://217.154.181.135:3000/api/v1/:path*',
        },
      ]
    },
  }
  
  module.exports = nextConfig