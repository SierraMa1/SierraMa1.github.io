/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/lite/:path*',
        destination: 'http://217.154.181.135:3000/lite/:path*',
      },
    ]
  },
}

module.exports = nextConfig