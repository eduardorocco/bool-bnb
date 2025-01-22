import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router'
import GlobalContext from "./context/GlobalContext"
import HomePage from './pages/HomePage'
import InsertPropertyPage from './pages/InsertPropertyPage'
import PropertyDetails from './pages/PropertyDetails'
import SearchPage from './pages/SearchPage'
import DefaulLayout from "./layouts/DefaulLayout"
import axios from "axios"
import { useState } from "react"

const API_URL = 'http://localhost:3000/'

function App() {

  const [properties, setProperties] = useState([])
  const [property, setProperty] = useState({})

  function addHeart(id) {
    axios.patch(`${API_URL}properties/${id}/heart`)
      .then(res => {
        axios.get(`${API_URL}properties`)
        console.log(res.data);
        //condizione
        fetchProperties()
        fetchProperty(id)
      })
  }

  function fetchProperties() {
    axios.get(`${API_URL}properties`)
      .then(res => {
        setProperties(res.data)
      })
      .catch(err => {
        console.err(err);
      })
  }

     function fetchProperty(id) {
          axios.get(`${API_URL}properties/${id}`)
              .then(res => {
                  setProperty(res.data)
              })
              .catch(err => {
                  console.err(err);
              })
      }

  return (
    <GlobalContext.Provider value={{ API_URL, addHeart, properties, setProperties, property, setProperty }}>
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
