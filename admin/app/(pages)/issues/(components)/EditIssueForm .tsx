/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

'use client'

import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import { sendPutRequest } from '@admin/app/(server)/api/service/admin/sendPutRequest'
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import type { IIssue } from '@admin/app/(server)/api/service/modules/gadgetService'
import Image from 'next/image'
import { useState } from 'react'

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
  const [newIssueData, setNewIssueData] = useState({ ...issueData })
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [newIcon, setNewIcon] = useState<string | ArrayBuffer | null>(null)
  const [newInfo, setNewInfo] = useState<string | ''>(issueData.info || '')
  const [newDescription, setNewDescription] = useState<string | ''>(
    issueData.description || '',
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
            description: newDescription,
            info: newInfo,
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
          description: newDescription,
          info: newInfo,
        })
      }
    } catch (error) {
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
          alt: issueData.image.alt,
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
          setNewIcon(null)
        }
        console.log('success')
      }
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  return (
    <div className='flex flex-auto flex-col items-center justify-center gap-[20px]'>
      <form
        onSubmit={handleSubmit}
        className='text-white-dis flex w-full items-end justify-evenly gap-3 '
      >
        <div className='w-[400px]'>
          <div className='relative'>
            {!newIcon ? (
              <Image
                className='h-auto w-[400px]  object-center'
                src={issueData.image.src}
                width={400}
                height={300}
                alt={issueData.image.alt}
              />
            ) : (
              <div>
                <Image
                  className='h-[140px] w-[220px] object-center'
                  src={typeof newIcon === 'string' ? newIcon : ''}
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
          <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
            Вартість послуги
            <input
              required
              className='font-base text-md text-black-dis h-[45px] w-full indent-3'
              type='text'
              name='price'
              value={newIssueData.price || ''}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className='w-[400px]'>
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
      </form>
      <div className='flex w-full flex-col justify-between gap-[50px]'>
        <div className='flex w-full flex-col items-start gap-2 '>
          <p className='font-exo_2 text-white-dis text-center text-xl'>Інфо</p>
          <CustomEditor
            id='edit-info-content'
            setContent={setNewInfo}
            content={newInfo}
          />
        </div>
        <div className='flex w-full flex-col items-start gap-2 '>
          <p className='font-exo_2 text-white-dis text-center text-xl'>
            Стаття
          </p>
          <CustomEditor
            id='edit-description-content'
            setContent={setNewDescription}
            content={newDescription}
          />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex w-full   flex-col-reverse '>
            <div className=' border-mid-grey mb-[20px] w-full border-b-2' />
            <p className='font-exo_2 text-white-dis mb-6 text-2xl  font-bold  max-lg:text-xl'>
              Послуги сервісного обслуговування
            </p>
          </div>
        </div>
      </div>
      <EditBenefitsList
        benefitsData={benefitsData}
        newIssueData={newIssueData}
        setNewIssueData={setNewIssueData}
      />
      <SendButton handleSubmit={handleSubmit} />
    </div>
  )
}

export default EditIssuesForm
