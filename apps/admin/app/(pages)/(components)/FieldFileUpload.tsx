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
  size,
}: {
  name: string
  initSrc: string | null
  size: {
    width: number
    height: number
  }
}) => {
  const [newImage, setNewImage] = useState<string | null>(initSrc || null)

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
    <div className='flex flex-col gap-1'>
      <Field name={name}>
        {({ form, meta }: any) => {
          const { setFieldValue } = form

          return (
            <>
              <div
                className={`${meta.error && 'border-danger'} relative flex flex-col items-center gap-4 rounded-xl border-2 border-dashed ${newImage ? 'p-0' : 'pb-4'}`}
                style={{
                  width: '100%',
                  maxWidth: `${String(size.width)}px`,
                  height: `${String(size.height)}px`,
                }}
              >
                {!newImage ? (
                  <div className='flex size-full items-center justify-center'>
                    <p className='text-center'>НЕМАЄ ЗОБРАЖЕННЯ</p>
                  </div>
                ) : (
                  <div className='flex size-full'>
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
                      className='bg-transperent absolute right-[-2em] top-[-1em] h-fit transition-colors [&>svg]:fill-[red] [&>svg]:hover:fill-[#3a0000] [&>svg]:focus:fill-[#3a0000]'
                      onClick={async () => {
                        setNewImage(null)
                        setFieldValue(name, null)
                      }}
                    >
                      <MdCancel size='1.5em' />
                    </Button>
                  </div>
                )}
                <Tooltip showArrow content='Вибрати файл'>
                  <label
                    htmlFor='fileUpload'
                    className={`${newImage ? 'hidden' : 'flex'} relative cursor-pointer bg-transparent transition-colors [&>svg]:hover:fill-mid-blue [&>svg]:focus:fill-mid-blue`}
                  >
                    <FaFileUpload size='2em' className='fill-[white]' />
                    <input
                      id='fileUpload'
                      name={name}
                      className='hidden'
                      type='file'
                      accept='image/*'
                      onChange={e => handleImageChange(e, setFieldValue)}
                    />
                  </label>
                </Tooltip>
              </div>
              {<div className='text-small text-danger'>{meta.error}</div>}
            </>
          )
        }}
      </Field>
    </div>
  )
}

export default FieldFileUpload
