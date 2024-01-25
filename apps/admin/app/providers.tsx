'use client'

import { NextUIProvider } from '@nextui-org/system'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { Session } from 'next-auth'
import { TrpcProvider } from './(utils)/trpc/Provider'

const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) => {
  return (
    <SessionProvider session={session}>
      <TrpcProvider session={session}>
        <NextUIProvider>{children} </NextUIProvider>
      </TrpcProvider>
    </SessionProvider>
  )
}

export { Providers }
