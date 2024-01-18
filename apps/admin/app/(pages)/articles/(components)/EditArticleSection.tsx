'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import { uploadImg } from '@admin/app/(server)/api/service/image/uploadImg'
import { trpc } from '@admin/app/(utils)/trpc/client'
import type { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import AddImagesSection from '../../(components)/AddImagesSection'
import CustomEditor from '../../(components)/CustomEditor'
import SendButton from '../../(components)/SendButton'

const EditArticleSection = ({
  articleData,
  allImagesData,
}: {
  articleData: Awaited<
    ReturnType<(typeof serverClient)['articles']['getBySlugArticle']>
  >
  allImagesData: Awaited<
    ReturnType<(typeof serverClient)['images']['getAllImages']>
  >
}) => {
  const router = useRouter()
  const [newArticleData, setNewArticleData] = useLocalStorage(
    `editNewArticleData${articleData.id}`,
    { ...articleData },
  )
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [newImage, setNewImage] = useState<string | ArrayBuffer | null>(null)
  const [newArticle, setNewArticle] = useLocalStorage<string | ''>(
    `editNewArticle${articleData.id}`,
    articleData.text || '',
  )
  const [altImage, setAltImage] = useLocalStorage<string | ''>(
    `editNewImageAlt${articleData.id}`,
    '',
  )

  const clearState = () => {
    setNewArticleData({ ...newArticleData })
    if (selectedImage) {
      setSelectedImage(null)
    }
    setNewImage(null)
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

  const handleImageUpload = async () => {
    try {
      if (selectedImage && altImage) {
        const response = await uploadImg({
          fileInput: selectedImage,
          alt: altImage,
          type: articleData.image.type || 'picture',
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

  const updateArticle = trpc.articles.updateArticle.useMutation({
    onSuccess: () => {
      toast.success(`Оновлення збережено!`, {
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
      toast.error(`Помилка при оновленні`, {
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
        newArticleData.title &&
        newArticleData.slug &&
        newArticleData.preview &&
        newArticleData.image.id &&
        newArticleData.text &&
        newArticleData.metadata.description &&
        newArticleData.metadata.keywords &&
        newArticleData.metadata.title
      )
    ) {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    } else if (selectedImage) {
      const uploadResponse = await handleImageUpload()

      if (uploadResponse?.data.id) {
        await updateArticle.mutateAsync({
          isActive: true,
          id: newArticleData.id,
          slug: newArticleData.slug,
          title: newArticleData.title,
          text: newArticleData.text,
          image_id: uploadResponse.data.id,
          preview: newArticleData.preview,
          metadata: {
            title: newArticleData.metadata.title,
            description: newArticleData.metadata.title,
            keywords: newArticleData.metadata.title,
          },
        })
        await deleteImage.mutateAsync(articleData.image.id)
      } else {
        await deleteImage.mutateAsync(uploadResponse?.data.id)
        toast.error(`Помилка оновлення статті...`, {
          style: {
            borderRadius: '10px',
            background: 'red',
            color: '#fff',
          },
        })
      }
    } else {
      updateArticle.mutate({
        isActive: true,
        id: newArticleData.id,
        slug: newArticleData.slug,
        title: newArticleData.title,
        text: newArticleData.text,
        image_id: articleData.image.id,
        preview: newArticleData.preview,
        metadata: {
          title: newArticleData.metadata.title,
          description: newArticleData.metadata.title,
          keywords: newArticleData.metadata.title,
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
                  src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/public/pictures/${articleData.image.file.filename}`}
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
        <AddImagesSection allImagesData={allImagesData} />
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
