import { useContext, useEffect, useState } from "react"
import GlobalContext from "../context/GlobalContext"
import axios from "axios";

export default function Messages({ destinatarioId }) {

    const { API_URL, user } = useContext(GlobalContext);
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (!user) return;
        // setInterval(() => {
        axios.get(`${API_URL}send/${user.id}`, {
            params: {
                destinatario_id: destinatarioId
            }
        }).then((res) => {
            setMessages(res.data)
        }).catch((err) => {
            console.error(err)
        })
        // }, 500)
    }, [])
    return (
        <div className="chat">
            {messages ? messages.map((message, index) => {
                <div key={index} className="message"><p>{message.message}</p></div>
            }) :
                <p>Per iniziare una chat invia prima una mail al host della casa.</p>}
        </div>
    )
}