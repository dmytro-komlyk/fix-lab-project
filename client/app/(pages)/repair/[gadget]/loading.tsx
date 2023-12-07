function Loading() {
  return (
    <main className='flex-auto'>
      <section className='bg-dark-blue flex min-h-screen w-full'>
        <div className='container flex flex-col items-center justify-evenly md:justify-center'>
          <div className='relative flex items-center justify-center'>
            <div className='loader-icon1 loader' />
            <div className='loader-icon2 loader' />
            <div className='loader-icon3 loader' />
            <p className='bg-300% animate-gradient from-dodger-blue via-dark-blue to-mid-green bg-gradient-to-r bg-clip-text text-base font-bold uppercase text-transparent md:text-xl'>
              Завантаження
            </p>
          </div>
        </div>
        <div />
      </section>
    </main>
  )
}

export default Loading
