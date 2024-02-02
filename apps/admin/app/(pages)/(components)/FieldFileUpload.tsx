'use client'

import { Button, Image, Tooltip } from '@nextui-org/react'
import { Field } from 'formik'
import NextImage from 'next/image'
import React, { useState } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

const FieldFileUpload = ({
  name,
  initSrc,
  isRequired,
  size,
}: {
  name: string
  initSrc: string | null
  isRequired: boolean
  size: {
    width: number
    height: number
  }
}) => {
  const [newImage, setNewImage] = useState<string | null>(
    initSrc ? initSrc : null,
  )

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
            <div
              className={`relative flex flex-col items-center text-center gap-4 border rounded-xl ${newImage ? 'p-0' : 'pb-4'}`}
              style={{
                width: '100%',
                height: `${String(size.height)}px`,
              }}
            >
              {!newImage ? (
                <div
                  className={`flex w-full h-full justify-center items-center`}
                >
                  <p>НЕМАЄ ЗОБРАЖЕННЯ</p>
                </div>
              ) : (
                <div className='flex w-full h-full'>
                  <Image
                    as={NextImage}
                    classNames={{ img: 'h-full' }}
                    src={newImage}
                    width={size.width}
                    height={size.height}
                    alt='Uploaded Image'
                  />
                  <Button
                    isIconOnly
                    className='absolute top-[-1em] right-[-2em] h-fit bg-transperent transition-colors [&>svg]:fill-[red] [&>svg]:hover:fill-[#3a0000] [&>svg]:focus:fill-[#3a0000]'
                    onClick={async () => {
                      setNewImage(null)
                      setFieldValue(name, null)
                    }}
                  >
                    <MdCancel size='1.5em' />
                  </Button>
                </div>
              )}
              <Tooltip showArrow={true} content='Вибрати файл'>
                <label
                  className={`${newImage ? 'hidden' : 'flex'} relative cursor-pointer bg-transparent transition-colors [&>svg]:hover:fill-mid-blue [&>svg]:focus:fill-mid-blue`}
                >
                  <FaFileUpload size='2em' className='fill-[white]' />
                  <input
                    name={name}
                    className='hidden'
                    type='file'
                    accept='image/*'
                    onChange={e => handleImageChange(e, setFieldValue)}
                  />
                </label>
              </Tooltip>
            </div>
          )
        }}
      </Field>
      <div className='text-danger'></div>
    </div>
  )
}

export default FieldFileUpload
