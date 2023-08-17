import { useState } from 'react'

interface ModalButtonProps {
  validationArr: boolean[]
  textButton: string
}

const ModalButton: React.FC<ModalButtonProps> = ({
  textButton,
  validationArr,
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isSubmitting, isValid, dirty, isValidating] = validationArr

  return (
    <button
      type='submit'
      disabled={isSubmitting || !isValid || !dirty || isValidating}
      onMouseEnter={() => setIsHovering(false)}
      onMouseLeave={() => setIsHovering(true)}
      className={`${
        !isValid || !dirty || isValidating
          ? 'pointer-events-none opacity-70'
          : ''
      } group mt-4 flex h-[56px] w-full items-center justify-center rounded-lg bg-dark-blue transition-colors hover:bg-black-dis focus:bg-black-dis`}
    >
      <p
        className={`whitespace-nowrap text-base font-semibold tracking-[0.64] text-white-dis ${
          isHovering ? 'animate-hoverBtnOut' : ''
        } group-hover:animate-hoverBtnIn`}
      >
        {textButton}
      </p>
    </button>
  )
}

export default ModalButton
