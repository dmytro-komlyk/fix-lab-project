import ForgotPassword from '../(components)/ForgotPassword'

export const runtime = 'edge'
export const revalidate = 3600

const ForgotPasswordPage = () => {
  return (
    <main className='flex h-full flex-auto'>
      <section className=' bg-footer-gradient-linear-blue flex w-full justify-center py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <ForgotPassword />
        </div>
      </section>
    </main>
  )
}

export default ForgotPasswordPage
