'use client'

import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'

interface PaginationControlsProps {
  handlePageChange: (page: number) => void
  currentPage: number
  totalPages: number
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
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
        <button
          type='button'
          aria-label='next'
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <BsArrowLeftCircle size={20} color='white' />
        </button>
      )}

      {pageNumbers.map(page => {
        return (
          <button
            type='button'
            className={
              page === currentPage
                ? 'text-md font-bold text-white-dis'
                : 'text-md font-bold text-white-dis opacity-60'
            }
            key={page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      })}

      {currentPage + 1 <= totalPages && (
        <button
          type='button'
          aria-label='next'
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <BsArrowRightCircle size={20} color='white' />
        </button>
      )}
    </div>
  )
}

export default PaginationControls
