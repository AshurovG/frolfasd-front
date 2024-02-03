import React, { useState } from "react"
import styles from "./Question.module.scss"
import clsx from "clsx"
import ArrowDownIcon from "components/Icons/ArrowDownIcon"

const Questiom = () => {
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
        <div>Какие материалы используются?</div>
      </div>
      <div className={clsx(styles.faq__answer, isOpen ? styles.open : "")}>
        Could not connect to development server. Ensure the following Could not
        connect to development server. Ensure the followingCould not connect to
        development server. Ensure the followingCould not connect to development
        server. Ensure the followingCould not connect to development server.
        Ensure the following
      </div>
    </div>
  )
}

export default Questiom
