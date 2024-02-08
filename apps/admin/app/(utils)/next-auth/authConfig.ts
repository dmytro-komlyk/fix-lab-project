import type { outputAuthSchema } from '@server/domain/auth/schemas/auth.schema'
import { loginSchema } from '@server/domain/auth/schemas/auth.schema'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { serverClient } from '../trpc/serverClient'

export default {
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
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
