'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { Accordion, AccordionItem, Input } from '@nextui-org/react'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'
import * as Yup from 'yup'

import { uploadImg } from '@admin/app/(server)/api/service/image/uploadImg'
import { FieldFileUpload } from '../../(components)/FieldFileUpload'
import SendButton from '../../(components)/SendButton'

const AddBenefitForm = () => {
  const router = useRouter()

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

  const handleSubmit = useCallback(
    async (values: any, { setSubmitting, resetForm }: FormikHelpers<any>) => {
      setSubmitting(true)
      try {
        const uploadResponse = await uploadImg({
          fileInput: values.file,
          alt: values.file.name.split('.')[0],
          type: 'icon',
        })
        if (uploadResponse.status === 201) {
          createBenefit.mutate({
            icon_id: uploadResponse.data.id,
            title: values.title,
          })
        }
      } catch (err) {
        console.log(err)
      }
      setSubmitting(false)
      resetForm()
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
            Додати послугу сервісного обсуговування
          </span>
        }
      >
        <div className='flex w-full items-center justify-center py-4'>
          <Formik
            initialValues={{ title: '', file: null }}
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
                className='flex w-[400px] flex-col items-center justify-center gap-3 text-white-dis '
              >
                <FieldFileUpload name='file' />
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

export default AddBenefitForm
