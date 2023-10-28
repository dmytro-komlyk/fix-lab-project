import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import getData from '@/app/(server)/api/service/admin/getData'

import EditIssuesForm from '../(components)/EditIssueForm '

interface IIssueAdminProps {
  params: {
    issue: string
  }
}

const IssuePage: React.FC<IIssueAdminProps> = async ({ params }) => {
  const issueUrl = `/issues/${params.issue}`
  const benefitsUrl = `/benefits/all`

  const issueData = await getData(issueUrl)
  const benefitsData = await getData(benefitsUrl)
  return (
    <main className=' flex flex-auto'>
      <section className=' w-full overflow-hidden  bg-footer-gradient-linear-blue  py-[60px]'>
        <div className='relative flex flex-col px-8'>
          <div className='z-[1] mb-8 flex items-center gap-1'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/issues'
            >
              <p>Послуги</p> <MdKeyboardArrowRight size={30} />
            </Link>

            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              {issueData.title}
            </p>
          </div>
          <h2 className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
            {issueData.title}
          </h2>
          <EditIssuesForm issueData={issueData} benefitsData={benefitsData} />
        </div>
      </section>
    </main>
  )
}

export default IssuePage
