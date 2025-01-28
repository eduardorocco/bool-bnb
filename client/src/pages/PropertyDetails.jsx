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
            {property &&
                <div className='container'>
                    < div className='row' >
                        <h3 className={style.title}>{title}</h3>
                        <div className={style.container}>

                            <div className={`${style.img_container} col-8`}>
                                <div>
                                    <button className={style.heart} onClick={() => addHeart(id)}>
                                        <img className={style.icon_heart} src={heartIcon} />
                                        <div>
                                            {heart}
                                        </div>
                                    </button>
                                </div>

                                <p className={style.vote}>
                                    {avg_vote ? parseFloat(avg_vote).toFixed(1) : '-'}
                                </p>

                                <img className={style.img} src={`${API_URL}/img/${image}`} />
                            </div>

                            <div className={`${style.card} col-4`}>

                                <div className={style.card_body}>
                                    <div className={style.address}>
                                        <span>{address}, <strong>{city}</strong>, ({province}) </span>
                                    </div>

                                    <div className='row'>
                                        <div className={`${style.details} col-4`}>
                                            <div className={style.icon_container}>
                                                <span className={style.icon}> <FontAwesomeIcon icon={faHome} /> </span>
                                            </div>
                                            <span className={style.type}>{type}</span>
                                        </div>

                                        <div className={`${style.details} col-4`}>
                                            <div className={style.icon_container}>
                                                <span className={style.icon}> m&#178;</span>
                                            </div>
                                            <span className={style.text}>{square_meter}</span>
                                        </div>

                                        <div className={`${style.details} col-4`}>
                                            <div className={style.icon_container}>
                                                <span className={style.icon}> <FontAwesomeIcon icon={faBed} /> </span>
                                            </div>
                                            <span className={style.text}>{bed}</span>
                                        </div>

                                        <div className={`${style.details} col-4`}>
                                            <div className={style.icon_container}>
                                                <span className={style.icon}> <FontAwesomeIcon icon={faSquare} /> </span>
                                            </div>
                                            <span className={style.text}>{room}</span>
                                        </div>


                                        <div className={`${style.details} col-4`}>
                                            <div className={style.icon_container}>
                                                <span className={style.icon}> <FontAwesomeIcon icon={faToilet} /> </span>
                                            </div>
                                            <span className={style.text}>{toilet}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div>
                                    {isLogin &&
                                        <form onSubmit={onSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">Title</label>
                                                <input type="text" onChange={handleSearch} name='title' value={formData.title} className="form-control" placeholder="title" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">text</label>
                                                <textarea className="form-control" onChange={handleSearch} name='text' value={formData.text} rows="3"></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">giorni</label>
                                                <input type="number" name='days_of_stays' onChange={handleSearch} value={formData.days_of_stays} min='1' />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">voto</label>
                                                <input type="number" min='1' name='vote' onChange={handleSearch} value={formData.vote} max='10' />
                                            </div>
                                            <input type="submit" />


                                        </form>}

                                    <div>
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


                    </div >
                </div >}
        </>
    )
}