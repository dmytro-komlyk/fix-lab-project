'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import { trpc } from '@admin/app/(utils)/trpc/client'
import { Accordion, AccordionItem } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'

import SendButton from '../../(components)/SendButton'

const AddBenefitForm = () => {
  const router = useRouter()

  const [benefitTitle, setBenefitTile] = useLocalStorage<string | ''>(
    'addBenefitTitle',
    '',
  )
  const [uploadedIconId, setUploadedIconId] = useState<object | undefined>({})
  const [newIcon, setNewIcon] = useState<string | ArrayBuffer | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const clearState = () => {
    setBenefitTile('')
    setUploadedIconId({})
    if (selectedIcon) {
      setSelectedIcon(null)
    }
  }

  const createBenefit = trpc.benefits.create.useMutation({
    onSuccess: () => {
      toast.success(`Послугу сервісного обслуговування додано!`, {
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
      toast.error(`Виникла помилка при додаванні...`, {
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
      if (selectedIcon) {
        const response = await uploadImg({
          fileInput: selectedIcon,
          alt: benefitTitle,
          type: 'icon',
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

    if (!benefitTitle && !selectedIcon) {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    } else {
      const uploadResponse = await handleImageUpload()
      if (uploadResponse?.status === 201) {
        createBenefit.mutate({
          icon_id: uploadResponse.data.id,
          title: benefitTitle,
        })
      } else {
        await deleteImage.mutateAsync(uploadResponse?.data.id)
        toast.error(`Помилка додаванні послуги сервісного обслуговування...`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
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

  return (
    <Accordion
      itemClasses={{ base: 'border-white-dis ' }}
      variant='bordered'
      className=' shadow-2xl'
    >
      <AccordionItem
        textValue='1'
        key='1'
        startContent={<IoMdAddCircle size={40} color='#fff' fill='#fff' />}
        title={
          <span className='bg-top- text-center font-exo_2 text-2xl font-bold text-white-dis'>
            Додати послугу сервісного обсуговування
          </span>
        }
      >
        <div className='flex w-full items-center justify-center py-4'>
          <form
            onSubmit={handleSubmit}
            className='flex w-[400px] flex-col items-center justify-center gap-3 text-white-dis '
          >
            <div className='relative'>
              {!uploadedIconId ? (
                <div className='flex h-[100px] w-[100px] items-center justify-center'>
                  <p>NO IMAGE</p>
                </div>
              ) : (
                <div>
                  <Image
                    className='h-[100px] w-[100px] object-center'
                    src={typeof newIcon === 'string' ? newIcon : ''}
                    width={100}
                    height={100}
                    alt={benefitTitle}
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
            <label className='flex w-full flex-col items-center gap-1 text-center font-exo_2 text-xl'>
              Заголовок
              <input
                required
                className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                type='text'
                name='title'
                value={benefitTitle}
                onChange={e => setBenefitTile(e.target.value)}
              />
            </label>

            <SendButton handleSubmit={handleSubmit} />
          </form>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default AddBenefitForm
