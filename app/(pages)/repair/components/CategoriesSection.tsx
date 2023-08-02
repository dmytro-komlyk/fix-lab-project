import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { CategoriesList } from './CategoriesList'



export interface CategoriesSectionProps {
  categoryData: {
    data: CategoryItem[]
  }
}
export interface CategoryItem {
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
        <CategoriesList categoryData={ categoryData} />
      </div>
    </div>
  )
}

export default CategoriesSection
