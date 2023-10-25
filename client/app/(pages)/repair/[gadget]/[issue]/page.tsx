import { AddressSection } from '@/app/(layouts)'
// import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'
// import { getSingleGadgetData } from '@/app/(server)/api/service/modules/gadgetService'
// import { getSingleIssueData } from '@/app/(server)/api/service/modules/issueService'
import fetchDataSSR from '@/app/(server)/api/service/helpers/fetchDataSSR'

import IssueSection from '../../(components)/IssueSection'

interface IndexProps {
  params: {
    issue: string
    gadget: string
  }
}

const Index: React.FC<IndexProps> = async ({ params }) => {
  const singleIssueData = await fetchDataSSR(
    `/issues/find-by-slug/${params.issue}`,
  )
  const contactsData = await fetchDataSSR('/contacts')
  const singleGadgetData = await fetchDataSSR(
    `/gadgets/find-by-slug/${params.gadget}`,
  )
  // const singleIssueData = await getSingleIssueData(params.issue)
  // const contactsData = await getAllContactsData()
  // const singleGadgetData = await getSingleGadgetData(params.gadget)

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

// !!!!!!!!!!!!!!!!!!!!!!!!! Протрібно для SSG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// export async function generateStaticParams({
//   params,
// }: {
//   params: { gadget: string }
// }) {
//   const gadget = await fetchDataSSR(`/gadgets/find-by-slug/${params.gadget}`)

//   // const gadget = await getSingleGadgetData(params.gadget)
//   return gadget.issues.map((item: { slug: string }) => ({
//     gadget: gadget.slug,
//     issue: item.slug,
//   }))
// }
