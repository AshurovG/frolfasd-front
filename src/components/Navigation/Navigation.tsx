import React from "react"
import styles from "./Navigation.module.scss"

export type NavigationProps = {
  onFacadesClick: () => void
  active: "facades" | "questions"
  onQuestionsClick: () => void
}

const Navigation: React.FC<NavigationProps> = ({
  onFacadesClick,
  onQuestionsClick,
  active,
}) => {
  return (
    <div className={styles.nav}>
      <div
        onClick={() => onFacadesClick()}
        className={
          active === "facades"
            ? styles["nav__item-active"]
            : styles["nav__item"]
        }
      >
        Вентилируемые фасады
      </div>
      <div
        onClick={() => onQuestionsClick()}
        className={
          active === "questions"
            ? styles["nav__item-active"]
            : styles["nav__item"]
        }
      >
        Часто задаваемые вопросы
      </div>
    </div>
  )
}

export default Navigation
