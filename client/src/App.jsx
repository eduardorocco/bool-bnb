import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router'
import GlobalContext from "./context/GlobalContext"
import HomePage from './pages/HomePage'
import InsertPropertyPage from './pages/InsertPropertyPage'
import PropertyDetails from './pages/PropertyDetails'
import SearchPage from './pages/SearchPage'
import DefaulLayout from "./layouts/DefaulLayout"
function App() {


  return (
    <GlobalContext.Provider>
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
