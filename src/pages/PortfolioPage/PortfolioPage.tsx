import { useEffect, useLayoutEffect, useState } from "react"
import styles from "./PortfolioPage.module.scss"
import { ReceivedFacadeData } from "../../../types"
import { Response } from "../../../types"

import axios from "axios"
import CardList from "components/CardList"
import ModalWindow from "components/ModalWindow"
import Button from "components/Button"
import { Link } from "react-router-dom"
import OrderForm from "components/OrderForm"
import PhoneIcon from "components/Icons/PhoneIcon/PhoneIcon"

const PortfolioPage = () => {
  const [facadesItems, setFacadesItems] = useState<ReceivedFacadeData[]>([])
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)
  const [isCardsLoading, setIsCardsLoading] = useState<boolean>(true)

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

  const getFacadesItems = async () => {
    try {
      const response: Response = await axios(
        `https://frolfasd.ru/api/exterior_design`, //1111111111111
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
  useEffect(() => {
    getFacadesItems()
  }, [])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
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
      <h1 className={styles.page__title}>Портфолио</h1>
      <h2 className={styles.page__subtitle}>Вентилируемые фасады</h2>
      <div className={styles.page__content}>
        <CardList
          isCardsLoading={isCardsLoading}
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
        <OrderForm
          onSuccessfulSubmit={() => {
            setIsModalFormOpened(false)
          }}
        />
      </ModalWindow>
    </div>
  )
}

export default PortfolioPage
