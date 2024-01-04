'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import type { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { Accordion, AccordionItem } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillCloseSquare } from 'react-icons/ai'
import { FaFileImage, FaSave } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const AddImagesSection = ({
  allImagesData,
}: {
  allImagesData: Awaited<ReturnType<(typeof serverClient)['images']['getAll']>>
}) => {
  const router = useRouter()

  const [altImage, setAltImage] = useState<string | ''>('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [contentImage, setContentImage] = useState<string | ArrayBuffer | null>(
    null,
  )
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        setSelectedImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setContentImage(reader.result as string | ArrayBuffer | null)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const handleImageUpload = async (e: any) => {
    e.preventDefault()

    try {
      if (selectedImage && altImage) {
        const response = await uploadImg({
          fileInput: selectedImage,
          alt: altImage,
          type: 'picture',
        })
        if (response.status === 201) {
          setAltImage('')
          setContentImage(null)
          setSelectedImage(null)
          router.refresh()
        }
      } else {
        toast.error(`Додайте зображення і опис...`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
      }
    } catch (error) {
      toast.error(`Помилка завантаження...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
      throw new Error('Error uploading image')
    }
  }

  const reversedImagesData: Awaited<
    ReturnType<(typeof serverClient)['images']['getAll']>
  > = [...allImagesData].reverse()

  return (
    <Accordion
      itemClasses={{ base: 'border-white-dis ' }}
      variant='bordered'
      className=' w-full shadow-2xl'
    >
      <AccordionItem
        textValue='1'
        key='1'
        startContent={<IoMdAddCircle size={40} color='#fff' fill='#fff' />}
        className='flex flex-col'
        title={
          <span className='bg-top- text-center font-exo_2 text-2xl font-bold text-white-dis'>
            Додати зображення для редактора
          </span>
        }
      >
        <div className='flex flex-col items-center justify-center gap-3 self-center px-4'>
          {contentImage && (
            <div className='relative flex flex-col items-center justify-center gap-4'>
              <Image
                className='h-[300px] w-[500px] object-contain object-center'
                src={typeof contentImage === 'string' ? contentImage : ''}
                width={400}
                height={100}
                alt=''
              />
              <button
                aria-label='Видалити зображення'
                type='button'
                className='absolute right-0 top-0 rounded-bl-xl bg-black-dis p-2 text-white-dis  '
                onClick={() => {
                  setSelectedImage(null)
                  setContentImage(null)
                  setAltImage('')
                }}
              >
                <AiFillCloseSquare
                  className='transition-colors hover:text-[red]  focus:text-[red]'
                  size={30}
                />
              </button>
            </div>
          )}
          <div className='flex items-end gap-4'>
            <label className='flex w-[300px] flex-col items-center justify-center gap-1  font-exo_2 text-xl text-white-dis'>
              Опис зображення(alt)
              <input
                required
                className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                type='text'
                name='altImage'
                value={altImage}
                onChange={e => {
                  setAltImage(e.target.value)
                }}
              />
            </label>
            <label className='relative cursor-pointer'>
              <FaFileImage
                className='text-white-dis transition-all hover:scale-[1.03]  hover:opacity-80 focus:scale-[1.03]  focus:opacity-80'
                size={40}
              />
              <input
                className='hidden'
                id='icon'
                type='file'
                accept='icon/*'
                onChange={handleImageChange}
              />
            </label>
            <button
              aria-label='Зберегти '
              className=' text-white-dis transition-all hover:scale-[1.03]  hover:opacity-80 focus:scale-[1.03]  focus:opacity-80'
              type='button'
              onClick={handleImageUpload}
            >
              <FaSave size={40} />
            </button>
          </div>
        </div>

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
          {reversedImagesData.map((item: any) => {
            return (
              <SwiperSlide key={item.id} style={{ width: 600 }}>
                <div className='relative my-6 mb-10 flex justify-center bg-modal-overlay '>
                  <Image
                    className='h-[140px] max-w-[280px]  object-contain object-center opacity-100 '
                    alt={item.alt}
                    src={`${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/public/pictures/${item.file.filename}`}
                    width={320}
                    height={240}
                  />
                  <button
                    type='button'
                    className='absolute right-0 top-0 rounded-bl-xl bg-black-dis p-2 font-exo_2 text-sm text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
                    onClick={() =>
                      handleCopyLink(
                        `${process.env.NEXT_PUBLIC_IMAGES_BASE_URL}/public/pictures/${item.file.filename}`,
                      )
                    }
                  >
                    Копіювати посилання
                  </button>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </AccordionItem>
    </Accordion>
  )
}

export default AddImagesSection
