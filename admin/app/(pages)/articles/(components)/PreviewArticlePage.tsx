'use client'

import Image from 'next/image'

import RenderMarkdown from '../../(components)/RenderMarkdown'
import type { IArticle } from './ArticlesList'

export interface IPreviewArticleProps {
  articleData: IArticle
}

const PreviewArticlePage: React.FC<IPreviewArticleProps> = ({
  articleData,
}) => {
  return (
    <section className=' overflow-hidden bg-white-dis  p-4  shadow-2xl'>
      <div className='container relative flex flex-col xl:p-0'>
        <div className='flex w-[988px] flex-col '>
          <div className='flex items-center justify-between  gap-2'>
            <h2 className='font-exo_2 text-2xl font-bold  max-lg:text-xl max-lg:font-semibold max-md:mb-[47px]  xl:leading-[57px]'>
              {articleData.title}
            </h2>
          </div>
          <Image
            className='mb-[56px] min-h-[245px] w-full object-cover md:max-h-[480px]'
            src={articleData.image.src}
            width={924}
            height={480}
            alt={articleData.image.alt}
          />
          <div className='mb-[104px] max-md:mb-[56px]'>
            <RenderMarkdown markdown={articleData.text} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PreviewArticlePage
