import React from "react"
import styles from "./FaqBlock.module.scss"
import { ReceivedQuestionsData } from "../../../types"
import Question from "components/Question"

export type FaqBlockProps = {
  questions: ReceivedQuestionsData[]
  // id: string
}

const FaqBlock: React.FC<FaqBlockProps> = ({ questions }) => {
  return (
    <div id="faq" className={styles.block}>
      <h2 className={styles.block__title}>Часто задаваемые вопросы</h2>
      <div className={styles.block__content}>
        {questions.map((question: ReceivedQuestionsData) => (
          <Question {...question} key={question.questions_id} />
        ))}
      </div>
    </div>
  )
}

export default FaqBlock
