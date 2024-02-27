'use client'

import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { useRef } from 'react'

function TawkChat(): JSX.Element {
  const tawkMessengerRef = useRef<any>()

  return (
    <div className='App'>
      <TawkMessengerReact
        propertyId='654b827af2439e1631ed1982'
        widgetId='1henfbbhh'
        ref={tawkMessengerRef}
      />
    </div>
  )
}

export default TawkChat
