import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { outputBrandSchema } from '@server/domain/brands/schemas/brand.schema'
import { imageSchema } from '@server/domain/images/schemas/image.schema'
import EmptySection from '../(components)/EmptySection'
import AddBrandForm from './(components)/AddBrandForm'
import BrandsList from './(components)/BrandsList'

export const dynamic = 'force-dynamic'

const BrandsPage = async () => {
  const brandsData = (await serverClient.brands.getAll()) as outputBrandSchema[]
  const allImagesData = (await serverClient.images.getAll()) as imageSchema[]

  return (
    <main>
      <section className='bg-footer-gradient-linear-blue flex w-full min-h-[100vh] py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8 flex-1'>
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
