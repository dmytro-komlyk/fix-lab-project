import React from 'react'

import { AddressSection } from '@/app/(layouts)'
import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'

import IssueSection from '../../(components)/IssueSection'

interface IndexProps {
  params: {
    issues: string
    gadget: string
  }
}

const singleIssueData = [
  {
    _id: 'string',
    isActive: true,
    slug: 'diagnostic',
    title: 'Діагностика',
    description:
      'Будь-який ремонт смартфону у сервісному центрі FixLab починається з БЕЗКОШТОВНОЇ діагностики гаджета. <br />Так виявляються приховані дефекти, про які власник пристрою може i не знати.',
    price: 'від 200 грн',
    image: {
      src: '/app/public/images/for-business-table.png',
      alt: 'Діагностика',
      width: 730,
      height: 330,
    },
    metadata: {
      title: 'SEO',
      description: 'SEO',
      keywords: 'repair, maintenance',
    },
    richText: {
      title: 'Діагностика важлива!',
      description:
        'На пристрій потрапила вода, він упав i більше не вмикається або почав глючити? Без зволікань потрібно вирушати до сервісного центру FixLab.<br /> Інженери проведуть діагностику вашого пристрою, по можливості, проведуть експрес-ремонт. <br /> За необхідності ми завжди намагаємося увійти в положення свого клієнта i виконати діагностику та ремонт вашого гаджета в найкоротші терміни.',
    },
    info: [],
  },
  {
    _id: 'string1',
    isActive: true,
    slug: 'zamina-skla',
    title: 'Заміна скла',
    description:
      'Однією з найпоширеніших проблем з якими звертаються до нашого сервісного центру - це розбите скло на смартфонах та планшетах. <br /> Скло в сучасних гаджетах досить якісне та міцне, проте розбити його досить просто. Навіть якщо у вас наклеєне захисне скло, еце не гарнтує того що дисплей залишиться цілий після падіння або інших неприємностей.',
    price: 'від 200 грн',
    image: {
      src: '/app/public/images/for-business-table.png',
      alt: 'Діагностика',
      width: 730,
      height: 330,
    },
    metadata: {
      title: 'SEO',
      description: 'SEO',
      keywords: 'repair, maintenance',
    },
    richText: {
      title:
        'Переклеїти тільки розбите скло вашого дисплею можна не завжди, для цього має виконуватися ряд умов',
      description:
        'У вашому телефоні чи планшеті встановлений оригінальний дисплейний модуль <br /> LCD-матриця не пошкоджена: немає чорних плям або кольорових смуг <br /> Тачскріна працює по всьому периметру екрану, немає «мертвих» зон. <br /> Переклеювання скла можливе лише в тому випадку, якщо у вас стоїть оригінальний дисплей, переклеїти скло на копії – неможливо. <br /> Беззаперечним плюсом такої процедури є збереження оригінальної матриці та ціна даного виду ремонту. <br /> Серед мінусів можна відзначити термін виконання, адже переклеювання скла завжди займає більше часу, а ніж заміна дисплейного модуля в зборі.',
    },
    info: [
      {
        id: 1,
        icon: '',
        title: 'Безкоштовна діагностика',
        alt: 'Безкоштовна діагностика',
      },
      {
        id: 2,
        icon: '',
        title: 'Гарантія до 2 місяця',
        alt: 'Гарантія до 2 місяця',
      },
      {
        id: 3,
        icon: '',
        title: 'Ремонт від 5 годин',
        alt: 'Ремонт від 5 годин',
      },
    ],
  },
]

const Index: React.FC<IndexProps> = async ({ params }) => {
  // const singleIssueData = await getSingleIssueData(params.issues)

  const singleGadgetData = await getSingleGadgetData(params.gadget)
  return (
    <main className='h-full flex-auto'>
      <IssueSection
        singleIssueData={singleIssueData}
        singleGadgetData={singleGadgetData}
      />
      <AddressSection />
    </main>
  )
}
export default Index
