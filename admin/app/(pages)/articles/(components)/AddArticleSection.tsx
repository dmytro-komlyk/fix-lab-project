'use client'

/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Accordion, AccordionItem } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'

import useLocalStorage from '@/app/(hooks)/useLocalStorage '
import deleteData from '@/app/(server)/api/service/admin/deleteData'
import postData from '@/app/(server)/api/service/admin/postData'
import uploadImg from '@/app/(server)/api/service/admin/uploadImg'
import { createSlug } from '@/app/(utils)/createSlug'

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
  const [selectedImage, setSelectedImage] = useLocalStorage<File | null>(
    'addArticleSelectedImage',
    null,
  )
  const [contentImage, setContentImage] = useLocalStorage<
    string | ArrayBuffer | null
  >('addArticleContentImage', null)

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

  const handleInputChange = (key: string, value: string) => {
    setSeoContent((prevData: any) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    let uploadedImageId = null

    try {
      const uploadResponse = await handleImageUpload()

      if (!uploadResponse) {
        throw new Error('Error uploading image')
      }

      uploadedImageId = uploadResponse.data._id

      if (
        !(uploadedImageId && contentTitle && contentPreview && contentArticle)
      ) {
        throw new Error('Invalid data for article')
      }

      const data = {
        isActive: true,
        slug: contentSlug,
        title: contentTitle,
        text: contentArticle,
        image: uploadedImageId,
        preview: contentPreview,
        metadata: seoContent,
      }

      const response = await postData(`/articles`, data)

      if (response.status === 201) {
        toast.success(`Статтю додано!`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
        clearState()
        router.refresh()
      } else {
        throw new Error('Error posting data')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(`Помилка...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })

      if (uploadedImageId) {
        try {
          const deleteResponse = await deleteData(`/images/${uploadedImageId}`)
          console.log('Delete Response:', deleteResponse)
        } catch (deleteError) {
          console.error('Error deleting image:', deleteError)
        }
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
  console.log(selectedImage)
  const handleImageUpload = async () => {
    try {
      if (selectedImage) {
        const response = await uploadImg({
          fileInput: selectedImage,
          alt: altImage,
          type: 'picture',
        })
        return response
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
          <span className='text-center font-exo_2 text-2xl font-bold text-white-dis'>
            Додати статтю
          </span>
        }
      >
        <div className='container flex flex-col  items-center gap-[60px] transition-all duration-300  ease-in-out'>
          <form className='flex w-full items-end justify-evenly gap-3 text-white-dis '>
            <div className='flex w-full flex-col gap-8'>
              <div className='flex justify-evenly gap-3 '>
                <div className='flex flex-col gap-3'>
                  <p className=' bold mt-2 text-center font-exo_2 text-xl'>
                    Зображення
                  </p>
                  <div className='relative'>
                    {!contentImage ? (
                      <div className='h-auto w-[500px]'>
                        <p>NO IMAGE</p>
                      </div>
                    ) : (
                      <div>
                        <Image
                          className='h-auto w-[500px] object-contain object-center'
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
                <div className='flex w-[400px] flex-col'>
                  <p className=' bold mt-2 text-center font-exo_2 text-xl'>
                    SEO налаштування
                  </p>
                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Seo title
                    <input
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='title'
                      value={seoContent.title || ''}
                      onChange={e => handleInputChange('title', e.target.value)}
                    />
                  </label>
                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Seo description
                    <input
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='description'
                      value={seoContent.description || ''}
                      onChange={e =>
                        handleInputChange('description', e.target.value)
                      }
                    />
                  </label>
                  <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                    Seo keywords
                    <input
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='keywords'
                      value={seoContent.keywords || ''}
                      onChange={e =>
                        handleInputChange('keywords', e.target.value)
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
              <label className='flex  flex-col  gap-1 text-center font-exo_2 text-xl'>
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
          <div className='flex w-full flex-col items-center gap-2 '>
            <p className='text-center font-exo_2 text-xl text-white-dis'>
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
