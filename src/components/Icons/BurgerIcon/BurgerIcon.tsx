import * as React from "react"
import { IconProps } from "../Icon"
import Icon from "../Icon"

const BurgerIcon: React.FC<IconProps> = ({
  className,
  width,
  height,
  onClick,
}) => {
  let classes = `icon_wrapper ${className}`
  return (
    <Icon
      viewBox="0 0 24 24"
      onClick={onClick}
      width={width ? width : 24}
      height={height ? height : 24}
      className={classes}
    >
      <path
        d="M3 19L25 19"
        stroke="#610a0a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 12L25 12"
        stroke="#610a0a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 5L25 5"
        stroke="#610a0a"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  )
}
export default BurgerIcon
