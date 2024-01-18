'use client'

import uploadImg from '@admin/app/(server)/api/service/image/uploadImg'
import { trpc } from '@admin/app/(utils)/trpc/client'
import type { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import AddImagesSection from '../../(components)/AddImagesSection'
import CustomEditor from '../../(components)/CustomEditor'
import SendButton from '../../(components)/SendButton'

const EditBrandForm = ({
  brandData,
  allImagesData,
}: {
  brandData: Awaited<ReturnType<(typeof serverClient)['brands']['getBySlug']>>
  allImagesData: Awaited<ReturnType<(typeof serverClient)['images']['getAll']>>
}) => {
  const router = useRouter()

  const [newBrandData, setNewBrandData] = useState({ ...brandData })
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [newIcon, setNewIcon] = useState<string | ArrayBuffer | null>(null)
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
      clearState()
      router.refresh()
    },
    onError: () => {
      toast.error(`Виникла помилка при оновленні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })
  const deleteIcon = trpc.images.remove.useMutation()
  const handleIconUpload = async () => {
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
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (selectedIcon) {
      const uploadResponse = await handleIconUpload()
      if (uploadResponse?.data.id) {
        await updateBrand.mutateAsync({
          id: brandData.id,
          icon_id: uploadResponse.data.id,
          title: newBrandData.title,
          slug: newBrandData.slug,
          article: newArticle,
          metadata: {
            title: newBrandData.metadata.title,
            description: newBrandData.metadata.description,
            keywords: newBrandData.metadata.keywords,
          },
        })
        await deleteIcon.mutateAsync(brandData.icon.id)
      } else {
        await deleteIcon.mutateAsync(uploadResponse?.data.id)
        toast.error(`Помилка оновлення статті...`, {
          style: {
            borderRadius: '10px',
            background: 'red',
            color: '#fff',
          },
        })
      }
    } else {
      updateBrand.mutate({
        id: brandData.id,
        icon_id: brandData.icon_id,
        title: newBrandData.title,
        slug: newBrandData.slug,
        article: newArticle,
        metadata: {
          title: newBrandData.metadata.title,
          description: newBrandData.metadata.description,
          keywords: newBrandData.metadata.keywords,
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

  return (
    <div className='container  flex flex-col items-center  gap-[60px] px-4 transition-all duration-300  ease-in-out'>
      <form className='flex w-full items-end justify-evenly gap-3 text-white-dis '>
        <div className='flex w-full flex-col gap-8'>
          <div className='flex justify-between gap-3 '>
            <div className='flex flex-col gap-3'>
              <p className=' bold mt-2 text-center font-exo_2 text-xl'>
                Іконка(.svg)
              </p>
              <div className='relative'>
                {!newIcon ? (
                  brandData.icon && (
                    <Image
                      className='max-h-[150px] w-[250px] object-contain object-center'
                      src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/public/icons/${brandData.icon.file.filename}`}
                      width={100}
                      height={100}
                      alt={brandData?.icon.alt || ''}
                    />
                  )
                ) : (
                  <div>
                    <Image
                      className='max-h-[150px] w-[250px] object-contain object-center'
                      src={typeof newIcon === 'string' ? newIcon : ''}
                      width={100}
                      height={100}
                      alt={brandData.title}
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
                alt(Опис зображення)
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='altIcon'
                  value={newBrandData.icon.alt || ''}
                  onChange={handleInputChange}
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
          </div>
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
          <label className='flex  flex-col gap-1 text-center font-exo_2 text-xl'>
            Slug(url сторінки)
            <input
              required
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='slug'
              value={newBrandData.slug || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </form>
      <div className='w-full'>
        <AddImagesSection allImagesData={allImagesData} />
      </div>
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
