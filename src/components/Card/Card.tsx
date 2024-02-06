import React from "react"
import styles from "./Card.module.scss"

export type CardProps = {
  exterior_design_id: number
  exterior_design_title: string
  exterior_design_url: string
  exterior_design_description: string
  is_important: boolean
  onCardClick: () => void
}

const Card: React.FC<CardProps> = ({
  exterior_design_id,
  exterior_design_title,
  exterior_design_url,
  exterior_design_description,
  onCardClick,
}) => {
  return (
    <div
      onClick={() => {
        onCardClick()
      }}
      className={styles.card}
    >
      <img className={styles.card__image} src={exterior_design_url}></img>
      <div className={styles.card__description}>
        {exterior_design_description}
      </div>
      {/* <div>{exterior_design_id}</div> */}
    </div>
  )
}

export default Card
