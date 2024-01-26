'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import { uploadImg } from '@admin/app/(server)/api/service/image/uploadImg'
import { createSlug } from '@admin/app/(utils)/createSlug'
import { trpc } from '@admin/app/(utils)/trpc/client'
import type { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { Accordion, AccordionItem } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'

import AddImagesSection from '../../(components)/AddImagesSection'
import CustomAddContent from '../../(components)/CustomAddContent'
import SendButton from '../../(components)/SendButton'

const AddArticleSection = ({
  allImagesData,
}: {
  allImagesData: Awaited<
    ReturnType<(typeof serverClient)['images']['getAllImages']>
  >
}) => {
  const router = useRouter()
  const [seoContent, setSeoContent] = useLocalStorage<{
    title: string
    description: string
    keywords: string
  }>('addArticleSeoContent', {
    title: '',
    description: '',
    keywords: '',
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [contentImage, setContentImage] = useState<string | ArrayBuffer | null>(
    null,
  )

  const [contentArticle, setContentArticle] = useLocalStorage<string | ''>(
    'addArticleContentArticle',
    '',
  )
  const [contentTitle, setContentTitle] = useLocalStorage<string>(
    'addArticleContentTitle',
    '',
  )
  const [contentPreview, setContentPreview] = useLocalStorage<string | ''>(
    'addArticleContentPreview',
    '',
  )
  const [contentSlug, setContentSlug] = useLocalStorage<string>(
    'addArticleContentSlug',
    '',
  )
  const [altImage, setAltImage] = useLocalStorage<string | ''>(
    'addArticleAltImage',
    '',
  )

  const clearState = () => {
    setSeoContent({
      title: '',
      description: '',
      keywords: '',
    })
    setSelectedImage(null)
    setContentImage(null)
    setContentArticle('')
    setContentTitle('')
    setContentPreview('')
    setContentSlug('')
    setAltImage('')
  }

  const handleSeoInputChange = (key: string, value: string) => {
    setSeoContent((prevData: any) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleImageUpload = async () => {
    try {
      if (selectedImage && altImage) {
        const response = await uploadImg({
          fileInput: selectedImage,
          alt: altImage || 'article',
          type: 'picture',
        })
        return response
      }
      toast.error(`Відсутнє зображення, або його опис...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
      return null
    } catch (error) {
      toast.error(`Помилка завантаження зображення...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
      throw new Error('Error uploading image')
    }
  }

  const createArticle = trpc.articles.createArticle.useMutation({
    onSuccess: () => {
      toast.success(`Статтю додано!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      clearState()
      router.refresh()
    },
    onError: async () => {
      toast.error(`Виникла помилка при додаванні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })
  const deleteImage = trpc.images.removeImage.useMutation()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (
      !(
        selectedImage &&
        contentTitle &&
        contentPreview &&
        contentArticle &&
        seoContent &&
        altImage &&
        contentSlug
      )
    ) {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    } else {
      const uploadResponse = await handleImageUpload()
      if (uploadResponse?.status === 201) {
        createArticle.mutate({
          isActive: true,
          slug: contentSlug,
          title: contentTitle,
          text: contentArticle,
          image_id: uploadResponse.data.id,
          preview: contentPreview,
          metadata: seoContent,
        })
      } else {
        await deleteImage.mutateAsync(uploadResponse?.data.id)
        toast.error(`Помилка додаванні статті...`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        setSelectedImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setContentImage(reader.result as string | ArrayBuffer | null)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <Accordion
      itemClasses={{ base: 'border-white-dis ' }}
      variant='bordered'
      className=' shadow-2xl'
    >
      <AccordionItem
        textValue='1'
        key='1'
        startContent={<IoMdAddCircle size={40} color='#fff' fill='#fff' />}
        title={
          <span className='bg-top- text-center font-exo_2 text-2xl font-bold text-white-dis'>
            Додати статтю
          </span>
        }
      >
        <div className='container flex flex-col items-center gap-[60px] px-4 transition-all duration-300  ease-in-out'>
          <form className='flex w-full  justify-evenly gap-3 text-white-dis '>
            <div className='flex w-full flex-col gap-8'>
              <div className='flex justify-between gap-3 '>
                <div className='flex flex-col gap-3'>
                  <p className=' bold mt-2 text-center font-exo_2 text-xl'>
                    Зображення
                  </p>
                  <div className='flex flex-col gap-3'>
                    {!contentImage ? (
                      <div className='flex h-[300px] w-[500px] items-center justify-center'>
                        <p>NO IMAGE</p>
                      </div>
                    ) : (
                      <div>
                        <Image
                          className='h-[300px] w-[500px] object-contain object-center'
                          src={
                            typeof contentImage === 'string' ? contentImage : ''
                          }
                          width={400}
                          height={100}
                          alt=''
                        />
                      </div>
                    )}
                    <input
                      className=' text-white-dis'
                      id='icon'
                      type='file'
                      accept='icon/*'
                      onChange={handleImageChange}
                    />
                  </div>

                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Опис зображення(alt)
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='altImage'
                      value={altImage}
                      onChange={e => {
                        setAltImage(e.target.value)
                      }}
                    />
                  </label>
                </div>
                <div className='flex w-[400px] flex-col justify-between'>
                  <p className=' bold mt-2 text-center font-exo_2 text-xl'>
                    SEO налаштування
                  </p>
                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Seo title
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='title'
                      value={seoContent.title || ''}
                      onChange={e =>
                        handleSeoInputChange('title', e.target.value)
                      }
                    />
                  </label>
                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Seo description
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='description'
                      value={seoContent.description || ''}
                      onChange={e =>
                        handleSeoInputChange('description', e.target.value)
                      }
                    />
                  </label>
                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Seo keywords
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='keywords'
                      value={seoContent.keywords || ''}
                      onChange={e =>
                        handleSeoInputChange('keywords', e.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
              <label className='flex  flex-col gap-1 text-center font-exo_2 text-xl'>
                Заголовок
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='title'
                  value={contentTitle}
                  onChange={e => {
                    setContentSlug(createSlug(e.target.value))
                    setContentTitle(e.target.value)
                  }}
                />
              </label>
              <label className='flex  flex-col gap-1 text-center font-exo_2 text-xl'>
                Slug(url сторінки)
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='slug'
                  value={contentSlug}
                  onChange={e => {
                    setContentSlug(e.target.value)
                  }}
                />
              </label>
              <label className='flex  flex-col   gap-1 text-center font-exo_2 text-xl'>
                Опис статті
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='preview'
                  value={contentPreview}
                  onChange={e => {
                    setContentPreview(e.target.value)
                  }}
                />
              </label>
            </div>
          </form>
          <div className='w-full'>
            <AddImagesSection allImagesData={allImagesData} />
          </div>
          <div className='flex w-full flex-col items-center gap-2 overflow-hidden '>
            <p className='text-center font-exo_2  text-xl text-white-dis'>
              Стаття
            </p>
            <CustomAddContent
              id='add-article-content'
              setContent={setContentArticle}
              content={contentArticle}
            />
          </div>
          <div className='mb-8'>
            <SendButton handleSubmit={handleSubmit} />
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default AddArticleSection
