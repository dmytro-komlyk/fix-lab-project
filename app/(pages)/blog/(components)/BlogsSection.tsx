import Image from 'next/image'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

interface BlogItem {
  id: string
  attributes: {
    title: string
    description: string
    image: {
      data: {
        attributes: {
          url: string
          width: number
          height: number
          name: string
        }
      }
    }
  }
}

interface BlogsSectionProps {
  blogsData: {
    data: BlogItem[]
  }
}

const BlogsSection: React.FC<BlogsSectionProps> = ({ blogsData }) => {
  return (
    <section className='overflow-hidden bg-gradient-linear-blue pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container relative flex flex-col xl:p-0 '>
        <div className='z-[1] mb-8 flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p>Головна</p> <MdKeyboardArrowRight size={30} />
          </Link>

          <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>Блог</p>
        </div>
        <ul className='flex flex-wrap items-center justify-center gap-6'>
          {blogsData.data.map(item => {
            const { url, width, height, name } =
              item.attributes.image.data.attributes
            return (
              <li key={item.id}>
                <Link
                  className='flex w-[410px] flex-col'
                  href={`/blog/${item.id}`}
                >
                  <Image
                    className='h-[278px] w-full rounded-t-2xl object-cover object-center'
                    src={url}
                    width={width}
                    height={height}
                    alt={name}
                  />
                  <div className=' rounded-b-2xl '>
                    <h3>{item.attributes.title}</h3>
                    <p>{item.attributes.description}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default BlogsSection
