import { useState, useContext, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router"
import GlobalContext from "../context/GlobalContext"
import axios from "axios"
export default function UserDetail() {

    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {

        const storedUser = localStorage.getItem("user")

        if (storedUser) {

            setUser(JSON.parse(storedUser))
        }
    }, [setUser])


    function goBack() {
        navigate(-1)
    }


    // const { id } = useParams()
    //const [user, setUser] = useState({})



    // function fetchUser() {
    //     axios.get(`${API_URL}users/${id}`)
    //         .then(res => {
    //             setUser(res.data[0])
    //         }).catch(err => {
    //             console.err(err)
    //         })
    // }

    // useEffect(() => {
    //     fetchUser()
    // }, [id])


    const { name, surname, number, email, username } = user

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