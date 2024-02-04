import React, { useEffect, useState } from "react"
import styles from "./PortfolioPage.module.scss"
import { ReceivedFacadeData } from "../../../types"
import { Response } from "../../../types"

import axios from "axios"
import FacadesBlock from "components/FacadesBlock"
import CardList from "components/CardList"
import ModalWindow from "components/ModalWindow"
import DetailedItem from "components/DetailedItem"
import Button from "components/Button"
import { Link } from "react-router-dom"

const PortfolioPage = () => {
  const [facadesItems, setFacadesItems] = useState<ReceivedFacadeData[]>([])
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)

  const getFacadesItems = async () => {
    try {
      const response: Response = await axios(
        `https://frolfasd.ru/api/exterior_design`,
        {
          method: "GET",
        }
      )
      setFacadesItems(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getFacadesItems()
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.page__title}>Портфолио</h1>
      <h2 className={styles.page__subtitle}>Вентилируемые фасады</h2>
      <div className={styles.page__content}>
        <CardList
          onCardClick={() => setIsModalFormOpened(true)}
          items={facadesItems}
        />
      </div>

      <div className={styles.page__action}>
        <Link to="/frolfasd">
          <Button>На главную</Button>
        </Link>
      </div>

      <ModalWindow
        handleBackdropClick={() => setIsModalFormOpened(false)}
        active={isModalFormOpened}
      >
        <DetailedItem />
      </ModalWindow>
    </div>
  )
}

export default PortfolioPage
