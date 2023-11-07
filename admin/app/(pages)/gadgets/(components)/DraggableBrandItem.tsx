'use client'

import { useSortable } from '@dnd-kit/sortable'
import Image from 'next/image'
import { GoGrabber } from 'react-icons/go'
import { IoIosRemoveCircle } from 'react-icons/io'

import type { IBrand } from '@/app/(server)/api/service/modules/gadgetService'

interface DraggableBrandItemProps {
  id: string
  item: IBrand
  onRemove: (item: IBrand) => void
}

export function DraggableBrandItem({
  id,
  item,
  onRemove,
}: DraggableBrandItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const scale = transform?.scaleX || 1

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${scale})`
      : '',
    transition,
  }
  return (
    <li
      key={item._id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='flex w-full cursor-grab items-center justify-between gap-2 border-b-[0.5px] border-dark-blue bg-white-dis opacity-60   first:rounded-t-xl last:rounded-b-xl '
    >
      <div className='flex items-center gap-2 p-4'>
        {item.icon && (
          <Image
            className='h-[40px] w-[40px] object-center opacity-100'
            alt={item.icon.alt}
            src={item.icon.src}
            width={0}
            height={0}
          />
        )}
        <p className='font-exo_2 text-md font-semibold text-dark-blue max-md:text-lg '>
          {item?.title || 'No title'}
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <GoGrabber className='text-dark-blue' size={35} />
        <IoIosRemoveCircle
          onClick={() => {
            onRemove(item)
          }}
          className='mr-4 cursor-pointer text-dark-blue transition-colors hover:text-[red] focus:text-[red]'
          size={35}
        />
      </div>
    </li>
  )
}
