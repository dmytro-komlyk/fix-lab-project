/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
  env: {
    NEXT_PUBLIC_BASE_URL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    NEXT_PUBLIC_SERVER_URL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    NEXT_PUBLIC_TRPC_SERVER_URL: `${process.env.NEXT_PUBLIC_TRPC_SERVER_URL}`,
  },
  images: {
    domains: ['95.217.34.212'],
    contentDispositionType: 'attachment',
    unoptimized: true,
  },
  output: 'standalone',
}

module.exports = nextConfig
