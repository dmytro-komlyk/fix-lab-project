'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { outputBenefitSchema as IBenefit } from '@server/domain/benefits/schemas/benefit.schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck } from 'react-icons/fa'
import { MdCancel, MdDelete } from 'react-icons/md'

const RemoveBenefit = ({ item }: { item: IBenefit }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const removeBenefit = trpc.benefits.removeBenefit.useMutation({
    onSuccess: () => {
      toast.success(`Послугу сервісного обслуговування видалено!`, {
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

  const handleDeleteBenefit = async (benefitId: string) => {
    await removeBenefit.mutateAsync({ id: benefitId })
  }

  return (
    <Popover
      placement='right'
      showArrow={true}
      isOpen={isOpen}
      onOpenChange={open => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly aria-label='Delete benefit'>
          <MdDelete
            size='2em'
            className='transition-colors hover:fill-[red] focus:fill-[red]'
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <ButtonGroup>
          <Button
            className='transition-colors [&>svg]:hover:fill-[green] [&>svg]:focus:fill-[green]'
            onClick={() => handleDeleteBenefit(item.id)}
          >
            <FaCheck size='2em' />
          </Button>
          <Button
            className='transition-colors [&>svg]:hover:fill-[red] [&>svg]:focus:fill-[red]'
            onClick={() => setIsOpen(false)}
          >
            <MdCancel size='2em' />
          </Button>
        </ButtonGroup>
      </PopoverContent>
    </Popover>
  )
}

export default RemoveBenefit
