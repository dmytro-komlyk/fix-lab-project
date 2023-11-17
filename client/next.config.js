/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
    isrMemoryCacheSize: 0, // disable default in-memory caching
  },
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
}

module.exports = nextConfig
