/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */

'use client'

import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import { useState } from 'react'

import { trpc } from 'admin/app/(utils)/trpc/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import CustomEditor from '../../(components)/CustomEditor'
import SendButton from '../../(components)/SendButton'

interface IAdminBrandProps {
  brandData: Brand
}

const EditBrandForm: React.FC<IAdminBrandProps> = ({ brandData }) => {
  const router = useRouter()

  const [newBrandData, setNewBrandData] = useState({ ...brandData })
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [newIcon, setNewIcon] = useState<string | ArrayBuffer | null>(null)
  const [uploadedIconId, setUploadedIconId] = useState<string | undefined>('')
  const [newArticle, setNewArticle] = useState<string | ''>(
    brandData.article || '',
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'metadata') {
      const metadataField = e.target.getAttribute('data-metadata-field')

      if (metadataField) {
        setNewBrandData({
          ...newBrandData,
          metadata: {
            ...newBrandData.metadata,
            [metadataField]: value,
          },
        })
      }
    } else {
      setNewBrandData({ ...newBrandData, [name]: value })
    }
  }

  const clearState = () => {
    setNewBrandData({ ...newBrandData })
    if (selectedIcon) {
      setSelectedIcon(null)
      setUploadedIconId('')
    }
    setNewIcon(null)
    setNewArticle(brandData.article || '')
  }

  const updateBrand = trpc.brands.update.useMutation({
    onSuccess: () => {
      toast.success(`Оновлення збережено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      // await handleIconSave(benefitData.icon.id)
      clearState()
      router.refresh()
    },
    onError: () => {
      // await deleteData(`/images/${uploadedIconId}`)
      toast.error(`Виникла помилка при оновленні...`, {
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

    if (newBrandData.title) {
      updateBrand.mutate({
        id: brandData.id,
        icon_id: '6528ff26458999afd6a05c48',
        title: newBrandData.title,
        slug: newBrandData.slug,
        article: newArticle,
        metadata: {
          title: newBrandData.metadata.title,
          description: newBrandData.metadata.description,
          keywords: newBrandData.metadata.keywords,
        },
      })
      // if (selectedIcon) {
      //   // const uploadResponse = await handleIconUpload()
      //   // if (!uploadResponse) {
      //   //   throw new Error('Error uploading image')
      //   // }

      //   updateBrand.mutate({
      //     id: brandData.id,
      //     icon_id: '6528ff26458999afd6a05c48',
      //     title: newBrandData.title,
      //     slug: newBrandData.slug,
      //     article: newArticle,
      //     metadata: {
      //       title: newBrandData.metadata.title,
      //       description: newBrandData.metadata.description,
      //       keywords: newBrandData.metadata.keywords,
      //     },
      //   })
      // } else {
      //   updateBrand.mutate({
      //     id: brandData.id,
      //     icon_id: brandData.icon_id,
      //     title: newBrandData.title,
      //     slug: newBrandData.slug,
      //     article: newArticle,
      //     metadata: {
      //       title: newBrandData.metadata.title,
      //       description: newBrandData.metadata.description,
      //       keywords: newBrandData.metadata.keywords,
      //     },
      //   })
      // }
    } else {
      toast.error(`Всі поля повинні бути заповнені...`, {
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
        setSelectedIcon(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setNewIcon(reader.result as string | ArrayBuffer | null)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const handleImageUpload = async () => {
    try {
      if (selectedIcon) {
        const response = await uploadImg({
          fileInput: selectedIcon,
          alt: brandData.icon.alt,
          type: brandData.icon.type,
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
        const deleteEndpoint = `/images/${brandData.icon.id}`

        await deleteData(deleteEndpoint)
        if (deleteEndpoint) {
          setSelectedIcon(null)
          setNewIcon(null)
        }
        console.log('success')
      }
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center gap-[60px] '>
      <form className='flex w-full items-end justify-evenly gap-3 text-white-dis '>
        <div className='flex w-[400px] flex-col'>
          {/* <div className='relative'>
                {!newIcon ? (
                  brandData.icon && (
                    <Image
                      className='h-auto w-[100px]  object-center'
                      src={brandData.icon.src}
                      width={100}
                      height={100}
                      alt={brandData?.icon.alt || ''}
                    />
                  )
                ) : (
                  <div>
                    <Image
                      className='h-[100px] w-[100px] object-center'
                      src={typeof newIcon === 'string' ? newIcon : ''}
                      width={100}
                      height={100}
                      alt={brandData.title}
                    />
                  </div>
                )}
              </div> */}
          <input
            className=' text-white-dis'
            id='icon'
            type='file'
            accept='icon/*'
            onChange={handleImageChange}
          />
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Заголовок
            <input
              required
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='title'
              value={newBrandData.title || ''}
              onChange={handleInputChange}
            />
          </label>
          <label className='font-exo_2  flex flex-col gap-1 text-center text-xl'>
            Slug(url сторінки)
            <input
              required
              className='font-base text-md text-black-dis h-[45px] w-full indent-3'
              type='text'
              name='slug'
              value={newBrandData.slug || ''}
              onChange={handleInputChange}
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
              value={newBrandData.metadata.title || ''}
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
              value={newBrandData.metadata.description || ''}
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
              value={newBrandData.metadata.keywords || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </form>
      {/* <div className='w-full'>
        <AddImagesSection />
      </div> */}
      <div className='flex w-full flex-col justify-center gap-[50px]'>
        <div className='flex w-full flex-col  gap-2 '>
          <p className='text-center font-exo_2 text-xl text-white-dis'>
            Стаття
          </p>
          <CustomEditor
            id='edit-brand-article-content'
            setContent={setNewArticle}
            content={newArticle}
          />
        </div>
      </div>
      <SendButton handleSubmit={handleSubmit} />
    </div>
  )
}

export default EditBrandForm
