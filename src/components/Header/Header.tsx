import React, { useState } from "react"
import styles from "./Header.module.scss"
import Button from "components/Button"
import ModalWindow from "components/ModalWindow"
import OrderForm from "components/OrderForm"
import { Link } from "react-router-dom"
import { Link as ScrollLink } from "react-scroll"

const Header = () => {
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)
  return (
    <div className={styles.header}>
      <div className={styles.header__inner}>
        <Link to="/">
          <div className={styles.header__inner_logo}>ФРОЛФАСД</div>
        </Link>

        <ul className={styles.header__inner_navmenu}>
          <li className={styles.header__inner_navmenu_item}>Услуги</li>
          <Link to="/portfolio">
            <li className={styles.header__inner_navmenu_item}>Портфолио</li>
          </Link>

          <li className={styles.header__inner_navmenu_item}>
            <ScrollLink
              activeClass="active"
              to="faq"
              // spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              Помощь
            </ScrollLink>
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
