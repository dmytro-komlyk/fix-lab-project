'use client'

/* eslint-disable no-console */

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdKeyboardArrowRight, MdOutlineClose } from 'react-icons/md'

import sendPutRequest from '@/app/(server)/api/service/sendPutRequest'

interface GadgetService {
  id: number
  attributes: {
    category: {
      data: {
        attributes: {
          slug: string
          title: string
        }
      }
    }
    slug: string
    title: string
    price: string
    repair_time: string
    guarantee: string
  }
}

interface GadgetServicesListProps {
  subcategoriesData: {
    data: GadgetService[]
  }
}

const GadgetServicesList: React.FC<GadgetServicesListProps> = ({
  subcategoriesData,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedItemId, setSelectedItemId] = useState<string | number>(0)
  const [editedData, setEditedData] = useState<{ [key: string]: string }>({})

  const toggleEditModal = useCallback(() => {
    setShowModal(prev => !prev)
  }, [])

  const modalRef = useRef<HTMLDivElement>(null)

  const onBackdropCloseModal = useCallback(
    (event: { target: any; currentTarget: any }) => {
      if (event.target === event.currentTarget) {
        toggleEditModal()
      }
    },
    [toggleEditModal],
  )

  useEffect(() => {
    const storEditedData = localStorage.getItem(
      `editedDataEdit_${selectedItemId}`,
    )

    if (storEditedData) {
      setEditedData(JSON.parse(storEditedData))
    }
  }, [selectedItemId])

  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem(
        `editedDataEdit_${selectedItemId}`,
        JSON.stringify(editedData),
      )
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [editedData, selectedItemId])

  const handleInputChange = (key: string, value: string) => {
    setEditedData(prevData => ({
      ...prevData,
      [key]: value,
    }))
  }
  const handleSubmit = async (id: number) => {
    try {
      const endpoint = `subcategories/${id}`
      const data = { data: editedData }
      const res = await sendPutRequest(data, endpoint)
      if (res?.status === 200) {
        localStorage.removeItem(`editedDataEdit_${id}`)
        setSelectedItemId(0)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const firstSubcategory = subcategoriesData.data[0]

  const categoryTitle =
    firstSubcategory?.attributes.category?.data?.attributes?.title

  return (
    <section className='bg-gradient-linear-blue pb-[102px] pt-[171px] max-md:pb-14 max-md:pt-[138px]'>
      <div className='container'>
        <div className='z-[1] flex items-center gap-1'>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/admin'
          >
            <p>Адмін</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <Link
            className='flex items-center gap-1 text-base font-[400] text-[#3EB9F0] transition-opacity  hover:opacity-70 focus:opacity-70'
            href='/admin/repair'
          >
            <p>Ремонт</p> <MdKeyboardArrowRight size={30} />
          </Link>
          <p className='text-base font-[400] text-[#3EB9F0] opacity-70'>
            {categoryTitle}
          </p>
        </div>
        <ul className='mt-14 flex flex-col'>
          {subcategoriesData.data.map(item => {
            return (
              <li
                className='border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
                key={item.id}
              >
                <div className='flex  items-center justify-between  px-6 py-[20px] max-md:flex-col max-md:items-start  max-md:gap-2  max-md:py-[8px] '>
                  <h2 className='font-exo_2 text-xl font-semibold text-dark-blue max-lg:text-lg '>
                    {item.attributes.title}
                  </h2>
                  <p className=' flex items-center gap-2 text-[18px] font-[400] text-black-dis '>
                    {item.attributes.price}
                    <button
                      type='button'
                      onClick={() => {
                        toggleEditModal()
                        setSelectedItemId(item.id)
                      }}
                    >
                      <FaEdit
                        className=' transition-colors hover:fill-mid-green focus:fill-mid-green'
                        size={25}
                      />
                    </button>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {subcategoriesData.data.map(item => {
        return (
          showModal &&
          selectedItemId === item.id && (
            <AnimatePresence key={item.id}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.1 } }}
                exit={{ opacity: 1, transition: { duration: 0.1 } }}
                ref={modalRef}
                className='fixed left-0 top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-modal-overlay '
              >
                <div
                  onClick={onBackdropCloseModal}
                  className=' flex min-h-full items-center justify-center  px-3 py-6'
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.3 },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    className='relative max-w-[414px] flex-col items-center justify-center rounded-2xl bg-[#00cc73] p-14 max-sm:px-4'
                  >
                    <button
                      type='button'
                      className=' white-dis-700 absolute right-4 top-4 text-center'
                      onClick={toggleEditModal}
                    >
                      <MdOutlineClose
                        className='h-8 w-8 fill-white-dis  transition-opacity  hover:opacity-80 focus:opacity-80'
                        aria-hidden='true'
                      />
                    </button>
                    <div className='flex flex-col items-center justify-center gap-6'>
                      <h2>{item.attributes.title}</h2>
                      <input
                        title='Заголовок'
                        className='h-[58px] w-[302px] rounded-xl px-6 py-2 max-md:w-[280px]'
                        type='text'
                        value={editedData.title || item.attributes.title || ''}
                        onChange={e =>
                          handleInputChange('title', e.target.value)
                        }
                      />
                      <input
                        title='Ціна'
                        className='h-[58px] w-[302px] rounded-xl px-6 py-2 max-md:w-[280px]'
                        type='text'
                        value={editedData.price || item.attributes.price || ''}
                        onChange={e =>
                          handleInputChange('price', e.target.value)
                        }
                      />
                      <input
                        title='Чаc ремонту'
                        className='h-[58px] w-[302px] rounded-xl px-6 py-2 max-md:w-[280px]'
                        type='text'
                        value={
                          editedData.repair_time ||
                          item.attributes.repair_time ||
                          ''
                        }
                        onChange={e =>
                          handleInputChange('repair_time', e.target.value)
                        }
                      />
                      <input
                        title='Тривалість гарантії'
                        className='h-[58px] w-[302px] rounded-xl px-6 py-2 max-md:w-[280px]'
                        type='text'
                        value={
                          editedData.guarantee ||
                          item.attributes.guarantee ||
                          ''
                        }
                        onChange={e =>
                          handleInputChange('guarantee', e.target.value)
                        }
                      />
                      <button
                        className='group mt-4 flex w-full items-center justify-center rounded-lg bg-dark-blue transition-colors hover:bg-black-dis focus:bg-black-dis'
                        type='button'
                        onClick={() => {
                          handleSubmit(item.id)
                          toggleEditModal()
                        }}
                      >
                        <p className='whitespace-nowrap pb-[20px] pt-[23px] text-base font-semibold tracking-[0.64] text-white-dis '>
                          Зберегти
                        </p>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          )
        )
      })}
    </section>
  )
}

export default GadgetServicesList
