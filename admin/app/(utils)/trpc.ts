import type { AppRouter } from '@server/domain/trpc/trpc.router'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { tap } from '@trpc/server/observable'

const url = process.env.NEXT_PUBLIC_TRPC_SERVER_URL as string

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    () =>
      ({ op, next }) => {
        // console.log('->', op.type, op.path, op.input)

        return next(op).pipe(
          tap({
            next(result) {
              // console.log('<-', op.type, op.path, op.input, ':', result)

              return result
            },
          }),
        )
      },
    httpBatchLink({ url }),
  ],
})
