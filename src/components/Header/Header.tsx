import React from "react"
import styles from "./Header.module.scss"
import Button from "components/Button"

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>ФРОЛФАСД</div>
      <div className={styles.header__navmenu}>
        <div className={styles.header__navmenu_item}>Услуги</div>
        <div className={styles.header__navmenu_item}>Портфолио</div>
        <div className={styles.header__navmenu_item}>Помощь </div>
        <div className={styles.header__navmenu_item}>Сделать заказ</div>
      </div>
      <Button className={styles.header__action}>Сделать заказ</Button>
    </div>
  )
}

export default Header
