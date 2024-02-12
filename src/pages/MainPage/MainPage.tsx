import { useEffect, useLayoutEffect, useState } from "react"
import styles from "./MainPage.module.scss"

import FaqBlock from "components/FaqBlock"
import AboutCompanyBlock from "components/AboutCompanyBlock"
import { ReceivedFacadeData, ReceivedQuestionsData } from "../../../types"
import axios from "axios"
import { Response } from "../../../types"
import FacadesBlock from "components/FacadesBlock"
import PhoneIcon from "components/Icons/PhoneIcon/PhoneIcon"
import ModalWindow from "components/ModalWindow"
import OrderForm from "components/OrderForm"

const MainPage = () => {
  const [isCardsLoading, setIsCardsLoading] = useState<boolean>(true)
  const [isQuestionsLoading, setIsQuestionsLoading] = useState<boolean>(true)
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)

  const [facadesItems, setFacadesItems] = useState<ReceivedFacadeData[]>([])
  const [questions, setQuestions] = useState<ReceivedQuestionsData[]>([])

  const [showButton, setShowButton] = useState(false)

  const handleScroll = () => {
    const header = document.getElementById("header")
    if (!header) return
    const rect = header.getBoundingClientRect()
    setShowButton(rect.top < -147)
    if (window.innerWidth < 1050) {
      setShowButton(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    if (window.innerWidth < 1050) {
      setShowButton(true)
    }
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getFacadesMainItems = async () => {
    try {
      const response: Response = await axios(
        `https://frolfasd.ru/api/exterior_design_important`,
        {
          method: "GET",
        }
      )
      setFacadesItems(response.data)

      setIsCardsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getQuestions = async () => {
    try {
      const response: Response = await axios(
        `https://frolfasd.ru/api/questions/`,
        {
          method: "GET",
        }
      )
      setQuestions(response.data)
      setIsQuestionsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getFacadesMainItems()
    getQuestions()
  }, [])

  return (
    <div className={styles.page}>
      {showButton && (
        <div
          onClick={() => setIsModalFormOpened(true)}
          className={styles.order_fix}
        >
          <PhoneIcon className={styles.order_fix_icon} />
        </div>
      )}
      <AboutCompanyBlock />
      <FacadesBlock isCardsLoading={isCardsLoading} items={facadesItems} />
      <FaqBlock
        isQuestionsLoading={isQuestionsLoading}
        questions={questions}
      ></FaqBlock>
      <ModalWindow
        handleBackdropClick={() => setIsModalFormOpened(false)}
        active={isModalFormOpened}
      >
        <OrderForm onSuccessfulSubmit={() => setIsModalFormOpened(false)} />
      </ModalWindow>
    </div>
  )
}

export default MainPage
