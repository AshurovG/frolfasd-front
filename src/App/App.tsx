import React, { useState } from "react"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useIsAuth, setIsAuthAction } from "slices/AuthSlice"
import axios from "axios"
import styles from './App.module.scss'
import Header from "components/Header"
import AdminPage from "pages/AdminPage"
import MainPage from "pages/MainPage"
import Footer from "components/Footer"
import PortfolioPage from "pages/PortfolioPage"
import SelectedFacadePage from "pages/SelectedFacadePage"
import LoginPage from "pages/LoginPage"
import Loader from "components/Loader"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch()
  const isAuth = useIsAuth()
  const token = localStorage.getItem('token');
  const [isCheckLoading, setIsCheckLoading] = useState(true)
  const getIsAuth = async () => {
    setIsCheckLoading(true)
    try {
      await axios('https://frolfasd.ru/api/check', {
        method: 'POST',
        data: {
          token
        }
      })
      dispatch(setIsAuthAction(true))
      setIsCheckLoading(false)
    } catch (error) {
      setIsCheckLoading(false)
      throw error
    }
  }

  React.useEffect(() => {
    if (token) {
      getIsAuth()
    } else {
      setIsCheckLoading(false)
    }
  }, [])

  return (
    <div className="app">
      <HashRouter>
      {isCheckLoading ? 
          <Loader className={styles.loader}/>
        
        :
      <>
        <Header />
        
        
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            {isAuth &&
            <>
              <Route path="/administration" element={<AdminPage />}></Route>
              <Route path="/facades">
                <Route path=":id" element={<SelectedFacadePage />} />
              </Route>
            </>}
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/portfolio" element={<PortfolioPage />}></Route>
            {!isAuth && <Route path="/login" element={<LoginPage />}></Route>}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </>}
      </HashRouter>
      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </div>
  )
}

export default App
