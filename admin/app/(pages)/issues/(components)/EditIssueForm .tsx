/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import { sendPutRequest } from '@admin/app/(server)/api/service/admin/sendPutRequest'
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import type { IIssue } from '@admin/app/(server)/api/service/modules/gadgetService'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

import AddImagesSection from '../../(components)/AddImagesSection'
import CustomEditor from '../../(components)/CustomEditor'
import SendButton from '../../(components)/SendButton'
import type { IBenefitItem } from '../../benefits/(components)/EditBenefitForm '
import EditBenefitsList from './EditBenefitsList'

interface IAdminGadget {
  issueData: IIssue
  benefitsData: IBenefitItem[]
}

const EditIssuesForm: React.FC<IAdminGadget> = ({
  issueData,
  benefitsData,
}) => {
  const [newIssueData, setNewIssueData] = useLocalStorage(
    `editIssueData${issueData._id}`,
    {
      ...issueData,
    },
  )
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [icon, setIcon] = useState<string | ArrayBuffer | null>(null)
  const [info, setInfo] = useLocalStorage<string | ''>(
    `editIssueInfo${issueData._id}`,
    issueData.info || '',
  )
  const [description, setDescription] = useLocalStorage<string | ''>(
    `editIssueDescription${issueData._id}`,
    issueData.description || '',
  )
  const [altImage, setAltImage] = useLocalStorage<string | ''>(
    `editIssueAltImage${issueData._id}`,
    issueData.image.alt,
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'metadata') {
      const metadataField = e.target.getAttribute('data-metadata-field')

      if (metadataField) {
        setNewIssueData({
          ...newIssueData,
          metadata: {
            ...newIssueData.metadata,
            [metadataField]: value,
          },
        })
      }
    } else {
      setNewIssueData({ ...newIssueData, [name]: value })
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
          const response = await sendPutRequest(`/issues/${newIssueData._id}`, {
            ...newIssueData,
            image: uploadResponse.data._id,
            benefits: newIssueData.benefits.map(item => item._id) || [],
            description,
            info,
          })

          if (response.status === 200) {
            await handleImageSave(uploadResponse.data._id)
            window.location.reload()
          } else {
            console.error('Error updating contact data')
          }
        } else {
          console.error('Error uploading image')
        }
      } else {
        await sendPutRequest(`/issues/${newIssueData._id}`, {
          ...newIssueData,
          image: issueData.image._id || '',
          benefits: newIssueData.benefits.map(item => item._id) || [],
          description,
          info,
        })
      }
    } catch (error) {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      console.error('Error:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        setSelectedIcon(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setIcon(reader.result as string | ArrayBuffer | null)
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
          alt: altImage,
          type: issueData.image.type,
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
        const deleteEndpoint = `/images/${issueData.image._id}`

        await deleteData(deleteEndpoint)
        if (deleteEndpoint) {
          setSelectedIcon(null)
          setIcon(null)
        }
        console.log('success')
      }
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  return (
    <div className='flex flex-auto flex-col items-center justify-center gap-4'>
      <form className='text-white-dis flex w-full flex-col justify-between gap-3 '>
        <div className='flex w-full justify-between'>
          <div className='flex w-[500px] flex-col gap-3'>
            <p className=' bold font-exo_2 mt-2 text-center text-xl'>
              Зображення
            </p>
            <div className='relative'>
              {!icon ? (
                <Image
                  className='h-[400px] w-[500px] object-contain  object-center'
                  src={issueData.image.src}
                  width={400}
                  height={300}
                  alt={issueData.image.alt}
                />
              ) : (
                <div>
                  <Image
                    className='h-[400px] w-[500px] object-contain object-center'
                    src={typeof icon === 'string' ? icon : ''}
                    width={0}
                    height={0}
                    alt={issueData.title}
                  />
                </div>
              )}
            </div>
            <input
              className=' text-white-dis'
              id='icon'
              type='file'
              accept='icon/*'
              onChange={handleImageChange}
            />
            <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
              Опис зображення(alt)
              <input
                required
                className='font-base text-md text-black-dis h-[45px] w-full indent-3'
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
                value={newIssueData.metadata.title || ''}
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
                value={newIssueData.metadata.description || ''}
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
                value={newIssueData.metadata.keywords || ''}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
          Вартість послуги
          <input
            required
            className='font-base text-md text-black-dis h-[45px] w-[300px] indent-3'
            type='text'
            name='price'
            value={newIssueData.price || ''}
            onChange={handleInputChange}
          />
        </label>
        <label className='font-exo_2 flex  w-full flex-col gap-1 text-center text-xl'>
          Заголовок
          <input
            required
            className='font-base text-md text-black-dis h-[45px] w-full indent-3'
            type='text'
            name='title'
            value={newIssueData.title || ''}
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
            value={newIssueData.slug || ''}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <div className='w-full'>
        <AddImagesSection />
      </div>
      <div className='flex w-full flex-col justify-between gap-6'>
        <div className='flex w-full  flex-col  gap-2 '>
          <p className='font-exo_2 text-white-dis text-center text-xl'>Інфо</p>
          <CustomEditor
            id='edit-info-content'
            setContent={setInfo}
            content={info}
          />
        </div>
        <div className='w-full'>
          <AddImagesSection />
        </div>
        <div className='flex w-full  flex-col  gap-2 '>
          <p className='font-exo_2 text-white-dis text-center text-xl'>
            Стаття
          </p>
          <CustomEditor
            id='edit-description-content'
            setContent={setDescription}
            content={description}
          />
        </div>
      </div>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='flex w-full  flex-col-reverse  justify-center '>
          <div className='  border-mid-grey w-full border-b-2' />
          <p className='font-exo_2 text-white-dis mb-6 text-center text-2xl  font-bold  max-lg:text-xl'>
            Послуги сервісного обслуговування
          </p>
        </div>
      </div>
      <div className=' flex h-[400px] w-full justify-center overflow-auto '>
        <EditBenefitsList
          benefitsData={benefitsData}
          newIssueData={newIssueData}
          setNewIssueData={setNewIssueData}
        />
      </div>

      <SendButton handleSubmit={handleSubmit} />
    </div>
  )
}

export default EditIssuesForm
