import { httpBatchLink } from '@trpc/client'
import { appRouter } from 'server/src/domain/trpc/trpc.router'

// import { Backend_URL, Trpc } from "../../(lib)/constants";

// const url = Backend_URL + Trpc;

const url = process.env.NEXT_PUBLIC_TRPC_SERVER_URL as string

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url,
    }),
  ],
})
