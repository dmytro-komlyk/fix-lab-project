import {
  AddressSection,
  BrokenSection,
  CallCourierSection,
  ColaborationSection,
  HeroSection,
} from './(layouts)'

export default function Home() {
  return (
    <main className='flex-auto h-max'>
      <HeroSection />
      <BrokenSection />
      <CallCourierSection />
      <ColaborationSection />
      <AddressSection />
    </main>
  )
}
