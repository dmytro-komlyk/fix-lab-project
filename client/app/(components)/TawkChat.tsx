'use client'

import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { useRef } from 'react'

function TawkChat(): JSX.Element {
  const tawkMessengerRef = useRef<any>()

  return (
    <div className='App'>
      <TawkMessengerReact
        propertyId='62c6a7cfb0d10b6f3e7b3cf1'
        widgetId='1g7bvv18l'
        ref={tawkMessengerRef}
      />
    </div>
  )
}

export default TawkChat
