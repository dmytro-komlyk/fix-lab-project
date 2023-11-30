'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import type { IGadget } from '@/app/(server)/api/service/modules/gadgetService'

export interface IGadgetsProps {
  gadgetsData: IGadget[]
}
export const GadgetsList: React.FC<IGadgetsProps> = ({ gadgetsData }) => {
  return (
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0, translateY: 600 }}
        animate={{
          opacity: 1,
          translateY: 0,
          transition: { duration: 0.5 },
        }}
        exit={{
          opacity: 0,
          translateY: 600,
          transition: { duration: 0.5 },
        }}
        className='z-2 flex flex-wrap justify-center gap-2 max-xl:max-w-full xl:w-[954px] xl:gap-6'
      >
        {gadgetsData.map((item: IGadget) => {
          return (
            <li
              key={item._id}
              className='bg-card-repair-gradient group h-[261px] w-[302px] rounded-2xl  md:w-[calc((100%-10px)/2)] xl:w-[calc((100%-48px)/3)]'
            >
              <Link
                href={`/gadgets/${item._id}`}
                className='hover:bg-dark-blue flex w-full flex-col justify-between rounded-2xl pb-[23px] pl-[31px] pr-[21px]  pt-[33px] transition-colors delay-75 duration-300 ease-in-out md:h-full xl:h-[261px]'
              >
                <div className='relative ml-auto h-[80px] w-full max-w-[104px]'>
                  {item.icon && (
                    <Image
                      className='w-auto transition-transform delay-75 duration-300 ease-in-out group-hover:scale-[1.2]'
                      src={item.icon.src}
                      fill
                      alt={item.icon.alt}
                    />
                  )}
                </div>
                <div className='text-white-dis relative'>
                  <h3 className='mr-auto max-w-[151px]  font-semibold leading-tight transition duration-300 ease-in-out group-hover:-translate-y-7   max-xl:group-hover:translate-x-2 max-lg:group-hover:translate-x-0 md:text-base xl:text-xl'>
                    {item.title}
                  </h3>
                  <p className='font-inter absolute bottom-0 z-0 text-[12px] opacity-0 transition duration-300 ease-in-out group-hover:z-0 group-hover:opacity-100 max-lg:group-hover:translate-y-3  xl:text-sm  '>
                    Редагувати гаджет
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </motion.ul>
    </AnimatePresence>
  )
}
