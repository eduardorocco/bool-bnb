import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router'
import GlobalContext from "../context/GlobalContext"
import CardProperty from '../components/Card'
import SearchBar from '../components/SearchBar'
import style from '../assets/modules/SearchBarPages.module.css'
import LoginForm from '../components/LoginForm'
import { useParams } from 'react-router'

export default function SearchPage() {

    // const { room, type, bed, toilet, city } = req.query
    const location = useLocation()

    const { API_URL, search, setUser } = useContext(GlobalContext)
    // const filterOn = Object.keys(search).length !== 0;
    const [properties, setProperties] = useState([])

    let city, type, room, bed, toilet = '';

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        city = queryParams.get('city');
        type = queryParams.get('type');
        room = queryParams.get('room');
        bed = queryParams.get('bed');
        toilet = queryParams.get('toilet');

        // Puoi anche usare questi parametri per fare una richiesta API o altro
    }, [location.search]);

    function fetchProperties() {

        search ?
            axios.get(`${API_URL}properties`, {
                params: {
                    city: city,
                    type: type,
                    room: room,
                    bed: bed,
                    toilet: toilet,
                    limit: ''
                }
            })
                .then(res => {
                    setProperties(res.data)

                })
                .catch(err => {
                    console.error(err);
                })
            :
            axios.get(`${API_URL}properties`,)
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

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }


    useEffect(() => {
        fetchProperties()
    }, [location.search])

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <div className="container-fluid">
            <SearchBar />
            {search.city || search.room || search.toilet || search.bed || search.type ? <strong className={style.searched_el}>
                {properties.length === 1 ? 'Trovato' : 'Trovati'}
                &nbsp;
                {properties.length}
                &nbsp;
                {properties.length === 1 ? 'alloggio' : 'alloggi'}
                {search.city && <span> per la città di {capitalizeFirstLetter(search.city)}</span>}
                {search.room && <span> con almeno {search.room} {search.room == 1 ? 'stanza' : 'stanze'}</span>}
                {search.bed && <span> con almeno {search.bed} {search.bed == 1 ? 'letto' : 'letti'}</span>}
                {search.toilet && <span> con almeno {search.toilet} {search.toilet == 1 ? 'bagno' : 'bagni'}</span>}
                {search.type && <span> di tipo {capitalizeFirstLetter(search.type)}</span>}
            </strong> :
                ''}
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