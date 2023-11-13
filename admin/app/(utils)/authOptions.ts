import type { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const authConfig: AuthOptions = {
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

        const response = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
          try {
            const data = await response.text()

            if (data) {
              const user = {
                name: credentials.login,
                token: data,
              }
              return user as unknown as User
            }
            return null
          } catch (error) {
            return null
          }
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/authentication/signin',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      const modifiedSession = {
        ...session,
        user: token as any,
      }

      return modifiedSession
    },
  },
}
