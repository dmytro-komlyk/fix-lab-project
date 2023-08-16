interface ISliderProgressBarProps {
  progress: number
  max: number | null
}

const SliderProgessBar = ({ progress, max }: ISliderProgressBarProps) => {
  console.log({ progress, max })

  if (!max) return null
  return (
    <div className='relative w-full p-4 md:px-0'>
      <div
        className='absolute left-0 top-0 z-10 h-[6px] rounded-full bg-mid-green transition-width'
        style={{ width: `${(100 / max) * (progress + 3)}%` }}
      />
      <div className='absolute left-0 top-0 h-[6px] w-full rounded-full bg-pros-bg' />
    </div>
  )
}

export default SliderProgessBar
