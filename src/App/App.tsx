import React, { useState } from "react"
import styles from "./App.module.scss"
import Button from "components/Button"
import Header from "components/Header"
import Question from "components/Question"
import ModalWindow from "components/ModalWindow"
import OrderForm from "components/OrderForm"
import DetailedItem from "components/DetailedItem"
import ArrowLeftIcon from "components/Icons/ArrowLeftIcon"
import ArrowRightIcon from "components/Icons/ArrowRightIcon/ArrowRightIcon"
import { Navigate, Route, Routes } from "react-router-dom"
import MainPage from "pages/MainPage"

const App = () => {
  return (
    <>
      <Header />
      <MainPage />
    </>
  )
}

export default App
