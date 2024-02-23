import React, { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import styles from "./QuestionForm.module.scss"
import Button from "components/Button"
export type FacadeFormProps = {
  onSubmit: (question: string, answer: string) => void
  question?: string
  answer?: string
  active?: boolean
}

const QuestionForm: React.FC<FacadeFormProps> = ({
  onSubmit,
  question,
  answer,
  active
}) => {
  const [questionValue, setQuestionValue] = useState(question)
  const [answerValue, setAnswerValue] = useState(answer)
  const form = useRef<HTMLFormElement>(null)

  const forma = useForm({
    mode: "onChange",
  })
  const { register, handleSubmit, formState, control } = forma
  const { isValid, touchedFields, errors } = formState

  const handleFormSubmit = () => {
    questionValue && answerValue && onSubmit(questionValue, answerValue)
  }

  const clearData = () => {
    setQuestionValue("")
    setAnswerValue("")
  }

  React.useEffect(() => {
    if (active) {
      clearData()
    }
  }, [active])

  return (
    <form
      ref={form}
      className={styles.form}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h1 className={styles.form__header}>Заполните данные</h1>
      <div style={{ position: "relative", width: `100%` }}>
        <Controller
          control={control}
          name="question"
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <textarea
              {...register("question", {
                required: "Обязательное поле",
              })}
              className={styles.form__input_big}
              placeholder="Вопрос*"
              value={questionValue}
              onChange={(e) => {
                field.onChange(e), setQuestionValue(e.target.value)
              }}
            ></textarea>
          )}
        />
        {errors?.question && touchedFields.question && (
          <div className={styles.form__input_message}>
            {errors?.question?.message?.toString()}
          </div>
        )}
      </div>

      <div style={{ position: "relative", width: `100%` }}>
        <Controller
          control={control}
          name="answer"
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <textarea
              {...register("answer", {
                required: "Обязательное поле",
              })}
              className={styles.form__input_big}
              placeholder="Ответ на вопрос*"
              value={answerValue}
              onChange={(e) => {
                field.onChange(e), setAnswerValue(e.target.value)
              }}
            ></textarea>
          )}
        />
        {errors?.answer && touchedFields.answer && (
          <div className={styles.form__input_message}>
            {errors?.answer?.message?.toString()}
          </div>
        )}
      </div>

      <Button disabled={!isValid} className={styles.form__submit} type="submit">
        Сохранить
      </Button>
    </form>
  )
}

export default QuestionForm
