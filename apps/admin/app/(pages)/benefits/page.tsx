export const dynamic = 'force-dynamic'

const BenefitsPage = async () => {
  // const session = await auth()
  // const user = session?.user ? session.user : null

  // const benefitsData = (await serverClient({
  //   user,
  // }).benefits.getAllBenefits()) as IBenefit[]
  // const iconsData = (await serverClient({
  //   user,
  // }).images.getAllIcons()) as IImage[]

  return (
    <main>
      <section className='flex min-h-[100vh] w-full bg-footer-gradient-linear-blue py-[60px]'>
        <div className='container relative flex flex-1 flex-col gap-8 px-8'>
          {/* <AddBenefitForm iconsData={iconsData} />
          {benefitsData.length ? (
            <BenefitsList benefitsData={benefitsData} />
          ) : (
            <EmptySection />
          )} */}
        </div>
      </section>
    </main>
  )
}

export default BenefitsPage
