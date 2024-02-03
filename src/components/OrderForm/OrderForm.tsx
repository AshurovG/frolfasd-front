import React, { useRef, useState } from "react"
import styles from "./OrderFrom.module.scss"
import Input from "components/Input"
import Button from "components/Button"
import emailjs from "@emailjs/browser"

import { Controller, FieldValues, useForm } from "react-hook-form"

const OrderForm = () => {
  const form = useRef<HTMLFormElement>(null)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = (data: FieldValues) => {
    if (form.current !== null) {
      emailjs
        .sendForm(
          "service_yha9s88",
          "template_jyydoc3",
          form.current,
          "f5190L8C65x8v6nKG"
        )
        .then(
          (result) => {
            alert(result.text)
            console.log(result.text)
          },
          (error) => {
            console.log(error.text)
          }
        )
    }
  }

  return (
    <div>
      <form
        ref={form}
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={styles.form__header}>ФРОЛФАСД</h1>
        <div style={{ width: `100%` }}>
          <input
            {...register("fio", {
              required: "Обязательное поле",
              pattern: {
                value: /^\w+\s(\w+\s)?\w+$/,
                message: "Некорректные данные",
              },
            })}
            className={styles.form__input}
            value={name}
            onChange={(v) => setName(v.target.value)}
            placeholder="Введите ФИО*"
          />
          {errors?.fio && <span>{errors?.fio?.message?.toString()}</span>}
        </div>
        <div style={{ width: `100%` }}>
          <input
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Некорректный email",
              },
            })}
            className={styles.form__input}
            value={email}
            onChange={(v) => setEmail(v.target.value)}
            placeholder="Введите email*"
          />
          {errors?.email && <span>{errors?.email?.message?.toString()}</span>}
        </div>
        <div style={{ width: `100%` }}>
          <textarea
            {...register("description", {
              required: "Обязательное поле",
            })}
            className={styles.form__input_big}
            placeholder="Введите описание*"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors?.description && (
            <span>{errors?.description?.message?.toString()}</span>
          )}
        </div>
        <Button type="submit">Сделать заказ</Button>
      </form>
    </div>
  )
}

export default OrderForm
