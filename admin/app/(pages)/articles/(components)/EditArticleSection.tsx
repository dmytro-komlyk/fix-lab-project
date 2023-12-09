/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */

'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import { sendPutRequest } from '@admin/app/(server)/api/service/admin/sendPutRequest'
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import AddImagesSection from '../../(components)/AddImagesSection'
import CustomEditor from '../../(components)/CustomEditor'
import SendButton from '../../(components)/SendButton'
import type { IArticle } from './ArticlesList'

interface IArticleAdminProps {
  articleData: IArticle
}

const EditArticleSection: React.FC<IArticleAdminProps> = ({ articleData }) => {
  const router = useRouter()
  const [newArticleData, setNewArticleData] = useLocalStorage(
    `editNewArticleData${articleData._id}`,
    { ...articleData },
  )
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [newImage, setNewImage] = useState<string | ArrayBuffer | null>(null)
  const [newArticle, setNewArticle] = useLocalStorage<string | ''>(
    `editNewArticle${articleData._id}`,
    articleData.text || '',
  )
  const clearState = () => {
    setNewArticleData({ ...newArticleData })
    if (selectedImage) {
      setSelectedImage(null)
    }
    setNewImage(null)
    setNewArticle(newArticle)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'metadata') {
      const metadataField = e.target.getAttribute('data-metadata-field')

      if (metadataField) {
        setNewArticleData({
          ...newArticleData,
          metadata: {
            ...newArticleData.metadata,
            [metadataField]: value,
          },
        })
      }
    } else {
      setNewArticleData({ ...newArticleData, [name]: value })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      if (selectedImage) {
        const uploadResponse = await handleImageUpload()

        if (!uploadResponse) {
          throw new Error('Error uploading image')
        }
        if (uploadResponse.data._id) {
          const response = await sendPutRequest(
            `/articles/${newArticleData._id}`,
            {
              ...newArticleData,
              image: uploadResponse.data._id,
              text: newArticle,
            },
          )

          if (response.status === 200) {
            await handleImageSave(uploadResponse.data._id)
            toast.success(`Оновлення збережено!`, {
              style: {
                borderRadius: '10px',
                background: 'grey',
                color: '#fff',
              },
            })
            clearState()
            router.refresh()
          } else {
            console.error('Error updating contact data')
          }
        } else {
          console.error('Error uploading image')
        }
      } else {
        await sendPutRequest(`/articles/${newArticleData._id}`, {
          ...newArticleData,
          image: articleData.image._id || '',
          text: newArticle,
        })
        toast.success(`Оновлення збережено!`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
      }
      router.refresh()
      clearState()
    } catch (error) {
      console.error('Error:', error)
      toast.error(`Помилка...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        setSelectedImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setNewImage(reader.result as string | ArrayBuffer | null)
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
          alt: articleData.image.alt || 'Article',
          type: articleData.image.type || 'picture',
        })
        return response
      }
      return null
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  const handleImageSave = async (id: string) => {
    try {
      if (id) {
        const deleteEndpoint = `/images/${articleData.image._id}`

        await deleteData(deleteEndpoint)
        if (deleteEndpoint) {
          setSelectedImage(null)
          setNewImage(null)
        }
        console.log('success')
      }
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center gap-[60px] '>
      <form className='flex w-full flex-col items-end justify-evenly gap-3 text-white-dis '>
        <div className='flex w-full items-start justify-between'>
          <div className='flex w-[500px] flex-col gap-3'>
            <p className=' bold mt-2 text-center font-exo_2 text-xl'>
              Зображення
            </p>
            <div className='relative'>
              {!newImage ? (
                <Image
                  className='h-auto w-[500px]  object-center'
                  src={`http://95.217.34.212:30000/${articleData.image.file.path}`}
                  width={400}
                  height={100}
                  alt={articleData.image.alt}
                />
              ) : (
                <div>
                  <Image
                    className='h-auto w-[500px] object-center'
                    src={typeof newImage === 'string' ? newImage : ''}
                    width={400}
                    height={100}
                    alt={articleData.title}
                  />
                </div>
              )}
            </div>
            <input
              className=' text-white-dis'
              id='image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
            />
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
                name='metadata'
                data-metadata-field='title'
                value={newArticleData.metadata.title || ''}
                onChange={handleInputChange}
              />
            </label>
            <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
              Seo description
              <input
                className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                type='text'
                name='metadata'
                data-metadata-field='description'
                value={newArticleData.metadata.description || ''}
                onChange={handleInputChange}
              />
            </label>
            <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
              Seo keywords
              <input
                className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                type='text'
                name='metadata'
                data-metadata-field='keywords'
                value={newArticleData.metadata.keywords || ''}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <label className='flex w-full  flex-col gap-1 text-center font-exo_2 text-xl'>
          Заголовок
          <input
            required
            className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
            type='text'
            name='title'
            value={newArticleData.title || ''}
            onChange={handleInputChange}
          />
        </label>
        <label className='flex w-full  flex-col gap-1 text-center font-exo_2 text-xl'>
          Slug(url сторінки)
          <input
            required
            className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
            type='text'
            name='slug'
            value={newArticleData.slug || ''}
            onChange={handleInputChange}
          />
        </label>
        <label className='flex w-full  flex-col gap-1 text-center font-exo_2 text-xl'>
          Опис статті
          <input
            required
            className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
            type='text'
            name='preview'
            value={newArticleData.preview || ''}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <div className='w-full'>
        <AddImagesSection />
      </div>
      <div className='flex w-full flex-col  gap-2 '>
        <p className='text-center font-exo_2 text-xl text-white-dis'>Стаття</p>
        <CustomEditor
          id='edit-article-content'
          setContent={setNewArticle}
          content={newArticle}
        />
      </div>
      <SendButton handleSubmit={handleSubmit} />
    </div>
  )
}

export default EditArticleSection
