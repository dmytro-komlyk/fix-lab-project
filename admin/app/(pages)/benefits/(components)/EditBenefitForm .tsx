/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */

'use client'

import Image from 'next/image'
import { useState } from 'react'

import deleteData from '@/app/(server)/api/service/admin/deleteData'
import { sendPutRequest } from '@/app/(server)/api/service/admin/sendPutRequest'
import uploadImg from '@/app/(server)/api/service/admin/uploadImg'

import SendButton from '../../(components)/SendButton'

export interface IBenefitItem {
  _id: string
  id: number
  icon: {
    _id?: string
    type?: string
    src: string
    alt: string
    width: number
    height: number
  }
  title: string
  alt: string
}
interface IAdminBenefitProps {
  benefitData: IBenefitItem
}

const EditBenefitForm: React.FC<IAdminBenefitProps> = ({ benefitData }) => {
  const [newBenefitData, setNewBenefitData] = useState({ ...benefitData })
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [newIcon, setNewIcon] = useState<string | ArrayBuffer | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBenefitData({ ...newBenefitData, [name]: value })
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
            `/benefits/${newBenefitData._id}`,
            {
              ...newBenefitData,
              icon: uploadResponse.data._id,
            },
          )

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
        await sendPutRequest(`/benefits/${newBenefitData._id}`, {
          ...newBenefitData,
          icon: benefitData.icon._id || '',
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
          alt: benefitData.icon.alt,
          type: benefitData.icon.type || 'icon',
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
        const deleteEndpoint = `/images/${benefitData.icon._id}`

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
    <div className='flex h-[100vh] justify-between gap-[100px] '>
      <form
        onSubmit={handleSubmit}
        className='flex w-[400px] flex-col gap-3 text-white-dis '
      >
        <div className='relative'>
          {!newIcon ? (
            <Image
              className='h-auto w-[100px]  object-center'
              src={benefitData.icon.src}
              width={100}
              height={100}
              alt={benefitData.icon.alt}
            />
          ) : (
            <div>
              <Image
                className='h-[100px] w-[100px] object-center'
                src={typeof newIcon === 'string' ? newIcon : ''}
                width={100}
                height={100}
                alt={benefitData.title}
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
        <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
          Заголовок
          <input
            required
            className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
            type='text'
            name='title'
            value={newBenefitData.title || ''}
            onChange={handleInputChange}
          />
        </label>

        <SendButton handleSubmit={handleSubmit} />
      </form>
    </div>
  )
}

export default EditBenefitForm
