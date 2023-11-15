/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  images: {
    domains: ['95.217.34.212'],
    unoptimized: true,
  },
  serverRuntimeConfig: {
    apiURL: 'http://95.217.34.212:30000/trpc',
  },
}

module.exports = nextConfig
