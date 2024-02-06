'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { uploadImg } from '@admin/app/(server)/api/service/image/uploadImg'
import { Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { outputBrandSchema as IBrand } from '@server/domain/brands/schemas/brand.schema'
import { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import AddImagesSection from '../../(components)/AddImagesSection'
import CustomEditor from '../../(components)/CustomEditor'
import FieldFileUpload from '../../(components)/FieldFileUpload'
import SelectImage from '../../(components)/SelectImage'
import SendButton from '../../(components)/SendButton'

const EditBrandForm = ({
  brandData,
  allPicturesData,
  allIconsData,
}: {
  brandData: IBrand
  allPicturesData: IImage[]
  allIconsData: IImage[]
}) => {
  const router = useRouter()
  const brand = trpc.brands.getByIdBrand.useQuery(
    { id: brandData.id },
    { initialData: brandData },
  )
  const icons = trpc.images.getAllIcons.useQuery(undefined, {
    initialData: allIconsData,
  })
  const images = trpc.images.getAllPictures.useQuery(undefined, {
    initialData: allPicturesData,
  })
  const [selectedIcon, setSelectIcon] = useState<string | null>(
    brand.data.icon_id,
  )
  const [brandArticle, setBrandArticle] = useState<string>(brand.data.article)

  const updateBrand = trpc.brands.updateBrand.useMutation({
    onSuccess: () => {
      toast.success(`Оновлення збережено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.push('/brands')
      router.refresh()
    },
    onError: () => {
      toast.error(`Виникла помилка при оновленні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
    onSettled: () => {
      brand.refetch()
    },
  })

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    const { file, title, seoTitle, seoDescription, seoKeywords } = values
    const dataToUpdate = {
      ...brand.data,
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
        await updateBrand.mutateAsync({
          ...dataToUpdate,
          icon_id: selectedIcon,
        })
      } else {
        if (file) {
          const uploadResponse = await uploadImg({
            fileInput: file,
            alt: values.file.name.split('.')[0],
            type: 'icon',
          })
          if (uploadResponse.status === 201) {
            await updateBrand.mutateAsync({
              ...dataToUpdate,
              icon_id: uploadResponse.data.id,
            })
          }
        } else {
          // added validate empty image
        }
      }
    } catch (err) {
      console.log(err)
    }
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{
        file: null,
        title: brand.data.title,
        seoTitle: brand.data.metadata.title,
        seoDescription: brand.data.metadata.description,
        seoKeywords: brand.data.metadata.keywords,
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
          className='flex flex-wrap w-full gap-x-8 gap-y-12 py-6 items-center justify-center text-white-dis'
        >
          <Card className='order-2 flex flex-col w-[45%] h-72 !bg-[#09338F]'>
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
                    isInvalid={meta.touched && meta.error ? true : false}
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
                    isInvalid={meta.touched && meta.error ? true : false}
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
                    isInvalid={meta.touched && meta.error ? true : false}
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
          <div className='order-1 flex flex-col items-center justify-end gap-4 w-[45%] h-72'>
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
            <div className='text-danger'></div>
          </div>
          <div className='order-3 w-[92%]'>
            <Field name='title'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  label='Заголовок'
                  labelPlacement='inside'
                  variant='bordered'
                  isInvalid={meta.touched && meta.error ? true : false}
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
          </div>
          {images.data && (
            <div className='order-4 w-[92%]'>
              <AddImagesSection allImagesData={images.data} />
            </div>
          )}
          <div className='order-5 w-[92%]'>
            <CustomEditor
              id='edit-brand-article-content'
              setContent={setBrandArticle}
              content={brandArticle}
            />
          </div>
          <div className='order-last'>
            <SendButton
              type={'submit'}
              disabled={!props.isValid}
              isLoading={props.isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditBrandForm
