import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from 'server/src/domain/trpc/trpc.router'

export const trpc = createTRPCReact<AppRouter>({})
