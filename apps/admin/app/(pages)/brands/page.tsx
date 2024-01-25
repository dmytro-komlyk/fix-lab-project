import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputBrandSchema as IBrand } from '@server/domain/brands/schemas/brand.schema'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'

import { auth } from '@admin/app/(utils)/authOptions'
import EmptySection from '../(components)/EmptySection'
import AddBrandForm from './(components)/AddBrandForm'
import BrandsList from './(components)/BrandsList'

export const dynamic = 'force-dynamic'

const BrandsPage = async () => {
  const session = await auth()
  const user = session?.user ? session.user : null
  const brandsData = (await serverClient({
    user,
  }).brands.getAllBrands()) as IBrand[]
  const allPicturesData = (await serverClient({
    user,
  }).images.getAllPictures()) as IImage[]

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-1 flex-col gap-8 px-8'>
          <AddBrandForm allPicturesData={allPicturesData} />
          {brandsData.length ? (
            <BrandsList brandsData={brandsData} />
          ) : (
            <EmptySection />
          )}
        </div>
      </section>
    </main>
  )
}

export default BrandsPage
