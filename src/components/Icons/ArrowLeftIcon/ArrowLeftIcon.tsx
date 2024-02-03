import * as React from "react"
import { IconProps } from "../Icon"

const ArrowLeftIcon: React.FC<IconProps> = ({
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
        d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
        fill="#000"
      />
    </svg>
  )
}
export default ArrowLeftIcon
