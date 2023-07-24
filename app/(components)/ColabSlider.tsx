'use client'
import React from 'react'
import { A11y, Keyboard, Mousewheel, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';
import 'swiper/css/mousewheel';

import Image from 'next/image';
// import { BsPeople } from 'react-icons/bs';
// import { HiMiniArrowTrendingUp } from 'react-icons/hi';
// import { MdScreenSearchDesktop } from 'react-icons/md';



const colabData = [
    {
        id: '1',
        title: 'Команда професіоналів',
        text: 'У нас працює професійна команда, є необхідне спеціалізоване обладнання. Завдяки цьому, Ви заощадите час та гроші.',
        subtext: 'В роботі ми використовуємо якісні комплектуючі, та гарантію на них до 6 місяців.',
        icon: 'icon-people.svg',
    },
    {
        id: '2',
        title: '7 років роботи на ринку',
        text: 'Сервісний центр FixLab - швидка допомога вашому гаджету.',
        subtext: 'На ринку цифрової техніки ми працюємо більше 7 років. Надаємо рекомендації, проводимо дослідження, підвищуємо кваліфікацію наших спеціалістів.',
        icon: 'icon-arrow.svg'
    },
    {
        id: '3',
        title: 'Оригінальні запчастини',
        text: 'Ретельний відбір запчастин позначається на термінах ремонту, зате гарантує тривалий термін експлуатації телефону після ремонту.',
        subtext: 'Заміна сенсорного скла телефону - одна з  найчастіших послуг, що замовляють саме у нас.',
        icon: 'icon-tools.svg'
    },
    {
        id: '4',
        title: 'Прозора діагностика',
        text: 'За бажанням, можна бути присутнім при діагностиці вашого гаджету, це зберігає прозорість роботи.',
        subtext: 'Є можливість замовити відсутні деталі від виробника для максимально позитивного кінцевого результату.',
        icon: 'icon-computer-search.svg'
    }
]
const windowWidth:number = window.innerWidth;
export const ColabSlider = () => {
  return (
    windowWidth > 1439 ?
      <div>
        <ul className='flex gap-6 mb-11 border-b-[#20B9F4] border-b-2'>
          {colabData.map(item => (<li className='w-[302px] h-[98px] relative' key={item.id}>
            <h3 className='w-[191px] font-exo_2 text-xl leading-tight font-semibold text-white-dis'>{item.title}</h3>
            <div className='w-6 h-6 bg-gradient-linear-green absolute -bottom-3 left-0 rounded-full'></div>
          </li>))} </ul>
      <ul className='flex gap-6'>
       {colabData.map(item => (<li key={item.id} className='p-8 h-full w-[302px] text-white-dis font-inter border border-l-light-green rounded-xl' style={{width: '302px', height: '490px'}}>
                <div className='h-[86px] mb-6'>
                    <img src={`/${item.icon}`} className='block' alt={item.title} />
                    </div>
                <p className='mb-6 text-base text-white-dis leading-normal'>{item.text}</p>
                <p className='text-base text-white-dis leading-normal'>{item.subtext}</p>
                
       </li>))} </ul>
        </div>: <Swiper
      // install Swiper modules
      modules={[A11y, Scrollbar,Keyboard,Mousewheel]}
      spaceBetween={16}
      slidesPerView={windowWidth <768 ?1.175: windowWidth >767 && windowWidth <1100 ? 2.2: 3.1}
        scrollbar={{ draggable: true, hide: true }}

      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      >
        {colabData.map(item => (<SwiperSlide key={item.id} className='p-8 h-full w-[302px] text-white-dis font-inter border border-l-light-green rounded-xl' style={{width: '302px', height: '490px'}}>
            
                <div className='h-[86px] mb-6'>
                    <img src={`/${item.icon}`} className='block' alt={item.title} />
                    </div>
                  <h3 className='font-exo_2 text-xl leading-tight font-semibold mb-6'>{item.title}</h3>
                <p className='mb-6 text-base text-white-dis leading-normal'>{item.text}</p>
                <p className='text-base text-white-dis leading-normal'>{item.subtext}</p>
            
          </SwiperSlide>))}  
    </Swiper>
  )
}
