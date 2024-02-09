'use client'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { trpc } from '@admin/app/(utils)/trpc/client'
import { uploadImg } from '@admin/app/api/service/image/uploadImg'
import { Card, CardBody, CardHeader, Input, Textarea } from '@nextui-org/react'
import type { outputArticleSchema as IArticle } from '@server/domain/articles/schemas/article.schema'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

import AddImagesSection from '../../(components)/AddImagesSection'
import CustomAddContent from '../../(components)/CustomAddContent'
import FieldFileUpload from '../../(components)/FieldFileUpload'
import SendButton from '../../(components)/SendButton'

const EditArticleSection = ({
  articleData,
  imagesData,
}: {
  articleData: IArticle
  imagesData: IImage[]
}) => {
  const router = useRouter()
  const { updatedAt, createdAt, ...restArticledata } = articleData
  const article = trpc.articles.getByIdArticle.useQuery(
    { id: articleData.id },
    { initialData: restArticledata },
  )
  const images = trpc.images.getAllBlogPictures.useQuery(undefined, {
    initialData: imagesData,
  })
  const [contentArticleBlog, setContentArticleBlog] = useState<string>(
    article.data.text,
  )

  const updateArticle = trpc.articles.updateArticle.useMutation({
    onSuccess: () => {
      toast.success(`Оновлення збережено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.push('/articles')
      router.refresh()
    },

    onError: async () => {
      toast.error(`Виникла помилка при додаванні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },

    onSettled: () => {
      article.refetch()
    },
  })

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    const { file, ...restValues } = values
    const articleValues = {
      slug: restValues.slug,
      title: restValues.title,
      preview: restValues.preview,
      text: contentArticleBlog,
      metadata: {
        title: restValues.seoTitle,
        description: restValues.seoDescription,
        keywords: restValues.seoKeywords,
      },
    }
    try {
      if (file) {
        const uploadResponse = await uploadImg({
          fileInput: file,
          alt: file.name.split('.')[0],
          type: 'picture',
        })
        if (uploadResponse.status === 201) {
          await updateArticle.mutateAsync({
            ...articleValues,
            id: article.data.id,
            image_id: uploadResponse.data.id,
          })
        }
      } else {
        await updateArticle.mutateAsync({
          ...articleValues,
          id: article.data.id,
          image_id: article.data.image_id,
        })
      }
    } catch (err) {
      // need added toast show errors
    }
    setSubmitting(false)
  }

  return (
    <div className='flex flex-auto flex-col items-center justify-center gap-4'>
      <Formik
        initialValues={{
          seoTitle: article.data.metadata.title,
          seoDescription: article.data.metadata.description,
          seoKeywords: article.data.metadata.keywords,
          slug: article.data.slug,
          title: article.data.title,
          preview: article.data.preview,
          file: null,
        }}
        validationSchema={Yup.object({
          seoTitle: Yup.string().min(1).required('Введіть заголовок'),
          seoDescription: Yup.string().min(1).required('Введіть опис'),
          seoKeywords: Yup.string().min(1).required('Введіть ключі'),
          slug: Yup.string().min(3).required('Введіть ЧПУ'),
          title: Yup.string().min(1).required('Введіть заголовок'),
          preview: Yup.string().min(1).required('Введіть опис'),
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
            <div className='order-1 flex h-72 w-[45%] flex-col justify-end gap-4'>
              <Field name='slug'>
                {({ meta, field }: any) => (
                  <Input
                    type='text'
                    label='ЧПУ(slug)'
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
              <Field name='title'>
                {({ meta, field }: any) => (
                  <Input
                    type='text'
                    label='Заголовок'
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
            </div>
            <div className='order-3 w-[45%]'>
              <Field name='preview'>
                {({ meta, field }: any) => (
                  <Textarea
                    type='text'
                    label='Опис'
                    labelPlacement='inside'
                    variant='bordered'
                    minRows={6}
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
            </div>
            <div className='order-4 w-[45%]'>
              <FieldFileUpload
                name='file'
                initSrc={`${SERVER_URL}/${article.data.image.file.path}`}
                size={{ width: 400, height: 200 }}
              />
            </div>
            {images.data && (
              <div className='order-5 w-[92%]'>
                <AddImagesSection allImagesData={images.data} />
              </div>
            )}
            <div className='order-6 w-[92%]'>
              <CustomAddContent
                id='add-article-blog-content'
                setContent={setContentArticleBlog}
                content={contentArticleBlog}
              />
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
    </div>
  )
}

export default EditArticleSection
