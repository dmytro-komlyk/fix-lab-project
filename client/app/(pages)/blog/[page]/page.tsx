/* eslint-disable import/no-extraneous-dependencies */
// import { getPosts } from '@/app/(server)/api/service/modules/articlesService'

import type { IBlog } from 'client/app/(server)/api/service/modules/articlesService'
import { trpc } from 'client/app/(utils)/trpc'
import type { Metadata } from 'next'

import MainBlogSection from '../(components)/MainBlogSection'

export const dynamic = 'force-dynamic'
export const revalidate = 60
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
export default async function Blog({ params }: { params: { page: string } }) {
  const currentPage = typeof params.page === 'string' ? Number(params.page) : 1
  const postsData = (await trpc.getArticlesQuery.query({
    page: currentPage,
    sort: 'desc',
    limit: 9,
  })) as IBlog

  // const postsData = await getPosts({ currentPage })
  return (
    <main className='flex-auto'>
      <MainBlogSection postsData={postsData} currentPage={currentPage} />
    </main>
  )
}
