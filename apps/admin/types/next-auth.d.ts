import 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }

  interface User {
    name?: string
    email?: string | null
    id?: string
    refreshToken?: string
    accessToken?: string
  }
}

import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    refreshToken?: string
    accessToken?: string
  }
}
