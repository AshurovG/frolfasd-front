import React from 'react'
import styles from './Navigation.module.scss'

export type MultiDropdownProps = {
    onFacadesClick: () => void;
    onImportantFacades?: () => void;
    onQuestionsClick?: () => void;
};

const Navigation: React.FC<MultiDropdownProps> = ({onFacadesClick}) => {
  return (
    <div  className={styles.nav}>
        <div onClick={() => onFacadesClick()} className={styles['nav__item']}>Вентилируемые фасады</div>
        <div className={styles['nav__item']}>Вентилируемые фасады на главной странице</div>
        <div className={styles['nav__item']}>Часто задаваемые вопросы</div>
    </div>
  )
}

export default Navigation