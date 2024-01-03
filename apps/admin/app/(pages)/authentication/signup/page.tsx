import SignUp from '../(components)/SignUp'

export const runtime = 'edge'
export const revalidate = 3600

const SignUpPage = () => {
  return (
    <main className='flex h-full flex-auto'>
      <section className=' flex w-full justify-center bg-footer-gradient-linear-blue py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <SignUp />
        </div>
      </section>
    </main>
  )
}

export default SignUpPage
