import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import CardProperty from '../components/Card'
import SearchBar from '../components/SearchBar'
import LoginForm from '../components/LoginForm'
import style from '../assets/modules/HomePage.module.css'
import house from '../assets/houses/house.jpg'


export default function HomePage() {

    const { API_URL } = useContext(GlobalContext)
    const [properties, setProperties] = useState([])

    function fetchProperties() {
        axios.get(`${API_URL}properties`)
            .then(res => {
                setProperties(res.data)
            })
            .catch(err => {
                console.error(err);
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
        <>
            <div className={style.jumbo}>
                <div className={style.searchbar}>
                <SearchBar />
                </div>
                
                <figure  className={style.image_container}>
                    <img className={style.image} src={house} alt="" />
                </figure>
            </div>
            <div className="container">
                <div className="row">
                    {properties.map(property => {
                        return (
                            <CardProperty key={property.id} property={property} callback={addHeart} />
                        )

                    })}
                </div>
            </div>
        </>

    )
}