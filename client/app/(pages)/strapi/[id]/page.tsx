import fetchData from '../(components)/fetchData'
import GeneralInfo from '../(components)/GeneralInfo'

interface IndexPageProps {
  params: {
    id: number
  }
}

export default async function IndexPage({ params }: IndexPageProps) {
  const productUrl = `/products/${params.id}`
  const productData = await fetchData(productUrl)

  return (
    <main className='mt-[89px] flex-auto'>
      <GeneralInfo productItem={productData} />
    </main>
  )
}
