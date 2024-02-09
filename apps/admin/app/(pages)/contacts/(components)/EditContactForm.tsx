'use client'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { trpc } from '@admin/app/(utils)/trpc/client'
import { Button, Chip, Input } from '@nextui-org/react'
import type { outputContactSchema as IContact } from '@server/domain/contacts/schemas/contact.schema'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import * as Yup from 'yup'

import FieldFileUpload from '../../(components)/FieldFileUpload'
import SendButton from '../../(components)/SendButton'

const EditContactForm = ({ contactData }: { contactData: IContact }) => {
  // const router = useRouter()

  const contact = trpc.contacts.getByIdContact.useQuery(
    { id: contactData.id },
    { initialData: contactData },
  )

  const [subways, setSubways] = useState(contact.data.subways)
  const [phones, setPhones] = useState(contact.data.phones)
  // const updateContact = trpc.contacts.updateContact.useMutation({
  //   onSuccess: () => {
  //     toast.success(`Оновлення збережено!`, {
  //       style: {
  //         borderRadius: '10px',
  //         background: 'grey',
  //         color: '#fff',
  //       },
  //     })
  //     router.push('/contacts')
  //     router.refresh()
  //   },
  //   onError: () => {
  //     toast.error(`Виникла помилка при оновленні...`, {
  //       style: {
  //         borderRadius: '10px',
  //         background: 'red',
  //         color: '#fff',
  //       },
  //     })
  //   },
  //   onSettled: () => {
  //     contact.refetch()
  //   },
  // })

  const handleAddPhone = (phoneToAdd: string) => {
    setPhones([phoneToAdd, ...phones])
  }

  const handleRemovePhone = (phoneToRemove: string) => {
    if (phones.length === 1) return
    setPhones(phones.filter(phone => phone !== phoneToRemove))
  }

  const handleAddSubway = (subwayToAdd: string) => {
    setSubways([subwayToAdd, ...subways])
  }

  const handleRemoveSubway = (subwayToRemove: string) => {
    if (subways.length === 1) return
    setSubways(subways.filter(subway => subway !== subwayToRemove))
  }

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    console.log(values)
    // try {
    //   await updateContact.mutateAsync({
    //     ...dataToUpdate,
    //   })
    // } catch (err) {
    //   console.log(err)
    // }

    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{
        file: contact.data.image.file,
        area: contact.data.area,
        address: contact.data.address,
        comment: contact.data.comment,
        subway: '',
        phone: '',
        workingTime: contact.data.workingTime,
        workingDate: contact.data.workingDate,
      }}
      validationSchema={Yup.object().shape({
        area: Yup.string().min(1).required('Будь ласка, заповніть поле'),
        address: Yup.string().min(1).required('Будь ласка, заповніть поле'),
        subway: Yup.string().min(1),
        phone: Yup.string().min(1),
        workingTime: Yup.string().required('Будь ласка, заповніть поле'),
        workingDate: Yup.string().required('Будь ласка, заповніть поле'),
      })}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<any>) => (
        <Form
          onSubmit={props.handleSubmit}
          className='flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-12 py-6 text-white-dis'
        >
          <div className='order-1 w-[45%]'>
            <FieldFileUpload
              name='file'
              initSrc={`${SERVER_URL}/${contact.data.image.file.path}`}
              size={{ width: 400, height: 300 }}
            />
          </div>
          <div className='order-3 flex w-[45%] flex-col gap-6'>
            <Field name='area'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  label='Район'
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
            <Field name='address'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  label='Адреса'
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
            <div className='flex flex-row flex-wrap gap-4'>
              <Field name='subway'>
                {({ meta, field }: any) => (
                  <div className='flex w-full items-center'>
                    <Button
                      isIconOnly
                      color='primary'
                      aria-label='Add'
                      className='bg-transparent'
                      onClick={() => handleAddSubway(field.value)}
                    >
                      <IoMdAddCircle size='2.5em' />
                    </Button>
                    <Input
                      type='text'
                      label='Станція метро'
                      labelPlacement='inside'
                      variant='bordered'
                      isInvalid={!!(meta.touched && meta.error)}
                      errorMessage={meta.touched && meta.error}
                      classNames={{
                        label: ['font-base', 'text-md', 'text-black-dis'],
                        input: ['font-base', 'text-md', 'text-black-dis'],
                        inputWrapper: ['bg-white-dis'],
                        base: ['w-[90%]'],
                      }}
                      {...field}
                    />
                  </div>
                )}
              </Field>
              <div className='flex w-full flex-wrap gap-2'>
                {subways.map(subway => (
                  <Chip
                    key={subway}
                    onClose={() => handleRemoveSubway(subway)}
                    variant='flat'
                  >
                    {subway}
                  </Chip>
                ))}
              </div>
            </div>
            <Field name='comment'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  label='Коментар'
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
          </div>
          <div className='order-2 flex w-[45%] flex-col gap-6'>
            <div className='flex flex-row flex-wrap gap-4'>
              <Field name='phone'>
                {({ meta, field }: any) => (
                  <div className='flex w-full items-center'>
                    <Button
                      isIconOnly
                      color='primary'
                      aria-label='Add'
                      className='bg-transparent'
                      onClick={() => handleAddPhone(field.value)}
                    >
                      <IoMdAddCircle size='2.5em' />
                    </Button>
                    <Input
                      type='text'
                      label='Телефон'
                      labelPlacement='inside'
                      variant='bordered'
                      isInvalid={!!(meta.touched && meta.error)}
                      errorMessage={meta.touched && meta.error}
                      classNames={{
                        label: ['font-base', 'text-md', 'text-black-dis'],
                        input: ['font-base', 'text-md', 'text-black-dis'],
                        inputWrapper: ['bg-white-dis'],
                        base: ['w-[90%]'],
                      }}
                      {...field}
                    />
                  </div>
                )}
              </Field>
              <div className='flex w-full flex-wrap gap-2'>
                {phones.map(phone => (
                  <Chip
                    key={phone}
                    onClose={() => handleRemovePhone(phone)}
                    variant='flat'
                  >
                    {phone}
                  </Chip>
                ))}
              </div>
            </div>
            <Field name='workingTime'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  label='Час роботи'
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
            <Field name='workingDate'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  label='Дні коли ми працюємо'
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
          </div>
          <div className='order-last flex w-full justify-center'>
            <SendButton
              type='submit'
              disabled={!props.isValid}
              isLoading={props.isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default EditContactForm
