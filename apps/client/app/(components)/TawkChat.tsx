'use client'

import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { useRef } from 'react'
import { TWANK_PROPERTY_ID, TWANK_WIDGET_ID } from '../(lib)/constants'

function TawkChat(): JSX.Element {
  const tawkMessengerRef = useRef<any>()

  return (
    <div className='App'>
      <TawkMessengerReact
        propertyId={TWANK_PROPERTY_ID}
        widgetId={TWANK_WIDGET_ID}
        ref={tawkMessengerRef}
      />
    </div>
  )
}

export default TawkChat
