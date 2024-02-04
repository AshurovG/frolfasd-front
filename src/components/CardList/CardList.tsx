import React from "react"
import styles from "./CardList.module.scss"
import { ReceivedFacadeData } from "../../../types"
import Card from "components/Card"

export type CardListProps = {
  items: ReceivedFacadeData[]
  onCardClick: () => void
}

const CardList: React.FC<CardListProps> = ({ items, onCardClick }) => {
  return (
    <div className={styles.list}>
      {items.map((item: ReceivedFacadeData) => (
        <Card
          onCardClick={() => {
            onCardClick()
          }}
          {...item}
          key={item.exterior_design_id}
        ></Card>
      ))}
    </div>
  )
}

export default CardList
