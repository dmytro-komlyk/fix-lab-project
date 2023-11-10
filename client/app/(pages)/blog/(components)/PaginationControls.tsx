'use client'

import { useRouter } from 'next/navigation'
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
  const router = useRouter()
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
          onClick={() => {
            router.push(`/blog/${currentPage - 1}`)

            handlePageChange(currentPage - 1)
          }}
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
                ? 'text-md text-white-dis font-bold'
                : 'text-md text-white-dis font-bold opacity-60'
            }
            key={page}
            onClick={() => {
              router.push(`/blog/${page}`)
              handlePageChange(page)
              router.refresh()
            }}
          >
            {page}
          </button>
        )
      })}

      {currentPage + 1 <= totalPages && (
        <button
          type='button'
          aria-label='next'
          onClick={() => {
            router.push(`/blog/${currentPage + 1}`)
            handlePageChange(currentPage + 1)
          }}
        >
          <BsArrowRightCircle size={20} color='white' />
        </button>
      )}
    </div>
  )
}

export default PaginationControls
