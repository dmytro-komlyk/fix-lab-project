import NextAuth from 'next-auth'

import { AuthConfig } from '@/authconfig'

const handler = NextAuth(AuthConfig)

export { handler as GET, handler as POST }
