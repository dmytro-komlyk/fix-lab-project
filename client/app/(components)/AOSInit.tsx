'use client'

import 'aos/dist/aos.css'

import AOS from 'aos'
import { useEffect } from 'react'

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      disable: 'phone',
      offset: 250,
      easing: 'ease-out-quad',
      duration: 1000,
      once: true,
    })
  }, [])

  return null
}
