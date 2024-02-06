import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './SelectedFacadePage.module.scss'
import { ReceivedFacadeData } from '../../../types'
import AddButton from 'components/Icons/AddButton'
import BasketIcon from 'components/Icons/BasketIcon'
import EditIcon from 'components/Icons/EditIcon'
import DetailedItem from 'components/DetailedItem'
import Button from 'components/Button'

const SelectedFacadePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [facade, setFacade] = useState<ReceivedFacadeData>()
    const [isLoading, setIsLoading] = useState(true)

    const getFacade = async () => {
        setIsLoading(true)
        try {
            const response = await axios(`https://frolfasd.ru/api/exterior_design/${id}`)
            setFacade(response.data)
            console.log(response.data)
        } catch(error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        getFacade()
    }, [])

    return (
        <div className={styles.selected}>
            {
            isLoading ? <p>djfkldjfkljsklfdjlks</p>
            : <div>
                <div className={styles['selected__title-block']}>
                    <h1 className={styles.selected__title}>{facade?.exterior_design_title}</h1>
                    <Button onClick={() => {navigate('/administration')}}>Назад</Button>
                </div>
                <div className={styles.selected__info}>
                    <img className={styles.selected__image} src={facade?.exterior_design_url} alt="image" />
                    <div className={styles.selected__options}>
                        <div className={styles.selected__actions}>
                            <AddButton onClick={()=>{}}></AddButton>
                            <EditIcon></EditIcon>
                            <BasketIcon></BasketIcon>
                        </div>
                        <h4>Описание:</h4>
                        <p>{facade?.exterior_design_description}</p>
                    </div>
                </div>
                <h1 className={styles.selected__title}>Галлерея</h1>
                {facade && <DetailedItem isAdminPage facade={facade}/>}
            </div>}
            
        </div>
    )
}

export default SelectedFacadePage