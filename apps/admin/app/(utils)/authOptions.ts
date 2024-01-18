import { loginSchema } from '@server/domain/auth/schemas/auth.schema'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Session, User } from 'next-auth/types'
import { outputAuthSchema } from './../../../server/src/domain/auth/schemas/auth.schema'
import { serverClient } from './trpc/serverClient'

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: '/authentication/signin',
    newUser: '/authentication/signup',
  },
  // secret: process.env.NEXTAUTH_SECRET,
  // session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<outputAuthSchema | null> {
        const { login, password } = credentials
        const creds = await loginSchema.parseAsync({ email: login, password })

        const user = await serverClient.auth.login(creds)

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: User }): Promise<JWT> => {
      if (user) {
        token = user
      }
      return token
    },
    session: async ({
      session,
      token,
    }: {
      session: Session
      token: JWT
    }): Promise<Session> => {
      session.user = token
      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
