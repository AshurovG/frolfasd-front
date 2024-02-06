import React, { useEffect, useLayoutEffect, useState } from "react"
import styles from "./MainPage.module.scss"
import Button from "components/Button"
import Question from "components/Question"
import ModalWindow from "components/ModalWindow"
import OrderForm from "components/OrderForm"
import DetailedItem from "components/DetailedItem"
import FaqBlock from "components/FaqBlock"
import AboutCompanyBlock from "components/AboutCompanyBlock"
import {
  FacadeData,
  ReceivedFacadeData,
  ReceivedQuestionsData,
} from "../../../types"
import axios from "axios"
import { Response } from "../../../types"
import FacadesBlock from "components/FacadesBlock"

const MainPage = () => {
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)
  const [isModalSliderOpen, setIsModalSliderOpen] = useState(false)
  const [isCardsLoading, setIsCardsLoading] = useState<boolean>(true)

  const [facadesItems, setFacadesItems] = useState<ReceivedFacadeData[]>([])
  const [questions, setQuestions] = useState<ReceivedQuestionsData[]>([])

  const getFacadesItems = async () => {
    try {
      const response: Response = await axios(
        `https://frolfasd.ru/api/exterior_design_important`,
        {
          method: "GET",
        }
      )
      setFacadesItems(response.data)
      setTimeout(() => {
        setIsCardsLoading(false)
      }, 10000)
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
    } catch (error) {
      console.log(error)
    }
  }
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    getFacadesItems()
    getQuestions()
  }, [])

  return (
    <div className={styles.page}>
      <AboutCompanyBlock />
      <FacadesBlock isCardsLoading={isCardsLoading} items={facadesItems} />
      <FaqBlock questions={questions}></FaqBlock>
    </div>
  )
}

export default MainPage
