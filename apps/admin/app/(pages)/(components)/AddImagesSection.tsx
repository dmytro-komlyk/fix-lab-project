'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { trpc } from '@admin/app/(utils)/trpc/client'
import { uploadImg } from '@admin/app/api/service/image/uploadImg'
import {
  Accordion,
  AccordionItem,
  Button,
  Image,
  Tooltip,
} from '@nextui-org/react'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CiSaveDown2 } from 'react-icons/ci'
import { FaFileUpload } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import { MdCancel } from 'react-icons/md'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const AddImagesSection = ({ allImagesData }: { allImagesData: IImage[] }) => {
  const router = useRouter()

  const images = trpc.images.getAllBlogPictures.useQuery(undefined, {
    initialData: allImagesData,
  })

  const [newImage, setNewImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [fieldValue, setFieldValue] = useState<File | null>(null)

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        const base64 = await convertToBase64(file)
        setNewImage(base64 as string)
        setFieldValue(file)
      } else {
        // toast.error('Image size must be of 2MB or less')
      }
    } else {
      setNewImage(null)
      setFieldValue(null)
    }
  }

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success(`Посилання скопійовано!`, {
      style: {
        borderRadius: '10px',
        background: 'grey',
        color: '#fff',
      },
    })
  }

  const handleUploadImage = async (e: any) => {
    e.preventDefault()
    setIsUploading(true)
    try {
      if (fieldValue) {
        const uploadResponse = await uploadImg({
          fileInput: fieldValue,
          alt: 'test',
          type: 'blog',
        })
        if (uploadResponse.status === 201) {
          setNewImage(null)
          setFieldValue(null)
          toast.success('Зображення завантажено', {
            style: {
              borderRadius: '10px',
              background: 'grey',
              color: '#fff',
            },
          })
          images.refetch()
          router.refresh()
        }
      }
    } catch (err) {
      toast.error(`Помилка завантаження...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
      throw new Error('Error uploading image')
    }
    setIsUploading(false)
  }

  const reversedImagesData: IImage[] = [...allImagesData].reverse()

  return (
    <Accordion
      itemClasses={{ base: 'border-white-dis ' }}
      variant='bordered'
      className='w-full shadow-2xl'
    >
      <AccordionItem
        textValue='1'
        key='1'
        startContent={<IoMdAddCircle size='1em' color='#fff' fill='#fff' />}
        classNames={{
          content: 'flex flex-col justify-center gap-y-4 py-3 items-center',
        }}
        title={
          <span className='text-center font-exo_2 text-xl font-bold text-white-dis'>
            Додати зображення для редактора
          </span>
        }
      >
        <div
          className={`relative flex flex-col items-center gap-4 rounded-xl border text-center ${newImage ? 'p-0' : 'pb-4'}`}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '200px',
          }}
        >
          {!newImage ? (
            <div className='flex size-full items-center justify-center'>
              <p>НЕМАЄ ЗОБРАЖЕННЯ</p>
            </div>
          ) : (
            <div className='flex size-full'>
              <Image
                as={NextImage}
                classNames={{ img: 'h-full' }}
                src={newImage}
                width={400}
                height={200}
                alt='Uploaded Image'
              />
              <Button
                isIconOnly
                className='bg-transperent absolute right-[-2em] top-[-1em] h-fit transition-colors [&>svg]:fill-[red] [&>svg]:hover:fill-[#3a0000] [&>svg]:focus:fill-[#3a0000]'
                onClick={async () => {
                  setNewImage(null)
                }}
              >
                <MdCancel size='1.5em' />
              </Button>
            </div>
          )}
          <Tooltip showArrow content='Вибрати файл'>
            <label
              htmlFor='fileInput'
              className={`${newImage ? 'hidden' : 'flex'} relative cursor-pointer bg-transparent transition-colors [&>svg]:hover:fill-mid-blue [&>svg]:focus:fill-mid-blue`}
            >
              <FaFileUpload size='2em' className='fill-[white]' />
              <input
                id='fileInput'
                className='hidden'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
            </label>
          </Tooltip>
        </div>

        <Button
          isLoading={isUploading}
          isIconOnly
          aria-label='Upload image'
          className='mx-auto my-0 bg-transparent text-white-dis'
          onClick={handleUploadImage}
        >
          <CiSaveDown2 size='3em' />
        </Button>
        {images.data.length ? (
          <Swiper
            grabCursor
            initialSlide={1}
            centeredSlides
            navigation
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1560: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation, Pagination]}
          >
            {reversedImagesData.map((item: IImage) => {
              return (
                <SwiperSlide key={item.id} className='!flex'>
                  <div className='relative my-6 mb-10 flex justify-center bg-modal-overlay'>
                    <Image
                      className='h-[140px] max-w-[280px] object-contain object-center opacity-100 '
                      alt={item.alt}
                      src={`${SERVER_URL}/${item.file.path}`}
                      width={320}
                      height={240}
                    />
                    <Button
                      type='button'
                      className='absolute right-0 top-0 z-10 rounded-bl-xl bg-black-dis p-2 font-exo_2 text-sm text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
                      onClick={() =>
                        handleCopyLink(`${SERVER_URL}/${item.file.path}`)
                      }
                    >
                      Копіювати посилання
                    </Button>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        ) : (
          <>Зображення відсутні</>
        )}
      </AccordionItem>
    </Accordion>
  )
}

export default AddImagesSection
