import { useRef, useState } from "react"
import styles from "./OrderFrom.module.scss"

import Button from "components/Button"
import ReCAPTCHA from "react-google-recaptcha"

import emailjs from "@emailjs/browser"

import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-toastify"

const OrderForm = () => {
  const form = useRef<HTMLFormElement>(null)
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  // const [name, setName] = useState<string>("")
  // const [email, setEmail] = useState<string>("")
  // const [description, setDescription] = useState<string>("")

  const forma = useForm({
    mode: "onChange", // I want to change it to onBlur
  })
  // function onChange(value) {
  //   console.log("Captcha value:", value)
  // }
  const { register, handleSubmit, formState, reset } = forma
  const { isValid, touchedFields, errors } = formState
  const [isCompactMode, setIsCompactMode] = useState(window.innerWidth <= 460)

  const onSubmit = (data: FieldValues) => {
    alert(JSON.stringify(data))
    reset()
    // if (form.current !== null) {
    //   emailjs
    //     .sendForm(
    //       "service_yha9s88",
    //       "template_jyydoc3",
    //       form.current,
    //       "f5190L8C65x8v6nKG"
    //     )
    //     .then(
    //       (result) => {
    //         alert(result.text)
    //         console.log(result.text)
    //       },
    //       (error) => {
    //         console.log(error.text)
    //       }
    //     )
    // }
    toast.success("Заказ принят! Мы скоро Вам перезвоним.")
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
