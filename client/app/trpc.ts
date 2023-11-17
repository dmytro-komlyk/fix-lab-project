import type { AppRouter } from '@server/domain/trpc/trpc.router'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_TRPC_SERVER_URL}`,
    }),
  ],
})
