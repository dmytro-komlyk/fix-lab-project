'use client'

import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { useRef } from 'react'

function TawkChat(): JSX.Element {
  const tawkMessengerRef = useRef<any>()

  return (
    <div className='App'>
      <TawkMessengerReact
        propertyId={process.env.NEXT_PUBLIC_TWANK_PROPERTY_ID}
        widgetId={process.env.NEXT_PUBLIC_TWANK_WIDGET_ID}
        ref={tawkMessengerRef}
      />
    </div>
  )
}

export default TawkChat
