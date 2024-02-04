import React, { useState } from "react"
import styles from "./FacadesBlock.module.scss"
import { FacadeData, ReceivedFacadeData } from "../../../types"
import Card from "components/Card"
import Button from "components/Button"
import ModalWindow from "components/ModalWindow"
import DetailedItem from "components/DetailedItem"
import CardList from "components/CardList"

export type FacadesBlockProps = {
  items: ReceivedFacadeData[]
}

const FacadesBlock: React.FC<FacadesBlockProps> = ({ items }) => {
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)

  return (
    <div className={styles.block}>
      <h2 className={styles.block__title}>Вентилируемые фасады</h2>
      <p className={styles.block__description}>
        Здесь кратко описано, что это за услуга / где и как используется. Также
        было бы полезно указать, какие материалы используются.
      </p>
      <h2 className={styles.block__title}>Примеры работ</h2>
      <CardList items={items} onCardClick={() => setIsModalFormOpened(true)} />

      <div className={styles.block__action}>
        <Button>Посмотреть все работы</Button>
      </div>
      <p className={styles.block__description}>
        Здесь кратко описано, что это за услуга / где и как используется. Также
        было бы полезно указать, какие материалы используются.
      </p>
      <ModalWindow
        handleBackdropClick={() => setIsModalFormOpened(false)}
        active={isModalFormOpened}
      >
        <DetailedItem />
      </ModalWindow>
    </div>
  )
}

export default FacadesBlock
