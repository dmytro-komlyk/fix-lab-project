import { SERVER_URL } from '@admin/app/(lib)/constants'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Link,
} from '@nextui-org/react'
import type { outputBenefitSchema as IBenefit } from '@server/domain/benefits/schemas/benefit.schema'
import { FaEdit } from 'react-icons/fa'

import RemoveBenefit from './RemoveBenefit'

const BenefitsList = ({ benefitsData }: { benefitsData: IBenefit[] }) => {
  return (
    <div className=' flex flex-col items-center justify-center gap-8 pb-12'>
      <div className='flex w-full flex-col items-center justify-center gap-8'>
        <ul className='flex w-full flex-col gap-4 shadow-2xl'>
          {benefitsData.map((item: IBenefit) => (
            <Card
              key={item.id}
              className='group border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
              shadow='sm'
            >
              <CardBody className='flex flex-row items-center gap-6 overflow-visible px-4 py-2'>
                <Image
                  alt='Icon benefit'
                  className='rounded-xl object-cover'
                  src={`${SERVER_URL}/${item.icon.file.path}`}
                  width={50}
                />
                <h3 className='font-semibold text-dark-blue md:text-lg xl:text-xl'>
                  {item.title}
                </h3>
                <ButtonGroup className='ml-auto'>
                  <Button
                    href={`/benefits/${item.id}`}
                    as={Link}
                    className='min-w-2 px-3'
                  >
                    <FaEdit
                      className='transition-colors hover:fill-mid-green focus:fill-mid-green'
                      size='2em'
                    />
                  </Button>
                  <RemoveBenefit item={item} />
                </ButtonGroup>
              </CardBody>
            </Card>
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
