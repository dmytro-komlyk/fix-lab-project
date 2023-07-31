import Image from 'next/image'
import MarkdownIt from 'markdown-it'
import { FiArrowUpRight } from 'react-icons/fi'
import { CiSearch } from 'react-icons/ci'
import { BiTimeFive } from 'react-icons/bi'
import { BsShield } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Link from 'next/link'

interface SubcategoryItem {
  id: number
  attributes: {
    img_content: {
      data: {
        attributes: {
          url: string
        }
      }
    }
    category: {
      data: {
        attributes: {
          title: string
          slug: string
        }
      }
    }
    title: string
    description: string
    guarantee?: string
    repair_time: string
    top_text_content: string
    text_content: string
  }
}

interface SubcategorySectionProps {
  subcategoryData: {
    data: SubcategoryItem[]
  }
}

const SubcategorySection: React.FC<SubcategorySectionProps> = ({
  subcategoryData,
}) => {
  const markdown = new MarkdownIt({
    html: true,
  })
  return (
    <div className=' bg-dark-blue'>
      <div className=' container  pt-[151px] pb-[39px]'>
        {subcategoryData.data.map(item => {
          const categoryTitle = item.attributes.category.data.attributes.title
          const categorySlug = item.attributes.category.data.attributes.slug
          return (
            <div className='flex gap-1 items-center' key={item.id}>
              <Link
                className='flex gap-1 items-center text-base text-[#3EB9F0] font-[400]'
                href={'/'}
              >
                <p> Головна</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <Link
                className='flex gap-1 items-center text-base text-[#3EB9F0] font-[400]'
                href={'/repair'}
              >
                <p> Ремонт</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <Link
                className='flex gap-1 items-center text-base text-[#3EB9F0] font-[400]'
                href={`/repair/${categorySlug}`}
              >
                <p> {categoryTitle}</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <p className='text-base text-[#3EB9F0] font-[400] opacity-70'>
                {' '}
                {item.attributes.title}
              </p>
            </div>
          )
        })}
        <div className='pt-[28px] '>
          <div>
            {subcategoryData.data.map((item: SubcategoryItem) => {
              const img = item.attributes.img_content.data.attributes.url
              return (
                <div className=' flex justify-between gap-[27px]' key={item.id}>
                  <div className='flex flex-col w-[516px]'>
                    <h2 className='text-2xl text-white-dis font-exo_2 font-[700] mb-8'>
                      {item.attributes.title}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: markdown.render(item.attributes.description),
                      }}
                      className='text-base text-white-dis font-[400] mb-[52px]'
                    ></div>
                    <button className='w-[304px]  h-[58px] rounded-xl bg-mid-blue text-white-dis font-mono text-base mb-[52px]'>
                      Безкоштовна діагностика
                    </button>

                    <h3>Швидкий звʼязок</h3>
                    <p>Подзвонити нам</p>
                    <div className='mb-[23px]'>
                      <p>Приїхати до нас</p>
                      <p>10:00 - 19:00</p>
                      <p>нд - вихідний</p>
                    </div>
                    <div className='text-center w-[409px] pl-[30px] py-[20px] flex items-center gap-[30px] rounded-xl bg-[#fff] bg-opacity-70 text-light-blue font-[500]  text-base mb-[52px]'>
                      <CiSearch size={58} color={'#1B37AA'} />
                      <p> Безкоштовна діагностика</p>
                    </div>
                    {item.attributes.guarantee && (
                      <div className='text-center w-[409px] pl-[30px] py-[20px] flex items-center gap-[30px] rounded-xl bg-[#fff] bg-opacity-70 text-light-blue font-[500]  text-base mb-[52px]'>
                        <BsShield size={58} color={'#1B37AA'} />
                        Гарантія до {item.attributes.guarantee}
                      </div>
                    )}
                    <div className='text-center w-[409px] pl-[30px] py-[20px] flex items-center gap-[30px] rounded-xl bg-[#fff] bg-opacity-70 text-light-blue font-[500]  text-base mb-[52px]'>
                      <BiTimeFive size={58} color={'#1B37AA'} />
                      Час ремонту від {item.attributes.repair_time}
                    </div>
                  </div>
                  <div className='flex flex-col w-[737px]'>
                    <Image
                      className='w-full max-h-[366px] rounded-2xl mb-14 object-cover'
                      src={img}
                      width={516}
                      height={366}
                      alt={item.attributes.title}
                      priority
                    />
                    <h3 className='  text-xl text-white-dis font-exo_2 font-semibold mb-8'>
                      {item.attributes.top_text_content}
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: markdown.render(item.attributes.text_content),
                      }}
                      className=' mb-14 text-base font-[400] text-white-dis'
                    ></div>
                    <div className='flex gap-5'>
                      <button className=' relative bg-light-green w-[356px] h-[116px] rounded-2xl'>
                        <p className=' w-[175px] text-start absolute bottom-[25px] left-[34px] text-lg text-[#FDFEFF] font-exo_2 font-semibold'>
                          Розрахувати вартість ремонту
                        </p>
                        <div className=' absolute top-[2px] right-[2px]'>
                          <FiArrowUpRight size={56} color={'#fff'} />
                        </div>
                      </button>
                      <button className=' relative bg-light-green w-[356px] h-[116px] rounded-2xl'>
                        <p className=' absolute bottom-[25px] left-[34px] text-lg text-[#FDFEFF] font-exo_2 font-semibold'>
                          Викликати курʼєра
                        </p>
                        <div className=' absolute top-[2px] right-[2px]'>
                          <FiArrowUpRight size={56} color={'#fff'} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubcategorySection
