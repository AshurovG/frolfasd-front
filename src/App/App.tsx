import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "components/Header"
import AdminPage from "pages/AdminPage"
import MainPage from "pages/MainPage"

const App = () => {
  return (
    <div className="app">
      <Header />
      <HashRouter>
        <Routes>
          <Route path="/administration" element={<AdminPage />}></Route>
        </Routes>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
