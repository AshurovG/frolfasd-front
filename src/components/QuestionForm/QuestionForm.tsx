import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import styles from './QuestionForm.module.scss'
import Button from 'components/Button';
export type FacadeFormProps = {
    onSubmit: (question: string, answer: string) => void
    question?: string
    answer?: string
};

const QuestionForm: React.FC<FacadeFormProps> = ({question, answer, onSubmit}) => {
    const [questionValue, setQuestionValue] = useState(question)
    const [answerValue, setAnswerValue] = useState(answer)

    const forma = useForm({
        mode: "onChange"
    })

    const { register } = forma

    return (
        <form
                className={styles.form}
                onSubmit={(event) => { event.preventDefault();  questionValue && answerValue && onSubmit(questionValue, answerValue)}}
            >
                <h1 className={styles.form__header}>Заполните данные</h1>
                <div style={{ position: "relative", width: `100%` }}>
                    <textarea
                        {...register("question", {
                            required: "Обязательное поле",
                        })}
                        className={styles.form__input_big}
                        placeholder="Вопрос*"
                        value={questionValue}
                        onChange={(e) => setQuestionValue(e.target.value)}
                    ></textarea>
                </div>

                <div style={{ position: "relative", width: `100%` }}>
                    <textarea
                        {...register("answer", {
                            required: "Обязательное поле",
                        })}
                        className={styles.form__input_big}
                        placeholder="Ответ на вопрос*"
                        value={answerValue}
                        onChange={(e) => setAnswerValue(e.target.value)}
                    ></textarea>
                </div>

                <Button type="submit">
                    Сохранить
                </Button>
            </form>
    )
}

export default QuestionForm