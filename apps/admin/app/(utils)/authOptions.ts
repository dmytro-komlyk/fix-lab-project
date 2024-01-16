import { loginSchema } from '@server/domain/auth/schemas/auth.schema'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Session, User } from 'next-auth/types'
import { serverClient } from './trpc/serverClient'

// async function refreshAccessToken(tokenObject: JWT) {
//   try {
//     // Get a new set of tokens with a refreshToken
//     const tokenResponse = await axios.post(
//       process.env.APP_URL + 'auth/refreshToken',
//       {
//         token: tokenObject.refreshToken,
//       },
//     )

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
//     }
//   } catch (error) {
//     return {
//       ...tokenObject,
//       error: 'RefreshAccessTokenError',
//     }
//   }
// }

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
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
      async authorize(credentials: any, req): Promise<any> {
        const { login, password, ...restCredentials } = credentials
        const creds = await loginSchema.parseAsync({ email: login, password })
        const { item: user } = await serverClient.auth.login(creds)
        console.log(user, '2')
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
      // console.log({ ...token, ...user }, 'JWT')
      return { ...token, ...user }
    },
    session: async ({
      session,
      token,
    }: {
      session: Session
      token: JWT
    }): Promise<Session> => {
      // console.log(session, token, 'CATCH')
      session.user = token
      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
