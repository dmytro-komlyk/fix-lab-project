/* eslint-disable import/no-extraneous-dependencies */

import type { Metadata } from 'next'

import { serverClient } from 'client/app/(utils)/trpc/serverClient'
import { outputArticleWithPaginationSchema } from 'server/src/domain/articles/schemas/article.schema'
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

export default async function Blog() {
  const postsData = (await serverClient.articles.getByPagination({
    page: 1,
    sort: 'desc',
    limit: 9,
  })) as outputArticleWithPaginationSchema
  return (
    <main className='flex-auto'>
      <MainBlogSection postsDataInit={postsData} currentPage={1} />
    </main>
  )
}
