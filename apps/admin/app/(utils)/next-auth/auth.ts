import { SERVER_API_URL } from '@admin/app/(lib)/constants'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import { PrismaClient } from '@prisma/client'
import { expiresInToMilliseconds } from '@server/helpers/time-converted.helper'
import type { Session, User } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// const prisma = new PrismaClient()

export const authOptions: any = {
  debug: true,
  // adapter: PrismaAdapter(prisma),
  pages: {
    error: '../authentication/signin',
    signIn: '../authentication/signin',
    newUser: '../authentication/signup',
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
      async authorize(credentials): Promise<User | null> {
        try {
          const response = await fetch(`${SERVER_API_URL}/trpc/auth.login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.login,
              password: credentials.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
          const {
            result: { data: user },
          } = await response.json()
          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: expiresInToMilliseconds(
      process.env.NEXTAUTH_JWT_ACCESS_TOKEN_EXPIRATION as string,
    ),
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: User }): Promise<any> => {
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
    }): Promise<any> => {
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
