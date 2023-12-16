/* eslint-disable no-console */

'use client'

import deleteData from '@admin/app/(server)/api/service/admin/deleteData'
import type { IPost } from 'admin/types/trpc'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

interface RemoveArticlesProps {
  item: IPost
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

  // const deleteArticleTrpc = trpc.addArticle.useMutation({
  //   onSuccess: () => {
  //     toast.success(`Статтю видалено!`, {
  //       style: {
  //         borderRadius: '10px',
  //         background: 'grey',
  //         color: '#fff',
  //       },
  //     })
  //     deleteImageTrpc({ id: articleItem.image._id })
  //     toggleRemoveContainer(articleItem._id)
  //     router.refresh()
  //   },
  // })

  const handleDeleteArticle = async (articleItem: IPost) => {
    // await deleteArticleTrpc.mutate({id: articleItem._id})
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
      <button
        aria-label='Видалити'
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
          className='z-1 bg-mid-green absolute bottom-[-21.5px] left-[-25px] flex gap-4 p-[21px]'
        >
          <button
            aria-label='Видалити'
            type='button'
            onClick={() => handleDeleteArticle(item)}
          >
            <AiOutlineCheckCircle
              className='hover:fill-white-dis focus:fill-white-dis transition-colors'
              size={30}
            />
          </button>
          <button
            aria-label='Закрити'
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
    </>
  )
}

export default RemoveArticles
