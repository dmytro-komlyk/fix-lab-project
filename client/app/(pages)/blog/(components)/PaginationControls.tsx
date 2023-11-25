import Link from 'next/link'
import { BsArrowLeftCircle } from 'react-icons/bs'

interface PaginationControlsProps {
  totalPages: number
  currentPage: number
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalPages,
  currentPage,
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
        <Link passHref href={`/blog/${currentPage - 1}`}>
          <BsArrowLeftCircle
            size={20}
            className='transition-all hover:scale-110 hover:opacity-80 focus:scale-110 focus:opacity-80'
            color='white'
          />
        </Link>
      )}

      {pageNumbers.map(page => {
        return (
          <Link
            passHref
            key={page}
            href={`/blog/${page}`}
            className={
              page === currentPage
                ? 'text-md font-bold text-white-dis transition-all hover:scale-110 hover:opacity-80 focus:scale-110 focus:opacity-80'
                : 'text-md font-bold text-white-dis opacity-60'
            }
          >
            {page}
          </Link>
        )
      })}

      {currentPage + 1 <= totalPages && (
        <Link href={`/blog/${currentPage + 1}`} passHref>
          <BsArrowLeftCircle
            className='rotate-180 transition-all hover:scale-110 hover:opacity-80 focus:scale-110 focus:opacity-80'
            size={20}
            color='white'
          />
        </Link>
      )}
    </div>
  )
}

export default PaginationControls
