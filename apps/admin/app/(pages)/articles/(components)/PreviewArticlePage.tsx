'use client'

import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import Image from 'next/image'
import RenderMarkdown from '../../(components)/RenderMarkdown'

const PreviewArticlePage = ({
  articleData,
}: {
  articleData: Awaited<
    ReturnType<(typeof serverClient)['articles']['getBySlug']>
  >
}) => {
  return (
    <section className=' bg-white-dis overflow-hidden p-4  shadow-2xl'>
      <div className='container relative flex flex-col xl:p-0'>
        <div className='flex w-[988px] flex-col '>
          <div className='flex items-center justify-between  gap-2'>
            <h2 className='font-exo_2 text-2xl font-bold  max-lg:text-xl max-lg:font-semibold max-md:mb-[47px]  xl:leading-[57px]'>
              {articleData.title}
            </h2>
          </div>
          {articleData.image ? (
            <Image
              className='mb-[56px] min-h-[245px] w-full object-cover md:max-h-[480px]'
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/public/pictures/${articleData.image.file.filename}`}
              width={924}
              height={480}
              alt={articleData.image.alt}
            />
          ) : (
            <p>No Image</p>
          )}
          <div className='mb-[104px] max-md:mb-[56px]'>
            <RenderMarkdown markdown={articleData.text} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PreviewArticlePage
