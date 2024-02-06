import React from 'react'
import styles from './AdminPage.module.scss'
import Navigation from 'components/Navigation'
import axios from 'axios'

const AdminPage = () => {
  React.useEffect(() => {
    console.log('render')
  }, [])

  const getFacades = async () => {
    try {
      const response = await axios('https://frolfasd.ru/api/exterior_design/')
      console.log(response)
    } catch {

    }
  }

  return (
    <div className={styles.admin}>
      <h1 className={styles.admin__title}>Управление сайтом</h1>
      <h4 className={styles.admin__subtitle}>Здесь вы можете редактировать данные сайта</h4>
      <Navigation onFacadesClick={getFacades}/>
    </div>
  )
}

export default AdminPage