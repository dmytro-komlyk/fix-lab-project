import { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputArticleWithPaginationSchema } from '@server/domain/articles/schemas/article.schema'
import type { Metadata } from 'next'

import MainBlogSection from './(components)/MainBlogSection'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title:
    'Блог FixLab: Ремонт та обслуговування різних гаджетів - Ноутбуки, Телефони, Планшети та більше',
  description:
    "Дізнайтеся більше про ремонт та обслуговування різних гаджетів у блозі FixLab. Читайте наші статті про ноутбуки, телефони, планшети, комп'ютери, колонки, навушники, смарт-годинники, читалки, електронні книги, павербанки, джойстики та інші гаджети. Знайомтесь з останніми трендами, корисними порадами та новими технологіями. FixLab - ваш провідник у світі електроніки!",
  keywords: [
    'Ремонт гаджетів',
    'Ноутбуків',
    'Телефонів',
    'Планшетів',
    "Комп'ютерів",
    'Колонок',
    'Навушників',
    'Смарт-годинників',
    'Читалок',
    'Електронних книг',
    'Павербанків',
    'Джойстиків',
    'FixLab блог',
  ],
}

interface IBlogProps {
  searchParams: { page: number | undefined }
}

export default async function Blog({ searchParams }: IBlogProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const postsData = (await serverClient.articles.getByPaginationArticles({
    page: page,
    sort: 'desc',
    limit: 9,
  })) as outputArticleWithPaginationSchema
  return (
    <main className='flex-auto'>
      <MainBlogSection postsDataInit={postsData} currentPage={page} />
    </main>
  )
}
