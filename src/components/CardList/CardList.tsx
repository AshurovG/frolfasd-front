import React, { useState } from "react"
import styles from "./CardList.module.scss"
import { ReceivedFacadeData } from "../../../types"
import Card from "components/Card"
import axios from "axios"
import { Response } from "../../../types"
import ModalWindow from "components/ModalWindow"
import DetailedItem from "components/DetailedItem"
import ArrowDownIcon from "components/Icons/ArrowDownIcon"
import Loader from "components/Loader"

export type CardListProps = {
  items: ReceivedFacadeData[]
  onCardClick?: (a: number) => void
  onButtonClick?: (item: ReceivedFacadeData) => void
  isAdminPage?: boolean
}

const CardList: React.FC<CardListProps> = ({ items, isAdminPage, onButtonClick }) => {
  const [isModalFormOpened, setIsModalFormOpened] = useState(false)

  const [isItemLoading, setIsItemLoading] = useState<boolean>(true)
  const [selectedItemData, setSelectedItemData] = useState<ReceivedFacadeData>({
    exterior_design_id: 0,
    exterior_design_title: "",
    exterior_design_url: "",
    exterior_design_description: "",
    is_important: false,
    items: [],
  })

  const getItemData = async (id: number) => {
    try {
      setIsItemLoading(true)
      const response: Response = await axios(
        `https://frolfasd.ru/api/exterior_design/${id}`,
        {
          method: "GET",
        }
      )
      setSelectedItemData(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsItemLoading(false)
    }
  }

  // const changeImportantItem = async (item: ReceivedFacadeData) => {
  //   try {
  //     await axios(
  //       `https://frolfasd.ru/api/exterior_design_important/${item.exterior_design_id}`,
  //       {
  //         method: "PUT",
  //         data: {
  //           isImportant: !item.is_important
  //         }
  //       }
  //     )
  //   } catch {

  //   }
  // }

  const onCardClick = (id: number) => {
    if (isAdminPage) {
      console.log('admin!!!')
    } else {
      setIsModalFormOpened(true)
      getItemData(id)
    }
  }

  return (
    <div className={styles.list}>
      {items.map((item: ReceivedFacadeData) => (
        <Card
          isAdminPage={isAdminPage}
          onCardClick={() => onCardClick(item.exterior_design_id)}
          {...item}
          key={item.exterior_design_id}
          onButtonClick={isAdminPage ? (event) => {event.stopPropagation(); onButtonClick && onButtonClick(item)} : () => {}}
        ></Card>
      ))}
      <ModalWindow
        handleBackdropClick={() => {
          setIsItemLoading(true), setIsModalFormOpened(false)
        }}
        active={isModalFormOpened}
      >
        {isItemLoading ? <Loader /> : <DetailedItem {...selectedItemData} />}
      </ModalWindow>
    </div>
  )
}

export default CardList
