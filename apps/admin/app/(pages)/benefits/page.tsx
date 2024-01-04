import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputBenefitSchema } from '@server/domain/benefits/schemas/benefit.schema'

import EmptySection from '../(components)/EmptySection'
import AddBenefitForm from './(components)/AddBenefitForm'
import BenefitsList from './(components)/BenefitsList'

export const dynamic = 'force-dynamic'

const BenefitsPage = async () => {
  const benefitsData =
    (await serverClient.benefits.getAll()) as outputBenefitSchema[]
  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-1 flex-col gap-8 px-8'>
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
