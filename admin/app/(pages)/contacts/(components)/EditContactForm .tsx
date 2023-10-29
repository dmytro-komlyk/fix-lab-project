/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import Image from 'next/image'
import { useState } from 'react'

import deleteData from '@/app/(server)/api/service/admin/deleteData'
import { sendPutRequest } from '@/app/(server)/api/service/admin/sendPutRequest'
import uploadImg from '@/app/(server)/api/service/admin/uploadImg'
import type { IContact } from '@/app/(server)/api/service/modules/contactService'

import SendButton from '../../(components)/SendButton'

interface IAdminContact {
  contactData: IContact
}

const EditContactForm: React.FC<IAdminContact> = ({ contactData }) => {
  const [newContactData, setNewContactData] = useState({ ...contactData })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [image, setImage] = useState<string | ArrayBuffer | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewContactData({ ...newContactData, [name]: value })
  }

  // const handleArrayInputChange = (propertyPath: string, value: string) => {
  //   const keys = propertyPath.split('.')

  //   setNewContactData(prevData => {
  //     // Assuming your state has a structure similar to the expected type
  //     const updatedData = { ...prevData }

  //     let currentLevel: any = updatedData

  //     for (let i = 0; i < keys.length - 1; i += 1) {
  //       currentLevel = currentLevel[keys[i]] = currentLevel[keys[i]] ?? {}
  //     }

  //     // Update the specific property
  //     currentLevel[keys[keys.length - 1]] = value

  //     return updatedData
  //   })
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      if (selectedImage) {
        const uploadResponse = await handleImageUpload()

        if (!uploadResponse) {
          throw new Error('Error uploading image')
        }

        console.log(uploadResponse.data)

        if (uploadResponse.data._id) {
          const response = await sendPutRequest(
            `/contacts/${newContactData._id}`,
            {
              ...newContactData,
              image: uploadResponse.data._id,
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
        console.error('Error uploading image')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        setSelectedImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setImage(reader.result as string | ArrayBuffer | null)
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
          alt: contactData.image.alt,
          type: contactData.image.type,
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
        const deleteEndpoint = `/images/${contactData.image._id}`

        await deleteData(deleteEndpoint)
        if (deleteEndpoint) {
          setSelectedImage(null)
          setImage(null)
        }
        console.log('success')
      }
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-[50px]'>
      <form className='flex w-full flex-wrap items-end justify-evenly gap-3 text-white-dis '>
        <div className='flex w-[400px] flex-col gap-2'>
          <div className='relative'>
            {!image ? (
              <Image
                className='h-[240px] w-[320px] object-cover object-center'
                src={contactData.image.src}
                width={300}
                height={200}
                alt={contactData.image.alt}
              />
            ) : (
              <div>
                <Image
                  className='h-[240px] w-[320px] object-cover object-center'
                  src={typeof image === 'string' ? image : ''}
                  width={0}
                  height={0}
                  alt={contactData.area}
                />
              </div>
            )}
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              id='image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
            />
          </div>

          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Район:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='area'
              value={newContactData.area || contactData.area}
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Адрес:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='address'
              value={newContactData.address || contactData.address}
              onChange={handleInputChange}
            />
          </label>
          {/* {contactData.phones.map((item, index) => (
            <div key={`phone-${index}`}>
              <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                Телефон:
                <input
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name={`phone-${index}`}
                  value={item}
                  onChange={e =>
                    handleArrayInputChange(`phones.${index}`, e.target.value)
                  }
                />
              </label>
            </div>
          ))} */}
          {/* {contactData.subways.map((item, index) => (
            <div key={`subway-${index}`}>
              <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                Станції метро:
                <input
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name={`subway-${index}`}
                  value={item}
                  onChange={e =>
                    handleArrayInputChange(`subways.${index}`, e.target.value)
                  }
                />
              </label>
            </div>
          ))} */}
        </div>
        <div className='flex w-[400px] flex-col gap-2'>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Коментар:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='comment'
              value={newContactData.comment || contactData.comment || ''}
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Посилання googleMap:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='googleMapLink'
              value={newContactData.googleMapLink || contactData.googleMapLink}
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Посилання googlePlugin:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='googlePluginLink'
              value={
                newContactData.googlePluginLink || contactData.googlePluginLink
              }
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Робочі дні:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='workingDate'
              value={newContactData.workingDate || contactData.workingDate}
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Робочий час:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='workingTime'
              value={newContactData.workingTime || contactData.workingTime}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </form>
      <SendButton handleSubmit={handleSubmit} />
    </div>
  )
}

export default EditContactForm
