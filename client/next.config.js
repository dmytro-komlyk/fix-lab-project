/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.watchOptions = {
        poll: 60000, // 60 seconds in milliseconds
        aggregateTimeout: 300,
      }
    }

    return config
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  images: {
    domains: ['95.217.34.212'],
    unoptimized: true,
  },
}

module.exports = nextConfig
