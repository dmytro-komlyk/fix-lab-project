import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputBrandSchema } from '@server/domain/brands/schemas/brand.schema'
import type { imageSchema } from '@server/domain/images/schemas/image.schema'

import EmptySection from '../(components)/EmptySection'
import AddBrandForm from './(components)/AddBrandForm'
import BrandsList from './(components)/BrandsList'

export const dynamic = 'force-dynamic'

const BrandsPage = async () => {
  const brandsData =
    (await serverClient.brands.getAllBrands()) as outputBrandSchema[]
  const allImagesData =
    (await serverClient.images.getAllImages()) as imageSchema[]

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-1 flex-col gap-8 px-8'>
          <AddBrandForm allImagesData={allImagesData} />
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
