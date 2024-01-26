import { auth } from './app/(utils)/authOptions'

export const middleware = auth

export const config = {
  matcher: [
    // '/',
    // '/articles/:path*',
    // '/gadgets/:path*',
    // '/benefits/:path*',
    // '/brands/:path*',
    // '/contacts/:path*',
    // '/issues/:path*',
    // '/media/:path*',
  ],
}
