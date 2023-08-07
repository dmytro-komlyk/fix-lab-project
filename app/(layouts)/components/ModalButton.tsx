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
          ? 'opacity-70 pointer-events-none'
          : ''
      } group bg-dark-blue flex justify-center items-center rounded-lg hover:bg-[#0B122F] focus:bg-[#0B122F] w-full mt-4`}
    >
      <p
        className={`whitespace-nowrap text-base font-semibold tracking-[0.64] text-white-dis pt-[23px] pb-[20px] ${
          isHovering ? 'animate-hoverBtnOut' : ''
        } group-hover:animate-hoverBtnIn`}
      >
        {textButton}
      </p>
    </button>
  )
}

export default ModalButton
