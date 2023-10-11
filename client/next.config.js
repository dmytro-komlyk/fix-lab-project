/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_API_KEY: process.env.NEXT_PUBLIC_SERVER_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  images: {
    domains: ['res.cloudinary.com', 'http://95.217.34.212:30000'],
  },
}

module.exports = nextConfig
