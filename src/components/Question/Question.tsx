import React, { useState } from "react"
import styles from "./Question.module.scss"
import clsx from "clsx"
import ArrowDownIcon from "components/Icons/ArrowDownIcon"

export type QuestionProps = {
  questions_id: number
  questions_title: string
  questions_text: string
}

const Question: React.FC<QuestionProps> = ({
  questions_title,
  questions_text,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.faq}>
      <div
        className={clsx(styles.faq__question, isOpen ? styles.open : "")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ArrowDownIcon
          className={styles.faq__question_icon}
          width={30}
          height={30}
        />
        <div>{questions_title}</div>
      </div>
      <div className={clsx(styles.faq__answer, isOpen ? styles.open : "")}>
        {questions_text}
      </div>
    </div>
  )
}

export default Question
