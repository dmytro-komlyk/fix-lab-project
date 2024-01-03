'use client'

import * as React from 'react'

import { TrpcProvider } from './(utils)/trpc/Provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <TrpcProvider>{children}</TrpcProvider>
}
