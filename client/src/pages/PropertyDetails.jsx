import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import { useParams } from 'react-router'

export default function HomePage() {
    const { id } = useParams()
    
    const { API_URL, property, setProperty, addHeart } = useContext(GlobalContext)

    function fetchProperty() {
        axios.get(`${API_URL}properties/${id}`)
            .then(res => {
                setProperty(res.data)
            })
            .catch(err => {
                console.err(err);
            })
            
    }


    useEffect(() => {
        fetchProperty()
    }, [id])

    const { title, description, room, toilet, square_meters, address, type, bed, image, heart, avg_vote } = property

    return (
        <div className='container'>
            <div className='row'>
                <ul>
                    <li>{title}</li>
                    <li>{description}</li>
                    <li>{room}</li>
                    <li>{toilet}</li>
                    <li>{square_meters}</li>
                    <li>{address}</li>
                    <li>{type}</li>
                    <li>{bed}</li>
                    <li>
                        <button onClick={() => addHeart(id)} className='btn btn-danger'> {heart} </button>
                    </li>
                    <li>{avg_vote}</li>
                </ul>
            </div>
        </div>
    )
}