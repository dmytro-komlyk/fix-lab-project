/* eslint-disable import/no-extraneous-dependencies */
import { AOSInit } from 'client/app/(components)/AOSInit'
import Image from 'next/image'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import type { IBlog } from '@/app/(server)/api/service/modules/articlesService'

import PaginationControls from './PaginationControls'

interface IBlogProps {
  postsData: IBlog
  currentPage: number
}

const MainBlogSection: React.FC<IBlogProps> = ({ postsData, currentPage }) => {
  return (
    <section className='overflow-hidden bg-gradient-linear-blue'>
      <AOSInit />
      <div className='container flex flex-col gap-7 pb-[70px] pt-[158px] max-lg:pb-[50px] lg:px-0'>
        <div className='flex flex-wrap items-center gap-1'>
          <Link
            className='flex items-center text-base font-[400] text-mid-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={25} />
          </Link>
          <Link
            className='flex items-center text-base font-[400] text-mid-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/blog'
          >
            <p className='text-base font-[400] text-mid-blue opacity-70'>
              Блог
            </p>
          </Link>
        </div>
        <h2 className='font-exo_2 text-2xl font-bold text-white-dis'>Блог</h2>
        <ul className='flex flex-wrap justify-center gap-6 space-x-0 lg:gap-y-14'>
          {postsData.items.map(post => {
            return (
              <li data-aos='zoom-in' key={post._id}>
                <Link href={`/blog/${currentPage}/${post.slug}`}>
                  <div className='flex h-[515px] max-w-[410px] flex-col rounded-2xl bg-blue-crayola transition-transform duration-300 hover:scale-[1.03]  focus:scale-[1.03] xl:w-[410px]'>
                    <Image
                      className='max-h-[278px] min-h-[278px] rounded-t-2xl object-cover'
                      src={post.image.src}
                      width={410}
                      height={278}
                      alt={post.image.alt}
                    />
                    <div className='flex h-[237px] flex-col justify-between gap-[16px]  px-6 pb-4 pt-[30px] leading-7'>
                      <h2 className='line-clamp-3 font-exo_2 text-xl font-semibold'>
                        {post.title}
                      </h2>
                      <p className='relative line-clamp-4 text-ellipsis text-base font-normal leading-6 '>
                        <span className='absolute bottom-0 z-10 h-[245px] w-full bg-card-blog' />
                        {post.preview}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
        {postsData.totalPages > 1 && (
          <div className='flex flex-col items-center gap-2'>
            <PaginationControls
              totalPages={postsData.totalPages}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default MainBlogSection
