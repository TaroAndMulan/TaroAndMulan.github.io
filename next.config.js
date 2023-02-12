/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/did-configuration.json',
        destination: '/api/.well-known/did-configuration.json',
      },
    ]
  },
}

module.exports = nextConfig