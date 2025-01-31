import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import GlobalContext from "../context/GlobalContext"
import style from '../assets/modules/UserDetail.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import profile from '../assets/logo-label/Bool_bnb_logo_gradient 2.png'

export default function UserDetail() {

    const { user, setUser } = useContext(GlobalContext)
    const navigate = useNavigate()
    const { name, surname, number, email, username, property } = user
    console.log(property)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
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
                        <p>Nome: {name}</p>
                        <p>Cognome: {surname}</p>
                        <p>Numero: {number}</p>
                        <p>email: {email}</p>
                        <p>Usernamee: {username}</p>
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
                            <div key={prop.id} property={property}>
                                <p><strong>{prop.address}</strong></p>
                                <p> {prop.type}</p>
                                <p>{prop.avg_vote}</p>
                                <p>Stanze: {prop.room}</p>
                                <p>Bagni: {prop.toilet}</p>
                                <p>Letti: {prop.bed}</p>
                                <p>Mq: {prop.square_meter}</p>
                            </div>
                        )) : <p>Non ci sono proprietà</p>}
                    </div>
                </div>
            </section>
        </>


    )
}