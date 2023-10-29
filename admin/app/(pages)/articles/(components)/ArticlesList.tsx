/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */

'use client'

import { Accordion, AccordionItem, Pagination } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

import deleteData from '@/app/(server)/api/service/admin/deleteData'
import getData from '@/app/(server)/api/service/admin/getData'

import AddArticleSection from './AddArticleSection'

export interface IArticle {
  _id: string
  slug: string
  text: string
  title: string
  preview: string
  image: {
    _id: string
    src: string
    alt: string
    type: string
  }
  metadata: {
    title: string
    description: string
    keywords: string
  }
}

const ArticlesList = () => {
  const [showRemoveContainers, setShowRemoveContainers] = useState<{
    [key: string]: boolean
  }>({})
  const [loading, setLoading] = useState(true) // Added loading state

  const router = useRouter()
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const toggleRemoveContainer = (itemId: string) => {
    setShowRemoveContainers(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }))
  }

  useEffect(() => {
    const handleClickOutside = (itemId: string, event: MouseEvent) => {
      const containerRef = containerRefs.current[itemId]
      if (containerRef && !containerRef.contains(event.target as Node)) {
        setShowRemoveContainers(prevState => ({
          ...prevState,
          [itemId]: false,
        }))
      }
    }

    const handleOutsideClick = (event: MouseEvent) => {
      Object.keys(showRemoveContainers).forEach(itemId => {
        handleClickOutside(itemId, event)
      })
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showRemoveContainers])

  const handleDeleteArticle = async (item: IArticle) => {
    try {
      const endpoint = `/articles/${item._id}`
      const res = await deleteData(endpoint)
      console.log(res)
      if (res.status === 200) {
        const deleteImgUrl = `/images/${item.image._id}`
        await deleteData(deleteImgUrl)
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      toggleRemoveContainer(item._id)
    }
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [articles, setArticles] = useState({ items: [], totalPages: 0 })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const url = `/articles/all?page=${currentPage}&limit=10`
        const res = await getData(url)
        console.log(res)
        setArticles(res)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  return (
    <div className=' flex flex-col items-center justify-center gap-8 pb-12'>
      <Accordion
        itemClasses={{ base: 'border-white-dis ' }}
        variant='bordered'
        className=' shadow-2xl'
      >
        <AccordionItem
          key='1'
          startContent={<IoMdAddCircle size={40} color='#fff' fill='#fff' />}
          title={
            <span className='text-center font-exo_2 text-2xl font-bold text-white-dis'>
              Додати статтю
            </span>
          }
        >
          <AddArticleSection />
        </AccordionItem>
      </Accordion>

      <div className=' flex w-full flex-col items-center justify-center gap-8'>
        {articles.totalPages > 1 && (
          <Pagination
            color='success'
            page={currentPage}
            onChange={setCurrentPage}
            total={articles.totalPages}
          />
        )}
        {loading ? (
          <p>Loading...</p>
        ) : articles.items.length > 0 ? (
          <AnimatePresence>
            <motion.ul
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              className='flex w-full flex-col shadow-2xl'
            >
              {articles.items.map((item: IArticle) => (
                <li
                  className='group border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
                  key={item._id}
                >
                  <div className='flex items-center justify-between px-6 py-[20px]'>
                    <h3 className='font-semibold text-dark-blue md:text-base xl:text-xl'>
                      {item.title}
                    </h3>
                    <div className='relative ml-4 flex items-center gap-2'>
                      <Link href={`/articles/${item._id}`}>
                        <FaEdit
                          className='transition-colors hover:fill-mid-green focus:fill-mid-green'
                          size={30}
                        />
                      </Link>
                      <button
                        type='button'
                        onClick={() => toggleRemoveContainer(item._id)}
                      >
                        <MdDelete
                          className='transition-colors hover:fill-[red] focus:fill-[red]'
                          size={30}
                        />
                      </button>
                      {showRemoveContainers[item._id] && (
                        <div
                          ref={ref => {
                            containerRefs.current[item._id] = ref
                          }}
                          className='z-1 absolute bottom-[-21.5px] left-[-25px] flex gap-4 bg-mid-green p-[21px]'
                        >
                          <button
                            type='button'
                            onClick={() => handleDeleteArticle(item)}
                          >
                            <AiOutlineCheckCircle
                              className='transition-colors hover:fill-white-dis focus:fill-white-dis'
                              size={30}
                            />
                          </button>
                          <button
                            type='button'
                            onClick={() => toggleRemoveContainer(item._id)}
                          >
                            <AiOutlineCloseCircle
                              className='transition-colors hover:fill-[red] focus:fill-[red]'
                              size={30}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        ) : (
          <p>No articles</p>
        )}
      </div>
    </div>
  )
}

export default ArticlesList
