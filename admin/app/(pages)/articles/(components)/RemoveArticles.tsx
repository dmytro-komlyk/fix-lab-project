/* eslint-disable no-console */

'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

import deleteData from '@/app/(server)/api/service/admin/deleteData'

import type { IArticle } from './ArticlesList'

interface RemoveArticlesProps {
  item: IArticle
}
const RemoveArticles: React.FC<RemoveArticlesProps> = ({ item }) => {
  const [showRemoveContainers, setShowRemoveContainers] = useState<{
    [key: string]: boolean
  }>({})
  const router = useRouter()
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const toggleRemoveContainer = (itemId: string) => {
    setShowRemoveContainers(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }))
  }
  const handleDeleteArticle = async (articleItem: IArticle) => {
    try {
      const endpoint = `/articles/${articleItem._id}`
      const res = await deleteData(endpoint)
      if (res.status === 200) {
        toast.success(`Статтю видалено!`, {
          style: {
            borderRadius: '10px',
            background: 'grey',
            color: '#fff',
          },
        })
        const deleteImgUrl = `/images/${articleItem.image._id}`
        await deleteData(deleteImgUrl)
      }
    } catch (error) {
      console.error(error)
    } finally {
      toggleRemoveContainer(articleItem._id)
      router.refresh()
    }
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

  return (
    <>
      <button type='button' onClick={() => toggleRemoveContainer(item._id)}>
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
          <button type='button' onClick={() => handleDeleteArticle(item)}>
            <AiOutlineCheckCircle
              className='transition-colors hover:fill-white-dis focus:fill-white-dis'
              size={30}
            />
          </button>
          <button type='button' onClick={() => toggleRemoveContainer(item._id)}>
            <AiOutlineCloseCircle
              className='transition-colors hover:fill-[red] focus:fill-[red]'
              size={30}
            />
          </button>
        </div>
      )}
    </>
  )
}

export default RemoveArticles
