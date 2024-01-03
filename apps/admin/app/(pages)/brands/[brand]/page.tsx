import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { outputBrandSchema } from '@server/domain/brands/schemas/brand.schema'
import { imageSchema } from '@server/domain/images/schemas/image.schema'
import EditBrandForm from '../(components)/EditBrandForm '

interface IContactAdminProps {
  params: {
    brand: string
  }
}

export const dynamic = 'force-dynamic'

const BrandPage: React.FC<IContactAdminProps> = async ({ params }) => {
  const brandData = (await serverClient.brands.getBySlug(
    params.brand,
  )) as outputBrandSchema
  const allImagesData = (await serverClient.images.getAll()) as imageSchema[]

  return (
    <main>
      <section className='bg-footer-gradient-linear-blue flex w-full min-h-[100vh] py-[60px]'>
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
          <h2 className='mb-6 font-exo_2 text-2xl  font-bold text-white-dis max-lg:text-xl '>
            {brandData.title}
          </h2>
          <EditBrandForm allImagesData={allImagesData} brandData={brandData} />
        </div>
      </section>
    </main>
  )
}

export default BrandPage
