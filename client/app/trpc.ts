import type { AppRouter } from '@server/domain/trpc/trpc.router'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://95.217.34.212:30000/trpc`,
    }),
  ],
})
