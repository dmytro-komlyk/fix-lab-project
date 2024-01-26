'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import { uploadImg } from '@admin/app/(server)/api/service/image/uploadImg'
import { trpc } from '@admin/app/(utils)/trpc/client'
import type { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import SendButton from '../../(components)/SendButton'
import EditBrandsList from './EditBrandsList'
import EditIssuesList from './EditIssuesList'

const EditGadgetForm = ({
  gadgetData,
  issuesData,
  brandsData,
}: {
  gadgetData: Awaited<
    ReturnType<(typeof serverClient)['gadgets']['getBySlugGadget']>
  >
  issuesData: Awaited<
    ReturnType<(typeof serverClient)['issues']['getAllIssues']>
  >
  brandsData: Awaited<
    ReturnType<(typeof serverClient)['brands']['getAllBrands']>
  >
}) => {
  const router = useRouter()
  const [newGadgetData, setNewGadgetData] = useLocalStorage(
    `newGadgetData${gadgetData.id}`,
    {
      ...gadgetData,
    },
  )
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [newIcon, setNewIcon] = useState<string | ArrayBuffer | null>(null)
  const [activeTab, setActiveTab] = useState<'issues' | 'brands'>('issues')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    if (name === 'metadata') {
      const metadataField = e.target.getAttribute('data-metadata-field')

      if (metadataField) {
        setNewGadgetData({
          ...newGadgetData,
          metadata: {
            ...newGadgetData.metadata,
            [metadataField]: value,
          },
        })
      }
    } else {
      setNewGadgetData({ ...newGadgetData, [name]: value })
    }
  }

  const updateGadget = trpc.gadgets.updateGadget.useMutation({
    onSuccess: () => {
      toast.success(`Послугу оновлено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.refresh()
      setSelectedIcon(null)
      setNewIcon(null)
    },

    onError: async () => {
      toast.error(`Виникла помилка при оновленні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const deleteIcon = trpc.images.removeImage.useMutation()
  const handleImageUpload = async () => {
    try {
      if (selectedIcon) {
        const response = await uploadImg({
          fileInput: selectedIcon,
          alt: gadgetData.icon.alt,
          type: gadgetData.icon.type,
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
        newGadgetData.title &&
        newGadgetData.slug &&
        newGadgetData.description &&
        newGadgetData.icon.id &&
        newGadgetData.metadata.description &&
        newGadgetData.metadata.keywords &&
        newGadgetData.metadata.title
      )
    ) {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    } else if (selectedIcon) {
      const uploadResponse = await handleImageUpload()
      if (uploadResponse?.status === 201) {
        if (uploadResponse.data) {
          await updateGadget.mutateAsync({
            isActive: true,
            id: newGadgetData.id,
            slug: newGadgetData.slug,
            title: newGadgetData.title,
            metadata: {
              title: newGadgetData.metadata.title,
              description: newGadgetData.metadata.title,
              keywords: newGadgetData.metadata.title,
            },
            description: newGadgetData.description,
            icon_id: uploadResponse.data.id,
            gallery_ids: newGadgetData.gallery_ids.map(item => item) || [],
            issues_ids: newGadgetData.issues_ids.map(item => item) || [],
            brands_ids: newGadgetData.brands_ids.map(item => item) || [],
          })
          await deleteIcon.mutateAsync(gadgetData.icon_id)
        }
      } else {
        await deleteIcon.mutateAsync(uploadResponse?.data.id)
        toast.error(`Виникла при оновлені гаджету...`, {
          style: {
            borderRadius: '10px',
            background: 'red',
            color: '#fff',
          },
        })
      }
    } else {
      updateGadget.mutate({
        isActive: true,
        id: newGadgetData.id,
        slug: newGadgetData.slug,
        title: newGadgetData.title,
        metadata: {
          title: newGadgetData.metadata.title,
          description: newGadgetData.metadata.title,
          keywords: newGadgetData.metadata.title,
        },
        description: newGadgetData.description,
        icon_id: gadgetData.icon_id || '',
        gallery_ids: newGadgetData.gallery_ids.map(item => item) || [],
        issues_ids: newGadgetData.issues_ids.map(item => item) || [],
        brands_ids: newGadgetData.brands_ids.map(item => item) || [],
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
    <div className='flex flex-auto flex-col flex-wrap items-center justify-center gap-[20px]'>
      <form className='flex w-full justify-between gap-8 text-white-dis '>
        <div className='flex w-full flex-col gap-8'>
          <div className='flex w-full justify-evenly'>
            <div className='flex flex-col items-center justify-between gap-3'>
              <p className=' bold  text-center font-exo_2 text-xl'>
                Іконка(svg)
              </p>
              {!newIcon ? (
                gadgetData.icon && (
                  <Image
                    className='h-[140px] w-[220px] object-contain  object-center'
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/public/icons/${gadgetData.icon.file.filename}`}
                    width={300}
                    height={200}
                    alt={gadgetData.icon.alt}
                  />
                )
              ) : (
                <div>
                  <Image
                    className='h-[140px] w-[220px] object-contain object-center'
                    src={typeof newIcon === 'string' ? newIcon : ''}
                    width={0}
                    height={0}
                    alt={gadgetData.title}
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
            <div className='flex w-[400px] flex-col'>
              <p className=' bold text-center font-exo_2 text-xl'>
                SEO налаштування
              </p>
              <label
                htmlFor='metadata title'
                className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'
              >
                Seo title
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='metadata'
                  data-metadata-field='title'
                  value={newGadgetData.metadata.title || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label
                htmlFor='metadata description'
                className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'
              >
                Seo description
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='metadata'
                  data-metadata-field='description'
                  value={newGadgetData.metadata.description || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label
                htmlFor='metadata keywords'
                className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'
              >
                Seo keywords
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='metadata'
                  data-metadata-field='keywords'
                  value={newGadgetData.metadata.keywords || ''}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <label
            htmlFor='title'
            className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'
          >
            Заголовок
            <input
              required
              maxLength={60}
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='title'
              value={newGadgetData.title || ''}
              onChange={handleInputChange}
            />
          </label>
          <label
            htmlFor='title'
            className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'
          >
            Slug(url сторінки)
            <input
              required
              maxLength={60}
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='slug'
              value={newGadgetData.slug || ''}
              onChange={handleInputChange}
            />
          </label>
          <label
            htmlFor='description'
            className='flex flex-col items-start gap-1 text-center font-exo_2 text-xl'
          >
            Опис
            <textarea
              required
              className='font-base h-[150px] w-full p-2 text-md text-black-dis'
              value={newGadgetData.description || ''}
              name='description'
              onChange={handleInputChange}
            />
          </label>
        </div>
      </form>
      <div className=' flex w-full items-center justify-center gap-[100px]'>
        <div className='w-full'>
          <div className='flex  flex-col-reverse justify-center '>
            <div className=' mb-[20px] w-full border-b-2 border-mid-grey' />
            <div className='mb-[10px] mt-8 flex justify-center gap-8'>
              <button type='button' onClick={() => setActiveTab('issues')}>
                <span
                  className={`
              mb-6 font-exo_2 text-2xl  font-bold  max-lg:text-xl
              ${activeTab === 'issues' ? 'text-mid-green' : 'text-white-dis'}`}
                >
                  Послуги
                </span>
              </button>
              <button
                type='button'
                className={`tab-button `}
                onClick={() => setActiveTab('brands')}
              >
                <span
                  className={`
              mb-6 font-exo_2 text-2xl  font-bold  max-lg:text-xl
              ${activeTab === 'brands' ? 'text-mid-green' : 'text-white-dis'}`}
                >
                  Бренди
                </span>
              </button>
            </div>
          </div>
          <div className=' flex h-[400px] justify-center overflow-auto '>
            {activeTab === 'issues' && (
              <EditIssuesList
                newGadgetData={newGadgetData}
                issuesData={issuesData}
                setNewGadgetData={setNewGadgetData}
              />
            )}
            {activeTab === 'brands' && (
              <EditBrandsList
                brandsData={brandsData}
                newGadgetData={newGadgetData}
                setNewGadgetData={setNewGadgetData}
              />
            )}
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <SendButton handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default EditGadgetForm
