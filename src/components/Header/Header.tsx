import React, { useState } from "react"
import styles from "./Header.module.scss"
import Button from "components/Button"
import ModalWindow from "components/ModalWindow"
import OrderForm from "components/OrderForm"
import { Link } from "react-router-dom"
import { Link as ScrollLink, scroller } from "react-scroll"

const Header = () => {
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)
  return (
    <div className={styles.header} id="header">
      <div className={styles.header__inner}>
        <Link to="/">
          <div className={styles.header__inner_logo}>ФРОЛФАСД</div>
        </Link>

        <ul className={styles.header__inner_navmenu}>
          <Link to="/portfolio">
            <li className={styles.header__inner_navmenu_item}>Портфолио</li>
          </Link>
          <li className={styles.header__inner_navmenu_item}>
            <Link
              onClick={() => {
                setTimeout(() => {
                  scroller.scrollTo("faq", { smooth: true, duration: 500 })
                }, 100)
              }}
              to="/frolfasd"
            >
              Помощь
            </Link>
          </li>
          <li className={styles.header__inner_navmenu_item}>
            <Link
              onClick={() => {
                setTimeout(() => {
                  scroller.scrollTo("contacts", { smooth: true, duration: 500 })
                }, 100)
              }}
              to="/frolfasd"
            >
              Контакты
            </Link>
          </li>

          {/* <li className={styles.header__inner_navmenu_item}>Сделать заказ</li> */}
        </ul>
        <Button
          onClick={() => setIsModalFormOpened(true)}
          className={styles.header__inner_action}
        >
          Сделать заказ
        </Button>
      </div>
      <ModalWindow
        handleBackdropClick={() => setIsModalFormOpened(false)}
        active={isModalFormOpened}
      >
        <OrderForm />
      </ModalWindow>
    </div>
  )
}

export default Header
