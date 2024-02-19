import React, { useState, ChangeEvent, useEffect } from "react"
import styles from "./AdminPage.module.scss"
import Navigation from "components/Navigation"
import CardList from "components/CardList"
import axios from "axios"
import { ReceivedFacadeData, ReceivedQuestionsData } from "../../../types"
import AddButton from "components/Icons/AddButton"
import FavoritesIcon from "components/Icons/FavoritesIcon"
import FacadeForm from "components/FacadeForm"
import ModalWindow from "components/ModalWindow"
import FaqBlock from "components/FaqBlock"
import QuestionForm from "components/QuestionForm/QuestionForm"
import Button from "components/Button"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { setIsMainPageAction } from "slices/PageSlice"

const AdminPage = () => {
  const token = localStorage.getItem("token")
  const [facadesItems, setFacadesItems] = useState<ReceivedFacadeData[]>([])
  const [filteredFacadesItems, setFilteredFacadesItems] = useState<
    ReceivedFacadeData[]
  >([])
  const [questions, setQuestions] = useState<ReceivedQuestionsData[]>([])
  const [active, setActive] = useState<"facades" | "questions">("facades")
  const [isCreateWindowOpened, setIsCreateWindowOpened] = useState(false)
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] =
    useState(false)
  const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false)
  const [isDeleteWindowOpen, setIsDeleteWindowOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] =
    useState<ReceivedQuestionsData>()
  const [isDeletedQuestionId, setDeletedQuestionId] = useState<number>()
  const [isCardsLoading, setIsCardsLoading] = useState<boolean>(true)
  const [isQuestionsLoading, setIsQuestionsLoading] = useState<boolean>(true)
  const [filterValue, setFilterValue] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsMainPageAction(false))
  }, [])

  const getFacades = async () => {
    setActive("facades")
    try {
      const response = await axios("https://frolfasd.ru/api/exterior_design/")
      setFacadesItems(response.data)
      setFilteredFacadesItems(response.data)
      setTimeout(() => {
        setIsCardsLoading(false)
      }, 1000)
    } catch (error) {
      throw error
    }
  }

  const getQuestions = async () => {
    setActive("questions")
    try {
      const response = await axios("https://frolfasd.ru/api/questions/")
      setQuestions(response.data)
      setTimeout(() => {
        setIsQuestionsLoading(false)
      }, 1000)
    } catch (error) {
      throw error
    }
  }

  const changeImportantItem = async (item: ReceivedFacadeData) => {
    try {
      await axios(
        `https://frolfasd.ru/api/exterior_design_important/${item.exterior_design_id}`,
        {
          method: "PUT",
          data: {
            isImportant: !item.is_important,
            jwt: token,
          },
        }
      )
      setIsCardsLoading(true)
      toast.success("Информация успешно обновлена!")

      getFacades()
    } catch (error) {
      toast.error("Нельзя добавлять более 6 объектов!")
      throw error
    }
  }

  React.useEffect(() => {
    setFilteredFacadesItems(
      facadesItems.filter((facade) => {
        return facade.exterior_design_title
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      })
    )
  }, [filterValue])

  const postFacade = async (
    title: string,
    description: string,
    file: File | null
  ) => {
    try {
      const formData = new FormData()
      if (token) {
        formData.append("jwt", token)
      }
      formData.append("title", title)
      formData.append("desc", description)
      if (file && file.size > 5 * 1024 * 1024) {
        // Проверяем размер файла
        toast.error("Размер фотографии должен не превышать  5 МБ")
        return // Прерываем выполнение функции
      } else if (file) {
        formData.append("file", file)
      }
      await axios("https://frolfasd.ru/api/exterior_design/", {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setIsCardsLoading(true)
      toast.success("Объект создан успешно!")

      getFacades()
      setIsCreateWindowOpened(false)
    } catch (error) {
      toast.error("Размер фотографии должен не превышать 5 МБ")
      throw error
    }
  }

  const postQuestion = async (question: string, answer: string) => {
    try {
      await axios("https://frolfasd.ru/api/questions/", {
        method: "POST",
        data: {
          title: question,
          text: answer,
          jwt: token,
        },
      })
      setIsQuestionsLoading(true)
      getQuestions()
      setIsCreateQuestionModalOpen(false)
      toast.success("Вопрос создан успешно!")
    } catch (error) {
      throw error
    }
  }

  const putQuestion = async (question: string, answer: string) => {
    try {
      await axios(`https://frolfasd.ru/api/questions/`, {
        method: "PUT",
        data: {
          title: question,
          text: answer,
          id: currentQuestion?.questions_id,
          jwt: token,
        },
      })
      setIsQuestionsLoading(true)

      toast.success("Информация успешно обновлена!")
      getQuestions()
      setIsEditQuestionModalOpen(false)
    } catch (error) {
      throw error
    }
  }

  const deleteQuestion = async () => {
    try {
      await axios(`https://frolfasd.ru/api/questions/${isDeletedQuestionId}`, {
        method: "DELETE",
        data: {
          jwt: token,
        },
      })
      setIsQuestionsLoading(true)

      toast.success("Информация успешно обновлена!")
      getQuestions()
      setIsDeleteWindowOpen(false)
    } catch (error) {
      throw error
    }
  }

  React.useEffect(() => {
    getFacades()
  }, [])

  const onEditButtonClick = (id: number, question: string, answer: string) => {
    console.log("edit clicked", question)
    console.log(id, question, answer)
    setCurrentQuestion({
      questions_id: id,
      questions_title: question,
      questions_text: answer,
    })
    console.log(currentQuestion)
    setIsEditQuestionModalOpen(true)
  }

  const onDeleteButtonClick = (id: number) => {
    setIsDeleteWindowOpen(true)
    setDeletedQuestionId(id)
  }

  return (
    <div className={styles.admin}>
      <h1 className={styles.admin__title}>Управление сайтом</h1>
      <h4 className={styles.admin__subtitle}>
        Здесь вы можете редактировать данные сайта
      </h4>
      <Navigation
        active={active}
        onFacadesClick={getFacades}
        onQuestionsClick={getQuestions}
      />
      {active === "facades" && (
        <div className={styles["admin__actions-description"]}>
          <div className={styles["admin__actions-icon"]}>
            <FavoritesIcon className={styles["admin__actions-icon-liked"]} />
            <span className={styles["admin__actions-icon-text"]}>
              - значит, что данный объект будет отображаться на главной
              странице.
            </span>
          </div>
          <p>
            - Вы можете выбирать любые объекты, которые хотите видеть на
            главной.
            <br />
            - Количество объектов на главной странице должны быть не больше 6!
            <br />- Остальные объекты будут отображаться на странице
            "Портфолио".
          </p>
        </div>
      )}
      {active === "facades" ? (
        <>
          <div className={styles.admin__actions}>
            <h4 className={styles.admin__text}>
              Хотите добавить новый объект?
            </h4>
            <AddButton
              className={styles.admin__actions_add}
              onClick={() => setIsCreateWindowOpened(true)}
            />
          </div>
          <h4 className={styles.admin__text}>
            Также вы можете найти объект по названию
          </h4>
          <input
            placeholder="Название объекта*"
            className={styles.admin__input}
            type="text"
            value={filterValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setFilterValue(event.target.value)
            }}
          />
        </>
      ) : (
        <div className={styles.admin__actions}>
          <h4 className={styles.admin__text}>Хотите добавить новый вопрос?</h4>
          <AddButton
            className={styles.admin__actions_add}
            onClick={() => setIsCreateQuestionModalOpen(true)}
          />
        </div>
      )}

      {active === "facades" ? (
        <div className={styles.admin__facades}>
          <CardList
            isCardsLoading={isCardsLoading}
            isAdminPage
            items={filteredFacadesItems}
            onButtonClick={changeImportantItem}
          />
        </div>
      ) : (
        <div>
          <FaqBlock
            isQuestionsLoading={isQuestionsLoading}
            isAdminPage
            questions={questions}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          ></FaqBlock>
        </div>
      )}
      <ModalWindow
        active={isCreateWindowOpened}
        handleBackdropClick={() => setIsCreateWindowOpened(false)}
      >
        <div>
          {
            <FacadeForm
              isEditing={false}
              onSubmit={postFacade}
              title=""
              description=""
              fileTitle=""
            />
          }
        </div>
      </ModalWindow>

      <ModalWindow
        active={isCreateQuestionModalOpen}
        handleBackdropClick={() => setIsCreateQuestionModalOpen(false)}
      >
        <QuestionForm onSubmit={postQuestion} />
      </ModalWindow>

      <ModalWindow
        active={isEditQuestionModalOpen}
        handleBackdropClick={() => setIsEditQuestionModalOpen(false)}
      >
        {currentQuestion && (
          <QuestionForm
            key={currentQuestion.questions_id}
            question={currentQuestion.questions_title}
            answer={currentQuestion.questions_text}
            onSubmit={putQuestion}
          />
        )}
      </ModalWindow>

      <ModalWindow
        active={isDeleteWindowOpen}
        handleBackdropClick={() => setIsDeleteWindowOpen(false)}
      >
        <div className={styles.modal__delete}>
          <h4 className={styles.modal__title}>
            Вы уверены что хотите удалить этот вопрос?
          </h4>
          <div className={styles.modal__btns}>
            <Button
              className={styles.modal__btn}
              onClick={() => deleteQuestion()}
            >
              Да
            </Button>
            <Button
              className={styles.modal__btn}
              onClick={() => setIsDeleteWindowOpen(false)}
            >
              Нет
            </Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  )
}

export default AdminPage
