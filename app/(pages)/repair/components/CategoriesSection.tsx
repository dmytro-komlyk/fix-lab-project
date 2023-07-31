import Link from 'next/link'
import Image from 'next/image'
import { MdKeyboardArrowRight } from 'react-icons/md'

interface CategoryItem {
  id: number
  attributes: {
    slug: string
    title: string
    img: {
      data: {
        attributes: {
          url: string
          height: number
          width: number
        }
      }
    }
  }
}

interface CategoriesSectionProps {
  categoryData: {
    data: CategoryItem[]
  }
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categoryData,
}) => {
  return (
    <div className=' container flex flex-col pt-[151px]'>
      <div className='flex gap-1 items-center'>
        <Link
          className='flex gap-1 items-center text-base text-[#3EB9F0] font-[400]'
          href={'/'}
        >
          <p> Головна</p> <MdKeyboardArrowRight size={30} />
        </Link>

        <p className='text-base text-[#3EB9F0] font-[400] opacity-70'>Ремонт</p>
      </div>
      <div className='flex justify-between pt-[28px] pb-[102px]'>
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <h3>Що зламалося?</h3>
            <p>Наша місія - давати життя гаджетам!</p>
            <button>Миттєва консультація</button>
          </div>
          <div className='flex flex-col'>
            <h3>Швидкий звʼязок</h3>
            <p>Подзвонити нам</p>
            <p>Приїхати до нас</p>
            <div className='flex flex-col'>
              <p>10:00 - 19:30</p>
              <p>нд - вихідний</p>
            </div>
          </div>
        </div>
        <ul className='flex flex-wrap gap-6'>
          {categoryData.data.map(item => {
            const categoryPath = item.attributes.slug
            const img = item.attributes.img.data.attributes.url
            const width = item.attributes.img.data.attributes.width
            const height = item.attributes.img.data.attributes.height

            console.log(item.attributes.img.data.attributes)
            return (
              <li key={item.id}>
                <Link href={`/repair/${categoryPath}`}>
                  <div className='w-[302px] h-[261px] relative bg-dark-blue  flex rounded-2xl'>
                    <Image
                      className=' absolute top-8 right-8'
                      src={img}
                      width={width}
                      height={height}
                      alt={item.attributes.title}
                    />
                    <h3 className=' absolute  bottom-8 left-8 text-white-dis font-semibold text-xl max-w-[151px]'>
                      {item.attributes.title}
                    </h3>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CategoriesSection
