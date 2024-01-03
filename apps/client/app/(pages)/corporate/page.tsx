import { AddressSection } from '@client/app/(layouts)'
import { CallCourierSection } from '@client/app/(layouts)/CallCourierSection'
import { ColaborationSection } from '@client/app/(layouts)/ColaborationSection'
import { serverClient } from '@client/app/(utils)/trpc/serverClient'
import IconNotebook from '@client/public/icons/icon-notebook.svg'
import IconPc from '@client/public/icons/icon-pc.svg'
import IconPhone from '@client/public/icons/icon-phone.svg'
import IconPrinter from '@client/public/icons/icon-printer.svg'
import IconServers from '@client/public/icons/icon-servers.svg'
import IconTablet from '@client/public/icons/icon-tablet.svg'

import ForBusinessSection from './(components)/ForBusinessSection'

const sectionData = {
  benefits: [
    'Безкоштовна діагностика',
    'Гарантія до 3 місяців',
    'Ремонт від 3 годин',
    'Виклик курʼєра',
    'Швидкий виїзд до офісу',
  ],
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
}

export const dynamic = 'force-dynamic'

export default async function Corporate() {
  const contactsDataInit = await serverClient.contacts.getAllPublished()
  const benefitsAll = await serverClient.benefits.getAllPublished()
  const benefits = benefitsAll.filter(benefit =>
    sectionData.benefits.includes(benefit.title),
  )
  const sectionDataInit = { ...sectionData, benefits }

  return (
    <main className='h-full flex-auto'>
      <ForBusinessSection
        sectionDataInit={sectionDataInit}
        contactsDataInit={contactsDataInit}
      />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection contactsDataInit={contactsDataInit} />
    </main>
  )
}
