'use client'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { createSlug } from '@admin/app/(utils)/createSlug'
import { trpc } from '@admin/app/(utils)/trpc/client'
import { uploadImg } from '@admin/app/api/service/image/uploadImg'
import { Card, CardBody, CardHeader, Input, Tab, Tabs } from '@nextui-org/react'
import type { outputBenefitSchema } from '@server/domain/benefits/schemas/benefit.schema'
import type {
  createIssueSchema,
  outputIssueSchema,
} from '@server/domain/issues/schemas/issue.schema'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

import CustomEditor from '../../(components)/CustomEditor'
import FieldFileUpload from '../../(components)/FieldFileUpload'
import SendButton from '../../(components)/SendButton'
import ListBoxBenefits from './ListBoxBenefits'

const EditIssuesForm = ({
  issueData,
  benefitsData,
}: {
  issueData: outputIssueSchema
  benefitsData: outputBenefitSchema[]
}) => {
  const router = useRouter()

  const issue = trpc.issues.getByIdIssue.useQuery(
    { id: issueData.id },
    { initialData: issueData },
  )
  const benefits = trpc.benefits.getAllBenefits.useQuery(undefined, {
    initialData: benefitsData,
  })

  const [selectedTab, setSelectedTab] = useState<any>('issue-info')
  const [listBenefits, setListBenefits] = useState<string[]>(
    issue.data.benefits_ids,
  )

  const updateIssue = trpc.issues.updateIssue.useMutation({
    onSuccess: () => {
      toast.success(`Послугу оновлено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.push('/issues')
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
      issue.refetch()
    },
  })

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    const { file, ...restValues } = values

    const issueValues = {
      slug: createSlug(restValues.title),
      price: restValues.price,
      title: restValues.title,
      info: restValues.info,
      description: restValues.description,
      metadata: {
        title: restValues.seoTitle,
        description: restValues.seoDescription,
        keywords: restValues.seoKeywords,
      },
      benefits_ids: Array.from(listBenefits),
    } as createIssueSchema

    try {
      if (file) {
        const uploadResponse = await uploadImg({
          fileInput: file,
          alt: file.name.split('.')[0],
          type: 'picture',
        })
        if (uploadResponse.status === 201) {
          await updateIssue.mutateAsync({
            ...issue.data,
            ...issueValues,
            image_id: uploadResponse.data.id,
          })
        }
      } else {
        await updateIssue.mutateAsync({ ...issue.data, ...issueValues })
      }
    } catch (err) {
      toast.error(`Виникла помилка при додаванні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    }
    setSubmitting(false)
  }

  return (
    <div className='flex flex-auto flex-col items-center justify-center gap-4'>
      <Formik
        initialValues={{
          seoTitle: issue.data.metadata.title,
          seoDescription: issue.data.metadata.description,
          seoKeywords: issue.data.metadata.keywords,
          title: issue.data.title,
          price: issue.data.price,
          slug: issue.data.slug,
          file: null,
          info: issue.data.info,
          description: issue.data.description,
        }}
        validationSchema={Yup.object({
          seoTitle: Yup.string().min(1).required('Введіть заголовок'),
          seoDescription: Yup.string().min(1).required('Введіть опис'),
          seoKeywords: Yup.string().min(1).required('Введіть ключі'),
          title: Yup.string().min(1).required('Введіть заголовок'),
          price: Yup.string().min(1).required('Введіть вартість'),
          info: Yup.string().min(1).required('Введіть контент'),
          description: Yup.string().min(1).required('Введіть контент'),
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
                    isDisabled
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
              <Field name='price'>
                {({ meta, field }: any) => (
                  <Input
                    type='text'
                    label='Вартість послуги'
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
            <div className='order-3 flex w-[45%] justify-center'>
              <ListBoxBenefits
                items={benefits.data}
                listBenefits={listBenefits}
                setListBenefits={setListBenefits}
              />
            </div>
            <div className='order-4 w-[45%]'>
              <FieldFileUpload
                name='file'
                acceptTypes={['png', 'jpg']}
                initSrc={`${SERVER_URL}/${issue.data.image.file.path}`}
                size={{ width: 400, height: 300 }}
              />
            </div>
            <div className='order-6 h-[500px] w-[92%]'>
              <Card className='size-full max-w-full'>
                <CardBody className='overflow-hidden'>
                  <Tabs
                    fullWidth
                    size='md'
                    aria-label=''
                    color='primary'
                    selectedKey={selectedTab}
                    onSelectionChange={setSelectedTab}
                    classNames={{
                      panel: 'h-full flex-col',
                    }}
                  >
                    <Tab
                      key='issue-info'
                      title='Додати інформація про послугу'
                      className='flex justify-around overflow-hidden'
                    >
                      <CustomEditor id='add-issue-info-content' name='info' />
                    </Tab>
                    <Tab
                      key='issue-description'
                      title='Додати детальний опис послуги'
                      className='flex justify-around overflow-hidden'
                    >
                      <CustomEditor
                        id='add-issue-description-content'
                        name='description'
                      />
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
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

export default EditIssuesForm
