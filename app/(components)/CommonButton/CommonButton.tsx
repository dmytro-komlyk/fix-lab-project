import type { ReactNode } from 'react'

interface ICommonButtonProps {
  children: ReactNode | ReactNode[]
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}

const CommonButton: React.FC<ICommonButtonProps> = ({
  children,
  onClick,
}): JSX.Element => (
  <button
    type='button'
    onClick={onClick}
    className='group relative z-[1] flex w-full items-center justify-center rounded-[12px] bg-mid-green pb-[21px] pt-[22px] transition-colors hover:bg-mid-blue focus:bg-mid-blue'
  >
    <span className='animate-slide-bottom font-inter text-base font-semibold leading-none tracking-wide text-[#04268b] group-hover:animate-slide-top'>
      {children}
    </span>
  </button>
)

export default CommonButton
