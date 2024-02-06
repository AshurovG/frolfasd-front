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
import ModalWindow from 'components/ModalWindow'
import FacadeForm from 'components/FacadeForm'

const SelectedFacadePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [facade, setFacade] = useState<ReceivedFacadeData>()
    const [isLoading, setIsLoading] = useState(true)
    const [isEditFacadeWindowOpened, setIsEditFacadeWindowOpened] = useState(false)
    const [isDeleteFacadeWindowOpened, setIsDeleteFacadeWindowOpened] = useState(false)

    const getFacade = async () => {
        setIsLoading(true)
        try {
            const response = await axios(`https://frolfasd.ru/api/exterior_design/${id}`)
            setFacade(response.data)
            // console.log(response.data)
        } catch(error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const putFacade = async (title: string, description: string, file: File | null) => {
        console.log('file', file)
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('desc', description);
            if (file) {
                formData.append('file', file);
                formData.append('isFileChanged', String(1));
                if (facade) {
                    formData.append('imgUrl', facade?.exterior_design_url);
                }
            }
    
            await axios(`https://frolfasd.ru/api/exterior_design/${id}`, {
                method: 'PUT',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setIsEditFacadeWindowOpened(false)
            getFacade()
        } catch (error) {
            throw error
        }
    };

    const deleteFacade = async () => {
        try {
            await axios(`https://frolfasd.ru/api/exterior_design/${id}`,{
                method: 'DELETE'
            })
            setIsDeleteFacadeWindowOpened(false)
            navigate('/administration')
        } catch(error) {
            throw error
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
                            {/* <AddButton onClick={() => setIsEditFacadeWindowOpened(true)}/> */}
                            <EditIcon onClick={() => setIsEditFacadeWindowOpened(true)}/>
                            <BasketIcon onClick={() => setIsDeleteFacadeWindowOpened(true)}/>
                        </div>
                        <h4 className={styles.selected__subtitle}>Описание:</h4>
                        <p className={styles.selected__text}>{facade?.exterior_design_description}</p>
                    </div>
                </div>
                <h1 className={styles.selected__title}>Галлерея</h1>
                {facade && <DetailedItem isAdminPage facade={facade}/>}
            </div>}
            <ModalWindow active={isEditFacadeWindowOpened} handleBackdropClick={() => setIsEditFacadeWindowOpened(false)}>
                <div>
                    {isEditFacadeWindowOpened && <FacadeForm onSubmit={putFacade} title={facade?.exterior_design_title} description={facade?.exterior_design_description} fileTitle=''/>}
                </div>
            </ModalWindow>

            <ModalWindow active={isDeleteFacadeWindowOpened} handleBackdropClick={() => setIsDeleteFacadeWindowOpened(false)}>
                <div className={styles.modal__delete}>
                    <h4 className={styles.selected__subtitle}>Вы уверены что хотите удалить этот объект?</h4>
                    <div className={styles.modal__btns}>
                        <Button className={styles.modal__btn} onClick={() => deleteFacade()}>Да</Button>
                        <Button className={styles.modal__btn} onClick={() => setIsDeleteFacadeWindowOpened(false)}>Нет</Button>
                    </div>
                </div>
            </ModalWindow>
            
        </div>
    )
}

export default SelectedFacadePage