import axios from "axios"
import { useState, useContext } from "react"
import GlobalContext from "../context/GlobalContext"

export default function FormMail() {

    const { API_URL, user } = useContext(GlobalContext)

    const initialMailInfo = {
        name: '',
        message: '',
        recipient: "ciao@ciao.com"
    }


    const [mailInfo, setMailInfo] = useState(initialMailInfo)

    function handleForm(e) {
        setMailInfo(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    function onSubmit(e) {
        e.preventDefault()
        const sendEmail = {
            ...mailInfo,
            email: user.email
        }
        axios.post(`${API_URL}send/`, sendEmail).then((res) => {
            console.log('messaggio inviato')
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <>
            {user && <form onSubmit={onSubmit}>
                <input type="text" name="name" value={mailInfo.name} onChange={(e) => handleForm(e)} />
                <textarea name="message" value={mailInfo.message} onChange={(e) => handleForm(e)} ></textarea>
                <input type="submit" />
            </form>}
        </>
    )
}