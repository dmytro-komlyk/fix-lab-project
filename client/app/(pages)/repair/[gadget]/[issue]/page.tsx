import { AddressSection } from '@/app/(layouts)'
import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'
import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'
import {
  getAllIssuesData,
  getSingleIssueData,
} from '@/app/(server)/api/service/modules/issueService'

import IssueSection from '../../(components)/IssueSection'

interface IndexProps {
  params: {
    issue: string
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

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleIssueData = await getSingleIssueData(params.issue)
  const contactsData = await getAllContactsData()
  const singleGadgetData = await getSingleGadgetData(params.gadget)

  return (
    <main className='h-full flex-auto'>
      <IssueSection
        contactsData={contactsData}
        brandData={brandData}
        singleIssueData={singleIssueData}
        singleGadgetData={singleGadgetData}
      />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
export default Index

export async function generateStaticParams({
  params,
}: {
  params: { gadget: string }
}) {
  const issues = await getAllIssuesData()
  const gadget = await getSingleGadgetData(params.gadget)

  return issues.map(item => ({
    gadget: gadget.slug,
    issue: item.slug,
  }))
}
