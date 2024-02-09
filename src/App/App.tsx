import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "components/Header"
import AdminPage from "pages/AdminPage"
import MainPage from "pages/MainPage"
import Footer from "components/Footer"
import PortfolioPage from "pages/PortfolioPage"
import SelectedFacadePage from "pages/SelectedFacadePage"
import LoginPage from "pages/LoginPage"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="app">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/administration" element={<AdminPage />}></Route>
          <Route path="/facades">
            <Route path=":id" element={<SelectedFacadePage />} />
          </Route>
          <Route path="/frolfasd" element={<MainPage />}></Route>
          <Route path="/portfolio" element={<PortfolioPage />}></Route>
          <Route path="/admin" element={<LoginPage />}></Route>
          <Route path="*" element={<Navigate to="/frolfasd" replace />} />
        </Routes>
        <Footer />
      </HashRouter>
      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </div>
  )
}

export default App
