'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { Input } from '@nextui-org/react'
import type { outputContactSchema as IContact } from '@server/domain/contacts/schemas/contact.schema'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useCallback } from 'react'
import * as Yup from 'yup'
import SendButton from '../../(components)/SendButton'

const EditContactForm = ({ contactData }: { contactData: IContact }) => {
  // const [newImage, setNewImage] = useState<string | ArrayBuffer | null>(null)
  const router = useRouter()

  const contact = trpc.contacts.getByIdContact.useQuery(
    { id: contactData.id },
    { initialData: contactData },
  )
  // const [selectedImage, setSelectedImage] = useState<File | null>(null)

  // const images = trpc.images.getAllImages.useQuery(undefined)

  const updateContact = trpc.contacts.updateContact.useMutation({
    onSuccess: () => {
      toast.success(`Оновлення збережено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
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
      contact.refetch()
    },
  })
  console.log(contact.data, 'contact')
  const handleSubmit = useCallback(
    async (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setSubmitting(true)
      const { id, image_id, googleMapLink, googlePluginLink } = contact.data
      const {
        address,
        area,
        comment,
        file,
        phones,
        subways,
        workingDate,
        workingTime,
      } = values
      console.log(values, 'values')
      const dataToUpdate = {
        address,
        area,
        comment,
        googleMapLink,
        googlePluginLink,
        id,
        image_id,
        file,
        phones,
        subways,
        workingDate,
        workingTime,
      }
      console.log(dataToUpdate, 'dataUpdate')
      try {
        await updateContact.mutateAsync({
          ...dataToUpdate,
        })
      } catch (err) {
        console.log(err)
      }
      setSubmitting(false)
    },
    [],
  )

  // const deleteImage = trpc.images.removeImage.useMutation()
  // const handleImageUpload = async () => {
  //   try {
  //     if (selectedImage) {
  //       const response = await uploadImg({
  //         fileInput: selectedImage,
  //         alt: contactData.image.alt,
  //         type: contactData.image.type,
  //       })
  //       return response
  //     }
  //     return null
  //   } catch (error) {
  //     throw new Error('Error uploading image')
  //   }
  // }
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault()

  //   if (!newContactData.area && !selectedImage) {
  //     toast.error(`Всі поля повинні бути заповнені...`, {
  //       style: {
  //         borderRadius: '10px',
  //         background: 'grey',
  //         color: '#fff',
  //       },
  //     })
  //   } else if (selectedImage) {
  //     const uploadResponse = await handleImageUpload()

  //     if (uploadResponse?.data.id) {
  //       await updateContact.mutateAsync({
  //         isActive: true,
  //         id: contactData.id,
  //         area: newContactData.area,
  //         address: newContactData.address,
  //         comment: newContactData.comment,
  //         subways: newContactData.subways,
  //         phones: newContactData.phones,
  //         workingTime: newContactData.workingTime,
  //         workingDate: newContactData.workingDate,
  //         googleMapLink: newContactData.googleMapLink,
  //         googlePluginLink: newContactData.googlePluginLink,
  //         image_id: uploadResponse.data.id,
  //       })
  //       await deleteImage.mutateAsync(contactData.image.id)
  //     } else {
  //       await deleteImage.mutateAsync(uploadResponse?.data.id)
  //       toast.error(`Помилка оновлення послуги сервісного обслуговування...`, {
  //         style: {
  //           borderRadius: '10px',
  //           background: 'red',
  //           color: '#fff',
  //         },
  //       })
  //     }
  //   } else {
  //     updateContact.mutate({
  //       isActive: true,
  //       id: contactData.id,
  //       area: newContactData.area,
  //       address: newContactData.address,
  //       comment: newContactData.comment,
  //       subways: newContactData.subways,
  //       phones: newContactData.phones,
  //       workingTime: newContactData.workingTime,
  //       workingDate: newContactData.workingDate,
  //       googleMapLink: newContactData.googleMapLink,
  //       googlePluginLink: newContactData.googlePluginLink,
  //       image_id: contactData.image.id,
  //     })
  //   }
  // }
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.currentTarget.files && e.currentTarget.files.length > 0) {
  //     const file = e.currentTarget.files[0]

  //     if (file) {
  //       setSelectedImage(file)
  //       const reader = new FileReader()
  //       reader.onloadend = () => {
  //         setNewImage(reader.result as string | ArrayBuffer | null)
  //       }

  //       reader.readAsDataURL(file)
  //     }
  //   }
  // }

  return (
    <div className='flex flex-col items-center justify-center gap-10'>
      <Formik
        initialValues={{
          file: contact.data.image.file,
          area: contact.data.area,
          address: contact.data.address,
          comment: contact.data.comment,
          subways: contact.data.subways,
          phones: contact.data.phones,
          workingTime: contact.data.workingTime,
          workingDate: contact.data.workingDate,
        }}
        // NEED ADD VALIDATTION
        validationSchema={Yup.object().shape({
          area: Yup.string().required('Будь ласка, заповніть поле'),
          address: Yup.string().required('Будь ласка, заповніть поле'),
          subways: Yup.array()
            .of(Yup.string())
            .ensure()
            .required('Будь ласка, заповніть поле'),
          phones: Yup.array()
            .of(Yup.string())
            .ensure()
            .required('Будь ласка, заповніть поле'),
          workingTime: Yup.string().required('Будь ласка, заповніть поле'),
          workingDate: Yup.string().required('Будь ласка, заповніть поле'),
        })}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form
            onSubmit={props.handleSubmit}
            className='flex w-full flex-wrap justify-center items-end gap-8 text-white-dis'
          >
            {/* <div className='flex flex-col gap-4 items-center w-full mb-[50px]'>
              <FieldFileUpload name='file' isRequired={false} />
            </div> */}
            <Field name='area'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  placeholder='Район'
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
            <Field name='address'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  placeholder='Адреса'
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
            <Field name='comment'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  placeholder='Коментар'
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
            <Field name='subways'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  placeholder='Станції метро'
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
            <Field name='phones'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  placeholder='Телефон'
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
            <Field name='workingTime'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  placeholder='Час роботи'
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
            <Field name='workingDate'>
              {({ meta, field }: any) => (
                <Input
                  type='text'
                  isInvalid={meta.touched && meta.error}
                  errorMessage={meta.touched && meta.error && meta.error}
                  placeholder='Дні коли ми працюємо'
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
            <SendButton type='submit' handleSubmit={handleSubmit} />
          </Form>
        )}
      </Formik>
      {/* <form className='flex w-full flex-wrap items-end justify-evenly gap-3 text-white-dis '>
        <div className='flex w-[400px] flex-col gap-2'>
          <div className='relative'>
            {!newImage ? (
              <Image      
                className='h-[240px] w-[320px] object-cover object-center'
                src={`${SERVER_URL}/${contactData.image.file.path}`}
                width={300}
                height={200}
                alt={contactData.image_id}
              />
            ) : (
              <div>
                <Image
                  className='h-[240px] w-[320px] object-cover object-center'
                  src={typeof newImage === 'string' ? newImage : ''}
                  width={0}
                  height={0}
                  alt={contactData.area}
                />
              </div>
            )}
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              id='image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
            />
          </div>

          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Район:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='area'
              value={newContactData.area || contactData.area}
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Адрес:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='address'
              value={newContactData.address || contactData.address}
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Телефон:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='phone'
              value={newContactData.phones || contactData.phones}
            />
          </label>
          {contactData.subways.map((item, index) => (
            <div key={`subway-${index}`}>
              <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                Станції метро:
                <input
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name={`subway-${index}`}
                  value={item}
                  // onChange={e =>
                  //   handleArrayInputChange(`subways.${index}`, e.target.value)
                  // }
                />
              </label>
            </div>
          ))}
        </div>
        <div className='flex w-[400px] flex-col gap-2'>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Коментар:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='comment'
              value={newContactData.comment || contactData.comment || ''}
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Посилання googleMap:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='googleMapLink'
              value={newContactData.googleMapLink || contactData.googleMapLink}
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Посилання googlePlugin:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='googlePluginLink'
              value={
                newContactData.googlePluginLink || contactData.googlePluginLink
              }
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Робочі дні:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='workingDate'
              value={newContactData.workingDate || contactData.workingDate}
              onChange={handleInputChange}
            />
          </label>
          <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
            Робочий час:
            <input
              className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
              type='text'
              name='workingTime'
              value={newContactData.workingTime || contactData.workingTime}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </form> */}
    </div>
  )
}

export default EditContactForm
