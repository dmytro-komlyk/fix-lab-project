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
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '95.217.34.212',
        port: '30000',
        pathname: '/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
}

module.exports = nextConfig
