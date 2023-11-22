/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    NEXT_PUBLIC_SERVER_URL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    NEXT_PUBLIC_TRPC_SERVER_URL: `${process.env.NEXT_PUBLIC_TRPC_SERVER_URL}`,
  },
  images: {
    domains: ['95.217.34.212'],
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
