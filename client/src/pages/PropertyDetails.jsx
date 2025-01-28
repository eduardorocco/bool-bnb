import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import { useParams } from 'react-router'
import style from '../assets/modules/PropertyDetails.module.css'
import heartIcon from '../assets/icon-gallery/heart-salmon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faToilet } from '@fortawesome/free-solid-svg-icons'
import CardDetail from '../components/CardDetail'


export default function PropertyDetails() {


    const { id } = useParams()

    const { API_URL, isLogin, user } = useContext(GlobalContext)

    const initialFormData = {
        title: '',
        text: '',
        days_of_stays: 0,
        vote: 0
    }

    const [property, setProperty] = useState({})
    const [formData, setFormData] = useState(initialFormData)



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
    function handleSearch(e) {
        const el = e.target
        setFormData(
            {
                ...formData, [el.name]: el.value, user_id: user.id
            })
        console.log(formData)
    }

    function onSubmit(e) {
        e.preventDefault()

        axios.post(`${API_URL}properties/${id}/reviews`, formData)
            .then(res => {
                console.log(res);
                setFormData(initialFormData)
                fetchProperty()
            })
            .catch(err => {
                console.error(err);
            })
        console.log(formData)
    }

    useEffect(() => {
        fetchProperty()
    }, [id])

    const { title, description, room, toilet, square_meter, address, city, province, type, bed, image, heart, avg_vote, reviews } = property

    return (
        <>

            {property && <CardDetail property={property} addHeart={addHeart} />}
            <div className="container">
                <div className="row">

                    <div>
                        <p>
                            {description}
                        </p>
                    </div>
                    <div className="col-4">
                        {isLogin &&
                            <>
                                <h5>Lascia una recensione</h5>
                                <div className={style.card_form_review}>

                                    <form onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <input type="text" onChange={handleSearch} name='title' value={formData.title} className="form-control" placeholder="Titolo della recensione" />
                                        </div>
                                        <div className="mb-3">
                                            <textarea className="form-control" onChange={handleSearch} name='text' value={formData.text} placeholder="Cosa ne pensi?" rows="3"></textarea>
                                        </div>
                                        <div className={style.input_container}>
                                            <div className={style.form_review_flex}>
                                                <label className="form-label">Durata viaggio</label>
                                                <input type="number" name='days_of_stays' onChange={handleSearch} value={formData.days_of_stays} min='1' />
                                            </div>
                                            <div className={style.form_review_flex}>
                                                <label className="form-label">voto</label>
                                                <input type="number" min='1' name='vote' onChange={handleSearch} value={formData.vote} max='10' />
                                            </div>
                                        </div>
                                        <div className={style.btn_container}>
                                            <input className={style.button} type="submit" />
                                        </div>
                                    </form>
                                </div>

                            </>
                        }

                    </div>

                    <div className="col-8">
                        <div>
                            {reviews ?
                                reviews.map(review => {
                                    return (
                                        <ul key={review.id}>
                                            <li>
                                                {review.title}
                                            </li>
                                            <li>
                                                {review.username}
                                            </li>
                                            <li>
                                                {review.vote}
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
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}

        </>
    )
}