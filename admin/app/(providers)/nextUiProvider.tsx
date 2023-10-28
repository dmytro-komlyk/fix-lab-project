'use client'

// eslint-disable-next-line import/no-extraneous-dependencies
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'

function NextUiProvider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>
}

export default NextUiProvider
