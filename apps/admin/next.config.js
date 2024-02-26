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
    domains: ['185.65.244.84'],
    contentDispositionType: 'attachment',
    unoptimized: true,
  },
  output: 'standalone',
}

module.exports = nextConfig
