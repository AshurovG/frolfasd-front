import { useRef, useState } from "react"
import styles from "./OrderFrom.module.scss"

import Button from "components/Button"
import ReCAPTCHA from "react-google-recaptcha"

import emailjs from "@emailjs/browser"

import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import axios from "axios"

type OrderFormProps = {
  onSuccessfulSubmit: () => void
}

const OrderForm: React.FC<OrderFormProps> = ({ onSuccessfulSubmit }) => {
  const form = useRef<HTMLFormElement>(null)
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)

  const forma = useForm({
    mode: "onChange",
  })
  const { register, handleSubmit, formState, reset } = forma
  const { isValid, touchedFields, errors } = formState
  const [isCompactMode, setIsCompactMode] = useState(window.innerWidth <= 460)

  const postFacade = async (
    fio: string,
    email: string,
    description: string
  ) => {
    try {
      await axios("https://frolfasd.ru/api/email/", {
        method: "POST",
        data: { fio: fio, email: email, description: description },
      })
      toast.success("Заказ принят! Мы скоро с Вами свяжемся.")
      onSuccessfulSubmit()
      reset()
    } catch (error) {
      console.log(error)
      toast.error("Что-то пошло не так. Попробуйте позднее!")
      throw error
    }
  }

  const onSubmit = (data: FieldValues) => {
    postFacade(data.fio, data.email, data.description)
  }

  return (
    <div>
      <form
        ref={form}
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={styles.form__header}>ФРОЛФАСД</h1>

        <div style={{ position: "relative", width: `100%` }}>
          <input
            {...register("fio", {
              required: "Обязательное поле",
              pattern: {
                value: /^([\wа-яА-ЯёЁ]+[\s]){1,2}[\wа-яА-ЯёЁ]+$/,
                message: "Введите корректные данные...",
              },
            })}
            className={styles.form__input}
            // value={name}
            // onChange={(v) => setName(v.target.value)}
            placeholder="Введите ФИО*"
          />
          {errors?.fio && touchedFields.fio && (
            <div className={styles.form__input_message}>
              {errors?.fio?.message?.toString()}
            </div>
          )}
        </div>
        <div style={{ position: "relative", width: `100%` }}>
          <input
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Введите корректный e-mail",
              },
            })}
            className={styles.form__input}
            // value={email}
            // onChange={(v) => setEmail(v.target.value)}
            placeholder="Введите e-mail*"
          />
          {errors?.email && touchedFields.email && (
            <div className={styles.form__input_message}>
              {errors?.email?.message?.toString()}
            </div>
          )}
        </div>
        <div style={{ position: "relative", width: `100%` }}>
          <textarea
            {...register("description", {
              required: "Обязательное поле",
            })}
            className={styles.form__input_big}
            placeholder="Введите описание*"
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors?.description && touchedFields.description && (
            <div className={styles.form__input_message}>
              {errors?.description?.message?.toString()}
            </div>
          )}
        </div>
        <div style={{ position: "relative", width: `100%` }}>
          <ReCAPTCHA
            size={isCompactMode ? "compact" : "normal"}
            // theme="dark"
            // data-theme="dark"
            sitekey="6LcKZG8pAAAAAOJoD4-euRFa1KEN_uJHw_Pw_Uor"
            onChange={(value) => setCaptchaValue(value)}
          />
        </div>
        {/* <div > */}
        <Button
          className={styles.form__submit}
          disabled={!isValid || !captchaValue}
          type="submit"
        >
          Сделать заказ
        </Button>

        {/* </div> */}
      </form>
    </div>
  )
}

export default OrderForm
