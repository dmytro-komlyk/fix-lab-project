import type { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL
export const AuthConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        login: { label: 'login', type: 'text', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.login || !credentials.password) {
          return null
        }
        const res = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        if (res.status === 201) {
          return res as unknown as User
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
}
