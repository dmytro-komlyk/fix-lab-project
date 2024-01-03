'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import { trpc } from '@admin/app/(utils)/trpc/client'
import { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import SendButton from '../../(components)/SendButton'

const EditBenefitForm = ({
  benefitData,
}: {
  benefitData: Awaited<ReturnType<(typeof serverClient)['benefits']['getById']>>
}) => {
  const [newBenefitData, setNewBenefitData] = useLocalStorage(
    `editNewBenefitData${benefitData.id}`,
    {
      ...benefitData,
    },
  )
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [newIcon, setNewIcon] = useState<string | ArrayBuffer | null>(null)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBenefitData({ ...newBenefitData, [name]: value })
  }

  const clearState = () => {
    setNewBenefitData({ ...newBenefitData })
    if (selectedIcon) {
      setSelectedIcon(null)
    }
    setNewIcon(null)
  }

  const updateBenefit = trpc.benefits.update.useMutation({
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
  const deleteImage = trpc.images.remove.useMutation()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!newBenefitData.title && !selectedIcon) {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      return
    } else {
      if (selectedIcon) {
        const uploadResponse = await handleIconUpload()

        if (uploadResponse?.data.id) {
          await updateBenefit.mutateAsync({
            id: benefitData.id,
            icon_id: uploadResponse.data.id,
            title: newBenefitData.title,
            isActive: true,
          })
          await deleteImage.mutateAsync(benefitData.icon.id)
        } else {
          await deleteImage.mutateAsync(uploadResponse?.data.id)
          toast.error(
            `Помилка оновлення послуги сервісного обслуговування...`,
            {
              style: {
                borderRadius: '10px',
                background: 'red',
                color: '#fff',
              },
            },
          )
        }
      } else {
        updateBenefit.mutate({
          id: benefitData.id,
          icon_id: benefitData.icon.id,
          title: newBenefitData.title,
          isActive: true,
        })
      }
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

  const handleIconUpload = async () => {
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
              src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/public/icons/${benefitData.icon.file.filename}`}
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
