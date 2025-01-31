import axios from "axios"
import { useState, useContext } from "react"
import GlobalContext from "../context/GlobalContext"
import Textarea from "./Textarea"
import Input from "./Input"
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import style from '../assets/modules/MailForm.module.css'

export default function FormMail({ userId }) {

    const { API_URL, user } = useContext(GlobalContext)
    const [userEmail, setUserEmail] = useState()

    // const initialMailInfo = {
    //     name: '',
    //     message: '',
    // }

    axios.get(`${API_URL}users/${userId}`).then((res) => {
        setUserEmail(res.data.email)
    }).catch((err) => {
        console.error(err)
    })

    const emailSchema = yup.object().shape({
        name: yup.string().min(2, 'Nome troppo corto.').required("Inserire il nome."),
        message: yup.string().min(5, "Scrivi quacosa in più.").required("Inserire il messaggio.")
    })

    // const [mailInfo, setMailInfo] = useState(initialMailInfo)

    // function handleForm(e) {
    //     setMailInfo(prevState => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    async function onSubmit(values, action) {
        const sendEmail = {
            ...values,
            email: user.email,
            recipient: userEmail
        }
        const addMessage = await axios.post(`${API_URL}send/`, sendEmail).then((res) => {
            console.log('messaggio inviato')
        }).catch((err) => {
            console.error(err)
        })

        action.resetForm()
    }

    return (
        <>
            {user && <Formik
                initialValues={{ name: '', message: '' }}
                validationSchema={emailSchema}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (

                    <div className={style.review_container}>
                        <h5 className={`${style.title_20} text-center`}>Contatta il propietario</h5>
                        <Form className={style.card_review}>
                            <div className={style.form_review_flex}>
                                <Input
                                    label='Inserisci il nome'
                                    name='name'
                                    type='text'
                                    placeholder="nome cognome"
                                    className={style.review_title}
                                />

                                <Textarea label='Messaggio'
                                    name='message'
                                    placeholder="Richiedi la prenotazione o altre info al proprietario..."
                                    rows="5"
                                    className={style.form_el} />

                            </div>
                            <div className={style.btn_container}>
                                <button type="submit"
                                    className={style.button}>
                                    Invia
                                </button>
                            </div>
                        </Form>
                    </div>

                )}
            </Formik>}
        </>
    )
}