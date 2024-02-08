import React from "react"
import styles from "./SliderButton.module.scss"
import ArrowLeftIcon from "components/Icons/ArrowLeftIcon"
import ArrowRightIcon from "components/Icons/ArrowRightIcon/ArrowRightIcon"
import clsx from "clsx"

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
      // className={clsx(styles.slider__button, className)}
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
