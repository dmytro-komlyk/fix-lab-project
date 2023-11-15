/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: 'http://95.217.34.212:30000',
    NEXT_PUBLIC_SERVER_URL: 'http://95.217.34.212:30000/trpc',
  },
  images: {
    domains: ['95.217.34.212'],
    unoptimized: true,
  },
}

module.exports = nextConfig
