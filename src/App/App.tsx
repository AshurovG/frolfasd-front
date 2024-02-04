import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "components/Header"
import AdminPage from "pages/AdminPage"
import MainPage from "pages/MainPage"
import Footer from "components/Footer"
import PortfolioPage from "pages/PortfolioPage"

const App = () => {
  return (
    <div className="app">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/administration" element={<AdminPage />}></Route>
          <Route path="/frolfasd" element={<MainPage />}></Route>
          <Route path="/portfolio" element={<PortfolioPage />}></Route>
          <Route path="*" element={<Navigate to="/frolfasd" replace />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  )
}

export default App
