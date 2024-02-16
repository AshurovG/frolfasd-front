import { useEffect, useRef, useState } from "react"
import styles from "./Header.module.scss"
import Button from "components/Button"
import ModalWindow from "components/ModalWindow"
import OrderForm from "components/OrderForm"
import { Link } from "react-router-dom"
// import { Link as ScrollLink, scroller } from "react-scroll"
import { motion, AnimatePresence } from "framer-motion";
import {scroller} from "react-scroll"
import BurgerIcon from "components/Icons/BurgerIcon"
import { useIsAuth, setIsAuthAction } from "slices/AuthSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useIsAuth()
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsBurgerMenuOpened(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [])

  const onExitButtonClick = () => {
    dispatch(setIsAuthAction(false))
    localStorage.removeItem('token')
    toast.success('Вы успешно вышли из режима администратора!')
  }

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

          {isAuth && (
            <Link to="/administration">
              <li className={styles.header__inner_navmenu_item}>Управление</li>
            </Link>
          )}

          {/* <li className={styles.header__inner_navmenu_item}>Сделать заказ</li> */}
        </ul>
        {!isAuth && <Button
          onClick={() => setIsModalFormOpened(true)}
          className={styles.header__inner_action}
        >
          Сделать заказ
        </Button>}

        {isAuth && <Button
          onClick={onExitButtonClick}
          className={styles.header__inner_action}
        >
          Выйти
        </Button>}

        {isBurgerMenuOpened === false ? (
          <BurgerIcon
            className={styles.burger__icon}
            onClick={() => setIsBurgerMenuOpened(true)}
          />
        ) : (
          <div
            className={styles.cancel__icon}
            onClick={() => setIsBurgerMenuOpened(false)}
          ></div>
        )}

        
        <AnimatePresence>
          {isBurgerMenuOpened && (
              <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.3 }}
              style={{
                  marginTop: -20,
                  position: "absolute",
                  right: 0,
              }}
              >
              <div ref={menuRef} className={styles.burger__menu}>
                <Link
                  onClick={() => setIsBurgerMenuOpened(false)}
                  // className={styles["burger__menu-item"]}
                  to={"/portfolio"}
                >
                  Портфолио
                </Link>
                <Link
                  onClick={() => {
                    setIsBurgerMenuOpened(false)
                    setTimeout(() => {
                      scroller.scrollTo("faq", { smooth: true, duration: 500 })
                    }, 100)
                  }}
                  to="/frolfasd"
                >
                  Помощь
                </Link>
                <Link
                  onClick={() => {
                    setIsBurgerMenuOpened(false)
                    setTimeout(() => {
                      scroller.scrollTo("contacts", { smooth: true, duration: 500 })
                    }, 100)
                  }}
                  to="/frolfasd"
                >
                  Контакты
                </Link>
                {isAuth && <Link onClick={() => {
                    setIsBurgerMenuOpened(false)}} to="/administration">Управление</Link>}
                <div
                  onClick={() => {
                    setIsModalFormOpened(true), setIsBurgerMenuOpened(false)
                  }}
                >
                  {" "}
                  Сделать заказ
                </div>
              </div>
              </motion.div>
          )}
        </AnimatePresence>
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

export default Header
