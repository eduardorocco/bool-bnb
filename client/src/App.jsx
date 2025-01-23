import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router'
import GlobalContext from "./context/GlobalContext"
import HomePage from './pages/HomePage'
import InsertPropertyPage from './pages/InsertPropertyPage'
import PropertyDetails from './pages/PropertyDetails'
import SearchPage from './pages/SearchPage'
import DefaulLayout from "./layouts/DefaulLayout"
import { useState } from "react"

const API_URL = 'http://localhost:3000/'


function App() {

  const [search, setSearch] = useState({})
  const [city, setCity] = useState({ address:'', type:'', room:'', bed:'', toilet:''})
  const [overlayLogin, setOverlayLogin] = useState(false)


  return (
    <GlobalContext.Provider value={{ API_URL, search, setSearch, city, setCity, overlayLogin, setOverlayLogin}}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaulLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/properties" >
              <Route index element={<SearchPage />} />
              <Route path=":id" element={<PropertyDetails />} />
            </Route>
            <Route path="/users/:id" element={<InsertPropertyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App
