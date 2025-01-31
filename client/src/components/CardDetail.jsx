import style from '../assets/modules/PropertyDetails.module.css'
import heartIcon from '../assets/icon-gallery/heart-salmon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faToilet } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import { useParams } from 'react-router'


export default function CardDetail({ property, addHeart }) {
    const { title, room, toilet, square_meter, address, city, province, type, bed, image, heart, avg_vote, reviews } = property
    const { API_URL } = useContext(GlobalContext)
    const { id } = useParams()
    return (
        <>
            <div className="container">
                <h3 className={style.title}>{title}</h3>
            </div>
            <div className='container'>

                < div className='row' >

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
                                    <div className={`${style.details}`}>
                                        <div className={style.icon_container}>
                                            <span className={style.icon}> <FontAwesomeIcon icon={faHome} /> </span>
                                        </div>
                                        <span className={style.type}>{type}</span>
                                    </div>

                                    <div className={`${style.details} col-6`}>
                                        <div className={style.icon_container}>
                                            <span className={style.icon}> m&#178;</span>
                                        </div>
                                        <span className={style.text}>{square_meter}</span>
                                    </div>

                                    <div className={`${style.details} col-6`}>
                                        <div className={style.icon_container}>
                                            <span className={style.icon}> <FontAwesomeIcon icon={faBed} /> </span>
                                        </div>
                                        <span className={style.text}>{bed}</span>
                                    </div>

                                    <div className={`${style.details} col-6`}>
                                        <div className={style.icon_container}>
                                            <span className={style.icon}> <FontAwesomeIcon icon={faSquare} /> </span>
                                        </div>
                                        <span className={style.text}>{room}</span>
                                    </div>


                                    <div className={`${style.details} col-6`}>
                                        <div className={style.icon_container}>
                                            <span className={style.icon}> <FontAwesomeIcon icon={faToilet} /> </span>
                                        </div>
                                        <span className={style.text}>{toilet}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}