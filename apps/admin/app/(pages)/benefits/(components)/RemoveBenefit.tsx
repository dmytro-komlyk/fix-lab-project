'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import type { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'

const RemoveBenefit = ({
  item,
}: {
  item: Awaited<ReturnType<(typeof serverClient)['benefits']['getByIdBenefit']>>
}) => {
  const benefit = trpc.benefits.getByIdBenefit.useQuery(
    { id: item.id },
    {
      initialData: item,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  )

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
  const removeImage = trpc.images.removeImage.useMutation()
  const removeBenefit = trpc.benefits.removeBenefit.useMutation({
    onSuccess: async () => {
      router.refresh()
      toast.success(`Послугу сервісного обслуговування видалено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    },

    onError: () => {
      toast.error(`Сталася помилка під час видалення...`, {
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

  const handleDeleteArticle = async (benefitId: string) => {
    console.log(benefitId)
    await removeBenefit.mutateAsync({ id: benefitId })
    // removeImage.mutate({ id: benefit.data.icon_id })
    toggleRemoveContainer(benefitId)
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
        onClick={() => toggleRemoveContainer(benefit.data.id)}
      >
        <MdDelete
          className='transition-colors hover:fill-[red] focus:fill-[red]'
          size={30}
        />
      </button>
      {showRemoveContainers[benefit.data.id] && (
        <div
          ref={ref => {
            containerRefs.current[benefit.data.id] = ref
          }}
          className='z-1 absolute bottom-[-21.5px] left-[-25px] flex gap-4 bg-mid-green p-[21px]'
        >
          <button
            aria-label='Видалити'
            type='button'
            onClick={() => handleDeleteArticle(benefit.data.id)}
          >
            <AiOutlineCheckCircle
              className='transition-colors hover:fill-white-dis focus:fill-white-dis'
              size={30}
            />
          </button>
          <button
            aria-label='Закрити'
            type='button'
            onClick={() => toggleRemoveContainer(benefit.data.id)}
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

export default RemoveBenefit
