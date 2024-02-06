import React from "react"
import styles from "./FacadesBlock.module.scss"
import { ReceivedFacadeData } from "../../../types"

import Button from "components/Button"

import CardList from "components/CardList"
import { Link } from "react-router-dom"

export type FacadesBlockProps = {
  items: ReceivedFacadeData[]
  isCardsLoading: boolean
}

const FacadesBlock: React.FC<FacadesBlockProps> = ({
  items,
  isCardsLoading,
}) => {
  return (
    <div className={styles.block}>
      <h2 className={styles.block__title}>Вентилируемые фасады</h2>
      <p className={styles.block__description}>
        Здесь кратко описано, что это за услуга / где и как используется. Также
        было бы полезно указать, какие материалы используются.
      </p>
      <h2 className={styles.block__title}>Примеры работ</h2>
      <CardList isCardsLoading={isCardsLoading} items={items} />

      <div className={styles.block__action}>
        <Link to="/portfolio">
          <Button>Посмотреть все работы</Button>
        </Link>
      </div>
      <p className={styles.block__description}>
        Здесь кратко описано, что это за услуга / где и как используется. Также
        было бы полезно указать, какие материалы используются.
      </p>
    </div>
  )
}

export default FacadesBlock
