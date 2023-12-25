import type { serverClient } from '@client/app/(utils)/trpc/serverClient'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'

export const GadgetsSlider = ({
  gadgetsData,
}: {
  gadgetsData: Awaited<
    ReturnType<(typeof serverClient)['gadgets']['getAllPublished']>
  >
}) => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.15, spacing: 16 },
  })
  return (
    <div ref={ref} className='keen-slider'>
      {/* any as IGadget = ? */}
      {gadgetsData.map((item: any) => {
        return (
          <Link
            key={item.id}
            href={`/repair/${item.slug}`}
            className='keen-slider__slide hover-gadget-link flex h-[261px] flex-col justify-between rounded-2xl bg-card-repair-gradient p-8'
          >
            <div className='relative ml-auto h-[80px] w-full max-w-[104px]'>
              {item.icon && (
                <Image src={item.icon.src} fill alt={item.icon.alt} />
              )}
            </div>
            <div className='text-white-dis'>
              <h3 className='mr-auto text-xl font-semibold leading-7'>
                {item.title}
              </h3>
              <p className='hidden font-inter text-xs xl:text-sm'>
                Подивитися поломки
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
