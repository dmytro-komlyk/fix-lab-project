'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import { trpc } from '@admin/app/(utils)/trpc/client'
import type { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import SendButton from '../../(components)/SendButton'

const EditContactForm = ({
  contactData,
}: {
  contactData: Awaited<ReturnType<(typeof serverClient)['contacts']['getById']>>
}) => {
  const [newContactData, setNewContactData] = useLocalStorage(
    `editContactData${contactData.id}`,
    {
      ...contactData,
    },
  )
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [newImage, setNewImage] = useState<string | ArrayBuffer | null>(null)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewContactData({ ...newContactData, [name]: value })
  }
  const updateContact = trpc.contacts.update.useMutation({
    onSuccess: () => {
      toast.success(`Оновлення збережено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
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

  const deleteImage = trpc.images.remove.useMutation()
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
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!newContactData.area && !selectedImage) {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    } else if (selectedImage) {
      const uploadResponse = await handleImageUpload()

      if (uploadResponse?.data.id) {
        await updateContact.mutateAsync({
          isActive: true,
          id: contactData.id,
          area: newContactData.area,
          address: newContactData.address,
          comment: newContactData.comment,
          subways: newContactData.subways,
          phones: newContactData.phones,
          workingTime: newContactData.workingTime,
          workingDate: newContactData.workingDate,
          googleMapLink: newContactData.googleMapLink,
          googlePluginLink: newContactData.googlePluginLink,
          image_id: uploadResponse.data.id,
        })
        await deleteImage.mutateAsync(contactData.image.id)
      } else {
        await deleteImage.mutateAsync(uploadResponse?.data.id)
        toast.error(`Помилка оновлення послуги сервісного обслуговування...`, {
          style: {
            borderRadius: '10px',
            background: 'red',
            color: '#fff',
          },
        })
      }
    } else {
      updateContact.mutate({
        isActive: true,
        id: contactData.id,
        area: newContactData.area,
        address: newContactData.address,
        comment: newContactData.comment,
        subways: newContactData.subways,
        phones: newContactData.phones,
        workingTime: newContactData.workingTime,
        workingDate: newContactData.workingDate,
        googleMapLink: newContactData.googleMapLink,
        googlePluginLink: newContactData.googlePluginLink,
        image_id: contactData.image.id,
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

  return (
    <div className='flex flex-col items-center justify-center gap-[50px]'>
      <form className='flex w-full flex-wrap items-end justify-evenly gap-3 text-white-dis '>
        <div className='flex w-[400px] flex-col gap-2'>
          <div className='relative'>
            {!newImage ? (
              <Image
                className='h-[240px] w-[320px] object-cover object-center'
                src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/public/pictures/${contactData.image.file.filename}`}
                width={300}
                height={200}
                alt={contactData.image_id}
              />
            ) : (
              <div>
                <Image
                  className='h-[240px] w-[320px] object-cover object-center'
                  src={typeof newImage === 'string' ? newImage : ''}
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
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Телефон:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='phone'
              value={newContactData.phones || contactData.phones}
            />
          </label>
          {contactData.subways.map((item, index) => (
            <div key={`subway-${index}`}>
              <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                Станції метро:
                <input
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name={`subway-${index}`}
                  value={item}
                  // onChange={e =>
                  //   handleArrayInputChange(`subways.${index}`, e.target.value)
                  // }
                />
              </label>
            </div>
          ))}
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
