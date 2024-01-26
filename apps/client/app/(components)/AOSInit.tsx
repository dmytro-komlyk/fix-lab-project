'use client'

import 'aos/dist/aos.css'

import AOS from 'aos'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const AOSInit = () => {
  const pathname = usePathname()
  useEffect(() => {
    AOS.init({
      disable: window.innerWidth < 768,
      offset: 250,
      easing: 'ease-out-quad',
      duration: 1000,
      once: true,
    })
  }, [pathname])

  return null
}
