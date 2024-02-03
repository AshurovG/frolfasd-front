import * as React from "react"
import { IconProps } from "../Icon"

const ArrowRightIcon: React.FC<IconProps> = ({
  className,
  color,
  width,
  height,
  onClick,
}) => {
  let classes = `icon_wrapper arrow_down_icon ${className}`
  return (
    <svg
      viewBox="0 0 1024 1024"
      onClick={onClick}
      color={color}
      width={width ? width : 60}
      height={height ? height : 60}
      className={classes}
    >
      <path
        d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
        fill="#000000"
      />
    </svg>
  )
}
export default ArrowRightIcon
