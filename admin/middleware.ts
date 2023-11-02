export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/articles/:path*',
    '/gadgets/:path*',
    '/benefits/:path*',
    '/brands/:path*',
    '/issues/:path*',
    '/contacts/:path*',
    '/media/:path*',
  ],
}
