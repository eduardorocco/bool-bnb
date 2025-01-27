import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import GlobalContext from "../context/GlobalContext"
export default function UserDetail() {

    const { user, setUser } = useContext(GlobalContext)
    const navigate = useNavigate()
    const { name, surname, number, email, username } = user

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
                <p>Nome:{name}</p>
                <p>Cognome:{surname}</p>
                <p>Numero:{number}</p>
                <p>email:{email}</p>
                <p>Usernamee:{username}</p>
            </div>
            <Link className="btn btn-danger" to={'properties'} >insert properties</Link>
        </>


    )
}