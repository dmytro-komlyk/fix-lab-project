'use client'

/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-use-before-define */

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import { createSlug } from '@admin/app/(utils)/createSlug'
import { Accordion, AccordionItem } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'

import { trpc } from 'admin/app/(utils)/trpc/client'
import CustomAddContent from '../../(components)/CustomAddContent'
import SendButton from '../../(components)/SendButton'

const AddArticleSection = () => {
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
  const [uploadedImageId, setUploadedImageId] = useState<object | undefined>({})
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

  const createArticle = trpc.articles.create.useMutation({
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
      await deleteData(`/images/${uploadedImageId}`)
      toast.error(`Виникла помилка при додаванні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // const uploadResponse = await handleImageUpload()
    if (
      !(
        uploadedImageId &&
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
      return
    }
    // if (!uploadResponse) {
    //   toast.error(`Помилка завантаження зображення...`, {
    //     style: {
    //       borderRadius: '10px',
    //       background: 'grey',
    //       color: '#fff',
    //     },
    //   })
    // } else {
    //   createArticle.mutate({
    //     isActive: true,
    //     slug: contentSlug,
    //     title: contentTitle,
    //     text: contentArticle,
    //     image_id: '6528fcd9458999afd6a05bfc',
    //     preview: contentPreview,
    //     metadata: seoContent,
    //   })
    // }
    createArticle.mutate({
      isActive: true,
      slug: contentSlug,
      title: contentTitle,
      text: contentArticle,
      image_id: '6528fcd9458999afd6a05bfc',
      preview: contentPreview,
      metadata: seoContent,
    })
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

  const handleImageUpload = async () => {
    try {
      if (selectedImage) {
        const response = await uploadImg({
          fileInput: selectedImage,
          alt: altImage,
          type: 'picture',
        })
        setUploadedImageId(response)
      }
      return null
    } catch (error) {
      throw new Error('Error uploading image')
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
          <span className='bg-top- font-exo_2 text-white-dis text-center text-2xl font-bold'>
            Додати статтю
          </span>
        }
      >
        <div className='container flex flex-col items-center gap-[60px] px-4 transition-all duration-300  ease-in-out'>
          <form className='text-white-dis flex  w-full justify-evenly gap-3 '>
            <div className='flex w-full flex-col gap-8'>
              <div className='flex justify-between gap-3 '>
                <div className='flex flex-col gap-3'>
                  <p className=' bold font-exo_2 mt-2 text-center text-xl'>
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

                  <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
                    Опис зображення(alt)
                    <input
                      required
                      className='font-base text-md text-black-dis h-[45px] w-full indent-3'
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
                  <p className=' bold font-exo_2 mt-2 text-center text-xl'>
                    SEO налаштування
                  </p>
                  <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
                    Seo title
                    <input
                      required
                      className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                      type='text'
                      name='title'
                      value={seoContent.title || ''}
                      onChange={e =>
                        handleSeoInputChange('title', e.target.value)
                      }
                    />
                  </label>
                  <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
                    Seo description
                    <input
                      required
                      className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                      type='text'
                      name='description'
                      value={seoContent.description || ''}
                      onChange={e =>
                        handleSeoInputChange('description', e.target.value)
                      }
                    />
                  </label>
                  <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
                    Seo keywords
                    <input
                      required
                      className='font-base text-md text-black-dis h-[45px] w-full indent-3'
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
              <label className='font-exo_2  flex flex-col gap-1 text-center text-xl'>
                Заголовок
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                  type='text'
                  name='title'
                  value={contentTitle}
                  onChange={e => {
                    setContentSlug(createSlug(e.target.value))
                    setContentTitle(e.target.value)
                  }}
                />
              </label>
              <label className='font-exo_2  flex flex-col gap-1 text-center text-xl'>
                Slug(url сторінки)
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                  type='text'
                  name='slug'
                  value={contentSlug}
                  onChange={e => {
                    setContentSlug(e.target.value)
                  }}
                />
              </label>
              <label className='font-exo_2  flex   flex-col gap-1 text-center text-xl'>
                Опис статті
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
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
          {/* <div className='w-full'>
            <AddImagesSection />
          </div> */}
          <div className='flex w-full flex-col items-center gap-2 overflow-hidden '>
            <p className='font-exo_2 text-white-dis  text-center text-xl'>
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
