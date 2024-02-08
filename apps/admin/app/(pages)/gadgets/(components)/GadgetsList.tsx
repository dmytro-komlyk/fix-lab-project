'use client'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { Card, CardFooter, CardHeader, Image } from '@nextui-org/react'
import type { outputGadgetSchema as IGadget } from '@server/domain/gadgets/schemas/gadget.schema'
import NextImage from 'next/image'
import Link from 'next/link'

export const GadgetsList = ({ gadgetsData }: { gadgetsData: IGadget[] }) => {
  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {gadgetsData.map((item: IGadget) => {
        return (
          <Card
            as={Link}
            href={`/gadgets/${item.slug}`}
            shadow='sm'
            radius='lg'
            key={item.id}
            isPressable
            isHoverable
            classNames={{
              base: 'h-[200px] w-[200px] p-4 justify-between bg-card-repair-gradient',
            }}
          >
            <CardHeader className='justify-end overflow-visible p-0'>
              <Image
                as={NextImage}
                radius='lg'
                classNames={{ img: 'w-full h-12 overflow-visible' }}
                width={50}
                height={50}
                alt={item.icon.alt}
                className='w-full object-cover'
                src={`${SERVER_URL}/${item.icon.file.path}`}
              />
            </CardHeader>
            <CardFooter className='p-0 text-white-dis'>
              <h5>{item.title}</h5>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
