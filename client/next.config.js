/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_API_KEY: process.env.NEXT_PUBLIC_SERVER_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    domains: ['95.217.34.212', '95.217.34.212:30001'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '95.217.34.212',
        port: '30001',
        pathname: '/public/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
