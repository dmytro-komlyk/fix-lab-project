import { appRouter } from '@server/domain/trpc/trpc.router'
import { httpBatchLink } from '@trpc/client'

import { SERVER_TRPC_URL } from '../../(lib)/constants'

const url = SERVER_TRPC_URL

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url,
    }),
  ],
})
