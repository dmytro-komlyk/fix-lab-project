import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@trpc/trpc.router'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://95.217.34.212:30000/trpc`,
    }),
  ],
})
