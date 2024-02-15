import styles from "./AboutCompanyBlock.module.scss"

const AboutCompanyBlock = () => {
  return (
    <div className={styles.block}>
      <div className={styles.block__inner}>
        <h2 className={styles.block__inner_title}>О компании</h2>
        <p className={styles.block__inner_content}>
          То есть надо продумать текст, из которого будет всем ясно, что это за
          фирма, чем занимается, какие есть услуги, и вообще надо что-то
          написать, я сейчас просто заполняю любым текстом, чтобы было понятно,
          как выглядит дизайн. Вообще лучше будет если это описание будет без
          картинок, то есть вот так текст на всю ширину страницы. И дальше в 1-2
          предложениях переход к услугам (наружное оформление зданий и
          вентилируемые фасады).
        </p>
      </div>
    </div>
  )
}

export default AboutCompanyBlock
