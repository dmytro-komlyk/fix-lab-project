'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { Accordion, AccordionItem, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'

import { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useCallback, useState } from 'react'
import * as Yup from 'yup'
import AddImagesSection from '../../(components)/AddImagesSection'
import CustomEditor from '../../(components)/CustomEditor'
import FieldFileUpload from '../../(components)/FieldFileUpload'
import SelectImage from '../../(components)/SelectImage'
import SendButton from '../../(components)/SendButton'

const AddBrandForm = ({ allPicturesData }: { allPicturesData: IImage[] }) => {
  const router = useRouter()
  const icons = trpc.images.getAllIcons.useQuery(undefined)
  const [selectedIcon, setSelectIcon] = useState<string | null>(null)
  const images = trpc.images.getAllPictures.useQuery(undefined, {
    initialData: allPicturesData,
  })

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
      toast.error(`Виникла помилка при додаванні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const handleSubmit = useCallback(
    async (values: any, { setSubmitting, resetForm }: FormikHelpers<any>) => {
      setSubmitting(true)
      const { file, title, metaTitle, metaDescription, metaKeywords } = values
      const dataToUpdate = {
        slug: title,
        title,
        metadata: {
          title: metaTitle,
          description: metaDescription,
          keywords: metaKeywords,
        },
        article: brandArticle,
      }
      console.log(dataToUpdate, file)

      // try {
      //   if (values.file.name) {
      //     const uploadResponse = await uploadImg({
      //       fileInput: file,
      //       alt: file.name.split('.')[0],
      //       type: 'icon',
      //     })
      //     if (uploadResponse.status === 201) {
      //       await updateBrand.mutateAsync({
      //         ...dataToUpdate,
      //         icon_id: uploadResponse.data.id,
      //       })
      //     }
      //   } else {
      //     await updateBrand.mutateAsync({
      //       ...dataToUpdate,
      //     })
      //   }
      // } catch (err) {
      //   console.log(err)
      // }
      setSubmitting(false)
    },
    [],
  )

  return (
    <Accordion
      itemClasses={{ base: 'border-white-dis ' }}
      variant='bordered'
      className=' shadow-2xl'
    >
      <AccordionItem
        textValue='1'
        key='1'
        startContent={<IoMdAddCircle size={40} color='#fff' fill='#fff' />}
        title={
          <span className='bg-top- text-center font-exo_2 text-2xl font-bold text-white-dis'>
            Додати бренд
          </span>
        }
      >
        <div className='container  flex flex-col items-center  gap-[60px] px-4 transition-all duration-300  ease-in-out'>
          <Formik
            initialValues={{
              file: null,
              title: '',
              metaTitle: '',
              metaKeywords: '',
              metaDescription: '',
            }}
            validationSchema={Yup.object({
              title: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .required('Please enter your title'),
            })}
            onSubmit={handleSubmit}
          >
            {(props: FormikProps<any>) => (
              <Form
                onSubmit={props.handleSubmit}
                className='flex mx-auto my-0 flex-col items-center justify-center gap-3 text-white-dis '
              >
                <div className='w-6/12'>
                  <p className='text-center font-exo_2 text-xl text-white-dis'>
                    Іконка(.svg)
                  </p>
                  <FieldFileUpload name='file' isRequired={false} />
                  <p className='text-white-dis'>або</p>
                  {icons.isSuccess && (
                    <SelectImage
                      icons={icons.data}
                      setSelect={setSelectIcon}
                      defaultSelectedKeys={selectedIcon ? [selectedIcon] : null}
                    />
                  )}
                </div>
                <div className='flex flex-col w-6/12'>
                  <p className='text-center font-exo_2 text-xl text-white-dis'>
                    Seo
                  </p>
                  <div className='flex flex-col gap-4'>
                    <Field name='metaTitle'>
                      {({ meta, field }: any) => (
                        <Input
                          type='text'
                          // isInvalid={meta.touched && meta.error}
                          // errorMessage={meta.touched && meta.error && meta.error}
                          placeholder='Seo title'
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
                    <Field name='metaKeywords'>
                      {({ meta, field }: any) => (
                        <Input
                          type='text'
                          // isInvalid={meta.touched && meta.error}
                          // errorMessage={meta.touched && meta.error && meta.error}
                          placeholder='Seo keywords'
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
                    <Field name='metaDescription'>
                      {({ meta, field }: any) => (
                        <Input
                          type='text'
                          // isInvalid={meta.touched && meta.error}
                          // errorMessage={meta.touched && meta.error && meta.error}
                          placeholder='Seo description'
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
                </div>
                <div className='w-full'>
                  <p className='text-center font-exo_2 text-xl text-white-dis'>
                    Заголовок
                  </p>
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
                <div className='w-full'>
                  <AddImagesSection allImagesData={images.data} />
                </div>
                <div className='flex w-full flex-col justify-center gap-[50px]'>
                  <div className='flex w-full flex-col  gap-2 '>
                    <p className='text-center font-exo_2 text-xl text-white-dis'>
                      Стаття
                    </p>
                    <CustomEditor
                      id='edit-brand-article-content'
                      setContent={setBrandArticle}
                      content={brandArticle}
                    />
                  </div>
                </div>
                <SendButton
                  type={'submit'}
                  disabled={!props.isValid}
                  isLoading={props.isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default AddBrandForm
