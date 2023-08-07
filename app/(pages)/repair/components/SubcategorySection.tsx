import MarkdownIt from 'markdown-it'
import Image from 'next/image'
import Link from 'next/link'
import { BiTimeFive } from 'react-icons/bi'
import { BsShield } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { FiArrowUpRight } from 'react-icons/fi'
import { MdKeyboardArrowRight } from 'react-icons/md'

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
      <div className=' container  pb-[39px] pt-[151px]'>
        {subcategoryData.data.map(item => {
          const categoryTitle = item.attributes.category.data.attributes.title
          const categorySlug = item.attributes.category.data.attributes.slug
          return (
            <div className='flex items-center gap-1' key={item.id}>
              <Link
                className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
                href='/'
              >
                <p> Головна</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <Link
                className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
                href='/repair'
              >
                <p> Ремонт</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <Link
                className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0]'
                href={`/repair/${categorySlug}`}
              >
                <p> {categoryTitle}</p> <MdKeyboardArrowRight size={30} />
              </Link>
              <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
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
                  <div className='flex w-[516px] flex-col'>
                    <h2 className='mb-8 font-exo_2 text-2xl font-bold text-white-dis'>
                      {item.attributes.title}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: markdown.render(item.attributes.description),
                      }}
                      className='mb-[52px] text-base font-[400] text-white-dis'
                    />
                    <button className='mb-[52px]  h-[58px] w-[304px] rounded-xl bg-mid-blue font-mono text-base text-white-dis'>
                      Безкоштовна діагностика
                    </button>

                    <h3>Швидкий звʼязок</h3>
                    <p>Подзвонити нам</p>
                    <div className='mb-[23px]'>
                      <p>Приїхати до нас</p>
                      <p>10:00 - 19:00</p>
                      <p>нд - вихідний</p>
                    </div>
                    <div className='mb-[52px] flex w-[409px] items-center gap-[30px] rounded-xl bg-[#fff]/70 py-[20px] pl-[30px] text-center text-base  font-[500] text-light-blue'>
                      <CiSearch size={58} color='#1B37AA' />
                      <p> Безкоштовна діагностика</p>
                    </div>
                    {item.attributes.guarantee && (
                      <div className='mb-[52px] flex w-[409px] items-center gap-[30px] rounded-xl bg-[#fff]/70 py-[20px] pl-[30px] text-center text-base  font-[500] text-light-blue'>
                        <BsShield size={58} color='#1B37AA' />
                        Гарантія до {item.attributes.guarantee}
                      </div>
                    )}
                    <div className='mb-[52px] flex w-[409px] items-center gap-[30px] rounded-xl bg-[#fff]/70 py-[20px] pl-[30px] text-center text-base  font-[500] text-light-blue'>
                      <BiTimeFive size={58} color='#1B37AA' />
                      Час ремонту від {item.attributes.repair_time}
                    </div>
                  </div>
                  <div className='flex w-[737px] flex-col'>
                    <Image
                      className='mb-14 max-h-[366px] w-full rounded-2xl object-cover'
                      src={img}
                      width={516}
                      height={366}
                      alt={item.attributes.title}
                      priority
                    />
                    <h3 className='  mb-8 font-exo_2 text-xl font-semibold text-white-dis'>
                      {item.attributes.top_text_content}
                    </h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: markdown.render(item.attributes.text_content),
                      }}
                      className=' mb-14 text-base font-[400] text-white-dis'
                    />
                    <div className='flex gap-5'>
                      <button className=' relative h-[116px] w-[356px] rounded-2xl bg-light-green'>
                        <p className=' absolute bottom-[25px] left-[34px] w-[175px] text-start font-exo_2 text-lg font-semibold text-[#FDFEFF]'>
                          Розрахувати вартість ремонту
                        </p>
                        <div className=' absolute right-[2px] top-[2px]'>
                          <FiArrowUpRight size={56} color='#fff' />
                        </div>
                      </button>
                      <button className=' relative h-[116px] w-[356px] rounded-2xl bg-light-green'>
                        <p className=' absolute bottom-[25px] left-[34px] font-exo_2 text-lg font-semibold text-[#FDFEFF]'>
                          Викликати курʼєра
                        </p>
                        <div className=' absolute right-[2px] top-[2px]'>
                          <FiArrowUpRight size={56} color='#fff' />
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
