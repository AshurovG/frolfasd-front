import React, { useState } from 'react'
import styles from './AdminPage.module.scss'
import Navigation from 'components/Navigation'
import CardList from 'components/CardList'
import axios from 'axios'
import { ReceivedFacadeData, ReceivedQuestionsData } from "../../../types"
import AddButton from 'components/Icons/AddButton'
import FacadeForm from 'components/FacadeForm'
import ModalWindow from 'components/ModalWindow'

const AdminPage = () => {
  const [facadesItems, setFacadesItems] = useState<ReceivedFacadeData[]>([])
  const [questions, setQuestions] = useState<ReceivedQuestionsData[]>([])
  const [active, setActive] = useState<'facades' | 'questions'>('facades')
  const [isCreateWindowOpened, setIsCreateWindowOpened] = useState(false)

  React.useEffect(() => {
    console.log('render')
  }, [])

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
      getFacades()
    } catch(error) {
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

      getFacades()
      setIsCreateWindowOpened(false)
      
    } catch(error) {
       throw error
    }
  }
  
  React.useEffect(() => {
    getFacades();
  }, [])

  return (
    <div className={styles.admin}>
      <h1 className={styles.admin__title}>Управление сайтом</h1>
      <h4 className={styles.admin__subtitle}>Здесь вы можете редактировать данные сайта</h4>
      <Navigation active={active} onFacadesClick={getFacades} onQuestionsClick={getQuestions}/>
      <div className={styles.admin__actions}>
        <h4 className={styles.admin__text}>Хотите добавить новый объект?</h4>
        <AddButton onClick={() => setIsCreateWindowOpened(true)}/>
      </div>
      
      { active === 'facades' && <div className={styles.admin__facades}>
        <CardList isAdminPage items={facadesItems} onButtonClick={changeImportantItem}/>
      </div>
      }
      <ModalWindow active={isCreateWindowOpened} handleBackdropClick={() => setIsCreateWindowOpened(false)}>
        <div>
          {<FacadeForm onSubmit={postFacade} title='' description='' fileTitle=''/>}
        </div>
      </ModalWindow>
      
    </div>
  )
}

export default AdminPage