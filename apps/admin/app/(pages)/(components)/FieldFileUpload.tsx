'use client'

import { ErrorMessage, Field } from 'formik'
import Image from 'next/image'
import React, { useState } from 'react'

const FieldFileUpload = ({ name }: { name: string }) => {
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
    }
  }

  return (
    <div className='flex flex-col gap-8'>
      {!newImage ? (
        <div className='flex h-[100px] w-full items-center justify-center'>
          <p>НЕМАЄ ЗОБРАЖЕННЯ</p>
        </div>
      ) : (
        <div className='flex justify-center'>
          <Image
            className='h-[100px] w-[100px]'
            src={newImage ? newImage : ''}
            width={100}
            height={100}
            alt='test'
          />
        </div>
      )}
      <div className='mb-3'>
        <Field name={name}>
          {({ form }: any) => {
            const { setFieldValue } = form
            return (
              <input
                type='file'
                accept='image/*'
                className='form-control'
                required
                onChange={e => handleImageChange(e, setFieldValue)}
              />
            )
          }}
        </Field>
        <div className='text-danger'>
          <ErrorMessage name={name} />
        </div>
      </div>
    </div>
  )
}

export default FieldFileUpload
