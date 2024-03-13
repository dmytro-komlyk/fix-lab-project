/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  },
  images: {
    // domains: ['localhost', '185.65.244.84', 'fixlab.pp.ua'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/public/**',
      },
    ],
    // formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
}

module.exports = nextConfig
