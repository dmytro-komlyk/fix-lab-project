'use client'

import { Button, Tooltip } from '@nextui-org/react'
import { ErrorMessage, Field } from 'formik'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

const FieldFileUpload = ({
  name,
  isRequired,
}: {
  name: string
  isRequired: boolean
}) => {
  const [newImage, setNewImage] = useState<string | null>(null)

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = error => {
        reject(error)
      }
    })
  }

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        const base64 = await convertToBase64(file)
        setNewImage(base64 as string)
        setFieldValue(name, file)
      } else {
        // toast.error('Image size must be of 2MB or less')
      }
    } else {
      setNewImage(null)
      setFieldValue(name, null)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <Field name={name}>
        {({ form }: any) => {
          const { setFieldValue } = form
          return (
            <div className='flex flex-col items-center gap-4'>
              {!newImage ? (
                <div className='flex h-[100px] w-full items-center justify-center'>
                  <p className='text-xl font-bold text-mid-green'>
                    НЕМАЄ ЗОБРАЖЕННЯ
                  </p>
                </div>
              ) : (
                <div className='relative flex'>
                  <Image
                    className='widht-full h-[100px] w-[100px] rounded'
                    src={newImage}
                    width={100}
                    height={100}
                    alt='test'
                  />
                  <Button
                    isIconOnly
                    className='absolute top-[-1em] right-[-2em] h-fit bg-transperent transition-colors [&>svg]:hover:fill-[red] [&>svg]:focus:fill-[red]'
                    onClick={() => {
                      setNewImage(null)
                      setFieldValue(name, null)
                    }}
                  >
                    <MdCancel size='1.5em' />
                  </Button>
                </div>
              )}
              <Tooltip showArrow={true} content='Вибрати файл'>
                <label className='relative cursor-pointer bg-transparent transition-colors [&>svg]:hover:fill-mid-blue [&>svg]:focus:fill-mid-blue'>
                  <FaFileUpload size='2em' className='fill-[white]' />
                  <input
                    className='hidden'
                    type='file'
                    accept='image/*'
                    required={isRequired}
                    onChange={e => handleImageChange(e, setFieldValue)}
                  />
                </label>
              </Tooltip>
            </div>
          )
        }}
      </Field>
      <div className='text-danger'>
        <ErrorMessage name={name} />
      </div>
    </div>
  )
}

export default FieldFileUpload
