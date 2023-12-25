'use client'

import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import { useState } from 'react'

import useLocalStorage from 'admin/app/(hooks)/useLocalStorage '
import { trpc } from 'admin/app/(utils)/trpc/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SendButton from '../../(components)/SendButton'

interface IAdminBenefitProps {
  benefitData: Benefit
}

const EditBenefitForm: React.FC<IAdminBenefitProps> = ({ benefitData }) => {
  const [newBenefitData, setNewBenefitData] = useLocalStorage(
    `editNewBenefitData${benefitData.id}`,
    {
      ...benefitData,
    },
  )
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [newIcon, setNewIcon] = useState<string | ArrayBuffer | null>(null)
  const [uploadedIconId, setUploadedIconId] = useState<string | undefined>('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBenefitData({ ...newBenefitData, [name]: value })
  }

  const clearState = () => {
    setNewBenefitData({ ...newBenefitData })
    if (selectedIcon) {
      setSelectedIcon(null)
      setUploadedIconId('')
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
      // await handleIconSave(benefitData.icon.id)
      clearState()
      router.refresh()
    },
    onError: () => {
      // await deleteData(`/images/${uploadedIconId}`)
      toast.error(`Виникла помилка при оновленні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (newBenefitData.title) {
      updateBenefit.mutate({
        id: benefitData.id,
        icon_id: '6528ff26458999afd6a05c48',
        title: newBenefitData.title,
      })
      // if (selectedIcon) {
      //   // const uploadResponse = await handleIconUpload()
      //   // if (!uploadResponse) {
      //   //   throw new Error('Error uploading image')
      //   // }

      //   updateBenefit.mutate({
      //     id: benefitData.id,
      //     icon_id: '6528ff26458999afd6a05c48',
      //     title: newBenefitData.title,
      //     isActive: true,
      //   })
      // } else {
      //   updateBenefit.mutate({
      //     id: benefitData.id,
      //     icon_id: benefitData.icon.id,
      //     title: newBenefitData.title,
      //     isActive: true,
      //   })
      // }
    } else {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
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

  const handleIconUpload = async () => {
    try {
      if (selectedIcon) {
        const response = await uploadImg({
          fileInput: selectedIcon,
          alt: benefitData.icon.alt,
          type: benefitData.icon.type || 'icon',
        })
        setUploadedIconId(response.data.id)
      }
      return null
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  const handleIconSave = async (id: string | undefined) => {
    try {
      if (id) {
        const deleteEndpoint = `/images/${id}`

        await deleteData(deleteEndpoint)
        if (deleteEndpoint) {
          setSelectedIcon(null)
          setNewIcon(null)
        }
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
        {/* <div className='relative'>
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
        </div> */}
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
