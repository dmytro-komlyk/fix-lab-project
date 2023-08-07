import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'

export default function Home() {
  return (
    <main className='h-max flex-auto'>
      <HeroSection />
      <BrokenSection />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}
