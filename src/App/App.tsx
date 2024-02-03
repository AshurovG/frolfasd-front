import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from "components/Header"
import AdminPage from 'pages/AdminPage'


const App = () => {

  return (
    <div className="app">
      <Header />
      <HashRouter>
            <Routes>
                <Route path='/administration' element={<AdminPage/>}></Route>
            </Routes>
        </HashRouter>
    </div>
  )
}

export default App
