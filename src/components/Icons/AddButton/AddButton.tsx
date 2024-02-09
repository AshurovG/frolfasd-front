import React from "react"
import clsx from "clsx"
import styles from "./AddButton.module.scss"

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  onClick: () => void
}

const AddButton: React.FC<ButtonProps> = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={clsx(styles.icon, className)}
      stroke="#610a0ad1"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
    >
      <defs></defs>
      <title />
      <g id="plus">
        <line className="cls-1" x1="16" x2="16" y1="7" y2="25" />
        <line className="cls-1" x1="7" x2="25" y1="16" y2="16" />
      </g>
    </svg>
  )
}

export default AddButton
