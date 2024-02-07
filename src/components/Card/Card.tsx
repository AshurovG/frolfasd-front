import React from "react"
import styles from "./Card.module.scss"
import FavoritesIcon from "components/Icons/FavoritesIcon"

export type CardProps = {
  exterior_design_id: number
  exterior_design_title: string
  exterior_design_url: string
  exterior_design_description: string
  is_important: boolean
  onCardClick: () => void
  onButtonClick?: (event: React.MouseEvent<HTMLElement>) => void
  isAdminPage?: boolean
}

const Card: React.FC<CardProps> = ({
  exterior_design_id,
  exterior_design_title,
  exterior_design_url,
  exterior_design_description,
  onCardClick,
  onButtonClick,
  isAdminPage,
  is_important,
}) => {
  return (
    <div
      onClick={() => {
        onCardClick()
      }}
      className={styles.card}
    >
      <img className={styles.card__image} src={exterior_design_url}></img>
      {isAdminPage && (
        <div
          onClick={onButtonClick ? (event) => onButtonClick(event) : () => {}}
          className={styles.card__btn}
        >
          {is_important && (
            <FavoritesIcon className={styles["card__btn-icon"]} />
          )}
        </div>
      )}
      <div className={styles.card__description}>{exterior_design_title}</div>
      {/* <div>{exterior_design_id}</div> */}
    </div>
  )
}

export default Card
