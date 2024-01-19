import 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface User {
    id: number
    email: string
    name: string
    accessToken: string
    accessTokenExpires: number
  }

  interface Session extends DefaultSession {
    user: User
    expires: string
    error: string
  }
}
