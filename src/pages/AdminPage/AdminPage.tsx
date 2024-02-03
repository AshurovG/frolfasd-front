import React from 'react'
import styles from './AdminPage.module.scss'
import Navigation from 'components/Navigation'

const AdminPage = () => {
  React.useEffect(() => {
    console.log('render')
  }, [])

  return (
    <div className={styles.admin}>
      <h1 className={styles.admin__title}>Управление сайтом</h1>
      <h4 className={styles.admin__subtitle}>Здесь вы можете редактировать данные сайта</h4>
      <Navigation/>
    </div>
  )
}

export default AdminPage