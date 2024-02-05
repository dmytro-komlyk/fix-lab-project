'use client'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CiSaveDown2 } from 'react-icons/ci'
import { IoMdAddCircle } from 'react-icons/io'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { uploadImg } from '@admin/app/(server)/api/service/image/uploadImg'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import FieldFileUpload from './FieldFileUpload'

const AddImagesSection = ({ allImagesData }: { allImagesData: IImage[] }) => {
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

  // const handleImageUpload = async (e: any) => {
  //   e.preventDefault()

  //   try {
  //     if (selectedImage && altImage) {
  //       const response = await uploadImg({
  //         fileInput: selectedImage,
  //         alt: altImage,
  //         type: 'picture',
  //       })
  //       if (response.status === 201) {
  //         setAltImage('')
  //         setContentImage(null)
  //         setSelectedImage(null)
  //         router.refresh()
  //       }
  //     } else {
  //       toast.error(`Додайте зображення і опис...`, {
  //         style: {
  //           borderRadius: '10px',
  //           background: 'grey',
  //           color: '#fff',
  //         },
  //       })
  //     }
  //   } catch (error) {
  //     toast.error(`Помилка завантаження...`, {
  //       style: {
  //         borderRadius: '10px',
  //         background: 'red',
  //         color: '#fff',
  //       },
  //     })
  //     throw new Error('Error uploading image')
  //   }
  // }

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    console.log('+')
    try {
      const uploadResponse = await uploadImg({
        fileInput: values.file,
        alt: values.file.name.split('.')[0],
        type: 'picture',
      })
      if (uploadResponse.status === 201) {
        //         setAltImage('')
        //         setContentImage(null)
        //         setSelectedImage(null)
        //         router.refresh()
      }
    } catch (err) {
      // need added toast show errors
      console.log(err)
    }
    setSubmitting(false)
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
        className='flex flex-col'
        title={
          <span className='bg-top- text-center font-exo_2 text-xl font-bold text-white-dis'>
            Додати зображення для редактора
          </span>
        }
      >
        {/* <div> */}
        <Formik
          initialValues={{
            file: null,
          }}
          // validationSchema={{}}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form
              onSubmit={props.handleSubmit}
              className='flex flex-col flex-wrap w-full gap-4 items-center justify-center text-white-dis'
            >
              <div className='w-full'>
                <FieldFileUpload
                  name='file'
                  initSrc={null}
                  size={{ width: 450, height: 250 }}
                />
              </div>

              <Button
                isIconOnly
                type='submit'
                isLoading={props.isSubmitting}
                disabled={props.isValid}
                aria-label='Upload image'
                className='bg-transparent text-white-dis'
                onClick={() => console.log('error')}
              >
                <CiSaveDown2 size='3em' />
              </Button>
            </Form>
          )}
        </Formik>
        {/* </div> */}
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
                  <button
                    type='button'
                    className='absolute right-0 top-0 rounded-bl-xl bg-black-dis p-2 font-exo_2 text-sm text-white-dis  transition-colors hover:bg-mid-blue  focus:bg-mid-blue'
                    onClick={() =>
                      handleCopyLink(`${SERVER_URL}/${item.file.path}`)
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
