import React, { useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { FieldValues, useForm } from "react-hook-form"
import styles from "./LoginPage.module.scss"
import Button from "components/Button"
import { useDispatch } from "react-redux"
import { setIsAuthAction } from "slices/AuthSlice"

const LoginPage = () => {
  const form = useRef<HTMLFormElement>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [passwordValue, setPasswordValue] = useState("")

  const forma = useForm({
    mode: "onChange", // I want to change it to onBlur
  })
  const { register, handleSubmit, formState, reset } = forma
  const { isValid, touchedFields, errors } = formState

  const login = async (password: any) => {
    try {
      const response = await axios("https://frolfasd.ru/api/login", {
        method: "POST",
        data: {
          password: password,
        },
      })
      localStorage.setItem("token", response.data.token)
      dispatch(setIsAuthAction(true))
      navigate("/")
      toast.success("Вы успешно вошли в систему!")
    } catch (error) {
      toast.error("Неверный код доступа!")
      throw error
    }
  }

  const handleFormSubmit = (data: FieldValues) => {
    login(data.password)
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Вход администратора системы</h1>
      <form
        ref={form}
        className={styles.form}
        onSubmit={
          handleSubmit(handleFormSubmit)
          //   event.preventDefault()

          //   handleFormSubmit()
        }
      >
        <h1 className={styles.form__header}>Заполните данные</h1>
        <div style={{ position: "relative", width: `100%` }}>
          <input
            {...register("password", {
              required: "Обязательное поле",
              minLength: { value: 3, message: "Больше 3 символов" },
              //   validate:{}
              // pattern: {
              //     value: /^\w+\s(\w+\s)?\w+$/,
              //     message: "Некорректные данные",
              // },
            })}
            className={styles.form__input}
            // value={passwordValue}
            // onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="Введите код доступа*"
          />
          {errors?.password && touchedFields.password && (
            <div className={styles.form__input_message}>
              {errors?.password?.message?.toString()}
            </div>
          )}
        </div>

        <Button disabled={!isValid} className={styles.form__btn} type="submit">
          Войти
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
