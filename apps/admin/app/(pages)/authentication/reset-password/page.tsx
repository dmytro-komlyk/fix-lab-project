import ResetPassword from '../(components)/ResetPassword'

interface IResetPasswordPageProps {
  params: {}
  searchParams: {
    token: string
    id: string
  }
}

const ResetPasswordPage: React.FC<IResetPasswordPageProps> = ({
  searchParams,
}) => {
  return (
    <main className='flex h-full flex-auto'>
      <section className=' flex w-full justify-center bg-footer-gradient-linear-blue py-[60px]'>
        <div className='relative flex flex-col items-center justify-center'>
          <ResetPassword searchParams={searchParams} />
        </div>
      </section>
    </main>
  )
}

export default ResetPasswordPage
