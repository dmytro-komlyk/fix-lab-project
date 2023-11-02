'use client'

import Link from 'next/link'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
}) => {
  const pageNumbers: number[] = []

  for (let i: number = currentPage - 1; i <= currentPage + 1; i += 1) {
    if (i > totalPages) break
    if (i > 0) {
      pageNumbers.push(i)
    }
  }

  return (
    <div className='flex items-center space-x-8 lg:ml-auto'>
      {currentPage - 1 >= 1 && (
        <Link href={`/blog?page=${currentPage - 1}`}>
          <BsArrowLeftCircle size={20} color='white' />
        </Link>
      )}

      {pageNumbers.map(page => {
        return (
          <Link
            className={
              page === currentPage
                ? 'text-md font-bold text-white-dis'
                : 'text-md font-bold text-white-dis opacity-60'
            }
            key={page}
            href={`/blog?page=${page}`}
          >
            {' '}
            {page}{' '}
          </Link>
        )
      })}

      {currentPage + 1 <= totalPages && (
        <Link href={`/blog?page=${currentPage + 1}`}>
          <BsArrowRightCircle size={20} color='white' />
        </Link>
      )}
    </div>
  )
}

export default PaginationControls
