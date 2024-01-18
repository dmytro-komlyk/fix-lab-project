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

const AddIssueInfoSection = ({
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
  }>('addIssueInfoSeoContent', {
    title: '',
    description: '',
    keywords: '',
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [contentImage, setContentImage] = useState<string | ArrayBuffer | null>(
    null,
  )

  const [contentInfoIssue, setContentInfoIssue] = useLocalStorage<string | ''>(
    'addIssueInfoInfoIssue',
    '',
  )
  const [contentArticleIssue, setContentArticleIssue] = useLocalStorage<
    string | ''
  >('addIssueInfoArticleIssue', '')

  const [contentTitle, setContentTitle] = useLocalStorage<string>(
    'addIssueInfoTitle',
    '',
  )

  const [contentIssuePrice, setContentIssuePrice] = useLocalStorage<string>(
    'addIssueInfoPrice',
    '',
  )

  const [contentSlug, setContentSlug] = useLocalStorage<string>(
    'addIssueInfoSlug',
    '',
  )
  const [altImage, setAltImage] = useLocalStorage<string | ''>(
    'addIssueInfoAltImage',
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
    setContentInfoIssue('')
    setContentTitle('')
    setContentIssuePrice('')
    setContentSlug('')
    setAltImage('')
    setContentArticleIssue('')
  }

  const handleInputChange = (key: string, value: string) => {
    setSeoContent((prevData: any) => ({
      ...prevData,
      [key]: value,
    }))
  }
  const createIssue = trpc.issues.createIssue.useMutation({
    onSuccess: () => {
      toast.success(`Послугу додано!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      clearState()
      router.refresh()
    },
    onError: () => {
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
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (
      !(
        selectedImage &&
        contentTitle &&
        contentSlug &&
        contentIssuePrice &&
        contentArticleIssue &&
        contentInfoIssue &&
        seoContent.title &&
        seoContent.description &&
        seoContent.keywords &&
        altImage
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
        createIssue.mutate({
          slug: contentSlug,
          title: contentTitle,
          price: contentIssuePrice,
          image_id: uploadResponse.data.id,
          metadata: {
            title: seoContent.title,
            description: seoContent.description,
            keywords: seoContent.keywords,
          },
          description: contentArticleIssue,
          info: contentInfoIssue,
          benefits_ids: [],
          gadgets_ids: [],
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
          <span className='text-center font-exo_2 text-2xl font-bold text-white-dis'>
            Додати послугу з додатковою інформацією
          </span>
        }
      >
        <div className='container  flex flex-col items-center  gap-[60px] px-4 transition-all duration-300  ease-in-out'>
          <form className='flex w-full items-end justify-evenly gap-3 text-white-dis '>
            <div className='flex w-full flex-col gap-8'>
              <div className='flex justify-between gap-3 '>
                <div className='flex flex-col gap-3'>
                  <p className=' bold mt-2 text-center font-exo_2 text-xl'>
                    Зображення
                  </p>
                  <div className='relative'>
                    {!contentImage ? (
                      <div className=' flex h-[300px] w-[500px] items-center justify-center'>
                        <p>NO IMAGE</p>
                      </div>
                    ) : (
                      <div>
                        <Image
                          className='max-h-[300px] w-[500px] object-contain object-center'
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

                  <label
                    className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'
                    htmlFor='altImage'
                  >
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
                  <label
                    className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'
                    htmlFor='title'
                  >
                    Seo title
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='title'
                      value={seoContent.title || ''}
                      onChange={e => handleInputChange('title', e.target.value)}
                    />
                  </label>
                  <label
                    className='flex flex-col items-start gap-1 text-center font-exo_2 text-xl'
                    htmlFor='description'
                  >
                    Seo description
                    <input
                      required
                      className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                      type='text'
                      name='description'
                      value={seoContent.description || ''}
                      onChange={e =>
                        handleInputChange('description', e.target.value)
                      }
                    />
                  </label>
                  <label
                    className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'
                    htmlFor='keywords'
                  >
                    Seo keywords
                    <input
                      required
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
              <label
                className='flex flex-col items-start gap-1 text-center font-exo_2 text-xl'
                htmlFor='price'
              >
                Вартість послуги
                <input
                  required
                  className='font-base h-[45px] w-[300px] indent-3 text-md text-black-dis'
                  type='text'
                  name='price'
                  value={contentIssuePrice}
                  onChange={e => setContentIssuePrice(e.target.value)}
                />
              </label>
              <label
                className='flex flex-col gap-1 text-center font-exo_2 text-xl'
                htmlFor='title'
              >
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
              <label
                className='flex  flex-col gap-1 text-center font-exo_2 text-xl'
                htmlFor='slug'
              >
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
            </div>
          </form>
          <div className='w-full'>
            <AddImagesSection allImagesData={allImagesData} />
          </div>
          <div className='flex w-full flex-col items-center gap-2 '>
            <p className='text-center font-exo_2 text-xl text-white-dis'>
              Інформація послуги
            </p>
            <CustomAddContent
              id='add-issue-info-content'
              setContent={setContentInfoIssue}
              content={contentInfoIssue}
            />
          </div>
          <div className='w-full'>
            <AddImagesSection allImagesData={allImagesData} />
          </div>
          <div className='flex w-full flex-col items-center gap-2 '>
            <p className='text-center font-exo_2 text-xl text-white-dis'>
              Стаття послуги
            </p>
            <CustomAddContent
              id='add-issue-article-content'
              setContent={setContentArticleIssue}
              content={contentArticleIssue}
            />
          </div>
          <div className='flex w-full flex-col items-center justify-center'>
            <div className='flex w-full  flex-col-reverse  justify-center '>
              <div className='  w-full border-b-2 border-mid-grey' />
              <p className='mb-6 text-center font-exo_2 text-2xl font-bold  text-white-dis  max-lg:text-xl'>
                Послуги сервісного обслуговування
              </p>
            </div>
          </div>
          <div className=' flex h-[200px] w-full flex-col items-center justify-center gap-2 overflow-auto '>
            <p className='font-exo_2 text-2xl font-bold text-white-dis'>
              В розробці...
            </p>
            <p className='font-exo_2 text-xl font-bold text-white-dis'>
              Послуги сервісного обслуговування можна додати після створення, в
              розділі редагування послуги...
            </p>
          </div>
          <div className='mb-8'>
            <SendButton handleSubmit={handleSubmit} />
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default AddIssueInfoSection
