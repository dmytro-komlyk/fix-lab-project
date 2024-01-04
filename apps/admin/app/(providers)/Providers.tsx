'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { TrpcProvider } from '../(utils)/trpc/Provider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TrpcProvider>
      <NextUIProvider>
        <SessionProvider>{children}</SessionProvider>
      </NextUIProvider>
    </TrpcProvider>
  )
}

export default Providers
