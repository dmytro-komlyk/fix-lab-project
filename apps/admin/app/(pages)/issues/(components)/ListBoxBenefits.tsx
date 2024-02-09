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
        className='flex w-full gap-1 px-2 py-0.5'
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
  }, [arrayValues, items])

  return (
    <div className='w-full rounded-xl border-small border-default-200 px-1 py-2'>
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
            <div className='flex items-center gap-2'>
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
