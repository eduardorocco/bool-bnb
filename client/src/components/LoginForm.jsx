import { Formik, Form } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { useContext } from 'react'

export default function LoginForm() {

    const {API_URL} = useContext(GlobalContext)
    const defaultSchema = yup.object().shape({
        email: yup.string().email('Inserire una mail valida').required("Inserire l'email")
    })

   async function onSubmit() {
    const userCheck = await axios.get(`${API_URL}/`)
        
    }

    return (
        <Formik initialValues={{email:''}} validationSchema={defaultSchema} onSubmit={onSubmit}>
            {({isSubmitting}) => (
                <Form>
                    <Input label='email' name='email' type='email' placeholder="Inserisci l'e-mail" />
                </Form>
            )}
        </Formik>
    )

}