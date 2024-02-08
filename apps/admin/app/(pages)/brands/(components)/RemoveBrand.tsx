'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import type { outputBrandSchema as IBrand } from '@server/domain/brands/schemas/brand.schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck } from 'react-icons/fa'
import { MdCancel, MdDelete } from 'react-icons/md'

const RemoveBrand = ({ item }: { item: IBrand }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const removeBrand = trpc.brands.removeBrand.useMutation({
    onSuccess: () => {
      toast.success(`Бренд видалено!`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
      setIsOpen(false)
      router.refresh()
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
  })

  const handleDeleteBrand = async (brandId: string) => {
    await removeBrand.mutateAsync({ id: brandId })
  }

  return (
    <Popover
      placement='right'
      showArrow
      isOpen={isOpen}
      onOpenChange={open => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly aria-label='Delete brand'>
          <MdDelete
            className='transition-colors hover:fill-[red] focus:fill-[red]'
            size='2em'
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <ButtonGroup>
          <Button
            className='transition-colors [&>svg]:hover:fill-[green] [&>svg]:focus:fill-[green]'
            onPress={() => handleDeleteBrand(item.id)}
          >
            <FaCheck size='2em' />
          </Button>
          <Button
            className='transition-colors [&>svg]:hover:fill-[red] [&>svg]:focus:fill-[red]'
            onPress={() => setIsOpen(false)}
          >
            <MdCancel size='2em' />
          </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  )
}

export default RemoveBrand
