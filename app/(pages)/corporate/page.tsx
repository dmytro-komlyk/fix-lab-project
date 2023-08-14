import React from 'react'

import { AddressSection } from '@/app/(layouts)/AddressSection'
import { CallCourierSection } from '@/app/(layouts)/CallCourierSection'
import { ColaborationSection } from '@/app/(layouts)/ColaborationSection'
import IconCourier from '@/public/icons/icon-courier.svg'
import IconFastArrival from '@/public/icons/icon-fast-arrival.svg'
import IconGuard from '@/public/icons/icon-guard.svg'
import IconNotebook from '@/public/icons/icon-notebook.svg'
import IconPc from '@/public/icons/icon-pc.svg'
import IconPhone from '@/public/icons/icon-phone.svg'
import IconPrinter from '@/public/icons/icon-printer.svg'
import IconServers from '@/public/icons/icon-servers.svg'
import IconTablet from '@/public/icons/icon-tablet.svg'
import IconWorkTime from '@/public/icons/icon-work-time.svg'
import IconZoom from '@/public/icons/icon-zoom.svg'

// import getData from '@/app/(server)/api/service/getData'
import ForBusinessSection from './(components)/ForBusinessSection'

const sectionData = {
  path: 'Для Бизнесу',
  info: {
    title: 'В офісі зламалися компʼютери?',
    benefits: [
      {
        id: 1,
        icon: IconZoom,
        alt: 'Безкоштовна діагностика',
        title: 'Безкоштовна діагностика',
      },
      {
        id: 2,
        icon: IconGuard,
        alt: 'Гарантія до 3 місяців',
        title: `Гарантія до 3 місяців`,
      },
      {
        id: 3,
        icon: IconWorkTime,
        alt: 'Ремонт від 3 годин',
        title: 'Ремонт від 3 годин',
      },
      {
        id: 4,
        icon: IconCourier,
        alt: 'Виклик курʼєра',
        title: 'Виклик курʼєра',
      },
      {
        id: 5,
        icon: IconFastArrival,
        alt: 'Швидкий виїзд до офісу',
        title: 'Швидкий виїзд до офісу',
      },
    ],
    description:
      'Обслуговуємо гаджети для корпоративних клієнтів по всій Україні.',
  },
  officeGadgets: {
    title: 'Яке офісне обладнання ремонтуємо',
    gadgets: [
      {
        id: 1,
        icon: IconPc,
        alt: 'Копʼютери',
        title: 'Копʼютери',
      },
      {
        id: 2,
        icon: IconNotebook,
        alt: 'Ноутбуки',
        title: 'Ноутбуки',
      },
      {
        id: 3,
        icon: IconPrinter,
        alt: 'Принтери / МФУ',
        title: 'Принтери / МФУ',
      },
      {
        id: 4,
        icon: IconServers,
        alt: 'Сервери / Мережеве обладнання',
        title: `Сервери / Мережеве обладнання`,
      },
      {
        id: 5,
        icon: IconPhone,
        alt: 'Телефони',
        title: 'Телефони',
      },
      {
        id: 6,
        icon: IconTablet,
        alt: 'Планшети',
        title: 'Планшети',
      },
    ],
  },
}

export default async function Corporate() {
  // const sectionDataUrl = ``
  // const sectionData = await getData(sectionDataUrl)

  return (
    <main className='h-full flex-auto'>
      <ForBusinessSection sectionData={sectionData} />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}
