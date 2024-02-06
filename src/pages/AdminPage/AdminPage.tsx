import React, { useState } from 'react'
import styles from './AdminPage.module.scss'
import Navigation from 'components/Navigation'
import CardList from 'components/CardList'
import axios from 'axios'
import { ReceivedFacadeData, ReceivedQuestionsData } from "../../../types"

const AdminPage = () => {
  const [facadesItems, setFacadesItems] = useState<ReceivedFacadeData[]>([])
  const [questions, setQuestions] = useState<ReceivedQuestionsData[]>([])
  const [active, setActive] = useState<'facades' | 'questions'>('facades')

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
  
  React.useEffect(() => {
    getFacades();
  }, [])

  return (
    <div className={styles.admin}>
      <h1 className={styles.admin__title}>Управление сайтом</h1>
      <h4 className={styles.admin__subtitle}>Здесь вы можете редактировать данные сайта</h4>
      <Navigation active={active} onFacadesClick={getFacades} onQuestionsClick={getQuestions}/>
      { active === 'facades' && <div className={styles.admin__facades}>
        <CardList isAdminPage items={facadesItems} onButtonClick={changeImportantItem}/>
      </div>
      }
    </div>
  )
}

export default AdminPage