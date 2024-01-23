'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import toast from 'react-hot-toast'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { uploadImg } from '@admin/app/(server)/api/service/image/uploadImg'
import { Input } from '@nextui-org/react'
import { outputBenefitSchema as IBenefit } from '@server/domain/benefits/schemas/benefit.schema'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import * as Yup from 'yup'
import FieldFileUpload from '../../(components)/FieldFileUpload'
import SendButton from '../../(components)/SendButton'

const EditBenefitForm = ({ benefitData }: { benefitData: IBenefit }) => {
  const router = useRouter()

  const benefit = trpc.benefits.getByIdBenefit.useQuery(
    { id: benefitData.id },
    { initialData: benefitData },
  )

  const updateBenefit = trpc.benefits.updateBenefit.useMutation({
    onSuccess: () => {
      toast.success(`Оновлення збережено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.push('/benefits')
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
      benefit.refetch()
    },
  })

  const handleSubmit = useCallback(
    async (values: any, { setSubmitting }: FormikHelpers<any>) => {
      setSubmitting(true)

      try {
        if (values.file.name) {
          const uploadResponse = await uploadImg({
            fileInput: values.file,
            alt: values.file.name.split('.')[0],
            type: 'icon',
          })
          if (uploadResponse.status === 201) {
            await updateBenefit.mutateAsync({
              ...benefit.data,
              icon_id: uploadResponse.data.id,
              title: values.title,
            })
          }
        } else {
          await updateBenefit.mutateAsync({
            ...benefit.data,
            title: values.title,
          })
        }
      } catch (err) {
        console.log(err)
      }
      setSubmitting(false)
    },
    [],
  )

  return (
    <Formik
      initialValues={{
        title: benefit.data.title,
        file: benefit.data.icon.file,
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
          className='flex w-[400px] mx-auto my-0 flex-col items-center justify-center gap-3 text-white-dis '
        >
          <FieldFileUpload
            name='file'
            initSrc={`${SERVER_URL}/${benefit.data.icon.file.path}`}
          />
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
  )
}

export default EditBenefitForm
