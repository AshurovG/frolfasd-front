import React, { useEffect, useState } from "react"
import styles from "./DetailedItem.module.scss"
import first from "assets/mockPics/image1.png"
import second from "assets/mockPics/image2.jpg"
import third from "assets/mockPics/image3.jpg"
import ArrowDownIcon from "components/Icons/ArrowDownIcon"
import ArrowRightIcon from "components/Icons/ArrowRightIcon/ArrowRightIcon"
import ArrowLeftIcon from "components/Icons/ArrowLeftIcon"
import SliderButton from "./SliderButton"
import { ReceivedFacadeData } from "../../../types"

// export type MockItemDataType = {
//   itemName: string
//   itemDescription: string
//   itemPics: string[]
// }

// const MockItemData: MockItemDataType = {
//   itemName: "Пример работы по наружнему оформления фасада",
//   itemDescription:
//     "Описание работы, используемные технологии, перечисление плюсов и особенностей",
//   itemPics: [first, second, third],
// }

const DetailedItem: React.FC<ReceivedFacadeData> = ({
  // exterior_design_id,
  exterior_design_title,
  // exterior_design_url,
  exterior_design_description,
  // is_important,
  items = [], //странный подход, спасибо ts
}) => {
  const [slideIndex, setSlideIndex] = useState<number>(1)

  const nextSlide = () => {
    if (slideIndex !== items.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === items.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else if (slideIndex === 1) {
      setSlideIndex(items.length)
    }
  }

  return (
    <div className={styles.slider}>
      <div className={styles.slider__images}>
        <SliderButton
          className={styles.left}
          direction="prev"
          moveSlide={prevSlide}
        />
        <SliderButton
          className={styles.right}
          direction="next"
          moveSlide={nextSlide}
        />
        {items.map((item, index) => {
          return (
            <div
              className={
                slideIndex == index + 1
                  ? styles.slider__images_slide_active
                  : styles.slider__images_slide
              }
              key={item.exterior_design_items_id}
            >
              <img src={item.exterior_design_items_url} alt="" />
            </div>
          )
        })}
      </div>
      <div className={styles.slider__info}>
        <div>
          <h2 className={styles.slider__info_title}>{exterior_design_title}</h2>
          <p className={styles.slider__info_description}>
            {exterior_design_description}
          </p>
        </div>

        {items.length != 0 ? (
          <div>
            Фото объекта {slideIndex} из {items.length}
          </div>
        ) : (
          <div>Изображения отсутствуют</div>
        )}
      </div>
    </div>
  )
}

export default DetailedItem
