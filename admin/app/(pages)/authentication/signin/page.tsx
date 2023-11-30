import SignIn from '../(components)/SignIn'

export const runtime = 'edge'
export const revalidate = 3600

const SignInPage = () => {
  return (
    <main className='flex h-full flex-auto'>
      <section className=' bg-footer-gradient-linear-blue flex w-full justify-center py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <SignIn />
        </div>
      </section>
    </main>
  )
}

export default SignInPage
