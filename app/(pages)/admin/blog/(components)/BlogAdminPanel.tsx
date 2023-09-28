'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'

import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

export interface BlogAdminPanelProps {
  blogData: {
    data: BlogItem[]
  }
}

interface BlogItem {
  id: number
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

const BlogAdminPanel: React.FC<BlogAdminPanelProps> = ({ blogData }) => {
  const [activeTab, setActiveTab] = useState<string>('article list')
  return (
    <section className='overflow-hidden bg-gradient-linear-blue  pb-[102px] pt-[171px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container relative flex flex-col  xl:p-0'>
        <div className='z-[1] flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/admin'
          >
            <p>Адмін</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>Блог</p>
        </div>
        <div className='flex items-center justify-center gap-4'>
          <button
            className='group mt-4 flex w-full items-center justify-center rounded-lg bg-mid-green transition-colors hover:bg-black-dis focus:bg-black-dis'
            type='button'
            onClick={() => setActiveTab('article list')}
          >
            <h2 className='whitespace-nowrap py-[20px] font-exo_2 text-xl font-semibold tracking-[0.64] text-white-dis '>
              Список статей
            </h2>
          </button>
          <button
            className='group mt-4 flex w-full items-center justify-center rounded-lg bg-mid-green transition-colors hover:bg-black-dis focus:bg-black-dis'
            type='button'
            onClick={() => setActiveTab('add article')}
          >
            <h2 className='whitespace-nowrap py-[20px] font-exo_2 text-xl font-semibold tracking-[0.64] text-white-dis '>
              Додати статтю
            </h2>
          </button>
        </div>
        {activeTab === 'add article' && <AddArticle />}
        {activeTab === 'article list' && <ArticleList blogData={blogData} />}
      </div>
    </section>
  )
}

export default BlogAdminPanel
