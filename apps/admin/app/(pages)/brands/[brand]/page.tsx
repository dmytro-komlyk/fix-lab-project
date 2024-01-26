import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputBrandSchema as IBrand } from '@server/domain/brands/schemas/brand.schema'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { auth } from '@admin/app/(utils)/authOptions'
import EditBrandForm from '../(components)/EditBrandForm '

interface IContactAdminProps {
  params: {
    brand: string
  }
}

export const dynamic = 'force-dynamic'

const BrandPage: React.FC<IContactAdminProps> = async ({ params }) => {
  const session = await auth()
  const user = session?.user ? session.user : null

  const brandData = (await serverClient({
    user,
  }).brands.getBySlugBrand({
    slug: params.brand,
  })) as IBrand
  const allPicturesData = (await serverClient({
    user,
  }).images.getAllPictures()) as IImage[]

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container  relative flex flex-col px-8 '>
          <div className='z-[1] mb-8 flex items-center gap-1'>
            <Link
              className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
              href='/brands'
            >
              <p>Бренди</p> <MdKeyboardArrowRight size={30} />
            </Link>
            <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
              {brandData.title}
            </p>
          </div>
          <h2 className='mb-6 font-exo_2 text-2xl font-bold text-white-dis max-lg:text-xl '>
            {brandData.title}
          </h2>
          <EditBrandForm
            allPicturesData={allPicturesData}
            brandData={brandData}
          />
        </div>
      </section>
    </main>
  )
}

export default BrandPage
