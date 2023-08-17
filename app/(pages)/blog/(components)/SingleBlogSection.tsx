import Image from 'next/image'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import RenderMarkdown from '@/app/(components)/RenderMarkdown'

interface BlogItem {
  id: string
  attributes: {
    title: string
    content: string
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

interface SingleBlogSectionProps {
  blogData: {
    data: BlogItem
  }
}

const SingleBlogSection: React.FC<SingleBlogSectionProps> = ({ blogData }) => {
  const { title, content, image } = blogData.data.attributes
  const { url, width, height, name } = image.data.attributes

  return (
    <section className='overflow-hidden  pb-[102px] pt-[163px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container relative flex flex-col  xl:p-0'>
        <div className='z-[1] mb-8 flex flex-wrap items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/blog'
          >
            <p> Блог</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <p className='text-base font-[400] text-dark-blue opacity-70'>
            {title}
          </p>
        </div>
        <div className='xl:w-[954px]'>
          <h3>{title}</h3>
          <Image
            className='h-auto w-full'
            src={url}
            width={width}
            height={height}
            alt={name}
          />
          <RenderMarkdown markdown={content} />
        </div>
      </div>
    </section>
  )
}

export default SingleBlogSection
