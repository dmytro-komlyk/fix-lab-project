'use client'

import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { trpc } from 'admin/app/(utils)/trpc/client'
import { useRouter } from 'next/navigation'
import CustomEditor from '../../(components)/CustomEditor'
import SendButton from '../../(components)/SendButton'
import EditBenefitsList from './EditBenefitsList'

interface IIssueProps {
  issueData: Issue
  benefitsData: Benefit[]
}

const EditIssuesForm: React.FC<IIssueProps> = ({ issueData, benefitsData }) => {
  const router = useRouter()

  const [newIssueData, setNewIssueData] = useLocalStorage(
    `editIssueData${issueData.id}`,
    {
      ...issueData,
    },
  )
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [image, setImage] = useState<string | ArrayBuffer | null>(null)
  const [info, setInfo] = useLocalStorage<string | ''>(
    `editIssueInfo${issueData.id}`,
    issueData.info || '',
  )
  const [description, setDescription] = useLocalStorage<string | ''>(
    `editIssueDescription${issueData.id}`,
    issueData.description || '',
  )
  const [altImage, setAltImage] = useLocalStorage<string | ''>(
    `editIssueAltImage${issueData.id}`,
    issueData.image.alt,
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'metadata') {
      const metadataField = e.target.getAttribute('data-metadata-field')

      if (metadataField) {
        setNewIssueData({
          ...newIssueData,
          metadata: {
            ...newIssueData.metadata,
            [metadataField]: value,
          },
        })
      }
    } else {
      setNewIssueData({ ...newIssueData, [name]: value })
    }
  }

  const updateIssue = trpc.issues.update.useMutation({
    onSuccess: () => {
      toast.success(`Послугу оновлено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      router.refresh()
    },

    onError: () => {
      // await deleteData(`/images/${uploadedIconId}`)
      toast.error(`Виникла помилка при оновленні...`, {
        style: {
          borderRadius: '10px',
          background: 'red',
          color: '#fff',
        },
      })
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (
      newIssueData.title &&
      newIssueData.slug &&
      newIssueData.slug &&
      newIssueData.price &&
      newIssueData.description &&
      newIssueData.info &&
      newIssueData.metadata.description &&
      newIssueData.metadata.title &&
      newIssueData.metadata.keywords
    ) {
      updateIssue.mutate({
        id: issueData.id,
        image_id: '6528fcd9458999afd6a05bfc',
        title: newIssueData.title,
        slug: newIssueData.slug,
        price: newIssueData.price,
        description: newIssueData.description,
        info: newIssueData.info,
        benefits_ids: newIssueData.benefits.map(benefit => benefit.id),
        metadata: {
          title: newIssueData.metadata.title,
          description: newIssueData.metadata.description,
          keywords: newIssueData.metadata.keywords,
        },
        gadgets_ids: [],
      })
      //  if (selectedImage) {
      //    // const uploadResponse = await handleIconUpload()
      //    // if (!uploadResponse) {
      //    //   throw new Error('Error uploading image')
      //    // }

      //    updateIssue.mutate({
      //      id: issueData.id,
      //      image_id: '6528fcd9458999afd6a05bfc',
      //      title: newIssueData.title,
      //      slug: newIssueData.slug,
      //      price: newIssueData.price,
      //      description: newIssueData.description,
      //      info: newIssueData.info,
      //      benefits_ids: newIssueData.benefits.map(benefit => benefit.id),
      //      metadata: {
      //        title: newIssueData.metadata.title,
      //        description: newIssueData.metadata.description,
      //        keywords: newIssueData.metadata.keywords,
      //      },
      //      gadgets_ids: [],
      //    })
      //  } else {
      //    updateIssue.mutate({
      //      id: issueData.id,
      //      image_id: issueData.image_id,
      //      title: newIssueData.title,
      //      slug: newIssueData.slug,
      //      price: newIssueData.price,
      //      description: newIssueData.description,
      //      info: newIssueData.info,
      //      benefits_ids: newIssueData.benefits.map(benefit => benefit.id),
      //      metadata: {
      //        title: newIssueData.metadata.title,
      //        description: newIssueData.metadata.description,
      //        keywords: newIssueData.metadata.keywords,
      //      },
      //      gadgets_ids: [],
      //    })
      //  }
    } else {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        setSelectedImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setImage(reader.result as string | ArrayBuffer | null)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const handleImageUpload = async () => {
    try {
      if (selectedImage) {
        const response = await uploadImg({
          fileInput: selectedImage,
          alt: altImage,
          type: issueData.image.type,
        })
        return response
      }
      return null
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  const handleImageSave = async (id: string) => {
    try {
      if (id) {
        const deleteEndpoint = `/images/${issueData.image.id}`

        await deleteData(deleteEndpoint)
        if (deleteEndpoint) {
          setSelectedImage(null)
          setImage(null)
        }
        console.log('success')
      }
    } catch (error) {
      throw new Error('Error uploading image')
    }
  }

  return (
    <div className='flex flex-auto flex-col items-center justify-center gap-4'>
      <form className='flex w-full flex-col justify-between gap-3 text-white-dis '>
        <div className='flex w-full justify-between'>
          <div className='flex w-[500px] flex-col gap-3'>
            <p className=' bold mt-2 text-center font-exo_2 text-xl'>
              Зображення
            </p>
            <div className='relative'>
              {!image ? (
                <Image
                  className='h-[400px] w-[500px] object-contain  object-center'
                  src={issueData.image.file.path}
                  width={400}
                  height={300}
                  alt={issueData.image.alt}
                />
              ) : (
                <div>
                  <Image
                    className='h-[400px] w-[500px] object-contain object-center'
                    src={typeof image === 'string' ? image : ''}
                    width={0}
                    height={0}
                    alt={issueData.title}
                  />
                </div>
              )}
            </div>
            <input
              className=' text-white-dis'
              id='icon'
              type='file'
              accept='icon/*'
              onChange={handleImageChange}
            />
            <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
              Опис зображення(alt)
              <input
                required
                className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                type='text'
                name='altImage'
                value={altImage}
                onChange={e => {
                  setAltImage(e.target.value)
                }}
              />
            </label>
          </div>
          <div className='flex w-[400px] flex-col justify-between'>
            <p className=' bold mt-2 text-center font-exo_2 text-xl'>
              SEO налаштування
            </p>
            <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
              Seo title
              <input
                className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                type='text'
                name='metadata'
                data-metadata-field='title'
                value={newIssueData.metadata.title || ''}
                onChange={handleInputChange}
              />
            </label>
            <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
              Seo description
              <input
                className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                type='text'
                name='metadata'
                data-metadata-field='description'
                value={newIssueData.metadata.description || ''}
                onChange={handleInputChange}
              />
            </label>
            <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
              Seo keywords
              <input
                className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                type='text'
                name='metadata'
                data-metadata-field='keywords'
                value={newIssueData.metadata.keywords || ''}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
          Вартість послуги
          <input
            required
            className='font-base h-[45px] w-[300px] indent-3 text-md text-black-dis'
            type='text'
            name='price'
            value={newIssueData.price || ''}
            onChange={handleInputChange}
          />
        </label>
        <label className='flex w-full  flex-col gap-1 text-center font-exo_2 text-xl'>
          Заголовок
          <input
            required
            className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
            type='text'
            name='title'
            value={newIssueData.title || ''}
            onChange={handleInputChange}
          />
        </label>
        <label className='flex w-full  flex-col gap-1 text-center font-exo_2 text-xl'>
          Slug(url сторінки)
          <input
            required
            className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
            type='text'
            name='slug'
            value={newIssueData.slug || ''}
            onChange={handleInputChange}
          />
        </label>
      </form>
      {/* <div className='w-full'>
        <AddImagesSection />
      </div> */}
      <div className='flex w-full flex-col justify-between gap-6'>
        <div className='flex w-full  flex-col  gap-2 '>
          <p className='text-center font-exo_2 text-xl text-white-dis'>Інфо</p>
          <CustomEditor
            id='edit-info-content'
            setContent={setInfo}
            content={info}
          />
        </div>
        {/* <div className='w-full'>
          <AddImagesSection />
        </div> */}
        <div className='flex w-full  flex-col  gap-2 '>
          <p className='text-center font-exo_2 text-xl text-white-dis'>
            Стаття
          </p>
          <CustomEditor
            id='edit-description-content'
            setContent={setDescription}
            content={description}
          />
        </div>
      </div>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='flex w-full  flex-col-reverse  justify-center '>
          <div className='  w-full border-b-2 border-mid-grey' />
          <p className='mb-6 text-center font-exo_2 text-2xl font-bold  text-white-dis  max-lg:text-xl'>
            Послуги сервісного обслуговування
          </p>
        </div>
      </div>
      <div className=' flex h-[400px] w-full justify-center overflow-auto '>
        <EditBenefitsList
          benefitsData={benefitsData}
          newIssueData={newIssueData}
          setNewIssueData={setNewIssueData}
        />
      </div>

      <SendButton handleSubmit={handleSubmit} />
    </div>
  )
}

export default EditIssuesForm
