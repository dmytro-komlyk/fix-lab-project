'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdKeyboardArrowRight, MdOutlineClose } from 'react-icons/md'
import { BarLoader } from 'react-spinners'

import RenderMarkdown from '@/app/(components)/RenderMarkdown'
import deleteData from '@/app/(server)/api/service/deleteData'
import sendPutRequest from '@/app/(server)/api/service/sendPutRequest'
import uploadImg from '@/app/(server)/api/service/uploadImg'

import EditArticleModal from './EditArticleModal'

interface ArticleItem {
  id: number
  attributes: {
    title: string
    content: string
    description: string
    image: {
      data: {
        id: number
        attributes: {
          url: string
          width: number
          height: number
          name: string
        }
      }
    }
  }
}

interface EditArticleProps {
  blogData: {
    data: ArticleItem
  }
}

const EditArticle: React.FC<EditArticleProps> = ({ blogData }) => {
  const { title, content, image, description } = blogData.data.attributes
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showContentModal, setShowContentModal] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [newImgId, setNewImgId] = useState<number | null>(null)
  const [selectedItemChange, setSelectedItemChange] = useState<string | number>(
    0,
  )
  const [contentBlog, setContentBlog] = useState<string>(content)
  const [isLoading, setIsLoading] = useState(false)
  const [editedTitle, setEditedTitle] = useState<string>('')
  const [editedDescription, setEditedDescription] = useState<string>('')
  useEffect(() => {
    const storedNewImgId = localStorage.getItem(
      `newImgIdEdit_${blogData.data.id}`,
    )
    const storedEditedTitle = localStorage.getItem(
      `editedTitle_${blogData.data.id}`,
    )
    const storedEditedDescription = localStorage.getItem(
      `editedDescription_${blogData.data.id}`,
    )
    const storedContentBlog = localStorage.getItem(
      `addContentBlogEdit_${blogData.data.id}`,
    )

    if (storedNewImgId) {
      setNewImgId(JSON.parse(storedNewImgId))
    }

    if (storedEditedTitle) {
      setEditedTitle(JSON.parse(storedEditedTitle))
    }
    if (storedEditedDescription) {
      setEditedDescription(JSON.parse(storedEditedDescription))
    }

    if (storedContentBlog) {
      setContentBlog(JSON.parse(storedContentBlog))
    }
  }, [blogData.data.id])

  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem(
        `newImgIdEdit_${blogData.data.id}`,
        JSON.stringify(newImgId),
      )
      localStorage.setItem(
        `editedTitle_${blogData.data.id}`,
        JSON.stringify(editedTitle),
      )
      localStorage.setItem(
        `editedDescription_${blogData.data.id}`,
        JSON.stringify(editedDescription),
      )
      localStorage.setItem(
        `addContentBlogEdit_${blogData.data.id}`,
        JSON.stringify(contentBlog),
      )
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [newImgId, editedTitle, editedDescription, contentBlog, blogData.data.id])

  const toggleEditModal = useCallback(() => {
    setShowEditModal(prev => !prev)
  }, [])

  const toggleContentModal = useCallback(() => {
    setShowContentModal(prev => !prev)
  }, [])

  const modalRef = useRef<HTMLDivElement>(null)

  const onBackdropCloseModal = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleEditModal()
      }
    },
    [toggleEditModal],
  )

  const handleInputChange = (fieldName: string, value: string) => {
    if (fieldName === 'title') {
      setEditedTitle(value)
    } else if (fieldName === 'description') {
      setEditedDescription(value)
    }
  }

  const handleSubmitTitle = async (id: number) => {
    try {
      if (editedTitle) {
        const endpoint = `blogs/${id}`
        const data = { data: { title: editedTitle } }
        const res = await sendPutRequest(data, endpoint)
        if (res?.status === 200) {
          localStorage.removeItem(`editedTitle_${id}`)
          setShowEditModal(false)
        }
      }
    } catch (error) {
      throw new Error('Failed to update data')
    }
  }

  const handleSubmitDesc = async (id: number) => {
    try {
      if (editedDescription) {
        const endpoint = `blogs/${id}`
        const data = { data: { description: editedDescription } }
        const res = await sendPutRequest(data, endpoint)
        if (res?.status === 200) {
          localStorage.removeItem(`editedDescription_${id}`)
        }
      }
    } catch (error) {
      throw new Error('Failed to update data')
    } finally {
      setShowEditModal(false)
    }
  }

  const handleSubmitContent = async (id: number) => {
    try {
      const endpoint = `blogs/${id}`
      const data = { data: { content: contentBlog } }
      const res = await sendPutRequest(data, endpoint)

      if (res?.status === 200) {
        toggleContentModal()
        localStorage.removeItem(`addContentBlogEdit_${id}`)
      }
    } catch (error) {
      throw new Error('Failed to update data')
    } finally {
      setShowEditModal(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setSelectedImage(e.currentTarget.files[0] as File)
    }
  }
  const handleImageUpload = useCallback(async () => {
    try {
      if (selectedImage) {
        setIsLoading(true)
        const response = await uploadImg({ fileInput: selectedImage })
        if (response.status === 200) {
          setNewImgId(response.data[0].id)
        }
      }
    } catch (error) {
      throw new Error('Error uploading image')
    } finally {
      setIsLoading(false)
    }
  }, [selectedImage])

  useEffect(() => {
    handleImageUpload()
  }, [handleImageUpload, selectedImage])

  const handleImageSave = async (id: number) => {
    try {
      if (id && newImgId) {
        const endpoint = `blogs/${id}`
        const data = { data: { image: newImgId } }
        const res = await sendPutRequest(data, endpoint)

        if (res.status === 200) {
          const deleteEndpoint = `/upload/files/${image.data.id}`

          if (deleteEndpoint) {
            await deleteData(deleteEndpoint)
            localStorage.removeItem(`newImgIdEdit_${id}`)
            setSelectedImage(null)
            setNewImgId(0)
            toggleEditModal()
          }
        }
      }
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  return (
    <section className='overflow-hidden  pb-[102px] pt-[171px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container relative flex flex-col  xl:p-0'>
        <div className='z-[1] mb-8 flex flex-wrap items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/admin'
          >
            <p>Адмін</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-dark-blue transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/admin/blog'
          >
            <p>Блог</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <p className='text-base font-[400] text-dark-blue opacity-70'>
            {title}
          </p>
        </div>
        <div className='xl:w-[954px]'>
          <div className='flex gap-2'>
            <h3>{title}</h3>
            <button
              type='button'
              onClick={() => {
                toggleEditModal()
                setSelectedItemChange('title')
              }}
            >
              <FaEdit
                className=' transition-colors hover:fill-mid-green focus:fill-mid-green'
                size={25}
              />
            </button>
          </div>
          <div className='flex gap-2'>
            <h3>{description}</h3>
            <button
              type='button'
              onClick={() => {
                toggleEditModal()
                setSelectedItemChange('description')
              }}
            >
              <FaEdit
                className=' transition-colors hover:fill-mid-green focus:fill-mid-green'
                size={25}
              />
            </button>
          </div>
          <div className='relative'>
            {image.data ? (
              <Image
                className='h-[400px] w-full object-cover object-center'
                src={image.data.attributes?.url}
                width={image.data.attributes?.width}
                height={image.data.attributes?.height}
                alt={image.data.attributes?.name}
              />
            ) : (
              <p className=' flex h-[400px] w-full items-center justify-center border-[0.5px] border-solid border-dark-blue object-cover object-center'>
                Зображення відсутнє
              </p>
            )}
            <button
              className='z-1 absolute right-3 top-3'
              type='button'
              onClick={() => {
                setSelectedItemChange('image')
                toggleEditModal()
              }}
            >
              <FaEdit
                className=' transition-colors hover:fill-mid-green focus:fill-mid-green'
                size={25}
              />
            </button>
          </div>
          <div className='relative'>
            <RenderMarkdown markdown={content} />
            <button
              className='z-1 absolute right-3 top-3'
              type='button'
              onClick={toggleContentModal}
            >
              <FaEdit
                className=' transition-colors hover:fill-mid-green focus:fill-mid-green'
                size={25}
              />
            </button>
          </div>
        </div>
      </div>
      {showContentModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <EditArticleModal
              toggleContentModal={toggleContentModal}
              contentBlog={contentBlog}
              setContentBlog={setContentBlog}
            >
              <button
                disabled={isLoading}
                className='group mt-8 flex w-full items-center justify-center rounded-lg bg-dark-blue transition-colors hover:bg-mid-green focus:bg-mid-green'
                type='button'
                onClick={() => {
                  handleSubmitContent(blogData.data.id)
                }}
              >
                <p className='whitespace-nowrap pb-[20px] pt-[23px] text-base font-semibold tracking-[0.64] text-white-dis '>
                  {isLoading ? (
                    <BarLoader color='#fff' width={100} height={24} />
                  ) : (
                    'Зберегти'
                  )}
                </p>
              </button>
            </EditArticleModal>
          </motion.div>
        </AnimatePresence>
      )}
      {showEditModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.1 } }}
            exit={{ opacity: 1, transition: { duration: 0.1 } }}
            ref={modalRef}
            className='fixed left-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-modal-overlay '
          >
            <div
              onClick={onBackdropCloseModal}
              className=' flex min-h-full items-center justify-center  px-3 py-6'
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className='relative max-w-[414px] flex-col items-center justify-center rounded-2xl bg-[#00cc73] p-14 max-sm:px-4'
              >
                <button
                  type='button'
                  className=' white-dis-700 absolute right-4 top-4 text-center'
                  onClick={toggleEditModal}
                >
                  <MdOutlineClose
                    className='h-8 w-8 fill-white-dis  transition-opacity  hover:opacity-80 focus:opacity-80'
                    aria-hidden='true'
                  />
                </button>
                <div className='flex flex-col items-center justify-center gap-6'>
                  {selectedItemChange === 'title' ||
                  selectedItemChange === 'description' ? (
                    <input
                      required
                      id={selectedItemChange}
                      className='h-[58px] w-[302px] rounded-xl px-6 py-2 max-md:w-[280px]'
                      type='text'
                      value={
                        selectedItemChange === 'title'
                          ? editedTitle || title
                          : editedDescription || description
                      }
                      onChange={e =>
                        selectedItemChange === 'title'
                          ? handleInputChange('title', e.target.value)
                          : handleInputChange('description', e.target.value)
                      }
                    />
                  ) : (
                    <input
                      required
                      id='image'
                      type='file'
                      accept='image/*'
                      onChange={handleImageChange}
                    />
                  )}
                </div>

                <button
                  disabled={isLoading}
                  className='group mt-4 flex w-full items-center justify-center rounded-lg bg-dark-blue transition-colors hover:bg-black-dis focus:bg-black-dis'
                  type='button'
                  onClick={() => {
                    if (selectedItemChange === 'title') {
                      handleSubmitTitle(blogData.data.id)
                    }
                    if (selectedItemChange === 'description') {
                      handleSubmitDesc(blogData.data.id)
                    }
                    if (selectedItemChange === 'image') {
                      handleImageSave(blogData.data.id)
                    }
                  }}
                >
                  <p className='whitespace-nowrap pb-[20px] pt-[23px] text-base font-semibold tracking-[0.64] text-white-dis '>
                    {isLoading ? (
                      <BarLoader color='#fff' width={100} height={24} />
                    ) : (
                      'Зберегти'
                    )}
                  </p>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  )
}

export default EditArticle
