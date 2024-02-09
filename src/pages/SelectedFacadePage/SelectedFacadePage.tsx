import React, { useLayoutEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import styles from "./SelectedFacadePage.module.scss"
import { ReceivedFacadeData } from "../../../types"
import AddButton from "components/Icons/AddButton"
import BasketIcon from "components/Icons/BasketIcon"
import EditIcon from "components/Icons/EditIcon"
import DetailedItem from "components/DetailedItem"
import Button from "components/Button"
import FacadeForm from "components/FacadeForm"
import ModalWindow from "components/ModalWindow"
import DetailedItemSkeleton from "components/DetailedItem/DetailedItemSkeleton"
import QuestionSkeleton from "components/Question/QuestionSkeleton"

const SelectedFacadePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [facade, setFacade] = useState<ReceivedFacadeData>()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditFacadeWindowOpened, setIsEditFacadeWindowOpened] =
    useState(false)
  const [isDeleteFacadeWindowOpened, setIsDeleteFacadeWindowOpened] =
    useState(false)

  const getFacade = async () => {
    try {
      const response = await axios(
        `https://frolfasd.ru/api/exterior_design/${id}`
      )
      setFacade(response.data)
      setTimeout(() => {
        setIsLoading(false)
      }, 200)
    } catch (error) {
      throw error
    }
  }

  const putFacade = async (
    title: string,
    description: string,
    file: File | null
  ) => {
    console.log("file", file)
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("desc", description)
      if (file) {
        formData.append("file", file)
        formData.append("isFileChanged", String(1))
        if (facade) {
          formData.append("imgUrl", facade?.exterior_design_url)
        }
      }

      await axios(`https://frolfasd.ru/api/exterior_design/${id}`, {
        method: "PUT",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setIsEditFacadeWindowOpened(false)
      setIsLoading(true)
      toast.success("Информация успешно обновлена!")
      getFacade()
    } catch (error) {
      toast.success("Что-то пошло не так...")
      throw error
    }
  }

  const deleteFacade = async () => {
    try {
      await axios(`https://frolfasd.ru/api/exterior_design/${id}`, {
        method: "DELETE",
      })
      // setIsDeleteFacadeWindowOpened(false)
      toast.success("Объект успешно удален!")
      setIsLoading(true)
      navigate("/administration")
    } catch (error) {
      throw error
    }
  }

  const postImage = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    if (facade) {
      formData.append("exteriorDesignId", String(facade.exterior_design_id))
    }
    try {
      await axios("https://frolfasd.ru/api/exterior_design_items/", {
        method: "POST",
        data: formData,
      })
      getFacade()
      setIsLoading(true)
    } catch (error) {
      throw error
    }
  }

  const deleteImage = async (imageId: number) => {
    try {
      await axios(
        `https://frolfasd.ru/api/exterior_design_items/${imageId}?id=${id}`,
        {
          method: "DELETE",
          data: {
            idMany: imageId,
          },
        }
      )
      getFacade()
      setIsLoading(true)
    } catch (error) {
      throw error
    }
  }
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  React.useEffect(() => {
    getFacade()
  }, [])

  return (
    <div className={styles.selected}>
      <div>
        <div className={styles["selected__title-block"]}>
          {isLoading ? (
            <QuestionSkeleton className={styles.selected__title_skeleton} />
          ) : (
            <h1 className={styles.selected__title}>
              {facade?.exterior_design_title}
            </h1>
          )}

          <Button
            className={styles["selected__back-button"]}
            onClick={() => {
              navigate("/administration")
            }}
          >
            Назад
          </Button>
        </div>
        <div className={styles.selected__info}>
          {isLoading ? (
            <DetailedItemSkeleton className={styles.selected__image} />
          ) : (
            <img
              className={styles.selected__image}
              src={facade?.exterior_design_url}
              alt="image"
            />
          )}

          <div className={styles.selected__options}>
            <div className={styles.selected__actions}>
              {/* <AddButton onClick={() => setIsEditFacadeWindowOpened(true)}/> */}
              <EditIcon
                className={styles.selected__actions_add}
                onClick={() => setIsEditFacadeWindowOpened(true)}
              />
              <BasketIcon onClick={() => setIsDeleteFacadeWindowOpened(true)} />
            </div>
            <h4 className={styles.selected__subtitle}>Описание:</h4>
            {isLoading ? (
              <QuestionSkeleton className={styles.selected__text_skeleton} />
            ) : (
              <p className={styles.selected__text}>
                {facade?.exterior_design_description}
              </p>
            )}
          </div>
        </div>
        <h1 className={styles.selected__title}>Галлерея</h1>
        {isLoading ? (
          <DetailedItemSkeleton className={styles.selected__content} />
        ) : (
          facade && (
            <DetailedItem
              className={styles.selected__content}
              onDeleteButtonClick={deleteImage}
              onImageFormSubmit={postImage}
              isAdminPage
              facade={facade}
            />
          )
        )}
      </div>

      <ModalWindow
        active={isEditFacadeWindowOpened}
        handleBackdropClick={() => setIsEditFacadeWindowOpened(false)}
      >
        <div>
          {isEditFacadeWindowOpened && (
            <FacadeForm
              onSubmit={putFacade}
              title={facade?.exterior_design_title}
              description={facade?.exterior_design_description}
              fileTitle=""
            />
          )}
        </div>
      </ModalWindow>

      <ModalWindow
        active={isDeleteFacadeWindowOpened}
        handleBackdropClick={() => setIsDeleteFacadeWindowOpened(false)}
      >
        <div className={styles.modal__delete}>
          <h4 className={styles.modal__title}>
            Вы уверены что хотите удалить этот объект?
          </h4>
          <div className={styles.modal__btns}>
            <Button
              className={styles.modal__btn}
              onClick={() => deleteFacade()}
            >
              Да
            </Button>
            <Button
              className={styles.modal__btn}
              onClick={() => setIsDeleteFacadeWindowOpened(false)}
            >
              Нет
            </Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  )
}

export default SelectedFacadePage
