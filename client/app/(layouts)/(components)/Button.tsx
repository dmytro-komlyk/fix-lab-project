import { type MouseEventHandler } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

interface ButtonProps {
  toggleModal: MouseEventHandler<HTMLButtonElement>
  text: string
  styles: string
  textHoverAnimation?: string
  icon?: string
}

const Button: React.FC<ButtonProps> = ({
  toggleModal,
  text,
  styles,
  textHoverAnimation,
  icon,
}) => {
  return (
    <button
      type='button'
      onClick={toggleModal}
      className={`duration-150 ease-in-out ${styles}`}
    >
      <p className={`${textHoverAnimation}`}>{text}</p>
      <span>{icon && <FiArrowUpRight className={icon} />}</span>
    </button>
  )
}

export default Button
