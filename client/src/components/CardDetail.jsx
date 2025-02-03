import style from '../assets/modules/PropertyDetails.module.css'
import heartIcon from '../assets/icon-gallery/heart-salmon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faSprayCanSparkles, faTemperatureHigh, faCartFlatbed, faDumbbell, faTree, faSquareParking } from '@fortawesome/free-solid-svg-icons'
import { faToilet, faPersonSwimming, faTv, faDog, faSoap, faSnowflake, faUtensils, faHandsHoldingChild } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import GlobalContext from "../context/GlobalContext"



export default function CardDetail({ property, addHeart }) {
    const { title, room, toilet, square_meter, address, city, province,
        type, bed, image, heart, avg_vote, swim, tv, animals,
        washing_machine, air_conditioning, essential, cleaner, heating,
        courtyard, parking, high_chair, gym, price, free_canc, id } = property
    const { API_URL } = useContext(GlobalContext)

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
                            <hr />
                            <div className={style.secondary_icon_container}>
                                {swim ? <div className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faPersonSwimming} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faPersonSwimming} />
                                    </div>}

                                    {tv ? <div className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faTv} />
                                </div> :
                                    <div  className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faTv}/>
                                    </div>}

                                    {animals ? <div className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faDog} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faDog}/>
                                    </div>}

                                    {washing_machine ? <div className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faSoap} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faSoap}/>
                                    </div>}

                                    {air_conditioning ? <div  className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faSnowflake} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faSnowflake}/>
                                    </div>}

                                    {essential ? <div className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faUtensils} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faUtensils}/>
                                    </div>}
                                    
                                    {cleaner ? <div  className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faSprayCanSparkles} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faSprayCanSparkles}/>
                                    </div>}

                                    {heating ? <div className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faTemperatureHigh} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faTemperatureHigh}/>
                                    </div>}

                                    {gym ? <div  className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faDumbbell} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faDumbbell}/>
                                    </div>}

                                    {courtyard ? <div  className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faTree} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faTree}/>
                                    </div>}

                                    {parking ? <div  className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faSquareParking} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faSquareParking}/>
                                    </div>}

                                    {high_chair ? <div  className={`${style.icon_container} col-2`}>
                                    <FontAwesomeIcon icon={faHandsHoldingChild} />
                                </div> :
                                    <div className= {`${style.missing_container} col-2`}>
                                        <FontAwesomeIcon icon={faHandsHoldingChild}/>
                                    </div>}
                            </div>
                            <hr />
                            <div>
                                <p> <strong className={style.fontG}> {price} </strong> a notte</p>
                                { free_canc ? <p>Cancellazione gratuita</p> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}