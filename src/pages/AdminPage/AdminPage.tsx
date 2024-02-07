import React, { useState } from 'react'
import styles from './AdminPage.module.scss'
import Navigation from 'components/Navigation'
import CardList from 'components/CardList'
import axios from 'axios'
import { ReceivedFacadeData, ReceivedQuestionsData } from "../../../types"
import AddButton from 'components/Icons/AddButton'
import FacadeForm from 'components/FacadeForm'
import ModalWindow from 'components/ModalWindow'
import FaqBlock from 'components/FaqBlock'
import QuestionForm from 'components/QuestionForm/QuestionForm'
import Button from 'components/Button'
import {toast } from 'react-toastify';

const AdminPage = () => {
  const [facadesItems, setFacadesItems] = useState<ReceivedFacadeData[]>([])
  const [questions, setQuestions] = useState<ReceivedQuestionsData[]>([])
  const [active, setActive] = useState<'facades' | 'questions'>('facades')
  const [isCreateWindowOpened, setIsCreateWindowOpened] = useState(false)
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] = useState(false)
  const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false)
  const [isDeleteWindowOpen, setIsDeleteWindowOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<ReceivedQuestionsData>()
  const [isDeletedQuestionId, setDeletedQuestionId] = useState<number>()

  const getFacades = async () => {
    setActive('facades')
    try {
      const response = await axios('https://frolfasd.ru/api/exterior_design/')
      setFacadesItems(response.data)
    } catch(error) {
      throw error
    }
  }

  const getQuestions = async () => {
    setActive('questions')
    try {
      const response = await axios('https://frolfasd.ru/api/questions/')
      setQuestions(response.data)
    } catch(error) {
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
            isImportant: !item.is_important
          }
        }
      )
      if (item.is_important === false) {
        toast.success("Объект добавлен на главную страницу!");
      } else {
        toast.success("Объект скрыт из главной страницы!");
      }
      
      getFacades()
    } catch(error) {
      toast.error("Что-то пошло не так...");
      throw error
    }
  }

  const postFacade = async (title: string, description: string, file: File | null) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('desc', description);
      if (file) {
        formData.append('file', file);
      }
      await axios('https://frolfasd.ru/api/exterior_design/', {
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success("Объект создан успешно!");

      getFacades()
      setIsCreateWindowOpened(false)
      
    } catch(error) {
       throw error
    }
  }

  const postQuestion = async (question: string, answer: string) => {
    try {
      await axios('https://frolfasd.ru/api/questions/', {
        method: 'POST',
        data: {
          title: question,
          text: answer
        }
      })
      getQuestions()
      setIsCreateQuestionModalOpen(false)
      toast.success("Вопрос создан успешно!");
    } catch(error) {
      throw error
    }
  }

  const putQuestion = async (question: string, answer: string) => {
    try {
      await axios(`https://frolfasd.ru/api/questions/`, {
        method: 'PUT',
        data: {
          title: question,
          text: answer,
          id: currentQuestion?.questions_id
        }
      })

      toast.success("Информация успешно обновлена!");
      getQuestions()
      setIsEditQuestionModalOpen(false)
    } catch(error) {
      throw error
    }
  }
  
  const deleteQuestion = async () => {
    try {
      await axios(`https://frolfasd.ru/api/questions/${isDeletedQuestionId}`, {
        method: 'DELETE',
      })
      toast.success("Информация успешно обновлена!");
      getQuestions()
      setIsDeleteWindowOpen(false)
    } catch(error) {
      throw error
    }
  }
  
  React.useEffect(() => {
    getFacades();
  }, [])

  const onEditButtonClick = (id: number, question: string, answer: string) => {
    console.log('edit clicked', question)
    // putQuestion(id, question, answer)
    setCurrentQuestion({
      questions_id: id,
      questions_title: question,
      questions_text: answer
    })
    setIsEditQuestionModalOpen(true)
  }

  const onDeleteButtonClick = (id: number) => {
    setIsDeleteWindowOpen(true)
    setDeletedQuestionId(id)
  }

  return (
    <div className={styles.admin}>
      <h1 className={styles.admin__title}>Управление сайтом</h1>
      <h4 className={styles.admin__subtitle}>Здесь вы можете редактировать данные сайта</h4>
      <Navigation active={active} onFacadesClick={getFacades} onQuestionsClick={getQuestions}/>
      {active === 'facades' ? <div className={styles.admin__actions}>
        <h4 className={styles.admin__text}>Хотите добавить новый объект?</h4>
        <AddButton onClick={() => setIsCreateWindowOpened(true)}/>
      </div>
      : <div className={styles.admin__actions}>
        <h4 className={styles.admin__text}>Хотите добавить новый вопрос?</h4>
        <AddButton onClick={() => setIsCreateQuestionModalOpen(true)}/>
      </div>
      }
      
      { active === 'facades' ? <div className={styles.admin__facades}>
        <CardList isAdminPage items={facadesItems} onButtonClick={changeImportantItem}/>
      </div>
      : <div>
        <FaqBlock isAdminPage questions={questions} onEditButtonClick={onEditButtonClick} onDeleteButtonClick={onDeleteButtonClick}></FaqBlock>
      </div>  
      }
      <ModalWindow active={isCreateWindowOpened} handleBackdropClick={() => setIsCreateWindowOpened(false)}>
        <div>
          {<FacadeForm onSubmit={postFacade} title='' description='' fileTitle=''/>}
        </div>
      </ModalWindow>

      <ModalWindow active={isCreateQuestionModalOpen} handleBackdropClick={() => setIsCreateQuestionModalOpen(false)}>
        <QuestionForm onSubmit={postQuestion}/>
      </ModalWindow>

      <ModalWindow active={isEditQuestionModalOpen} handleBackdropClick={() => setIsEditQuestionModalOpen(false)}>
        {currentQuestion && <QuestionForm key={currentQuestion.questions_id} question={currentQuestion.questions_title} answer={currentQuestion.questions_text} onSubmit={putQuestion}/>}
      </ModalWindow>

      <ModalWindow active={isDeleteWindowOpen} handleBackdropClick={() => setIsDeleteWindowOpen(false)}>
        <div className={styles.modal__delete}>
            <h4 className={styles.modal__title}>Вы уверены что хотите удалить этот вопрос?</h4>
            <div className={styles.modal__btns}>
                <Button className={styles.modal__btn} onClick={() => deleteQuestion()}>Да</Button>
                <Button className={styles.modal__btn} onClick={() => setIsDeleteWindowOpen(false)}>Нет</Button>
            </div>
        </div>
      </ModalWindow>
    </div>
  )
}

export default AdminPage