/* eslint-disable import/no-extraneous-dependencies */
import { AOSInit } from 'client/app/(components)/AOSInit'
import Image from 'next/image'
import Link from 'next/link'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { SERVER_URL } from 'client/app/(lib)/constants'
import { serverClient } from 'client/app/(utils)/trpc/serverClient'
import { outputArticleSchema } from 'server/src/domain/articles/schemas/article.schema'
import PaginationControls from './PaginationControls'

const MainBlogSection = ({
  postsDataInit,
  currentPage,
}: {
  postsDataInit: Awaited<
    ReturnType<(typeof serverClient)['articles']['getByPagination']>
  >
  currentPage: number
}) => {
  return (
    <section className='overflow-hidden bg-gradient-linear-blue'>
      <AOSInit />
      <div className='container flex flex-col gap-7 pb-[70px] pt-[158px] max-lg:pb-[50px] lg:px-0'>
        <div className='flex flex-wrap items-center gap-1'>
          <Link
            className='text-mid-blue flex items-center text-base font-[400] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/'
          >
            <p> Головна</p> <MdKeyboardArrowRight size={25} />
          </Link>
          <Link
            className='text-mid-blue flex items-center text-base font-[400] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/blog'
          >
            <p className='text-mid-blue text-base font-[400] opacity-70'>
              Блог
            </p>
          </Link>
        </div>
        <h2 className='font-exo_2 text-2xl font-bold text-white-dis'>Блог</h2>
        <ul className='flex flex-wrap justify-center gap-6 space-x-0 lg:gap-y-14'>
          {postsDataInit.items.map((post: outputArticleSchema) => {
            return (
              <li data-aos='zoom-in' key={post.id}>
                <Link href={`/blog/${currentPage}/${post.slug}`}>
                  <div className='flex h-[515px] max-w-[410px] flex-col rounded-2xl bg-blue-crayola transition-transform duration-300 hover:scale-[1.03]  focus:scale-[1.03] xl:w-[410px]'>
                    <Image
                      className='max-h-[278px] min-h-[278px] rounded-t-2xl object-cover'
                      src={`${SERVER_URL}/${post.image.file.path}`}
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
        {postsDataInit.totalPages > 1 && (
          <div className='flex flex-col items-center gap-2'>
            <PaginationControls
              totalPages={postsDataInit.totalPages}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default MainBlogSection
