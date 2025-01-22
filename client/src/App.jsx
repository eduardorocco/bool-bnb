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

  const [search, setSearch] = useState('')

  return (
    <GlobalContext.Provider value={{ API_URL, search, setSearch}}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaulLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/properties" element={<SearchPage />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/owners/:id" element={<InsertPropertyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App
