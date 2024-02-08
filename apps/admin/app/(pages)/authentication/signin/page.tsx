import SignIn from '../(components)/SignIn'

export const dynamic = 'force-dynamic'

const SignInPage = () => {
  return (
    <main className='flex h-full flex-auto'>
      <section className='flex w-full justify-center bg-footer-gradient-linear-blue py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <SignIn />
        </div>
      </section>
    </main>
  )
}

export default SignInPage
