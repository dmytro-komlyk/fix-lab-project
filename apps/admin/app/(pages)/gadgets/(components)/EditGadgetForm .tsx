'use client'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { trpc } from '@admin/app/(utils)/trpc/client'
import { uploadImg } from '@admin/app/api/service/image/uploadImg'
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  cn,
  Image,
  Input,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react'
import type { outputBrandSchema as IBrand } from '@server/domain/brands/schemas/brand.schema'
import type {
  createGadgetSchema,
  outputGadgetSchema as IGadget,
} from '@server/domain/gadgets/schemas/gadget.schema'
import type { imageSchema as IImage } from '@server/domain/images/schemas/image.schema'
import type { outputIssueSchema as IIssue } from '@server/domain/issues/schemas/issue.schema'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaExchangeAlt } from 'react-icons/fa'
import * as Yup from 'yup'

import FieldFileUpload from '../../(components)/FieldFileUpload'
import SelectImage from '../../(components)/SelectImage'
import SendButton from '../../(components)/SendButton'

const EditGadgetForm = ({
  gadgetData,
  issuesData,
  brandsData,
  iconsData,
}: {
  gadgetData: IGadget
  issuesData: IIssue[]
  brandsData: IBrand[]
  iconsData: IImage[]
}) => {
  const router = useRouter()

  const gadget = trpc.gadgets.getByIdGadget.useQuery(
    { id: gadgetData.id },
    { initialData: gadgetData },
  )

  const [selectedIcon, setSelectIcon] = useState<string | null>(
    gadget.data.icon_id,
  )
  const [errorImage, setErrorImage] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState<any>('brands')
  const [groupSelectedBrands, setGroupSelectedBrands] = useState<any>(
    gadget.data.brands_ids,
  )
  const [groupSelectedIssues, setGroupSelectedIssues] = useState<any>(
    gadget.data.issues_ids,
  )

  const issues = trpc.issues.getAllIssues.useQuery(undefined, {
    initialData: issuesData,
  })
  const brands = trpc.brands.getAllBrands.useQuery(undefined, {
    initialData: brandsData,
  })
  const icons = trpc.images.getAllIcons.useQuery(undefined, {
    initialData: iconsData,
  })

  const updateGadget = trpc.gadgets.updateGadget.useMutation({
    onSuccess: () => {
      toast.success(`Гаджет ${gadget.data.title} оновлено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.push('/gadgets')
      router.refresh()
    },

    onError: async () => {
      toast.error(`Виникла помилка при оновленні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },

    onSettled: () => {
      gadget.refetch()
    },
  })

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    const { file, ...restValues } = values
    const gadgetValues = {
      slug: restValues.slug,
      title: restValues.title,
      description: restValues.description,
      metadata: {
        title: restValues.seoTitle,
        description: restValues.seoDescription,
        keywords: restValues.seoKeywords,
      },
      brands_ids: groupSelectedBrands,
      issues_ids: groupSelectedIssues,
    } as createGadgetSchema
    try {
      if (selectedIcon) {
        await updateGadget.mutateAsync({
          ...gadget.data,
          ...gadgetValues,
          icon_id: selectedIcon,
        })
      } else if (file) {
        const uploadResponse = await uploadImg({
          fileInput: file,
          alt: file.name.split('.')[0],
          type: 'icon',
        })
        if (uploadResponse.status === 201) {
          await updateGadget.mutateAsync({
            ...gadget.data,
            ...gadgetValues,
            icon_id: uploadResponse.data.id,
          })
        }
      } else {
        setErrorImage('Додайте зображення')
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
    <div className='flex flex-auto flex-col flex-wrap items-center justify-center gap-[20px]'>
      <Formik
        initialValues={{
          seoTitle: gadget.data.metadata.title,
          seoDescription: gadget.data.metadata.description,
          seoKeywords: gadget.data.metadata.keywords,
          title: gadget.data.title,
          description: gadget.data.description,
          slug: gadget.data.slug,
          file: null,
        }}
        validationSchema={Yup.object({
          seoTitle: Yup.string().min(1).required('Введіть заголовок'),
          seoDescription: Yup.string().min(1).required('Введіть опис'),
          seoKeywords: Yup.string().min(1).required('Введіть ключі'),
          title: Yup.string().min(1).required('Введіть заголовок'),
          description: Yup.string().min(1).required('Введіть опис'),
          slug: Yup.string().min(3).required('Введіть ЧПУ'),
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
                acceptTypes={['svg+xml']}
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
              <div className='text-danger'>
                {props.values.file || selectedIcon ? '' : errorImage}
              </div>
            </div>
            <div className='order-3 flex h-full w-[45%] flex-col justify-end gap-5'>
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
              <Field name='description'>
                {({ meta, field }: any) => (
                  <Textarea
                    type='text'
                    label='Опис'
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
            <div className='order-3 flex h-full w-[45%] flex-col justify-end gap-4 text-center'></div>
            <div className='order-5 flex h-[500px] w-[92%] flex-col justify-end gap-4'>
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
                      panel: 'h-full',
                    }}
                  >
                    <Tab
                      key='brands'
                      title='Додати бренди'
                      className='flex justify-around overflow-hidden'
                    >
                      <CheckboxGroup
                        value={groupSelectedBrands}
                        onChange={setGroupSelectedBrands}
                        color='success'
                        classNames={{
                          base: 'w-[47%] pr-2 overflow-y-auto',
                          wrapper: 'items-center',
                        }}
                      >
                        {groupSelectedBrands.length ? (
                          brands.data
                            .filter(brand =>
                              groupSelectedBrands.includes(brand.id),
                            )
                            .map(brand => (
                              <Checkbox
                                key={brand.id}
                                aria-label={brand.title}
                                classNames={{
                                  base: cn(
                                    'inline-flex max-w-md w-full bg-content1 m-0',
                                    'hover:bg-content2 items-center justify-start',
                                    'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                                    'border-grey',
                                  ),
                                  label: 'w-full',
                                }}
                                value={brand.id}
                              >
                                <div className='flex h-[32px] w-full flex-row justify-between gap-2'>
                                  <Image
                                    width={100}
                                    height={32}
                                    src={`${SERVER_URL}/${brand.icon.file.path}`}
                                    alt={brand.icon.alt}
                                    classNames={{
                                      img: 'h-full',
                                      wrapper: 'w-[30%] h-full',
                                    }}
                                  />
                                  <p className='w-[70%]'>{brand.title}</p>
                                </div>
                              </Checkbox>
                            ))
                        ) : (
                          <div className='flex size-full items-center justify-center'>
                            <p className='font-base text-black-dis'>Порожньо</p>
                          </div>
                        )}
                      </CheckboxGroup>
                      <div className='flex items-center'>
                        <FaExchangeAlt className='fill-[#09338F]' size='2em' />
                      </div>
                      <CheckboxGroup
                        value={groupSelectedBrands}
                        onChange={setGroupSelectedBrands}
                        classNames={{
                          base: 'w-[47%] pr-2 overflow-y-auto',
                          wrapper: 'items-center',
                        }}
                      >
                        {brands.data &&
                          brands.data
                            .filter(
                              brand => !groupSelectedBrands.includes(brand.id),
                            )
                            .map(brand => (
                              <Checkbox
                                key={brand.id}
                                aria-label={brand.title}
                                classNames={{
                                  base: cn(
                                    'inline-flex max-w-md w-full bg-content1 m-0',
                                    'hover:bg-content2 items-center justify-start',
                                    'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                                    'border-grey',
                                  ),
                                  label: 'w-full',
                                }}
                                value={brand.id}
                              >
                                <div className='flex h-[32px] w-full flex-row justify-between gap-2'>
                                  <Image
                                    width={100}
                                    height={32}
                                    src={`${SERVER_URL}/${brand.icon.file.path}`}
                                    alt={brand.icon.alt}
                                    classNames={{
                                      img: 'h-full',
                                      wrapper: 'w-[30%] h-full',
                                    }}
                                  />
                                  <p className='w-[70%]'>{brand.title}</p>
                                </div>
                              </Checkbox>
                            ))}
                      </CheckboxGroup>
                    </Tab>
                    <Tab
                      key='issues'
                      title='Додати послуги'
                      className='flex justify-around overflow-hidden'
                    >
                      <CheckboxGroup
                        value={groupSelectedIssues}
                        onChange={setGroupSelectedIssues}
                        color='success'
                        classNames={{
                          base: 'w-[47%] pr-2 overflow-y-auto',
                          wrapper: 'items-center',
                        }}
                      >
                        {groupSelectedIssues.length ? (
                          issues.data
                            .filter(issue =>
                              groupSelectedIssues.includes(issue.id),
                            )
                            .map(issue => (
                              <Checkbox
                                key={issue.id}
                                aria-label={issue.title}
                                classNames={{
                                  base: cn(
                                    'inline-flex max-w-md w-full bg-content1 m-0',
                                    'hover:bg-content2 items-center justify-start',
                                    'cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent',
                                    'border-grey',
                                  ),
                                  label: 'w-full',
                                }}
                                value={issue.id}
                              >
                                <div className='flex h-[32px] w-full flex-row justify-between gap-2'>
                                  <p>{issue.title}</p>
                                </div>
                              </Checkbox>
                            ))
                        ) : (
                          <div className='flex size-full items-center justify-center'>
                            <p className='font-base text-black-dis'>Порожньо</p>
                          </div>
                        )}
                      </CheckboxGroup>
                      <div className='flex items-center'>
                        <FaExchangeAlt className='fill-[#09338F]' size='2em' />
                      </div>
                      <CheckboxGroup
                        value={groupSelectedIssues}
                        onChange={setGroupSelectedIssues}
                        classNames={{
                          base: 'w-[47%] pr-2 overflow-y-auto',
                          wrapper: 'items-center',
                        }}
                      >
                        {issues.data &&
                          issues.data
                            .filter(
                              issue => !groupSelectedIssues.includes(issue.id),
                            )
                            .map(issue => (
                              <Checkbox
                                key={issue.id}
                                aria-label={issue.title}
                                classNames={{
                                  base: cn(
                                    'inline-flex max-w-md w-full bg-content1 m-0',
                                    'hover:bg-content2 items-center justify-start',
                                    'cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent',
                                    'border-grey',
                                  ),
                                  label: 'w-full',
                                }}
                                value={issue.id}
                              >
                                <div className='flex w-full flex-row justify-between gap-2'>
                                  <p>{issue.title}</p>
                                </div>
                              </Checkbox>
                            ))}
                      </CheckboxGroup>
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

export default EditGadgetForm
