'use client'

import { SERVER_URL } from 'client/app/(lib)/constants'
import { trpc } from 'client/app/(utils)/trpc/client'
import { serverClient } from 'client/app/(utils)/trpc/serverClient'
import Image from 'next/image'
import { outputBenefitSchema } from 'server/src/domain/benefits/schemas/benefit.schema'

export const BenefitsList = ({
  itemsInit,
}: {
  itemsInit: Awaited<
    ReturnType<(typeof serverClient)['benefits']['getAllPublished']>
  >
}) => {
  const { data: items } = trpc.benefits.getAllPublished.useQuery(undefined, {
    initialData: itemsInit,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  return (
    <div className='flex flex-wrap gap-x-3.5 gap-y-[17px] lg:gap-[18px]'>
      {items?.map((item: outputBenefitSchema) => {
        return (
          <div
            key={item.title}
            className='flex max-h-[104px] w-[110px] flex-col items-center justify-between gap-[14px] rounded-2xl bg-light-grey px-[13px] py-[14px]'
          >
            {item.icon && (
              <Image
                src={`${SERVER_URL}/${item.icon.file.path}`}
                width={26}
                height={30}
                alt={item.icon.alt}
              />
            )}
            <p className='text-center text-xs text-dark-blue'>{item.title}</p>
          </div>
        )
      })}
    </div>
  )
}
