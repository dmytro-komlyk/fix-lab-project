'use client'

import { uploadImg } from '@admin/app/(server)/api/service/image/uploadImg'
import { trpc } from '@admin/app/(utils)/trpc/client'
import { Accordion, AccordionItem, Input } from '@nextui-org/react'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'
import * as Yup from 'yup'

import SendButton from '../../(components)/SendButton'

const FieldFileUpload = dynamic(
  () => import('../../(components)/FieldFileUpload'),
)

const SelectImage = dynamic(() => import('../../(components)/SelectImage'))

const AddBenefitForm = ({ iconsData }: any) => {
  const router = useRouter()
  const icons = trpc.images.getAllIcons.useQuery(undefined, {
    initialData: iconsData,
  })
  const [selectedIcon, setSelectIcon] = useState<string | null>(null)

  const createBenefit = trpc.benefits.createBenefit.useMutation({
    onSuccess: () => {
      toast.success(`Послугу сервісного обслуговування додано!`, {
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
    try {
      if (selectedIcon) {
        await createBenefit.mutateAsync({
          icon_id: selectedIcon,
          title: values.title,
        })
        resetForm()
      } else if (values.file) {
        const uploadResponse = await uploadImg({
          fileInput: values.file,
          alt: values.file.name.split('.')[0],
          type: 'icon',
        })
        if (uploadResponse.status === 201) {
          await createBenefit.mutateAsync({
            icon_id: uploadResponse.data.id,
            title: values.title,
          })
          resetForm()
        }
      } else {
        // added validate empty image
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
      className=' shadow-2xl'
    >
      <AccordionItem
        textValue='1'
        key='1'
        startContent={<IoMdAddCircle size={40} color='#fff' fill='#fff' />}
        title={
          <span className='bg-top- text-center font-exo_2 text-2xl font-bold text-white-dis'>
            Додати послугу сервісного обсуговування
          </span>
        }
      >
        <div className='flex w-full items-center justify-center py-4'>
          <Formik
            initialValues={{ title: '', file: null }}
            validationSchema={Yup.object({
              title: Yup.string()
                .min(3, 'Має бути 3 або більше символів')
                .required('Введіть назву'),
            })}
            onSubmit={handleSubmit}
          >
            {(props: FormikProps<any>) => (
              <Form
                onSubmit={props.handleSubmit}
                className='flex w-[400px] flex-col items-center justify-center gap-6 text-white-dis'
              >
                <div className='flex w-full flex-col items-center gap-4'>
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

                <SendButton
                  type='submit'
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

export default AddBenefitForm
