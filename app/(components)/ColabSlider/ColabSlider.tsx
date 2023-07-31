'use client'
import React, { useEffect, useState } from 'react'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import { useWindowSize } from '../../(hooks)/useWindowResize';

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

export const ColabSlider = () => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.175, spacing: 16 },
      },
      "(min-width: 1100px)": {
        slides: { perView: 3.175, spacing: 16 },
      },
      "(min-width: 1400px)": {
        slides: { perView: 4, spacing: 16 },
      },
    },
    slides: { perView: 1.13, spacing: 16 },
  })
  const size = useWindowSize();

  
    return (
    size.width > 1439 ?
      <div>
        <ul className='flex gap-6 mb-11 border-b-[#20B9F4] border-b-2'>
          {colabData.map(item => (<li className='w-[302px] h-[98px] relative' key={item.id}>
            <h3 className='w-[191px] font-exo_2 text-xl leading-tight font-semibold text-white-dis'>{item.title}</h3>
            <div className='w-6 h-6 bg-gradient-linear-green absolute -bottom-3 left-0 rounded-full'></div>
          </li>))} </ul>
        <ul className='flex gap-6'>
          {colabData.map(item => (<li key={item.id} className='p-8 h-full w-[302px] text-white-dis font-inter border border-l-light-green rounded-xl' style={{width: '302px',height: '500px'}}>
            <div className='h-[86px] mb-6'>
              <img src={`/${item.icon}`} className='block' alt={item.title} />
            </div>
            <p className='mb-6 text-base text-white-dis leading-normal'>{item.text}</p>
            <p className='text-base text-white-dis leading-normal'>{item.subtext}</p>
                
          </li>))} </ul>
        </div> : <div className="navigation-wrapper">
          <div ref={ref} className="keen-slider">
        {colabData.map(item => (<div key={item.id} className='keen-slider__slide p-8 w-[302px] h-[490px] text-white-dis font-inter border-[1px] border-l-light-green rounded-xl' style={{width: '302px',height: '500px'}} > 
                <div className='h-[86px] mb-6'>
                    <img src={`/${item.icon}`} className='block' alt={item.title} />
                    </div>
                  <h3 className='font-exo_2 text-xl  text-white-dis leading-tight font-semibold mb-6'>{item.title}</h3>
                <p className='mb-6 text-base text-white-dis font-inter leading-normal'>{item.text}</p>
                <p className='text-base text-white-dis font-inter leading-normal'>{item.subtext}</p>
        </div>
        ))} 
             </div>
          </div>

  )
}
