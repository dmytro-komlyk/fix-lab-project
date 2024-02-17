'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { uploadImg } from '@admin/app/api/service/image/uploadImg'
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Input,
} from '@nextui-org/react'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'
import * as Yup from 'yup'

import AddImagesSection from '../../(components)/AddImagesSection'
import CustomEditor from '../../(components)/CustomEditor'
import FieldFileUpload from '../../(components)/FieldFileUpload'
import SelectImage from '../../(components)/SelectImage'
import SendButton from '../../(components)/SendButton'

const AddBrandForm = ({
  allPicturesData,
  allIconsData,
}: {
  allPicturesData: IImage[]
  allIconsData: IImage[]
}) => {
  const router = useRouter()
  const icons = trpc.images.getAllIcons.useQuery(undefined, {
    initialData: allIconsData,
  })
  const images = trpc.images.getAllPictures.useQuery(undefined, {
    initialData: allPicturesData,
  })
  const [selectedIcon, setSelectIcon] = useState<string | null>(null)
  const [brandArticle, setBrandArticle] = useState<string>('')

  const createBrand = trpc.brands.createBrand.useMutation({
    onSuccess: () => {
      toast.success(`Бренд додано!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.refresh()
    },
    onError: () => {
      toast.error(`Виникла помилка при додаванні`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    const { file, title, seoTitle, seoDescription, seoKeywords } = values

    const newData = {
      slug: title,
      title,
      metadata: {
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
      },
      article: brandArticle,
    }

    try {
      if (selectedIcon) {
        await createBrand.mutateAsync({
          icon_id: selectedIcon,
          ...newData,
        })
        resetForm()
        setBrandArticle('')
      } else {
        const uploadResponse = await uploadImg({
          fileInput: file,
          alt: file.name.split('.')[0],
          type: 'icon',
        })
        if (uploadResponse.status === 201) {
          await createBrand.mutateAsync({
            icon_id: uploadResponse.data.id,
            ...newData,
          })
          resetForm()
          setBrandArticle('')
        }
      }
    } catch (err) {
      // need added toast show errors
    }
    setSubmitting(false)
  }

  return (
    <Accordion
      itemClasses={{ base: 'border-white-dis ' }}
      variant='bordered'
      className='shadow-2xl'
    >
      <AccordionItem
        textValue='1'
        key='1'
        startContent={<IoMdAddCircle size={40} color='#fff' fill='#fff' />}
        title={
          <span className='text-center font-exo_2 text-2xl font-bold text-white-dis'>
            Додати бренд
          </span>
        }
      >
        <Formik
          initialValues={{
            file: null,
            title: '',
            seoTitle: '',
            seoDescription: '',
            seoKeywords: '',
          }}
          validationSchema={Yup.object({
            title: Yup.string().min(1).required('Введіть заголовок'),
            seoTitle: Yup.string().min(1).required('Введіть заголовок'),
            seoDescription: Yup.string().min(1).required('Введіть опис'),
            seoKeywords: Yup.string().min(1).required('Введіть ключі'),
          })}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form
              onSubmit={props.handleSubmit}
              className='flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-12 py-6 text-white-dis'
            >
              <Card className='order-2 flex h-72 w-[45%] flex-col !bg-[#09338F]'>
                <CardHeader className='flex flex-col !items-center'>
                  <h3 className='text-lg text-white-dis'>СЕО налаштування</h3>
                </CardHeader>
                <CardBody className='gap-y-5'>
                  <Field name='seoTitle'>
                    {({ meta, field }: any) => (
                      <Input
                        type='text'
                        label='Title'
                        labelPlacement='inside'
                        variant='bordered'
                        isInvalid={!!(meta.touched && meta.error)}
                        errorMessage={meta.touched && meta.error}
                        classNames={{
                          label: ['font-base', 'text-md', 'text-black-dis'],
                          input: ['font-base', 'text-md', 'text-black-dis'],
                          inputWrapper: ['bg-white-dis'],
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                  <Field name='seoDescription'>
                    {({ meta, field }: any) => (
                      <Input
                        type='text'
                        label='Description'
                        labelPlacement='inside'
                        variant='bordered'
                        isInvalid={!!(meta.touched && meta.error)}
                        errorMessage={meta.touched && meta.error && meta.error}
                        classNames={{
                          label: ['font-base', 'text-md', 'text-black-dis'],
                          input: ['font-base', 'text-md', 'text-black-dis'],
                          inputWrapper: ['bg-white-dis'],
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                  <Field name='seoKeywords'>
                    {({ meta, field }: any) => (
                      <Input
                        type='text'
                        label='Keywords'
                        labelPlacement='inside'
                        variant='bordered'
                        isInvalid={!!(meta.touched && meta.error)}
                        errorMessage={meta.touched && meta.error && meta.error}
                        classNames={{
                          label: ['font-base', 'text-md', 'text-black-dis'],
                          input: ['font-base', 'text-md', 'text-black-dis'],
                          inputWrapper: ['bg-white-dis'],
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                </CardBody>
              </Card>
              <div className='order-1 flex h-72 w-[45%] flex-col items-center justify-end gap-4'>
                <FieldFileUpload
                  name='file'
                  initSrc={null}
                  size={{ width: 150, height: 150 }}
                />
                <p className='text-white-dis'>або</p>
                {icons.isSuccess && (
                  <SelectImage
                    icons={icons.data}
                    setSelect={setSelectIcon}
                    defaultSelectedKeys={selectedIcon ? [selectedIcon] : null}
                  />
                )}
                <div className='text-danger' />
              </div>
              <div className='order-3 w-[92%]'>
                <Field name='title'>
                  {({ meta, field }: any) => (
                    <Input
                      type='text'
                      isInvalid={meta.touched && meta.error}
                      errorMessage={meta.touched && meta.error && meta.error}
                      placeholder='Заголовок'
                      classNames={{
                        input: [
                          'font-base',
                          'h-[45px]',
                          'w-full',
                          'indent-3',
                          'text-md',
                          'text-black-dis',
                        ],
                      }}
                      {...field}
                    />
                  )}
                </Field>
              </div>
              {images.data && (
                <div className='order-4 w-[92%]'>
                  <AddImagesSection allImagesData={images.data} />
                </div>
              )}
              <div className='order-5 w-[92%]'>
                <CustomEditor id='edit-brand-article-content' name='article' />
              </div>
              <div className='order-last'>
                <SendButton
                  type='submit'
                  disabled={!props.isValid}
                  isLoading={props.isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </AccordionItem>
    </Accordion>
  )
}

export default AddBrandForm
