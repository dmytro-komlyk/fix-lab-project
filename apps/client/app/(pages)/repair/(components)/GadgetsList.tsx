import { SERVER_URL } from '@client/app/(lib)/constants'
import type { serverClient } from '@client/app/(utils)/trpc/serverClient'
import type { outputGadgetSchema as IGadget } from '@server/domain/gadgets/schemas/gadget.schema'
import Image from 'next/image'
import Link from 'next/link'

export const GadgetsList = ({
  gadgetsData,
}: {
  gadgetsData: Awaited<
    ReturnType<(typeof serverClient)['gadgets']['getAllPublishedGadgets']>
  >
}) => {
  return (
    <ul className='z-2 flex flex-wrap justify-center gap-2 max-xl:max-w-full xl:w-[954px] xl:gap-6'>
      {gadgetsData
        .sort((a, b) => Number(a.order) - Number(b.order))
        .map((item: IGadget) => (
          <li
            key={item.id}
            className='group h-[261px] w-[302px] rounded-2xl bg-card-repair-gradient  md:w-[calc((100%-10px)/2)] xl:w-[calc((100%-48px)/3)]'
          >
            <Link
              href={`/repair/${item.slug}`}
              className='flex w-full flex-col justify-between rounded-2xl pb-[23px] pl-[31px] pr-[21px] pt-[33px] transition-colors delay-75 duration-300 ease-in-out hover:bg-dark-blue md:h-full xl:h-[261px]'
            >
              <div className='relative ml-auto h-[80px] w-full max-w-[104px]'>
                {item.icon && (
                  <Image
                    className='w-auto transition-transform delay-75 duration-300 ease-in-out group-hover:scale-[1.2]'
                    src={`${SERVER_URL}/${item.icon.file.path}`}
                    fill
                    alt={item.icon.alt}
                  />
                )}
              </div>
              <div className='relative text-white-dis'>
                <h3 className='mr-auto max-w-[151px]  font-semibold leading-tight transition duration-300 ease-in-out group-hover:-translate-y-7   max-xl:group-hover:translate-x-2 max-lg:group-hover:translate-x-0 md:text-base xl:text-xl'>
                  {item.title}
                </h3>
                <p className='absolute bottom-0 z-0 font-inter text-[12px] opacity-0 transition duration-300 ease-in-out group-hover:z-0 group-hover:opacity-100 max-lg:group-hover:translate-y-3  xl:text-sm  '>
                  Подивитися поломки
                </p>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  )
}
