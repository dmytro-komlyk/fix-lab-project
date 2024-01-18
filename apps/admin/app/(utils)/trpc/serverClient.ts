import { appRouter, createCallerFactory } from '@server/domain/trpc/trpc.router'
import { createContext } from './context'

const createCaller = createCallerFactory(appRouter)
export const serverClient = createCaller(await createContext())
