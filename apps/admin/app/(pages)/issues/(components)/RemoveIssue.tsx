'use client'

import { trpc } from '@admin/app/(utils)/trpc/client'
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import type { outputIssueSchema as IIssue } from '@server/domain/issues/schemas/issue.schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck } from 'react-icons/fa'
import { MdCancel, MdDelete } from 'react-icons/md'

const RemoveIssue = ({ item }: { item: IIssue }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const removeIssue = trpc.issues.removeIssue.useMutation({
    onSuccess: () => {
      toast.success(`Послугу видалено!`, {
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

  const handleDeleteArticle = async (issueId: string) => {
    removeIssue.mutate({ id: issueId })
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
            onClick={() => handleDeleteArticle(item.id)}
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
    //   <button
    //     aria-label='Видалити'
    //     type='button'
    //     onClick={() => toggleRemoveContainer(item.id)}
    //   >
    //     <MdDelete
    //       className='transition-colors hover:fill-[red] focus:fill-[red]'
    //       size={30}
    //     />
    //   </button>
    //   {showRemoveContainers[item.id] && (
    //     <div
    //       ref={ref => {
    //         containerRefs.current[item.id] = ref
    //       }}
    //       className='z-1 absolute bottom-[-21.5px] left-[-25px] flex gap-4 bg-mid-green p-[21px]'
    //     >
    //       <button
    //         aria-label='Видалити'
    //         type='button'
    //         onClick={() => handleDeleteArticle(item.id)}
    //       >
    //         <AiOutlineCheckCircle
    //           className='transition-colors hover:fill-white-dis focus:fill-white-dis'
    //           size={30}
    //         />
    //       </button>
    //       <button
    //         aria-label='Закрити'
    //         type='button'
    //         onClick={() => toggleRemoveContainer(item.id)}
    //       >
    //         <AiOutlineCloseCircle
    //           className='transition-colors hover:fill-[red] focus:fill-[red]'
    //           size={30}
    //         />
    //       </button>
    //     </div>
    //   )}
    // </>
  )
}

export default RemoveIssue
