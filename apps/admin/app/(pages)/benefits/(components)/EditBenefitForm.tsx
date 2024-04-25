'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import { uploadImg } from '@admin/app/api/service/image/uploadImg'
import { Input } from '@nextui-org/react'
import type { outputBenefitSchema as IBenefit } from '@server/domain/benefits/schemas/benefit.schema'
import type { FormikHelpers, FormikProps } from 'formik'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

import FieldFileUpload from '../../(components)/FieldFileUpload'
import SelectImage from '../../(components)/SelectImage'
import SendButton from '../../(components)/SendButton'

const EditBenefitForm = ({ benefitData }: { benefitData: IBenefit }) => {
  const router = useRouter()

  const benefit = trpc.benefits.getByIdBenefit.useQuery(
    { id: benefitData.id },
    { initialData: benefitData },
  )
  const [selectedIcon, setSelectIcon] = useState<string | null>(
    benefit.data.icon_id as string,
  )
  const [errorImage, setErrorImage] = useState<string | null>(null)
  const icons = trpc.images.getAllIcons.useQuery(undefined)

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

  const handleSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    setSubmitting(true)
    try {
      if (selectedIcon) {
        await updateBenefit.mutateAsync({
          ...benefit.data,
          icon_id: selectedIcon,
          title: values.title,
        })
      } else if (values.file) {
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
    <Formik
      initialValues={{
        title: benefit.data.title,
        file: null,
      }}
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
          className='mx-auto my-0 flex w-[400px] flex-col items-center justify-center gap-6 text-white-dis '
        >
          <div className='flex w-full flex-col items-center gap-4'>
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
            type='submit'
            disabled={!props.isValid}
            isLoading={props.isSubmitting}
          />
        </Form>
      )}
    </Formik>
  )
}

export default EditBenefitForm
