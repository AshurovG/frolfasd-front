import React from "react"
import styles from "./FaqBlock.module.scss"
import { ReceivedQuestionsData } from "../../../types"
import Question from "components/Question"
import AddButton from "components/Icons/AddButton"
import BasketIcon from "components/Icons/BasketIcon"
import EditIcon from "components/Icons/EditIcon"

export type FaqBlockProps = {
  questions: ReceivedQuestionsData[]
  isAdminPage?: boolean
  onEditButtonClick?: (id: number, question: string, answer: string) => void
  onDeleteButtonClick?: (id: number) => void
  // id: string
}

const FaqBlock: React.FC<FaqBlockProps> = ({ questions, isAdminPage, onEditButtonClick, onDeleteButtonClick }) => {
  return (
    <div id="faq" className={styles.block}>
      {!isAdminPage && <h2 className={styles.block__title}>Часто задаваемые вопросы</h2>}
      <div className={styles.block__content}>
        {questions.map((question: ReceivedQuestionsData) => (
          <div className={styles.block__wrapper}>
            <Question {...question} key={question.questions_id} />
            {isAdminPage && <div className={styles.block__actions}>
              <EditIcon onClick={() => { onEditButtonClick && onEditButtonClick(question.questions_id, question.questions_title, question.questions_text)}}/>
              <BasketIcon onClick={() => {onDeleteButtonClick && onDeleteButtonClick(question.questions_id)}}/>
            </div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FaqBlock
