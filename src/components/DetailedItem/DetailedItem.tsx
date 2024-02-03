import React, { useEffect, useState } from "react"
import styles from "./DetailedItem.module.scss"
import first from "assets/mockPics/image1.png"
import second from "assets/mockPics/image2.jpg"
import third from "assets/mockPics/image3.jpg"
import ArrowDownIcon from "components/Icons/ArrowDownIcon"
import ArrowRightIcon from "components/Icons/ArrowRightIcon/ArrowRightIcon"
import ArrowLeftIcon from "components/Icons/ArrowLeftIcon"
import SliderButton from "./SliderButton"

export type MockItemDataType = {
  itemName: string
  itemDescription: string
  itemPics: string[]
}

const MockItemData: MockItemDataType = {
  itemName: "Пример работы по наружнему оформления фасада",
  itemDescription:
    "Описание работы, используемные технологии, перечисление плюсов и особенностей",
  itemPics: [first, second, third],
}

const DetailedItem = () => {
  const [slideIndex, setSlideIndex] = useState<number>(1)

  const nextSlide = () => {
    if (slideIndex !== MockItemData.itemPics.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === MockItemData.itemPics.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else if (slideIndex === 1) {
      setSlideIndex(MockItemData.itemPics.length)
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
        {MockItemData.itemPics.map((obj, index) => {
          return (
            <div
              className={
                slideIndex == index + 1
                  ? styles.slider__images_slide_active
                  : styles.slider__images_slide
              }
            >
              <img src={obj} />
            </div>
          )
        })}
      </div>
      <div className={styles.slider__info}>
        <h2 className={styles.slider__info_title}>{MockItemData.itemName}</h2>
        <p className={styles.slider__info_description}>
          {MockItemData.itemDescription}
        </p>
      </div>
    </div>
  )
}

export default DetailedItem
