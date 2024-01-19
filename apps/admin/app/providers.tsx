'use client'

import { NextUIProvider } from '@nextui-org/react'
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
    <NextUIProvider>
      <SessionProvider session={session}>
        <TrpcProvider session={session}>{children}</TrpcProvider>
      </SessionProvider>
    </NextUIProvider>
  )
}

export { Providers }
