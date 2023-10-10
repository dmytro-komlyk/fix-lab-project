import React from 'react'

import {
  AddressSection,
  CallCourierSection,
  ColaborationSection,
} from '@/app/(layouts)'
import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'

import SingleGadgetSection from '../(components)/SingleGadgetSection'

interface IndexProps {
  params: {
    gadget: string
  }
}

const brandData = [
  {
    _id: '1',
    slug: 'apple',
    isActive: true,
    title: 'Apple',
    icon: {
      src: '/icons/brands/Apple_logo_black 2.svg',
      alt: 'Alt',
    },
    article:
      'Сервісний центр FixLab пропонує своїм клієнтам лише якісні та перевірені дисплеї. У нас є як зняті з телефонів донорів оригнальні дисплеї, так i копії гарної якості.',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '2',
    slug: 'samsung',
    isActive: true,
    title: 'Samsung',
    icon: {
      src: '/icons/brands/samsung.svg',
      alt: 'Alt',
    },
    article: 'Second Reparing Samsung phones...2',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '3',
    slug: 'xiaomi',
    isActive: true,
    title: 'Xiaomi',
    icon: {
      src: '/icons/brands/huawei.svg',
      alt: 'Alt',
    },
    article: 'Third Reparing Samsung phones...',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '4',
    slug: 'meizu',
    isActive: true,
    title: 'Meizu',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '4 Reparing Samsung phones... 4',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '5',
    slug: 'test',
    isActive: true,
    title: 'test',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article:
      'Заміна екрану на ваш смартфон чи планшет (іншими солвами - заміна дисплейного модуля) виконується нами за найвигіднішою у Києві ціною та з розу-мінням всіх технологій та процедур.',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '6',
    slug: 'test1',
    isActive: true,
    title: 'test1',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '6 Reparing Samsung phones... 6',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '15',
    slug: 'tes2',
    isActive: true,
    title: 'test2',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '7 Reparing Samsung phones... 7',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '7',
    slug: 'test3',
    isActive: true,
    title: 'test3',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '8 Reparing Samsung phones... 8',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '8',
    slug: 'test4',
    isActive: true,
    title: 'test4',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '9 Reparing Samsung phones... 9',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '9',
    slug: 'test5',
    isActive: true,
    title: 'test5',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '10 Reparing Samsung phones... 10',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '10',
    slug: 'test6',
    isActive: true,
    title: 'test6',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '11 Reparing Samsung phones... 11',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '11',
    slug: 'test7',
    isActive: true,
    title: 'test7',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '12 Reparing Samsung phones... 12',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '12',
    slug: 'test8',
    isActive: true,
    title: 'test8',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '13 Reparing Samsung phones... 13',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
  {
    _id: '13',
    slug: 'test9',
    isActive: true,
    title: 'test9',
    icon: {
      src: '/logo.svg',
      alt: 'Alt',
    },
    article: '14 Reparing Samsung phones... 14',
    metadata: {
      title: 'Reliable Maintenance and Restoration',
      description: 'We offer high-quality...',
      keywords: 'repair, maintenance',
    },
  },
]

const issuesData = [
  {
    _id: 'string',
    isActive: true,
    slug: 'diagnostic',
    title: 'Діагностика',
    description:
      'Будь-який ремонт смартфону у сервісному центрі FixLab починається з БЕЗКОШТОВНОЇ діагностики гаджета. <br />Так виявляються приховані дефекти, про які власник пристрою може i не знати.',
    price: 'від 200 грн',
    image: {
      src: '/app/public/logo.svg',
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
    info: [
      {
        id: 1,
        icon: {
          src: '/logo.svg',
          alt: 'Діагностика',
          width: 730,
          height: 330,
        },
        title: 'Безкоштовна діагностика',
        alt: 'Безкоштовна діагностика',
      },
      {
        id: 2,
        icon: {
          src: '/logo.svg',
          alt: 'Діагностика',
          width: 730,
          height: 330,
        },
        title: 'Гарантія до 2 місяця',
        alt: 'Гарантія до 2 місяця',
      },
      {
        id: 3,
        icon: {
          src: '/logo.svg',
          alt: 'Діагностика',
          width: 730,
          height: 330,
        },
        title: 'Ремонт від 5 годин',
        alt: 'Ремонт від 5 годин',
      },
    ],
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
      src: '/app/public/logo.svg',
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
        icon: {
          src: '/logo.svg',
          alt: 'Діагностика',
          width: 730,
          height: 330,
        },
        title: 'Безкоштовна діагностика',
        alt: 'Безкоштовна діагностика',
      },
      {
        id: 2,
        icon: {
          src: '/logo.svg',
          alt: 'Діагностика',
          width: 730,
          height: 330,
        },
        title: 'Гарантія до 2 місяця',
        alt: 'Гарантія до 2 місяця',
      },
      {
        id: 3,
        icon: {
          src: '/logo.svg',
          alt: 'Діагностика',
          width: 730,
          height: 330,
        },
        title: 'Ремонт від 5 годин',
        alt: 'Ремонт від 5 годин',
      },
    ],
  },
]

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleGadgetData = await getSingleGadgetData(params.gadget)
  return (
    <main className='flex-auto'>
      <SingleGadgetSection
        singleGadgetData={singleGadgetData}
        issuesData={issuesData}
        brandData={brandData}
      />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}

export default Index
