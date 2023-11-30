/* eslint-disable no-console */

'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import useLocalStorage from '@/app/(hooks)/useLocalStorage '
import deleteData from '@/app/(server)/api/service/admin/deleteData'
import { sendPutRequest } from '@/app/(server)/api/service/admin/sendPutRequest'
import uploadImg from '@/app/(server)/api/service/admin/uploadImg'
import type {
  IBrand,
  IGadget,
  IIssue,
} from '@/app/(server)/api/service/modules/gadgetService'

import SendButton from '../../(components)/SendButton'
import EditBrandsList from './EditBrandsList'
import EditIssuesList from './EditIssuesList'

interface IAdminGadget {
  gadgetData: IGadget
  issuesData: IIssue[]
  brandsData: IBrand[]
}

const EditGadgetForm: React.FC<IAdminGadget> = ({
  gadgetData,
  issuesData,
  brandsData,
}) => {
  const router = useRouter()
  const [newGadgetData, setNewGadgetData] = useLocalStorage(
    `newGadgetData${gadgetData._id}`,
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

  const handleImageSave = async (id: string) => {
    try {
      if (id) {
        const deleteEndpoint = `/images/${gadgetData.icon._id}`

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

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      if (selectedIcon) {
        const uploadResponse = await handleImageUpload()

        if (!uploadResponse) {
          throw new Error('Error uploading image')
        }

        if (uploadResponse.data._id) {
          const response = await sendPutRequest(
            `/gadgets/${newGadgetData._id}`,
            {
              ...newGadgetData,
              icon: uploadResponse.data._id,
              gallery: newGadgetData.gallery.map(item => item._id) || [],
              issues: newGadgetData.issues.map(item => item._id) || [],
              brands: newGadgetData.brands.map(item => item._id) || [],
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
            router.refresh()
          } else {
            console.error('Error updating contact data')
          }
        } else {
          console.error('Error uploading image')
        }
      } else {
        const res = await sendPutRequest(`/gadgets/${newGadgetData._id}`, {
          ...newGadgetData,
          icon: gadgetData.icon._id || '',
          gallery: newGadgetData.gallery.map(item => item._id) || [],
          issues: newGadgetData.issues.map(item => item._id) || [],
          brands: newGadgetData.brands.map(item => item._id) || [],
        })
        if (res.status === 200) {
          toast.success(`Оновлення збережено!`, {
            style: {
              borderRadius: '10px',
              background: 'grey',
              color: '#fff',
            },
          })
        }
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(`Помилка оновлення...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
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
                    src={gadgetData?.icon.src}
                    width={300}
                    height={200}
                    alt={gadgetData?.icon.alt}
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
