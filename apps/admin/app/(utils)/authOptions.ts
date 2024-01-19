import { loginSchema } from '@server/domain/auth/schemas/auth.schema'
import { expiresInToMilliseconds } from '@server/helpers/time-converted.helper'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Session, User } from 'next-auth/types'
import { outputAuthSchema } from './../../../server/src/domain/auth/schemas/auth.schema'
import { serverClient } from './trpc/serverClient'

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: '../authentication/signin',
    newUser: '../authentication/signup',
  },
  // secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: expiresInToMilliseconds(
      process.env.NEXTAUTH_JWT_ACCESS_TOKEN_EXPIRATION as string,
    ),
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<outputAuthSchema | null> {
        const { login, password } = credentials
        const creds = await loginSchema.parseAsync({ email: login, password })
        const user = await serverClient({ user: null }).auth.login(creds)

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({
      token,
      user,
    }: {
      token: any
      user: User
      session: Session
    }): Promise<any> => {
      if (user) {
        token.accessToken = user.accessToken
        token.accessTokenExpires = user.accessTokenExpires
        token.id = user.id
      }

      return token
    },
    session: async ({
      session,
      token,
    }: {
      session: Session
      token: any
      user: User
    }): Promise<Session> => {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken as string,
          id: token.id,
        },
        error: token.error,
      }
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
