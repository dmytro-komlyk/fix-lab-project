'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { trpc } from 'admin/app/(utils)/trpc/client'
import Image from 'next/image'
import SendButton from '../../(components)/SendButton'
import EditBrandsList from './EditBrandsList'
import EditIssuesList from './EditIssuesList'

interface IGadgetProps {
  gadgetData: Gadget
  issuesData: Issue[]
  brandsData: Brand[]
}

const EditGadgetForm: React.FC<IGadgetProps> = ({
  gadgetData,
  issuesData,
  brandsData,
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

  const updateGadget = trpc.gadgets.update.useMutation({
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

  const deleteIcon = trpc.images.remove.useMutation()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (selectedIcon) {
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
            gallery_ids:
              newGadgetData.gallery.map((item: { id: string }) => item.id) ||
              [],
            issues_ids: newGadgetData.issues.map(item => item.id) || [],
            brands_ids: newGadgetData.brands.map(item => item.id) || [],
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
        icon_id: gadgetData.icon.id || '',
        gallery_ids: newGadgetData.gallery.map(item => item.id) || [],
        issues_ids: newGadgetData.issues.map(item => item.id) || [],
        brands_ids: newGadgetData.brands.map(item => item.id) || [],
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

  return (
    <div className='flex flex-auto flex-col flex-wrap items-center justify-center gap-[20px]'>
      <form className='text-white-dis flex w-full justify-between gap-8 '>
        <div className='flex w-full flex-col gap-8'>
          <div className='flex w-full justify-evenly'>
            <div className='flex flex-col items-center justify-between gap-3'>
              <p className=' bold  font-exo_2 text-center text-xl'>
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
              <p className=' bold font-exo_2 text-center text-xl'>
                SEO налаштування
              </p>
              <label
                htmlFor='metadata title'
                className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'
              >
                Seo title
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                  type='text'
                  name='metadata'
                  data-metadata-field='title'
                  value={newGadgetData.metadata.title || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label
                htmlFor='metadata description'
                className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'
              >
                Seo description
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                  type='text'
                  name='metadata'
                  data-metadata-field='description'
                  value={newGadgetData.metadata.description || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label
                htmlFor='metadata keywords'
                className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'
              >
                Seo keywords
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
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
            className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'
          >
            Заголовок
            <input
              required
              maxLength={60}
              className='font-base text-md text-black-dis h-[45px] w-full indent-3'
              type='text'
              name='title'
              value={newGadgetData.title || ''}
              onChange={handleInputChange}
            />
          </label>
          <label
            htmlFor='title'
            className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'
          >
            Slug(url сторінки)
            <input
              required
              maxLength={60}
              className='font-base text-md text-black-dis h-[45px] w-full indent-3'
              type='text'
              name='slug'
              value={newGadgetData.slug || ''}
              onChange={handleInputChange}
            />
          </label>
          <label
            htmlFor='description'
            className='font-exo_2 flex flex-col items-start gap-1 text-center text-xl'
          >
            Опис
            <textarea
              required
              className='font-base text-md text-black-dis h-[150px] w-full p-2'
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
            <div className=' border-mid-grey mb-[20px] w-full border-b-2' />
            <div className='mb-[10px] mt-8 flex justify-center gap-8'>
              <button type='button' onClick={() => setActiveTab('issues')}>
                <span
                  className={`
              font-exo_2 mb-6 text-2xl  font-bold  max-lg:text-xl
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
              font-exo_2 mb-6 text-2xl  font-bold  max-lg:text-xl
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
