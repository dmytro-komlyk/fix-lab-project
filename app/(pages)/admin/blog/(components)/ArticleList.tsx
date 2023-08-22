'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import deleteData from '@/app/(server)/api/service/deleteData'

export interface ArticleListProps {
  blogData: {
    data: BlogItem[]
  }
}

interface BlogItem {
  id: number
  attributes: {
    title: string
    description: string
    image: {
      data: {
        attributes: {
          url: string
          width: number
          height: number
          name: string
        }
      }
    }
  }
}

const ArticleList: React.FC<ArticleListProps> = ({ blogData }) => {
  const [showRemoveContainers, setShowRemoveContainers] = useState<{
    [key: number]: boolean
  }>({})

  const toggleRemoveContainer = (itemId: number) => {
    setShowRemoveContainers(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }))
  }
  const containerRefs = useMemo(() => {
    const refs: { [key: number]: HTMLDivElement | null } = {}
    return refs
  }, [])

  useEffect(() => {
    const handleClickOutside = (itemId: number, event: MouseEvent) => {
      const containerRef = containerRefs[itemId]
      if (containerRef && !containerRef.contains(event.target as Node)) {
        setShowRemoveContainers(prevState => ({
          ...prevState,
          [itemId]: false,
        }))
      }
    }

    const handleOutsideClick = (event: MouseEvent) => {
      Object.keys(showRemoveContainers).forEach(itemId => {
        handleClickOutside(parseInt(itemId, 10), event)
      })
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showRemoveContainers, containerRefs])

  const handleDeleteArticle = async (id: number) => {
    try {
      const endpoint = `/blogs/${id}`
      await deleteData(endpoint)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      toggleRemoveContainer(id)
    }
  }

  return (
    <ul className='mt-8 flex flex-col'>
      {blogData.data.map(item => {
        return (
          <li
            className='group border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
            key={item.id}
          >
            <div className='flex items-center justify-between px-6 py-[20px]'>
              <h3 className='font-semibold text-dark-blue md:text-base xl:text-xl'>
                {item.attributes.title}
              </h3>
              <div className='relative ml-4 flex items-center gap-2'>
                <Link href={`/admin/blog/${item.id}`}>
                  <FaEdit
                    className='transition-colors hover:fill-mid-green focus:fill-mid-green'
                    size={30}
                  />
                </Link>
                <button
                  type='button'
                  onClick={() => toggleRemoveContainer(item.id)}
                >
                  <MdDelete
                    className='transition-colors hover:fill-[red] focus:fill-[red]'
                    size={30}
                  />
                </button>
                {showRemoveContainers[item.id] && (
                  <div
                    ref={ref => {
                      containerRefs[item.id] = ref
                    }}
                    className='z-1 absolute bottom-[-21.5px] left-[-25px] flex gap-4  bg-mid-green p-[21px]'
                  >
                    <button
                      type='button'
                      onClick={() => handleDeleteArticle(item.id)}
                    >
                      <AiOutlineCheckCircle
                        className='transition-colors hover:fill-white-dis focus:fill-white-dis'
                        size={30}
                      />
                    </button>
                    <button
                      type='button'
                      onClick={() => toggleRemoveContainer(item.id)}
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
        )
      })}
    </ul>
  )
}

export default ArticleList
