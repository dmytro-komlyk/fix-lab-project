import { auth } from '@admin/app/(utils)/next-auth/auth'
import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputBrandSchema as IBrand } from '@server/domain/brands/schemas/brand.schema'
import type { outputGadgetSchema as IGadget } from '@server/domain/gadgets/schemas/gadget.schema'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import type { outputIssueSchema as IIssue } from '@server/domain/issues/schemas/issue.schema'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import EditGadgetForm from '../(components)/EditGadgetForm '

interface IContactAdminProps {
  params: {
    gadget: string
  }
}

export const dynamic = 'force-dynamic'

const GadgetPage: React.FC<IContactAdminProps> = async ({ params }) => {
  const session = await auth()
  const user = session?.user ? session.user : null

  const gadgetData = (await serverClient({ user }).gadgets.getBySlugGadget({
    slug: params.gadget,
  })) as IGadget
  const issuesData = (await serverClient({
    user,
  }).issues.getAllIssues()) as IIssue[]
  const brandsData = (await serverClient({
    user,
  }).brands.getAllBrands()) as IBrand[]
  const iconsData = (await serverClient({
    user,
  }).images.getAllIcons()) as IImage[]
  return (
    <main className='flex h-full flex-auto'>
      <section className='w-full overflow-y-auto bg-footer-gradient-linear-blue  py-[60px]'>
        <div className='relative flex flex-col px-8'>
          <div className=' flex items-center gap-1 self-start'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/gadgets'
            >
              <p>Гаджети</p> <MdKeyboardArrowRight size={30} />
            </Link>

            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              {gadgetData.title}
            </p>
          </div>
          <h2 className='mb-6 self-center font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
            {gadgetData.title}
          </h2>
          <EditGadgetForm
            gadgetData={gadgetData}
            issuesData={issuesData}
            brandsData={brandsData}
            iconsData={iconsData}
          />
        </div>
      </section>
    </main>
  )
}

export default GadgetPage
