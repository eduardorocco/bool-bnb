import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import CardProperty from '../components/Card'
import SearchBar from '../components/SearchBar'


export default function HomePage() {

    const { API_URL } = useContext(GlobalContext)
    const [properties, setProperties] = useState([])

    function fetchProperties() {
        axios.get(`${API_URL}properties`)
            .then(res => {
                setProperties(res.data)
            })
            .catch(err => {
                console.err(err);
            })
    }

    
  function addHeart(id) {
    axios.patch(`${API_URL}properties/${id}/heart`)
      .then(res => {
        fetchProperties()
      })
  }

    useEffect(() => {
        fetchProperties()
    }, [])

    return (
        <div className="container">
            <SearchBar/>
            <div className="row">
                {properties.map(property => {
                    return (
                        <CardProperty key={property.id} property={property} callback={addHeart} />
                    )

                })}
            </div>
        </div>
    )
}