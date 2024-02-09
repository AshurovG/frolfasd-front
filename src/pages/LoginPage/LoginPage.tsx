import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import styles from './LoginPage.module.scss'
import Button from 'components/Button'
import { useDispatch } from "react-redux";
import { setIsAuthAction } from 'slices/AuthSlice';


const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [passwordValue, setPasswordValue] = useState('')

    const forma = useForm({
        mode: "onChange"
    })
    const { register } = forma

    const login = async () => {
        try {
            const response = await axios('https://frolfasd.ru/api/login', {
                method: 'POST',
                data: {
                    password: passwordValue
                }
            })
            localStorage.setItem('token', response.data.token);
            dispatch(setIsAuthAction(true))
            navigate('/')
            toast.success('Вы успешно вошли в систему!')
        } catch (error) {
            toast.error('Неверный код доступа!')
            throw error
        }
    }

    const handleFormSubmit = () => {
        login()
    }

    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Вход администратора системы</h1>
            <form
                    className={styles.form}
                    onSubmit={(event) => { event.preventDefault(); handleFormSubmit()}}
                >
                    <h1 className={styles.form__header}>Заполните данные</h1>
                    <div style={{ position: "relative", width: `100%` }}>
                        <input
                            {...register("title", {
                            required: "Обязательное поле",
                            // pattern: {
                            //     value: /^\w+\s(\w+\s)?\w+$/,
                            //     message: "Некорректные данные",
                            // },
                            })}
                            className={styles.form__input}
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            placeholder="Введите код доступа*"
                        />
                    </div>

                <Button className={styles.form__btn} type="submit">
                    Войти
                </Button>
            </form>
    </div>
  )
}

export default LoginPage