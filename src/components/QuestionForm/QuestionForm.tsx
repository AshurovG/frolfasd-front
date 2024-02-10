import React, { useRef, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import styles from "./QuestionForm.module.scss"
import Button from "components/Button"
export type FacadeFormProps = {
  onSubmit: (question: string, answer: string) => void
  question?: string
  answer?: string
}

const QuestionForm: React.FC<FacadeFormProps> = ({
  question,
  answer,
  onSubmit,
}) => {
  const form = useRef<HTMLFormElement>(null)

  const forma = useForm({
    mode: "onChange",
  })
  const { register, handleSubmit, formState, reset } = forma
  const { isValid, touchedFields, errors } = formState

  const handleFormSubmit = (data: FieldValues) => {
    data.question && data.answer && onSubmit(data.question, data.answer)
    reset({
      question: "",
      answer: "",
    })
  }

  return (
    <form
      ref={form}
      className={styles.form}
      onSubmit={handleSubmit(handleFormSubmit)}
      //   onSubmit={(event) => {
      //     event.preventDefault()
      //     questionValue && answerValue && onSubmit(questionValue, answerValue),
      //       clearData()
      //   }}
    >
      <h1 className={styles.form__header}>Заполните данные</h1>
      <div style={{ position: "relative", width: `100%` }}>
        <textarea
          {...register("question", {
            required: "Обязательное поле",
          })}
          className={styles.form__input_big}
          placeholder="Вопрос*"
          //   value={questionValue}
          //   onChange={(e) => setQuestionValue(e.target.value)}
        ></textarea>
        {errors?.question && touchedFields.question && (
          <div className={styles.form__input_message}>
            {errors?.question?.message?.toString()}
          </div>
        )}
      </div>

      <div style={{ position: "relative", width: `100%` }}>
        <textarea
          {...register("answer", {
            required: "Обязательное поле",
          })}
          className={styles.form__input_big}
          placeholder="Ответ на вопрос*"
          //   value={answerValue}
          //   onChange={(e) => setAnswerValue(e.target.value)}
        ></textarea>
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
