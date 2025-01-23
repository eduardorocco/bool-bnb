import { Formik, Form } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { useContext, useState } from 'react'
import Input from './Input'

export default function LoginForm() {
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
    const { API_URL } = useContext(GlobalContext)
    const [checkUser, setCheckUser] = useState(false)
    const defaultSchema = yup.object().shape({
        user: yup.string().min(5, 'Inserire una mail o un username valido').required("Inserire l'email o l'username"),
        password: yup
        .string()
        .min(5).matches(passwordRules, { message: "Password debole"})
        .required("Inserire una password"),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'La password deve corrispondere!')
    })

    async function onSubmit(values, action) {
        const userCheck = await axios.get(`${API_URL}owners/${values.user}`)
        const userData = userCheck.data[0]
        const { email, username, password } = userData

        setCheckUser(false)

        if (!userData) {
            setCheckUser(true)
            console.log('utente non trovato');
            return
        }

        if(email !== values.user && username !== values.user) {
            setCheckUser(true)
            console.log('nome non valido');
         return
        }

        if(password !== values.password) {
            setCheckUser(true)
            console.log('password errata');
            return
        }

        console.log(userCheck.data[0]);
        action.resetForm()
        
    }

    return (
        <>
            <Formik initialValues={{ user: '', password:'' }} validationSchema={defaultSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <Input label='Inserisci nome utente o email' name='user' type='text' placeholder="example@email.com" />
                        <Input label='Inserisci una password' name='password' type='password' placeholder="Ciao1234" />
                        <button type='submit' className='btn btn-secondary'>Accedi</button>
                    </Form>
                )}
            </Formik>
            {checkUser &&
                <span>
                    I dati inseriti non sono corretti
                </span>}
        </>

    )

}