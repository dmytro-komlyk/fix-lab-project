/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */

import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'

import AddArticleSection from './AddArticleSection'
import RemoveArticles from './RemoveArticles'

export interface IArticle {
  _id: string
  slug: string
  text: string
  title: string
  preview: string
  image: {
    _id: string
    src: string
    alt: string
    type: string
  }
  metadata: {
    title: string
    description: string
    keywords: string
  }
}
interface ArticlesListProps {
  articlesData: {
    items: IArticle[]
    totalPages: number
    totalItems: number
  }
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articlesData }) => {
  return (
    <div className=' flex flex-col items-center justify-center gap-8 pb-12'>
      <AddArticleSection />
      <div className=' flex w-full flex-col items-center justify-center gap-8'>
        <ul className='flex w-full flex-col shadow-2xl'>
          {articlesData.items.map((item: IArticle) => (
            <li
              className='group border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
              key={item._id}
            >
              <div className='flex items-center justify-between px-6 py-[20px]'>
                <h3 className='font-semibold text-dark-blue md:text-base xl:text-xl'>
                  {item.title}
                </h3>
                <div className='relative ml-4 flex items-center gap-2'>
                  <Link href={`/articles/${item._id}`}>
                    <FaEdit
                      className='transition-colors hover:fill-mid-green focus:fill-mid-green'
                      size={30}
                    />
                  </Link>

                  <RemoveArticles item={item} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ArticlesList
