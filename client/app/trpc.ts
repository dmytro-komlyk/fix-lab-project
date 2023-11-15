import type { AppRouter } from '@server/domain/trpc/trpc.router'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${serverRuntimeConfig.apiURL}`,
    }),
  ],
})
