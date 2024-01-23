import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputBenefitSchema } from '@server/domain/benefits/schemas/benefit.schema'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { auth } from '@admin/app/(utils)/authOptions'
import EditBenefitForm from '../(components)/EditBenefitForm '

interface IBenefitAdminProps {
  params: {
    benefit: string
  }
}

export const dynamic = 'force-dynamic'

const BenefitPage: React.FC<IBenefitAdminProps> = async ({ params }) => {
  const session = await auth()
  const user = session?.user ? session.user : null
  const benefitData = (await serverClient({
    user,
  }).benefits.getByIdBenefit({
    id: params.benefit,
  })) as outputBenefitSchema

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container  relative flex flex-col  px-8 '>
          <div className='z-[1] mb-8 flex items-center gap-1'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/benefits'
            >
              <p>Послуги сервісного обслуговування</p>
              <MdKeyboardArrowRight size={30} />
            </Link>
            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              {benefitData.title}
            </p>
          </div>
          <h2 className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
            {benefitData.title}
          </h2>
          <EditBenefitForm benefitData={benefitData} />
        </div>
      </section>
    </main>
  )
}

export default BenefitPage
