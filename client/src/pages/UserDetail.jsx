import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import GlobalContext from "../context/GlobalContext"
import style from '../assets/modules/UserDetail.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { faToilet } from '@fortawesome/free-solid-svg-icons'
import profile from '../assets/logo-label/Bool_bnb_logo_gradient 2.png'
import axios from "axios"

export default function UserDetail() {

    const { user, setUser, API_URL } = useContext(GlobalContext)
    const navigate = useNavigate()
    const { name, surname, number, email, username, property } = user
    console.log(property)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        console.log(JSON.parse(storedUser))
        axios.get(`${API_URL}users/${JSON.parse(storedUser).id}`)
            .then(res => {
                setUser(res.data)
            })
    }, [])


    function goBack() {
        navigate(-1)
    }

    return (
        <>
            <section className='container'>
                <button className={style.button} onClick={goBack}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <div className={style.container_user}>
                    <div className={style.user_profile}>
                        <h2 className={style.title}>Il Tuo Profilo</h2>
                        <img className={style.profile_img} src={profile} alt="" />
                    </div>
                    <div className={style.card_user}>
                        <p><strong>Nome: </strong>{name}</p>
                        <p><strong>Cognome: </strong>{surname}</p>
                        <p><strong>Numero: </strong>{number}</p>
                        <p><strong>email: </strong>{email}</p>
                        <p><strong>Username: </strong>{username}</p>
                    </div>
                    <div className={style.btn_property}>
                        <Link className={`${style.button_newProp} btn btn-danger`} to={'properties'} >Inserisci immobile</Link>
                    </div>
                </div>


                <div className={style.container_newProp}>
                    <div className={style.card_newProp}>
                        <h3 className={style.title_prop}>
                            Immobili inseriti
                        </h3>

                        {property ? property.map((prop) => (
                            <div className={style.card_propInsert} key={prop.id} property={property}>
                                <div className="col-3">
                                    <p><strong>{prop.address}, {prop.city}</strong></p>
                                </div>
                                <div className="col-2">
                                    <div className={style.icon_container}>
                                        <FontAwesomeIcon className={style.icon} icon={faHome} />

                                    </div>
                                    <span>{prop.type}</span>
                                </div>
                                <span>{prop.avg_vote}</span>
                                <div className="col-2">
                                    <div className={style.icon_container}>
                                        <FontAwesomeIcon className={style.icon} icon={faSquare} />
                                    </div>
                                    <span> {prop.room}</span>
                                </div>
                                <div className="col-2">
                                    <div className={style.icon_container}>
                                        <FontAwesomeIcon className={style.icon} icon={faToilet} />
                                    </div>
                                    <span> {prop.toilet}</span>
                                </div>
                                <div className="col-2">
                                    <div className={style.icon_container}>
                                        <FontAwesomeIcon className={style.icon} icon={faBed} />
                                    </div>
                                    <span> {prop.bed}</span>

                                </div>
                                <div className="col-2">
                                    <div className={style.icon_container}>
                                        <span><strong className={style.icon}>m&#178;</strong> </span>
                                    </div>
                                    <span>{prop.square_meter}</span>
                                </div>
                            </div>
                        )) : <p>Non ci sono proprietà</p>}
                    </div>
                </div>
            </section>
        </>


    )
}