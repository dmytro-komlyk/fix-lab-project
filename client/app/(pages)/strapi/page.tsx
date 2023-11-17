import fetchData from './(components)/fetchData'
import ProductsSection from './(components)/ProductsSection'

export default async function IndexPage() {
  const subcategoryProductsUrl = `/products?populate=*`

  const subcategoryProductsData = await fetchData(subcategoryProductsUrl)

  return (
    <main className='mt-[89px] flex-auto'>
      <ProductsSection productsData={subcategoryProductsData} />
    </main>
  )
}
