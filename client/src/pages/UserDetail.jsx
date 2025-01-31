import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import GlobalContext from "../context/GlobalContext"
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
            <button onClick={goBack}>Torna Indietro</button>
            <div>
                <h2>Il Tuo Profilo</h2>
                <p>Nome:{name}</p>
                <p>Cognome:{surname}</p>
                <p>Numero:{number}</p>
                <p>email:{email}</p>
                <p>Usernamee:{username}</p>
            </div>
            <Link className="btn btn-danger" to={'properties'} >insert properties</Link>
            <div>
                <h3>
                    Immobili inseriti
                </h3>

                {property ? property.map((prop) => (
                    <div key={prop.id} property={property}>
                        <span>Stanze: {prop.room}</span>
                        <span>Bagni: {prop.toilet}</span>
                        <span>Letti: {prop.bed}</span>
                        <span>Mq: {prop.square_meter}</span>
                        <span><strong>{prop.address}</strong></span>
                        <span> {prop.type}</span>
                        <span>{prop.avg_vote}</span>
                    </div>
                )) : <p>Non ci sono proprietà</p>}

            </div>
        </>


    )
}