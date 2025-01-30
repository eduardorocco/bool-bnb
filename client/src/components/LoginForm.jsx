import { Formik, Form } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { useContext, useState } from 'react'
import Input from './Input'
import style from '../assets/modules/LoginForm.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function LoginForm() {
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/

    const { API_URL, setOverlayLogin, setUser } = useContext(GlobalContext)

    const [checkUser, setCheckUser] = useState(false)
    const [login, setLogin] = useState(true)

    const loginSchema = yup.object().shape({
        user: yup.string().min(5, 'Inserire una mail o un username valido').required("Inserire l'email o l'username"),
        passwordLog: yup
            .string()
            .min(5).matches(passwordRules, { message: "Password debole" })
            .required("Inserire una password")
    })

    const registrationSchema = yup.object().shape({
        name: yup.string().min(2, "Lunghezza del nome troppo corta.").required("Il nome è richiesto."),
        surName: yup.string().min(2, "Lunghezza del cognome troppo corta.").required("Il cognome è richiesto."),
        email: yup.string().email("Inserire un' email valida.").required("L' email è richiesta."),
        number: yup.string().min(10, "Numero di telefono non valido").max(10, "Numero di telefono non valido").required('Inserisci il numero'),
        userName: yup.string().min(5, 'Lunghezza minima 5').required("Inserire l'email o l'username"),
        password: yup
            .string()
            .min(5).matches(passwordRules, { message: "Password debole" })
            .required("Inserire una password"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'La password deve corrispondere!').required("Conferma la password")
    })

    async function onSubmitLogin(values, action) {
        const userCheck = await axios.get(`${API_URL}users/${values.user}`)
        const userData = userCheck.data
        setCheckUser(false)
        if (!userData) {
            setCheckUser(true)
            console.log('utente non trovato');
            return
        }


        const { email, username, password } = userData

        if (email !== values.user && username !== values.user) {
            setCheckUser(true)
            console.log('nome non valido');
            return
        }

        if (password !== values.passwordLog) {
            setCheckUser(true)
            console.log('password errata');
            return
        }

        localStorage.setItem("user", JSON.stringify(userData))

        action.resetForm()
        setOverlayLogin()
        setUser(userData)

        console.log(userData)
    }


    async function onSubmitRegistration(values, action) {
        const { name, surName, email, userName, password, number } = values

        const newUser = {
            name: name,
            surname: surName,
            email: email,
            number: number,
            username: userName,
            password: password
        }

        const addUser = await axios.post(`${API_URL}users`, newUser).then((_) => {

        }).catch((err) => {
            console.log(err.response.data)
        })

        action.resetForm()
        setLogin(!login)

    }

    return (
        <div className='bg-dark bg-opacity-50 fixed-top fixed-bottom d-flex justify-content-center align-items-center'>
            <div className={style.container}>
                <div className={style.hat}>
                    <div
                        className={style.close_button}
                        onClick={() => (setOverlayLogin())}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <p>Accedi o registrati</p>
                </div>
                <h5>Ti diamo il benvenuto su Boolbnb</h5>

                {checkUser &&
                    <span>
                        I dati inseriti non sono corretti
                    </span>}
                {login ? <Formik initialValues={{ user: '', passwordLog: '' }} validationSchema={loginSchema} onSubmit={onSubmitLogin}>
                    {({ isSubmitting }) => (
                        <Form>
                            <Input label='Inserisci nome utente o email' name='user' type='text' placeholder="example@email.com" />
                            <Input label='Inserisci una password' name='passwordLog' type='password' placeholder="Ciao1234" />
                            <button disabled={isSubmitting} type='reset'>Reset</button>
                            <button disabled={isSubmitting} type='submit' className='btn btn-primary'>Accedi</button>
                        </Form>
                    )}
                </Formik> :
                    <Formik initialValues={{ name: '', surName: '', email: '', number: '', userName: '', password: '', confirmPassword: '' }} validationSchema={registrationSchema} onSubmit={onSubmitRegistration}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Input label='Nome&#42;' name='name' type='text' placeholder="Inserisci il nome" />
                                <Input label='Cognome&#42;' name='surName' type='text' placeholder="Inserisci il cofnome" />
                                <Input label="Email&#42;" name='email' type='email' placeholder="example@email.com" />
                                <Input label="Numero di telefono" name='number' type='text' placeholder="xxxxxxxxx" />
                                <Input label='Username&#42;' name='userName' type='text' placeholder="username..." />
                                <Input label='Password&#42;' name='password' type='password' placeholder="Ciao1234" />
                                <Input label='Conferma password&#42;' name='confirmPassword' type='password' placeholder="Ciao1234" />
                                <button disabled={isSubmitting} type='reset'>Reset</button>
                                <button disabled={isSubmitting} type='submit' className='btn btn-primary'>Registrati</button>
                            </Form>
                        )}
                    </Formik>
                }
                <button onClick={() => { setLogin(!login) }}>{login ? "Registrati" : "Accedi"}</button>
            </div>
        </div>

    )

}