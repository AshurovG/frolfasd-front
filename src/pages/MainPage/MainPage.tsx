import { useEffect, useLayoutEffect, useState } from "react"
import styles from "./MainPage.module.scss"

import FaqBlock from "components/FaqBlock"
import AboutCompanyBlock from "components/AboutCompanyBlock"
import { ReceivedFacadeData, ReceivedQuestionsData } from "../../../types"
import axios from "axios"
import { Response } from "../../../types"
import FacadesBlock from "components/FacadesBlock"

const MainPage = () => {
  const [isCardsLoading, setIsCardsLoading] = useState<boolean>(true)

  const [facadesItems, setFacadesItems] = useState<ReceivedFacadeData[]>([])
  const [questions, setQuestions] = useState<ReceivedQuestionsData[]>([])

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
    } catch (error) {
      console.log(error)
    }
  }
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    getFacadesMainItems()
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
