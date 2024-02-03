import React, { useState } from "react"
import styles from "./App.module.scss"
import Button from "components/Button"
import Header from "components/Header"
import Question from "components/Question"
import ModalWindow from "components/ModalWindow"
import OrderForm from "components/OrderForm"
import DetailedItem from "components/DetailedItem"
import ArrowLeftIcon from "components/Icons/ArrowLeftIcon"
import ArrowRightIcon from "components/Icons/ArrowRightIcon/ArrowRightIcon"

const App = () => {
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)
  const [isModalSliderOpen, setIsModalSliderOpen] = useState(false)
  return (
    <div>
      <Header />
      <Button onClick={() => setIsModalFormOpened(true)}>Открыть форму</Button>
      <Question></Question>
      <ModalWindow
        handleBackdropClick={() => setIsModalFormOpened(false)}
        active={isModalFormOpened}
      >
        <OrderForm />
      </ModalWindow>
      <Button onClick={() => setIsModalSliderOpen(true)}>
        Открыть слайдер
      </Button>
      <ModalWindow
        handleBackdropClick={() => setIsModalSliderOpen(false)}
        active={isModalSliderOpen}
      >
        <DetailedItem />
      </ModalWindow>

      {/* <Button>Сделать заказ</Button> */}
    </div>
  )
}

export default App
