import type { serverClient } from '@admin/app/(utils)/trpc/serverClient'
import type { outputBenefitSchema } from '@server/domain/benefits/schemas/benefit.schema'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'

import RemoveBenefit from './RemoveBenefit'

const BenefitsList = ({
  benefitsData,
}: {
  benefitsData: Awaited<
    ReturnType<(typeof serverClient)['benefits']['getAllBenefits']>
  >
}) => {
  return (
    <div className=' flex flex-col items-center justify-center gap-8 pb-12'>
      <div className=' flex w-full flex-col items-center justify-center gap-8'>
        <ul className='flex w-full flex-col shadow-2xl'>
          {benefitsData.map((item: outputBenefitSchema) => (
            <li
              className='group border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
              key={item.id}
            >
              <div className='flex items-center justify-between px-6 py-[20px]'>
                <h3 className='font-semibold text-dark-blue md:text-base xl:text-xl'>
                  {item.title}
                </h3>
                <div className='relative ml-4 flex items-center justify-center gap-4'>
                  <Link href={`/benefits/${item.id}`}>
                    <FaEdit
                      className='transition-colors hover:fill-mid-green focus:fill-mid-green'
                      size={30}
                    />
                  </Link>
                  <RemoveBenefit item={item} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* {benefitsData.totalPages > 1 && (
          <PaginationControls
            totalPages={benefitsData.totalPages}
            currentPage={currentPage}
          />
        )} */}
      </div>
    </div>
  )
}

export default BenefitsList
