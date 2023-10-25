import { AddressSection } from '@/app/(layouts)'
import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'
import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'
import {
  // getAllIssuesData,
  getSingleIssueData,
} from '@/app/(server)/api/service/modules/issueService'

import IssueSection from '../../(components)/IssueSection'

interface IndexProps {
  params: {
    issue: string
    gadget: string
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleIssueData = await getSingleIssueData(params.issue)
  const contactsData = await getAllContactsData()
  const singleGadgetData = await getSingleGadgetData(params.gadget)

  return (
    <main className='h-full flex-auto'>
      <IssueSection
        contactsData={contactsData}
        singleIssueData={singleIssueData}
        singleGadgetData={singleGadgetData}
      />
      <AddressSection contactsData={contactsData} />
    </main>
  )
}
export default Index

// export async function generateStaticParams({
//   params,
// }: {
//   params: { gadget: string }
// }) {
//   const issues = await getAllIssuesData()
//   const gadget = await getSingleGadgetData(params.gadget)

//   return issues.map(item => ({
//     gadget: gadget.slug,
//     issue: item.slug,
//   }))
// }
