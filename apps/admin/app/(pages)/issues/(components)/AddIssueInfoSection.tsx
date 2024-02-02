'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  Tabs,
} from '@nextui-org/react'
import type { outputBenefitSchema as IBenefit } from '@server/domain/benefits/schemas/benefit.schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'
import * as Yup from 'yup'

import { uploadImg } from '@admin/app/(server)/api/service/image/uploadImg'
import { createIssueSchema } from '@server/domain/issues/schemas/issue.schema'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import CustomAddContent from '../../(components)/CustomAddContent'
import FieldFileUpload from '../../(components)/FieldFileUpload'
import SendButton from '../../(components)/SendButton'
import ListBoxBenefits from './ListBoxBenefits'

const AddIssueInfoSection = ({
  benefitsData,
}: {
  benefitsData: IBenefit[]
}) => {
  const router = useRouter()
  const benefits = trpc.benefits.getAllBenefits.useQuery(undefined, {
    initialData: benefitsData,
  })
  const [selectedTab, setSelectedTab] = useState<any>('issue-info')
  const [listBenefits, setListBenefits] = useState<string[]>([])
  const [contentInfoIssue, setContentInfoIssue] = useState<string>('')
  const [contentDescriptionIssue, setContentDescriptionIssue] =
    useState<string>('')

  const createIssue = trpc.issues.createIssue.useMutation({
    onSuccess: () => {
      toast.success(`Послугу додано!`, {
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

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    const { file, ...restValues } = values
    const issueValues = {
      slug: restValues.slug,
      price: restValues.price,
      title: restValues.title,
      info: contentInfoIssue,
      description: contentDescriptionIssue,
      metadata: {
        title: restValues.seoTitle,
        description: restValues.seoDescription,
        keywords: restValues.seoKeywords,
      },
      benefits_ids: Array.from(listBenefits),
    } as createIssueSchema

    try {
      const uploadResponse = await uploadImg({
        fileInput: file,
        alt: file.name.split('.')[0],
        type: 'picture',
      })
      if (uploadResponse.status === 201) {
        await createIssue.mutateAsync({
          ...issueValues,
          image_id: uploadResponse.data.id,
        })
        resetForm()
        setListBenefits([])
        setContentInfoIssue('')
        setContentDescriptionIssue('')
      }
    } catch (err) {
      // need added toast show errors
      console.log(err)
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
            Додати нову послугу
          </span>
        }
      >
        <Formik
          initialValues={{
            seoTitle: '',
            seoDescription: '',
            seoKeywords: '',
            title: '',
            price: '',
            slug: '',
            file: null,
          }}
          validationSchema={Yup.object({
            seoTitle: Yup.string().min(1).required('Введіть заголовок'),
            seoDescription: Yup.string().min(1).required('Введіть опис'),
            seoKeywords: Yup.string().min(1).required('Введіть ключі'),
            title: Yup.string().min(1).required('Введіть заголовок'),
            price: Yup.string().min(1).required('Введіть вартість'),
            slug: Yup.string().min(3).required('Введіть ЧПУ'),
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
              <div className='order-1 flex flex-col justify-end gap-4 w-[45%] h-72'>
                <Field name='slug'>
                  {({ meta, field }: any) => (
                    <Input
                      type='text'
                      label='ЧПУ(slug)'
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
                <Field name='price'>
                  {({ meta, field }: any) => (
                    <Input
                      type='text'
                      label='Вартість послуги'
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
              <div className='order-3 w-[45%] flex justify-center'>
                <ListBoxBenefits
                  items={benefits.data}
                  listBenefits={listBenefits}
                  setListBenefits={setListBenefits}
                />
              </div>
              <div className='order-4 w-[45%]'>
                <FieldFileUpload
                  name='file'
                  initSrc={null}
                  isRequired={true}
                  size={{ width: 450, height: 300 }}
                />
              </div>
              <div className='order-6 w-[92%] h-[500px]'>
                <Card className='max-w-full w-full h-full'>
                  <CardBody className='overflow-hidden'>
                    <Tabs
                      fullWidth
                      size='md'
                      aria-label=''
                      color='primary'
                      selectedKey={selectedTab}
                      onSelectionChange={setSelectedTab}
                      classNames={{
                        panel: 'h-full',
                      }}
                    >
                      <Tab
                        key='issue-info'
                        title='Додати інформація про послугу'
                        className='flex justify-around overflow-hidden'
                      >
                        <CustomAddContent
                          id='add-issue-info-content'
                          setContent={setContentInfoIssue}
                          content={contentInfoIssue}
                        />
                      </Tab>
                      <Tab
                        key='issue-description'
                        title='Додати детальний опис послуги'
                        className='flex justify-around overflow-hidden'
                      >
                        <CustomAddContent
                          id='add-issue-description-content'
                          setContent={setContentDescriptionIssue}
                          content={contentDescriptionIssue}
                        />
                      </Tab>
                    </Tabs>
                  </CardBody>
                </Card>
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
      </AccordionItem>
    </Accordion>
  )
}

export default AddIssueInfoSection
