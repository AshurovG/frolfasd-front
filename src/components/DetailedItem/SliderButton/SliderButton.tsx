import React from "react"
import ArrowLeftIcon from "components/Icons/ArrowLeftIcon"
import ArrowRightIcon from "components/Icons/ArrowRightIcon/ArrowRightIcon"

export type SliderButtonProps = {
  direction: string
  moveSlide: () => void
  className?: string
}

const SliderButton: React.FC<SliderButtonProps> = ({
  direction,
  moveSlide,
  className,
}) => {
  return (
    <button
      onClick={moveSlide}
    >
      {direction == "prev" ? (
        <ArrowLeftIcon className={className} />
      ) : (
        <ArrowRightIcon className={className} />
      )}
    </button>
  )
}

export default SliderButton
