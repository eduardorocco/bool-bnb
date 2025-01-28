import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import { useParams } from 'react-router'

export default function PropertyDetails() {

    const { id } = useParams()

    const { API_URL } = useContext(GlobalContext)
    const [property, setProperty] = useState({})

    function fetchProperty() {
        axios.get(`${API_URL}properties/${id}`)
            .then(res => {
                setProperty(res.data)
                console.log(id);
            })
            .catch(err => {
                console.err(err);
            })

    }

    function addHeart(id) {
        axios.patch(`${API_URL}properties/${id}/heart`)
            .then(res => {
                fetchProperty()
            })
    }


    useEffect(() => {
        fetchProperty()
    }, [id])

    const { title, description, room, toilet, square_meters, address, type, bed, image, heart, avg_vote, reviews } = property
    console.log(reviews)

    return (
        <>
            {property &&
                <div className='container'>
                    < div className='row' >
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


                        {reviews ?
                            reviews.map(review => {
                                return (
                                    <ul key={review.id}>
                                        <li>
                                            {review.title}
                                        </li>
                                        <li>
                                            {review.user_id}
                                        </li>
                                        <li>
                                            {review.days_of_stays}
                                        </li>
                                        <li>
                                            {review.text}
                                        </li>
                                        <li>
                                            {review.days_of_stays}
                                        </li>
                                    </ul>


                                )
                            })
                            :
                            <span>
                                Non ci sono recensioni
                            </span>
                        }


                    </div >
                </div >}
        </>
    )
}