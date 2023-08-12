import React from 'react'
import { TbPhone } from 'react-icons/tb'

interface ICallUsCardProps {}

const CallUsCard: React.FC<ICallUsCardProps> = () => {
  return (
    <div className='flex max-w-[302px] flex-col items-center justify-center rounded-[15px] bg-white-dis p-8 opacity-80 max-lg:hidden'>
      <p className='relative mb-[24px] font-exo_2 text-xl font-semibold text-dark-blue'>
        <TbPhone className=' absolute left-[-26px] top-[7px]' size={24} />
        Подзвонити нам
      </p>
      <ul className='flex flex-col items-center gap-[15px]'>
        <li className='flex flex-col items-center'>
          <p className='font-[400] text-black-dis'>Голосіївський р-н</p>
          <a
            href='tel:380632272728'
            className=' font-[500] leading-7 tracking-[0.96px] text-dark-blue  transition-opacity hover:opacity-70  focus:opacity-70'
          >
            +38 063 227 27 28
          </a>
        </li>
        <li className='flex flex-col items-center'>
          <p className='font-[400] text-black-dis'>Оболонський р-н</p>
          <a
            href='tel:380502272728'
            className=' font-[500] leading-7 tracking-[0.96px] text-dark-blue  transition-opacity hover:opacity-70  focus:opacity-70'
          >
            +38 050 227 27 28
          </a>
        </li>
      </ul>
    </div>
  )
}

export default CallUsCard
