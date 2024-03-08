import { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputArticleSchema } from '@server/domain/articles/schemas/article.schema'
import type { outputContactSchema } from '@server/domain/contacts/schemas/contact.schema'
import type { Metadata } from 'next'

import SingleArticlePage from '../(components)/SingleArticlePage'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: { article: string }
}): Promise<Metadata> {
  const articleData = (await serverClient.articles.getBySlugArticle({
    slug: params.article,
  })) as outputArticleSchema
  return {
    title: articleData.metadata.title,
    description: articleData.metadata.description,
    keywords: articleData.metadata.keywords.split(', '),
  }
}

const SingleArticle = async ({ params }: { params: { article: string } }) => {
  const contactsData =
    (await serverClient.contacts.getAllPublishedContacts()) as outputContactSchema[]
  const articleData = (await serverClient.articles.getBySlugArticle({
    slug: params.article,
  })) as outputArticleSchema

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
