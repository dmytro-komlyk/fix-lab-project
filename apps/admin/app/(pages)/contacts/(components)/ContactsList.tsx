'use client'

import { SERVER_URL } from '@admin/app/(lib)/constants'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import type { outputContactSchema as IContact } from '@server/domain/contacts/schemas/contact.schema'
import NextImage from 'next/image'
import Link from 'next/link'

export const ContactsList = ({
  contactsData,
}: {
  contactsData: IContact[]
}) => {
  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {contactsData.map((item: IContact) => {
        return (
          <Card
            as={Link}
            href={`/contacts/${item.id}`}
            shadow='sm'
            radius='lg'
            key={item.id}
            isPressable
            isHoverable
            classNames={{
              base: 'gap-1 p-4 justify-between bg-card-repair-gradient',
            }}
          >
            <CardBody className='overflow-visible p-0'>
              <Image
                as={NextImage}
                radius='lg'
                width={300}
                height={200}
                alt={item.image.alt}
                className='object-cover'
                src={`${SERVER_URL}/${item.image.file.path}`}
              />
            </CardBody>
            <CardFooter className='p-0 text-white-dis'>
              <h5 className='text-lg'>{item.area}</h5>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
