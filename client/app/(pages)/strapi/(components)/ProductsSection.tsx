import Link from 'next/link'

export interface ProductItem {
  data: any
  id: number
  attributes: {
    discount?: number
    price: number
    description: string
    img: {
      data: {
        attributes: {
          url: string
          width: number
          height: number
        }
      }[]
    }
    title: string
    sizes: {
      data: {
        id: number
        attributes: {
          size: string
        }
      }[]
    }
    colors: {
      data: {
        id: number
        attributes: {
          name: string
        }
      }[]
    }
    reviews: {
      data: {
        id: number
        attributes: {
          comment: string
          rating: number
          name: string
          createdAt: string
        }
      }[]
    }
    page: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    category: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    subcategory: {
      data: {
        attributes: {
          slug: string
        }
      }
    }
    isNewProduct: boolean
  }
}
interface ProductsSectionProps {
  productsData: {
    meta: {
      pagination: {
        total: number
      }
    }
    data: ProductItem[]
  }
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ productsData }) => {
  return (
    <section className='pb-14'>
      <ul className='container flex flex-wrap items-center justify-center gap-6'>
        {productsData.data.map(item => {
          return (
            <li
              className='relative transition-transform duration-300 hover:scale-[1.03] focus:scale-[1.03]'
              key={item.id}
            >
              <Link href={`/strapi/${item.id}`}>
                <div className='bg-white-dis flex w-full flex-col justify-start gap-2 rounded-b-2xl p-2'>
                  <h3 className='font-exo_2 text-md text-black-dis line-clamp-2 text-left font-semibold '>
                    {item.attributes.title}
                  </h3>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ProductsSection
