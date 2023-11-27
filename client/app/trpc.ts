import type { AppRouter } from '@server/domain/trpc/trpc.router'
import {
  createTRPCProxyClient,
  httpBatchLink,
  httpLink,
  loggerLink,
  splitLink,
} from '@trpc/client'
import fetchPonyfill from 'fetch-ponyfill'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    // devtoolsLink({
    //   enabled: process.env.NODE_ENV === 'development',
    // }),
    splitLink({
      condition(op) {
        // check for context property `skipBatch`
        return op.context.skipBatch === true
      },
      // when condition is true, use normal request
      true: httpLink({
        // vercel issue with fetch undici
        fetch: fetchPonyfill().fetch,
        url: `${process.env.NEXT_PUBLIC_TRPC_SERVER_URL}`,
      }),
      // when condition is false, use batching
      false: httpBatchLink({
        fetch: fetchPonyfill().fetch,
        url: `${process.env.NEXT_PUBLIC_TRPC_SERVER_URL}`,
      }),
    }),
    loggerLink({
      enabled: opts =>
        opts.direction === 'down' && opts.result instanceof Error,
    }),
  ],
})
