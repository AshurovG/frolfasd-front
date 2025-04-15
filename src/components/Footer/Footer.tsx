import styles from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__inner_main}>
        ФРОЛФАСАД <br /> 2010-2024 <br />
          <br />
          <div>
            Адрес: <br />
            Краснодарский край, г. Белореченск,<br />
            Толстого 60а
          </div>
        </div>
        {/* <div className={styles.footer__inner_duty}>
          Режим работы:
          <br /> пн-пт 9:00-20:00
          <br /> сб 10:00-18:00
          <br /> вс выходной
        </div> */}
        <div className={styles.footer__inner_contacts}>
          Контакты:
          <br /> <a href="tel:+7-918-180-87-08">+7-918-180-87-08</a>
          <br /> <a href="tel:+7-918-361-86-97">+7-918-361-86-97</a>
          <br /> <a href="mailto:frolfasad@mail.ru">frolfasad@mail.ru</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
