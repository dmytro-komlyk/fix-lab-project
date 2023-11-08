'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import {
  getAllPosts,
  type IBlog,
} from '@/app/(server)/api/service/modules/articlesService'

import PaginationControls from './PaginationControls'

interface IBlogProps {
  postsData: IBlog
}

const MainBlogSection: React.FC<IBlogProps> = ({ postsData }) => {
  const [articles, setArticles] = useState([...postsData.items])
  const searchParams = useSearchParams()

  const currentPage =
    typeof searchParams.get('page') === 'string'
      ? Number(searchParams.get('page'))
      : 1

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllPosts({ currentPage })
        setArticles([...res.items])
      } catch (error) {
        throw new Error('Error fetching data')
      }
    }

    fetchData()
    router.refresh()
  }, [currentPage, router])

  return (
    <section className='overflow-hidden bg-gradient-linear-blue'>
      <div className='container flex flex-col gap-14 pb-[70px] pt-[158px] max-lg:pb-[50px] lg:px-0'>
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
        <div className='flex flex-wrap justify-center gap-6 space-x-0'>
          {articles.map(post => {
            return (
              <Link key={post._id} href={`/blog/${post.slug}`}>
                <div className='flex max-h-[500px] max-w-[410px] flex-col rounded-2xl bg-blue-crayola'>
                  <Image
                    className='h-[275px] rounded-t-2xl object-cover'
                    src={post.image.src}
                    width={410}
                    height={275}
                    alt={post.image.alt}
                  />
                  <div className='flex flex-col gap-4 p-6'>
                    <h2 className='font-exo_2 text-xl font-semibold'>
                      {post.title}
                    </h2>
                    <p className='line-clamp-3 text-ellipsis text-base font-normal'>
                      {post.preview}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='flex flex-col items-center gap-2'>
          <PaginationControls
            currentPage={currentPage}
            totalPages={postsData.totalPages}
          />
        </div>
      </div>
    </section>
  )
}

export default MainBlogSection
