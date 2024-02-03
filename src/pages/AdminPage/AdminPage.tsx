import React from 'react'
import styles from './AdminPage.module.scss'

const AdminPage = () => {
  React.useEffect(() => {
    console.log('render')
  }, [])

  return (
    <div className={styles.admin}>
      AdminPage
    </div>
  )
}

export default AdminPage