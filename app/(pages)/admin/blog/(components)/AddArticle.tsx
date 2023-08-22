/* eslint-disable no-console */

'use client'

import { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

import deleteData from '@/app/(server)/api/service/deleteData'
import postData from '@/app/(server)/api/service/postData'
import uploadImg from '@/app/(server)/api/service/uploadImg'

import CustomAddContent from '../../(components)/(tinymce)/CustomAddContent'

interface NewImage {
  data: {
    id: number
    attributes: any
  }
}
const AddArticle: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [newImg, setNewImg] = useState<NewImage | null>(null)
  const [newImgId, setNewImgId] = useState<number | null>(null)
  const [contentBlog, setContentBlog] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [editedData, setEditedData] = useState<{
    title: string
    description: string
  }>({
    title: '',
    description: '',
  })

  useEffect(() => {
    const storedNewImg = localStorage.getItem('newImg')
    const storedNewImgId = localStorage.getItem('newImgId')
    const storedEditedData = localStorage.getItem('editedData')
    const storedContentBlog = localStorage.getItem('addContentBlog')

    if (storedNewImg) {
      setNewImg(JSON.parse(storedNewImg))
    }

    if (storedNewImgId) {
      setNewImgId(JSON.parse(storedNewImgId))
    }

    if (storedEditedData) {
      setEditedData(JSON.parse(storedEditedData))
    }

    if (storedContentBlog) {
      setContentBlog(JSON.parse(storedContentBlog))
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem('newImg', JSON.stringify(newImg))
      localStorage.setItem('newImgId', JSON.stringify(newImgId))
      localStorage.setItem('editedData', JSON.stringify(editedData))
      localStorage.setItem('addContentBlog', JSON.stringify(contentBlog))
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [newImg, newImgId, editedData, contentBlog])

  const handleInputChange = (key: string, value: string) => {
    setEditedData(prevData => ({
      ...prevData,
      [key]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setSelectedImage(e.currentTarget.files[0] as File)
    }
  }

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return
    }
    try {
      setIsLoading(true)
      const response = await uploadImg({ fileInput: selectedImage })
      setNewImg(response.data[0])
      setNewImgId(response.data[0].id)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePostPublish = async () => {
    try {
      const endpoint = `/blogs`
      if (
        editedData.title &&
        editedData.description &&
        contentBlog &&
        newImgId
      ) {
        const data = {
          data: {
            title: editedData.title,
            content: contentBlog,
            description: editedData.description,
            image: {
              id: newImgId,
            },
          },
        }
        const res = await postData(data, endpoint)
        if (res?.status === 200) {
          localStorage.removeItem('newImg')
          localStorage.removeItem('editedData')
          localStorage.removeItem('addContentBlog')
          setSelectedImage(null)
          setNewImg(null)
          setNewImgId(null)
          setContentBlog('')
          setEditedData({
            title: '',
            description: '',
          })
        }
      } else {
        console.log('Заповнити всі поля')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const handleDeleteImg = async () => {
    if (!newImgId) {
      return
    }
    try {
      setIsLoading(true)
      const deleteEndpoint = `/upload/files/${newImgId}`
      const res = await deleteData(deleteEndpoint)
      if (res.status === 200) {
        setNewImg(null)
        setNewImgId(null)
        setSelectedImage(null)

        localStorage.removeItem(`newImg`)
        localStorage.removeItem(`newImgId`)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <div className='mt-12 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4 '>
        <h3 className='font-exo_2 text-xl  font-bold text-white-dis max-lg:text-xl '>
          Заголовок
        </h3>
        <input
          required
          id='title'
          className='h-[58px] w-[500px] rounded-xl px-6 py-2 max-md:w-[280px]'
          type='text'
          value={editedData.title}
          onChange={e => handleInputChange('title', e.target.value)}
        />
      </div>
      <div className='flex flex-col items-center justify-center gap-4 '>
        <h3 className='font-exo_2 text-xl  font-bold text-white-dis max-lg:text-xl '>
          Опис
        </h3>
        <input
          required
          id='description'
          className='h-[58px]  w-[500px] rounded-xl px-6 py-2 max-md:w-[280px]'
          type='textarea'
          value={editedData.description}
          onChange={e => handleInputChange('description', e.target.value)}
        />
      </div>
      <div className='flex flex-col items-center justify-center gap-4 '>
        <h3 className='font-exo_2 text-xl  font-bold text-white-dis max-lg:text-xl '>
          Головне фото
        </h3>
        <input
          required
          id='image'
          type='file'
          accept='image/*'
          onChange={handleImageChange}
        />
        {newImgId && (
          <button
            disabled={isLoading}
            className='group mt-4 flex w-full items-center justify-center rounded-lg bg-mid-green transition-colors hover:bg-black-dis focus:bg-black-dis'
            type='button'
            onClick={handleDeleteImg}
          >
            <p className='whitespace-nowrap pb-[20px] pt-[23px] text-base font-semibold tracking-[0.64] text-white-dis '>
              {isLoading ? (
                <BarLoader color='#fff' width={100} height={24} />
              ) : (
                'Видалити'
              )}
            </p>
          </button>
        )}

        {!newImgId && (
          <button
            disabled={isLoading}
            className='group mt-4 flex w-full items-center justify-center rounded-lg bg-mid-green transition-colors hover:bg-black-dis focus:bg-black-dis'
            type='button'
            onClick={handleImageUpload}
          >
            <p className='whitespace-nowrap pb-[20px] pt-[23px] text-base font-semibold tracking-[0.64] text-white-dis '>
              {isLoading ? (
                <BarLoader color='#fff' width={100} height={24} />
              ) : (
                'Зберегти'
              )}
            </p>
          </button>
        )}
      </div>
      <div className='mt-4 flex w-full flex-col items-center justify-center gap-4'>
        <h3 className='font-exo_2 text-xl  font-bold text-white-dis max-lg:text-xl '>
          Контент
        </h3>
        <div className='w-full'>
          <CustomAddContent
            contentBlog={contentBlog}
            setContent={setContentBlog}
          />
        </div>
      </div>
      <button
        className='group mt-8  w-[300px] items-center justify-center rounded-lg bg-mid-green  transition-colors hover:bg-black-dis focus:bg-black-dis'
        type='button'
        onClick={handlePostPublish}
      >
        <p className='whitespace-nowrap pb-[20px] pt-[23px] text-base font-semibold tracking-[0.64] text-white-dis '>
          Публікувати
        </p>
      </button>
    </div>
  )
}

export default AddArticle
