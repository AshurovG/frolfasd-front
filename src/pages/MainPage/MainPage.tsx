import React, { useState } from "react"
import styles from "./MainPage.module.scss"
import Button from "components/Button"
import Question from "components/Question"
import ModalWindow from "components/ModalWindow"
import OrderForm from "components/OrderForm"
import DetailedItem from "components/DetailedItem"

const MainPage = () => {
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)
  const [isModalSliderOpen, setIsModalSliderOpen] = useState(false)
  return (
    <div>
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
    </div>
  )
}

export default MainPage
