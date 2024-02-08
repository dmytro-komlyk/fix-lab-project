import { Button, ButtonGroup, Card, CardBody } from '@nextui-org/react'
import type { outputIssueSchema as IIssue } from '@server/domain/issues/schemas/issue.schema'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'

import RemoveIssue from './RemoveIssue'

const IssuesList = ({ issuesData }: { issuesData: IIssue[] }) => {
  return (
    <div className=' flex flex-col items-center justify-center gap-8 pb-12'>
      <div className='flex w-full flex-col items-center justify-center gap-8'>
        <ul className='flex w-full flex-col gap-4 shadow-2xl'>
          {issuesData.map((item: IIssue) => (
            <Card
              key={item.id}
              className='group border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 transition-opacity duration-300 first:rounded-t-xl last:rounded-b-xl'
              shadow='sm'
            >
              <CardBody className='flex flex-row items-center gap-6 overflow-visible px-4 py-2'>
                <h3 className='font-semibold text-dark-blue md:text-lg xl:text-xl'>
                  {item.title}
                </h3>
                <ButtonGroup className='ml-auto'>
                  <Button
                    href={`/issues/${item.slug}`}
                    as={Link}
                    className='min-w-2 px-3'
                  >
                    <FaEdit
                      className='transition-colors hover:fill-mid-green focus:fill-mid-green'
                      size='2em'
                    />
                  </Button>
                  <RemoveIssue item={item} />
                </ButtonGroup>
              </CardBody>
            </Card>
          ))}
        </ul>
        {/* {issuesData.totalPages > 1 && (
          <PaginationControls
            totalPages={issuesData.totalPages}
            currentPage={currentPage}
          />
        )} */}
      </div>
    </div>
  )
}

export default IssuesList
