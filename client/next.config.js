/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_API_KEY: process.env.NEXT_PUBLIC_SERVER_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
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
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
