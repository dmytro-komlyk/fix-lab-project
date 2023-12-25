'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { trpc } from 'admin/app/(utils)/trpc/client'
import CustomEditor from '../../(components)/CustomEditor'
import SendButton from '../../(components)/SendButton'

interface IArticleAdminProps {
  articleData: Article
}

const EditArticleSection: React.FC<IArticleAdminProps> = ({ articleData }) => {
  const router = useRouter()
  const [newArticleData, setNewArticleData] = useLocalStorage(
    `editNewArticleData${articleData.id}`,
    { ...articleData },
  )
  const [uploadedImageId, setUploadedImageId] = useState<object | undefined>({})
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [newImage, setNewImage] = useState<string | ArrayBuffer | null>(null)
  const [newArticle, setNewArticle] = useLocalStorage<string | ''>(
    `editNewArticle${articleData.id}`,
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

  const updateArticle = trpc.articles.update.useMutation({
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

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (selectedImage) {
      // const uploadResponse = await handleImageUpload()

      // if (uploadResponse?.data.id) {
      //   updateArticle.mutate({
      //     isActive: true,
      //     id: newArticleData.id,
      //     slug: newArticleData.slug,
      //     title: newArticleData.title,
      //     text: newArticleData.text,
      //     image_id: '6528fcd9458999afd6a05bfc',
      //     preview: newArticleData.preview,
      //     metadata: {
      //       title: newArticleData.metadata.title,
      //       description: newArticleData.metadata.title,
      //       keywords: newArticleData.metadata.title,
      //     },
      //   })
      // } else {
      //   toast.error(`Помилка завантаження зображення...`, {
      //     style: {
      //       borderRadius: '10px',
      //       background: 'red',
      //       color: '#fff',
      //     },
      //   })
      // }

      updateArticle.mutate({
        isActive: true,
        id: newArticleData.id,
        slug: newArticleData.slug,
        title: newArticleData.title,
        text: newArticleData.text,
        image_id: '6528fcd9458999afd6a05bfc',
        preview: newArticleData.preview,
        metadata: {
          title: newArticleData.metadata.title,
          description: newArticleData.metadata.title,
          keywords: newArticleData.metadata.title,
        },
      })
    } else {
      updateArticle.mutate({
        isActive: true,
        id: newArticleData.id,
        slug: newArticleData.slug,
        title: newArticleData.title,
        text: newArticleData.text,
        image_id: newArticleData.image_id,
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
    // if (selectedImage) {
    //     const response = await uploadImageTrpc.mutate({
    //       fileInput: selectedImage,
    //       alt: altImage,
    //       type: 'picture',
    //     })
    //     return response
    //   }
    //   return null
  }

  const handleImageSave = async (id: string) => {
    try {
      if (id) {
        //  deleteImageTrpc({ id: articleItem.image.id })
        const deleteEndpoint = `/images/${articleData.image.id}`
        await deleteData(deleteEndpoint)
        if (deleteEndpoint) {
          setSelectedImage(null)
          setNewImage(null)
        }
      }
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center gap-[60px] '>
      <form className='text-white-dis flex w-full flex-col items-end justify-evenly gap-3 '>
        <div className='flex w-full items-start justify-between'>
          <div className='flex w-[500px] flex-col gap-3'>
            <p className=' bold font-exo_2 mt-2 text-center text-xl'>
              Зображення
            </p>
            {/* <div className='relative'>
              {!newImage ? (
                <Image
                  className='h-auto w-[500px]  object-center'
                  src={`http://95.217.34.212:30000/${articleData.image?.file.path}`}
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
            </div> */}
            <input
              className=' text-white-dis'
              id='image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
            />
          </div>
          <div className='flex w-[400px] flex-col'>
            <p className=' bold font-exo_2 mt-2 text-center text-xl'>
              SEO налаштування
            </p>
            <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
              Seo title
              <input
                className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                type='text'
                name='metadata'
                data-metadata-field='title'
                value={newArticleData.metadata.title || ''}
                onChange={handleInputChange}
              />
            </label>
            <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
              Seo description
              <input
                className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                type='text'
                name='metadata'
                data-metadata-field='description'
                value={newArticleData.metadata.description || ''}
                onChange={handleInputChange}
              />
            </label>
            <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
              Seo keywords
              <input
                className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                type='text'
                name='metadata'
                data-metadata-field='keywords'
                value={newArticleData.metadata.keywords || ''}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <label className='font-exo_2 flex  w-full flex-col gap-1 text-center text-xl'>
          Заголовок
          <input
            required
            className='font-base text-md text-black-dis h-[45px] w-full indent-3'
            type='text'
            name='title'
            value={newArticleData.title || ''}
            onChange={handleInputChange}
          />
        </label>
        <label className='font-exo_2 flex  w-full flex-col gap-1 text-center text-xl'>
          Slug(url сторінки)
          <input
            required
            className='font-base text-md text-black-dis h-[45px] w-full indent-3'
            type='text'
            name='slug'
            value={newArticleData.slug || ''}
            onChange={handleInputChange}
          />
        </label>
        <label className='font-exo_2 flex  w-full flex-col gap-1 text-center text-xl'>
          Опис статті
          <input
            required
            className='font-base text-md text-black-dis h-[45px] w-full indent-3'
            type='text'
            name='preview'
            value={newArticleData.preview || ''}
            onChange={handleInputChange}
          />
        </label>
      </form>
      {/* <div className='w-full'>
        <AddImagesSection />
      </div> */}
      <div className='flex w-full flex-col  gap-2 '>
        <p className='font-exo_2 text-white-dis text-center text-xl'>Стаття</p>
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
