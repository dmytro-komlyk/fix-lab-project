/* eslint-disable import/no-extraneous-dependencies */
// import { getSinglePost } from '@/app/(server)/api/service/modules/articlesService'
// import { getAllContactsData } from '@/app/(server)/api/service/modules/contactService'

import type { IPost } from 'client/app/(server)/api/service/modules/articlesService'
import type { IContact } from 'client/app/(server)/api/service/modules/contactService'
import { trpc } from 'client/app/(utils)/trpc'
import type { Metadata } from 'next'

import SingleArticlePage from '../../(components)/SingleArticlePage'

export const dynamic = 'force-dynamic'
export const revalidate = 60

// export async function generateStaticParams({
//   params,
// }: {
//   params: { page: string }
// }) {
//   const currentPage = typeof params.page === 'string' ? Number(params.page) : 1
//   const articlesData = await getPosts({ currentPage })

//   return articlesData.items.map((item: { slug: string }) => ({
//     article: item.slug,
//   }))
// }

export async function generateMetadata({
  params,
}: {
  params: { article: string }
}): Promise<Metadata> {
  const articleData = (await trpc.getArticleBySlugQuery.query({
    slug: params.article,
  })) as IPost

  return {
    title: articleData.metadata.title,
    description: articleData.metadata.description,
    keywords: articleData.metadata.keywords.split(', '),
  }
}

const SingleArticle = async ({ params }: { params: { article: string } }) => {
  const contactsData = (await trpc.getContactsQuery.query()) as IContact[]
  const articleData = (await trpc.getArticleBySlugQuery.query({
    slug: params.article,
  })) as IPost

  // const contactsData = await getAllContactsData()
  // const articleData = await getSinglePost(params.article)
  return (
    <main className='flex-auto'>
      <SingleArticlePage
        contactsData={contactsData}
        articleData={articleData}
      />
    </main>
  )
}

export default SingleArticle
