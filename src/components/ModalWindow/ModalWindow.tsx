import React, { MouseEvent, MouseEventHandler } from "react"
import styles from "./ModalWindow.module.scss"
import clsx from "clsx"

export type ModalProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean
  // setActive: (value: boolean) => void;
  handleBackdropClick: () => void
  children: React.ReactNode
  className?: string
}

const ModalWindow: React.FC<ModalProps> = ({
  active,
  // setActive,
  children,
  className,
  handleBackdropClick,
}) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation()
  }

  return (
    <div
      onClick={handleBackdropClick}
      className={`${styles.modal} ${active === true ? styles.active : ""}`}
    >
      <div
        onClick={handleClick}
        className={
          active === false
            ? clsx(styles.modal__content, className)
            : clsx(styles.modal__content, styles.active, className)
        }
      >
        {children}
      </div>
    </div>
  )
}

export default ModalWindow
