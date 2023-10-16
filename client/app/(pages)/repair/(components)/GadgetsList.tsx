/* eslint-disable no-underscore-dangle */
import Image from 'next/image'
import Link from 'next/link'

import type { IGadgetsProps } from '@/app/(layouts)'
import type { IGadget } from '@/app/(server)/api/service/modules/gadgetService'

export const GadgetsList: React.FC<IGadgetsProps> = ({ gadgetsData }) => {
  return (
    <ul className='z-10 flex w-[954px] flex-wrap gap-2 xl:gap-6'>
      {gadgetsData.map((item: IGadget) => {
        return (
          <li
            key={item._id}
            className='group h-[261px] w-[302px] rounded-2xl bg-card-repair-gradient md:w-[calc((100%-32px)/3)] xl:w-[calc((100%-48px)/3)]'
          >
            <Link
              href={`/repair/${item.slug}`}
              className='flex w-full flex-col justify-between rounded-2xl p-8 transition-colors delay-75 duration-300 ease-in-out hover:bg-dark-blue md:h-full xl:h-[261px]'
            >
              <div className='relative ml-auto h-[80px] w-full max-w-[104px]'>
                {item.icon && (
                  <Image
                    className='w-auto transition-transform delay-75 duration-300 ease-in-out group-hover:scale-[1.3]'
                    src={`http://95.217.34.212:30000${item.icon}`}
                    fill
                    alt={item.title}
                  />
                )}
              </div>
              <div className='relative text-white-dis'>
                <h3 className='mr-auto  font-semibold leading-tight transition duration-300 ease-in-out group-hover:-translate-y-7 group-hover:translate-x-3 group-hover:scale-[1.1] max-xl:group-hover:translate-x-2 max-lg:group-hover:translate-x-0 md:text-base xl:text-xl'>
                  {item.title}
                </h3>
                <p className='absolute bottom-0 z-0 font-inter text-[12px] opacity-0 transition duration-300 ease-in-out group-hover:z-0 group-hover:opacity-100 max-lg:group-hover:translate-y-3  xl:text-sm  '>
                  Подивитися поломки
                </p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
