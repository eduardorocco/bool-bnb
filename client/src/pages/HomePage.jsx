import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import CardProperty from '../components/Card'

export default function HomePage() {

    const { API_URL, properties, setProperties } = useContext(GlobalContext)

    function fetchProperties() {
        axios.get(`${API_URL}properties`)
            .then(res => {
                setProperties(res.data)
            })
            .catch(err => {
                console.err(err);
            })
    }


    useEffect(() => {
        fetchProperties()
    }, [])

    return (
        <div className="container">
            <div className="row">
                {properties.map(property => {
                    return (
                        <CardProperty key={property.id} property={property} />
                    )

                })}
            </div>
        </div>
    )
}