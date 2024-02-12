import styles from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__inner_main}>
          ФРОЛФАСД <br /> 2010-2024 <br />
          <br />
          <div>
            Адрес: <br />
            Москва, ул Парковая 6
          </div>
        </div>
        <div className={styles.footer__inner_duty}>
          Режим работы:
          <br /> пн-пт 9:00-20:00
          <br /> сб 10:00-18:00
          <br /> вс выходной
        </div>
        <div className={styles.footer__inner_contacts}>
          Контакты:
          <br /> <a href="tel:+7-999-999-99-99">+7-999-999-99-99</a>
          <br /> <a href="mailto:firma@mail.ru">firma@mail.ru</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
