import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'

import { Button, ButtonGroup, Card, CardBody } from '@nextui-org/react'
import { outputBrandSchema as IBrand } from '@server/domain/brands/schemas/brand.schema'
import RemoveBrand from './RemoveBrand'

const BrandsList = ({ brandsData }: { brandsData: IBrand[] }) => {
  return (
    <div className=' flex flex-col items-center justify-center gap-8 pb-12'>
      <div className=' flex w-full flex-col items-center justify-center gap-8'>
        <ul className='flex w-full flex-col  gap-4 shadow-2xl'>
          {brandsData.map((item: IBrand) => (
            <Card
              key={item.id}
              shadow='sm'
              className='group border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
            >
              <CardBody className='flex flex-row gap-6 items-center overflow-visible py-2 px-4'>
                <h3 className='font-semibold text-dark-blue md:text-base xl:text-xl'>
                  {item.title}
                </h3>
                <ButtonGroup className='ml-auto'>
                  <Button
                    href={`/brands/${item.slug}`}
                    as={Link}
                    className='min-w-2 px-3'
                  >
                    <FaEdit
                      className='transition-colors hover:fill-mid-green focus:fill-mid-green'
                      size='2em'
                    />
                  </Button>
                  <RemoveBrand item={item} />
                </ButtonGroup>
              </CardBody>
            </Card>
          ))}
        </ul>
        {/* {brandsData.totalPages > 1 && (
          <PaginationControls
            totalPages={brandsData.totalPages}
            currentPage={currentPage}
          />
        )} */}
      </div>
    </div>
  )
}

export default BrandsList
