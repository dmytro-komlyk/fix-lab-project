'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import type { IBlog } from '@/app/(server)/api/service/modules/articlesService'
import { getAllPostsSSR } from '@/app/(server)/api/service/modules/articlesService'

import PaginationControls from './PaginationControls'

interface IBlogProps {
  postsData: IBlog
}

const MainBlogSection: React.FC<IBlogProps> = ({ postsData }) => {
  const [articles, setArticles] = useState([...postsData.items])
  const [currentPage, setCurrentPage] = useState(1)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllPostsSSR({ currentPage })
        setArticles(res.items)
        router.push(`/blog?page=${currentPage}`)
      } catch (error) {
        throw new Error('Fetch error')
      }
    }
    fetchData()
  }, [currentPage, router])

  return (
    <section className='overflow-hidden bg-gradient-linear-blue'>
      <div
        ref={listRef}
        className='container flex flex-col gap-7 pb-[70px] pt-[158px] max-lg:pb-[50px] lg:px-0'
      >
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
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className='flex flex-wrap justify-center gap-6 space-x-0 lg:gap-y-14'
          >
            {articles.map(post => {
              return (
                <Link key={post._id} href={`/blog/${post.slug}`}>
                  <div className='flex max-h-[515px] max-w-[410px] flex-col rounded-2xl bg-blue-crayola transition-transform duration-300 hover:scale-[1.03]  focus:scale-[1.03] xl:w-[410px]'>
                    <Image
                      className='h-[278px] rounded-t-2xl object-cover'
                      src={post.image.src}
                      width={410}
                      height={278}
                      alt={post.image.alt}
                    />
                    <div className='flex flex-col gap-4 p-6'>
                      <h2 className='line-clamp-3 font-exo_2 text-xl font-semibold'>
                        {post.title}
                      </h2>
                      <p className='relative  line-clamp-4 text-ellipsis text-base font-normal'>
                        <span className='absolute bottom-0 z-10 h-[245px] w-full bg-card-blog' />
                        {post.preview}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </motion.div>
        </AnimatePresence>
        {postsData.totalPages > 1 && (
          <div className='flex flex-col items-center gap-2'>
            <PaginationControls
              currentPage={currentPage}
              totalPages={postsData.totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default MainBlogSection
