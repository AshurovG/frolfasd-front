import React, { useCallback } from "react"
import styles from "./Input.module.scss"

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  placeholder?: string
  value?: string
  onChangeValue: (value: string) => void
  searchValue: string
  className?: string
}

const Input: React.FC<InputProps> = ({
  onChangeValue,
  searchValue,
  value,
  placeholder,
}) => {
  const onUpdateSearch = useCallback((str: string) => {
    onChangeValue(str)
  }, [])

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSearch(event.target.value)
  }

  return (
    // <div className={clsx(styles["input"], className)}>
    //   <form>
    <input
      value={value || searchValue}
      onChange={onChangeInput}
      className={styles.input__block}
      type="text"
      placeholder={placeholder ? `${placeholder}` : "Начните поиск..."}
    ></input>
    //   </form>
    // </div>
  )
}

export default Input
