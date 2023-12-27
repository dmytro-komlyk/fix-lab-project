'use client'

import uploadImg from '@admin/app/(server)/api/service/admin/uploadImg'
import { useState } from 'react'

import { Accordion, AccordionItem } from '@nextui-org/react'
import useLocalStorage from 'admin/app/(hooks)/useLocalStorage '
import { createSlug } from 'admin/app/(utils)/createSlug'
import { trpc } from 'admin/app/(utils)/trpc/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { IoMdAddCircle } from 'react-icons/io'
import AddImagesSection from '../../(components)/AddImagesSection'
import CustomEditor from '../../(components)/CustomEditor'
import SendButton from '../../(components)/SendButton'
interface IBrandProps {
  allImagesData: Image[]
}
const AddBrandForm: React.FC<IBrandProps> = ({ allImagesData }) => {
  const router = useRouter()
  const [brandTitle, setBrandTitle] = useLocalStorage<string | ''>(
    'addBrandTitle',
    '',
  )
  const [brandSlug, setBrandSlug] = useLocalStorage<string | ''>(
    'addBrandSlug',
    '',
  )
  const [brandArticle, setBrandArticle] = useLocalStorage<string | ''>(
    'addBrandArticle',
    '',
  )
  const [altIcon, setAltIcon] = useLocalStorage<string | ''>(
    'addBrandAltIcon',
    '',
  )

  const [seoContent, setSeoContent] = useLocalStorage<{
    title: string
    description: string
    keywords: string
  }>('addBrandSeoContent', {
    title: '',
    description: '',
    keywords: '',
  })

  const [selectedIcon, setSelectedIcon] = useState<File | null>(null)
  const [newIcon, setNewIcon] = useState<string | ArrayBuffer | null>(null)

  const handleSeoInputChange = (key: string, value: string) => {
    setSeoContent((prevData: any) => ({
      ...prevData,
      [key]: value,
    }))
  }

  const clearState = () => {
    setSeoContent({
      title: '',
      description: '',
      keywords: '',
    })
    if (selectedIcon) {
      setSelectedIcon(null)
    }
    setNewIcon(null)
    setBrandTitle('')
    setBrandArticle('')
    setBrandSlug('')
    setAltIcon('')
  }

  const createBrand = trpc.brands.create.useMutation({
    onSuccess: () => {
      toast.success(`Бренд додано!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      clearState()
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
  const deleteIcon = trpc.images.remove.useMutation()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (
      !(
        selectedIcon &&
        brandTitle &&
        brandSlug &&
        brandArticle &&
        altIcon &&
        seoContent.keywords &&
        seoContent.description &&
        seoContent.title
      )
    ) {
      toast.error(`Всі поля повинні бути заповнені...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      return
    } else {
      const uploadResponse = await handleIconUpload()
      if (uploadResponse?.status === 201) {
        await createBrand.mutateAsync({
          icon_id: uploadResponse.data.id,
          title: brandTitle,
          slug: brandSlug,
          article: brandSlug,
          metadata: {
            title: seoContent.title,
            description: seoContent.description,
            keywords: seoContent.keywords,
          },
        })
      } else {
        await deleteIcon.mutateAsync(uploadResponse?.data.id)
        toast.error(`Помилка додаванні бренду...`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]

      if (file) {
        setSelectedIcon(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setNewIcon(reader.result as string | ArrayBuffer | null)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const handleIconUpload = async () => {
    try {
      if (selectedIcon) {
        const response = await uploadImg({
          fileInput: selectedIcon,
          alt: altIcon,
          type: 'icon',
        })
        return response
      }
      return null
    } catch (error) {
      throw new Error('Error uploading image')
    }
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
          <span className='bg-top- font-exo_2 text-white-dis text-center text-2xl font-bold'>
            Додати бренд
          </span>
        }
      >
        <div className='flex w-full flex-col items-center justify-center py-4 gap-[60px] '>
          <form className='flex w-full items-end justify-evenly gap-3 text-white-dis '>
            <div className='flex w-[400px] flex-col'>
              <div className='relative'>
                {!newIcon ? (
                  <div className='flex h-[300px] w-[500px] items-center justify-center'>
                    <p>NO IMAGE</p>
                  </div>
                ) : (
                  <div>
                    <Image
                      className='h-[100px] w-[100px] object-center'
                      src={typeof newIcon === 'string' ? newIcon : ''}
                      width={100}
                      height={100}
                      alt={altIcon}
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
                alt(Опис зображення)
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='altIcon'
                  value={altIcon}
                  onChange={e => setAltIcon(e.target.value)}
                />
              </label>
              <label className='flex  flex-col items-start gap-1 text-center font-exo_2 text-xl'>
                Заголовок
                <input
                  required
                  className='font-base h-[45px] w-full indent-3 text-md text-black-dis'
                  type='text'
                  name='title'
                  value={brandTitle}
                  onChange={e => {
                    setBrandSlug(createSlug(e.target.value))
                    setBrandTitle(e.target.value)
                  }}
                />
              </label>
              <label className='font-exo_2  flex flex-col gap-1 text-center text-xl'>
                Slug(url сторінки)
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                  type='text'
                  name='slug'
                  value={brandSlug}
                  onChange={e => {
                    setBrandSlug(e.target.value)
                  }}
                />
              </label>
            </div>
            <div className='flex w-[400px] flex-col justify-between'>
              <p className=' bold font-exo_2 mt-2 text-center text-xl'>
                SEO налаштування
              </p>
              <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
                Seo title
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                  type='text'
                  name='title'
                  value={seoContent.title || ''}
                  onChange={e => handleSeoInputChange('title', e.target.value)}
                />
              </label>
              <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
                Seo description
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                  type='text'
                  name='description'
                  value={seoContent.description || ''}
                  onChange={e =>
                    handleSeoInputChange('description', e.target.value)
                  }
                />
              </label>
              <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
                Seo keywords
                <input
                  required
                  className='font-base text-md text-black-dis h-[45px] w-full indent-3'
                  type='text'
                  name='keywords'
                  value={seoContent.keywords || ''}
                  onChange={e =>
                    handleSeoInputChange('keywords', e.target.value)
                  }
                />
              </label>
            </div>
          </form>
          <div className='w-full'>
            <AddImagesSection allImagesData={allImagesData} />
          </div>
          <div className='flex w-full flex-col justify-center gap-[50px]'>
            <div className='flex w-full flex-col  gap-2 '>
              <p className='text-center font-exo_2 text-xl text-white-dis'>
                Стаття
              </p>
              <CustomEditor
                id='add-brand-article-content'
                setContent={setBrandArticle}
                content={brandArticle}
              />
            </div>
          </div>
          <SendButton handleSubmit={handleSubmit} />
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default AddBrandForm
