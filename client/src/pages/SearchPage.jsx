import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import CardProperty from '../components/Card'
import SearchBar from '../components/SearchBar'

export default function SearchPage() {

    const { API_URL, search, setUser } = useContext(GlobalContext)
    const [properties, setProperties] = useState([])

    function fetchProperties() {
        search ?
            axios.get(`${API_URL}properties`, {
                params: {
                    city: search.city,
                    type: search.type,
                    room: search.room,
                    bed: search.bed,
                    toilet: search.toilet,
                    limit: ''
                }
            })
                .then(res => {
                    setProperties(res.data)
                })
                .catch(err => {
                    console.err(err);
                })
            :
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
    }, [search])

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <div className="container-fluid">
            <SearchBar />
            <div className="row row-gap-4">
                {properties.map(property => {
                    return (
                        <CardProperty key={property.id} property={property} callback={() => (addHeart(property.id))} />
                    )

                })}
            </div>
        </div>
    )
}