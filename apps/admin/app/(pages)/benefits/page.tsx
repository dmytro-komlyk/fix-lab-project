import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { outputBenefitSchema } from '@server/domain/benefits/schemas/benefit.schema'
import EmptySection from '../(components)/EmptySection'
import AddBenefitForm from './(components)/AddBenefitForm'
import BenefitsList from './(components)/BenefitsList'

export const dynamic = 'force-dynamic'

const BenefitsPage = async () => {
  const benefitsData =
    (await serverClient.benefits.getAll()) as outputBenefitSchema[]
  return (
    <main>
      <section className='bg-footer-gradient-linear-blue flex w-full min-h-[100vh] py-[60px]'>
        <div className='container relative flex flex-col gap-8 px-8 flex-1'>
          <AddBenefitForm />
          {benefitsData.length ? (
            <BenefitsList benefitsData={benefitsData} />
          ) : (
            <EmptySection />
          )}
        </div>
      </section>
    </main>
  )
}

export default BenefitsPage
