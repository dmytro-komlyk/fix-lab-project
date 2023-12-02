import Link from 'next/link'
import { FaEdit, FaEye } from 'react-icons/fa'

import PaginationControls from './PaginationControls'
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
  currentPage: number
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articlesData,
  currentPage,
}) => {
  return (
    <div className=' flex flex-col items-center justify-center gap-8 pb-12'>
      <div className=' flex w-full flex-col items-center justify-center gap-8'>
        <ul className='flex w-full flex-col shadow-2xl'>
          {articlesData.items.map((item: IArticle) => (
            <li
              className='border-dark-blue bg-white-dis group border-b-[0.5px] opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
              key={item._id}
            >
              <div className='flex items-center justify-between px-6 py-[20px]'>
                <h3 className='text-dark-blue font-semibold md:text-base xl:text-xl'>
                  {item.title}
                </h3>
                <div className='relative ml-4 flex items-center justify-center gap-4'>
                  <Link href={`/articles/${currentPage}/${item._id}`}>
                    <FaEye
                      className='hover:fill-mid-green focus:fill-mid-green transition-colors'
                      size={30}
                    />
                  </Link>
                  <Link href={`/articles/${currentPage}/${item._id}/edit`}>
                    <FaEdit
                      className='hover:fill-mid-green focus:fill-mid-green transition-colors'
                      size={30}
                    />
                  </Link>

                  <RemoveArticles item={item} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {articlesData.totalPages > 1 && (
          <PaginationControls
            totalPages={articlesData.totalPages}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  )
}

export default ArticlesList
