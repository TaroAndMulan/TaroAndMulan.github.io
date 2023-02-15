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
      {
        source: '/.well-known/microsoft-identity-association.json',
        destination: '/api/.well-known/microsoft-identity-association.json',
      }
    ]
  },
}

module.exports = nextConfig