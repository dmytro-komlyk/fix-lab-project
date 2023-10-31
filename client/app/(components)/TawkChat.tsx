'use client'

import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { useRef } from 'react'

function TawkChat(): JSX.Element {
  const tawkMessengerRef = useRef<any>()

  return (
    <div className='App'>
      <TawkMessengerReact
        propertyId='65401a16f2439e1631ea1206'
        widgetId='1he16bqao'
        ref={tawkMessengerRef}
      />
    </div>
  )
}

export default TawkChat
