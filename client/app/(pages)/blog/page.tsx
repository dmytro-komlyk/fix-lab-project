/* eslint-disable import/no-extraneous-dependencies */
import { trpc } from 'client/app/(utils)/trpc'
import type { Metadata } from 'next'

import type { IBlog } from '@/app/(server)/api/service/modules/articlesService'

import MainBlogSection from './(components)/MainBlogSection'

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

export default async function Blog() {
  // const postsData = await getPosts({ currentPage: 1 })
  const postsData = (await trpc.getArticlesQuery.query({ page: 1 })) as IBlog
  return (
    <main className='flex-auto'>
      <MainBlogSection postsData={postsData} currentPage={1} />
    </main>
  )
}
