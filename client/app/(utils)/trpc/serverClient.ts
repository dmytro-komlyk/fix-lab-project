import { appRouter } from '@server/domain/trpc/trpc.router'
import { httpBatchLink } from '@trpc/client'

import { TRPC_URL } from '../../(lib)/constants'

const url = TRPC_URL

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url,
    }),
  ],
})
