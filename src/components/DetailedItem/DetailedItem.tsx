import React, { useEffect, useState } from "react"
import styles from "./DetailedItem.module.scss"
import first from "assets/mockPics/image1.png"
import second from "assets/mockPics/image2.jpg"
import third from "assets/mockPics/image3.jpg"
import ArrowDownIcon from "components/Icons/ArrowDownIcon"
import ArrowRightIcon from "components/Icons/ArrowRightIcon/ArrowRightIcon"
import ArrowLeftIcon from "components/Icons/ArrowLeftIcon"
import AddButton from "components/Icons/AddButton"
import BasketIcon from "components/Icons/BasketIcon"
import SliderButton from "./SliderButton"
import ModalWindow from "components/ModalWindow"
import ImageForm from "components/ImageForm"
import Button from "components/Button"
import { ReceivedFacadeData } from "../../../types"
import clsx from "clsx"

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

export type DetailedProps = {
  className?: string
  facade: ReceivedFacadeData
  isAdminPage?: boolean
  onImageFormSubmit?: (file: File) => void
  onDeleteButtonClick?: (imageId: number) => void
}

const DetailedItem: React.FC<DetailedProps> = ({
  facade,
  isAdminPage,
  onImageFormSubmit,
  onDeleteButtonClick,
  className,
}) => {
  const [slideIndex, setSlideIndex] = useState<number>(1)
  const [isAddFacadeItemWindowOpened, setIsAddFacadeItemWindowOpened] =
    useState(false)
  const [isDeleteImageWindowOpened, setIsDeleteImageWindowOpened] =
    useState(false)

  const nextSlide = () => {
    if (slideIndex !== facade.items.length) {
      setSlideIndex(slideIndex + 1)
    } else if (slideIndex === facade.items.length) {
      setSlideIndex(1)
    }
  }

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1)
    } else if (slideIndex === 1) {
      setSlideIndex(facade.items.length)
    }
  }

  return (
    <div className={clsx(styles.slider, className)}>
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
        {facade.items.map((item, index) => {
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
        {!isAdminPage ? (
          <div>
            <h2 className={styles.slider__info_title}>
              {facade.exterior_design_title}
            </h2>
            <p className={styles.slider__info_description}>
              {facade.exterior_design_description}
            </p>
          </div>
        ) : (
          <div>
            <h2 className={styles.slider__info_title}>
              Вы можете удалить текущее изображение или добавить новое
            </h2>
            <div className={styles.slider__info_actions}>
              <AddButton
                className={styles.slider__info_actions_add}
                onClick={() => setIsAddFacadeItemWindowOpened(true)}
              />
              <BasketIcon
                onClick={
                  facade.items.length
                    ? () => setIsDeleteImageWindowOpened(true)
                    : () => {}
                }
              />
            </div>
          </div>
        )}

        {facade.items.length != 0 ? (
          <div className={styles.slider__info_count}>
            Фото объекта {slideIndex} из {facade.items.length}
          </div>
        ) : (
          <div className={styles.slider__info_count}>
            Изображения отсутствуют
          </div>
        )}
      </div>

      <ModalWindow
        active={isAddFacadeItemWindowOpened}
        handleBackdropClick={() => setIsAddFacadeItemWindowOpened(false)}
      >
        <ImageForm
          onSubmit={(file: File) => {
            onImageFormSubmit && onImageFormSubmit(file)
            setIsAddFacadeItemWindowOpened(false)
          }}
          fileTitle=""
        />
      </ModalWindow>

      <ModalWindow
        active={isDeleteImageWindowOpened}
        handleBackdropClick={() => setIsDeleteImageWindowOpened(false)}
      >
        <div className={styles.modal__delete}>
          <h4 className={styles.modal__title}>
            Вы уверены что хотите удалить это фото?
          </h4>
          <div className={styles.modal__btns}>
            <Button
              className={styles.modal__btn}
              onClick={() => {
                onDeleteButtonClick &&
                  onDeleteButtonClick(
                    facade.items[slideIndex - 1].exterior_design_items_id
                  )
              }}
            >
              Да
            </Button>
            <Button
              className={styles.modal__btn}
              onClick={() => setIsDeleteImageWindowOpened(false)}
            >
              Нет
            </Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  )
}

export default DetailedItem
