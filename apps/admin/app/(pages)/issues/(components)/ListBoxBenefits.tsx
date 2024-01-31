'use client'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import {
  Avatar,
  Chip,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from '@nextui-org/react'
import type { outputBenefitSchema as IBenefit } from '@server/domain/benefits/schemas/benefit.schema'
import React from 'react'

const ListBoxBenefits = ({
  items,
  listBenefits,
  setListBenefits,
}: {
  items: IBenefit[]
  listBenefits: string[]
  setListBenefits: any
}) => {
  const arrayValues = Array.from(listBenefits)

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null
    }

    return (
      <ScrollShadow
        hideScrollBar
        className='w-full flex py-0.5 px-2 gap-1'
        orientation='horizontal'
      >
        {arrayValues.map(value => (
          <Chip key={value}>
            {
              items.find((benefit: IBenefit) => `${benefit.id}` === `${value}`)
                ?.title
            }
          </Chip>
        ))}
      </ScrollShadow>
    )
  }, [arrayValues.length])

  return (
    <div className='w-full border-small px-1 py-2 rounded-xl border-default-200'>
      <Listbox
        topContent={topContent}
        classNames={{
          base: `${arrayValues.length ? 'pt-0' : 'pt-9'}`,
          list: 'max-h-[250px] overflow-auto',
        }}
        defaultSelectedKeys={listBenefits}
        items={items}
        label='Assigned to'
        selectionMode='multiple'
        onSelectionChange={setListBenefits}
        variant='flat'
      >
        {item => (
          <ListboxItem key={item.id} textValue={item.title}>
            <div className='flex gap-2 items-center'>
              <Avatar
                alt={item.icon.alt}
                classNames={{
                  base: 'bg-transparent overflow-visible',
                }}
                size='sm'
                src={`${SERVER_URL}/${item.icon.file.path}`}
              />
              <div className='flex flex-col'>
                <span className='text-small'>{item.title}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  )
}

export default ListBoxBenefits
