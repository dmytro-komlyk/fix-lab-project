/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1'],
    unoptimized: true,
  },
  output: 'standalone',
}

module.exports = nextConfig
