import { Formik, Form } from 'formik'
import * as yup from 'yup'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import { useParams } from "react-router-dom"
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { useContext } from 'react'

export default function InsertPropertyPage() {
    const { id } = useParams()

    const { API_URL } = useContext(GlobalContext)

    const MAX_FILE_SIZE = 102400; //100KB

    const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] }; // oggetto che contiene le tipologie di estensione file validi

    function isValidFileType(fileName, fileType) {
        // se fileName esiste
        // fileType image cosi cerca l'attributo image dentro validFileExtensions
        // fileName nome del file caricato "fileName.split('.').pop()" prende l'estensione del file dopo il .
        // con il controllo di indexOf > -1 controlla che sia presente in validFileExtensions e sia quindi valido
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    const loginSchema = yup.object().shape({
        title: yup.string().required("Inserisci il nome dell'immobile."),
        description: yup.string().min(15, "Dicci qualcosa in più.").required("Inserisci una breve descrizione."),
        room: yup.number().positive().min(1).required("Selezionare il numero di stanze."),
        bed: yup.number().positive().min(1).required("Selezionare il numero di letti."),
        toilet: yup.number().positive().min(1).required("Selezionare il numero di bagni."),
        square_meter: yup.number().positive().min(2, "Inserire una grandezza abitabile.").max(400, "Inserire una grandezza abitabile.").required("Inserire le dimensioni dell'immobile (in mq)."),
        adress: yup.string().min(5, "Inserire un indirizzo valido.").required("Inserire un indirizzo."),
        city: yup.string().required("Inserire la città."),
        province: yup.string().min(2, "Inserire una provincia valida.").max(2, "Inserire una provincia valida.").required("Inserisci la provincia."),
        image: yup.mixed() // bisogna aggiungere required dopo aver capito come fare l'upload
            .test("is-valid-type", "Not a valid image type", value => isValidFileType(value && value.name.toLowerCase(), "image"))
            .test("is-valid-size", "Max allowed size is 100KB", value => value && value.size <= MAX_FILE_SIZE),
        type: yup.string().oneOf(['apartment', 'room', 'villa', 'loft', 'chalet']).required("Scegliere la tipologia di immobile"),
    })

    async function onSubmit(action, values) {
        const newProperties = await axios.post(`${API_URL}/users/${id}/properties`, values).then((_) => {
        }).catch((err) => {
            console.log(err.response.data)
        })
        action.resetForm()
    }

    return (
        // bisognerà aggiungere image
        <Formik initialValues={{ title: '', description: '', room: 0, bed: 0, toilet: 0, square_meter: 0, adress: '', city: '', province: '', type: '' }} validationSchema={loginSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <Input label='Nome della proprietà' name='title' type='text' placeholder="Es. Villetta sul lago di..." />
                    <Input label='Stanze' name='room' type='number' max='30' placeholder="Es. Villetta sul lago di..." />
                    <Input label='Posti letto' name='bed' type='number' max='40' placeholder="Es. Villetta sul lago di..." />
                    <Input label='Bagni' name='toilet' type='number' max='30' placeholder="Es. Villetta sul lago di..." />
                    <Input label='Dimensioni immobile (mq)' name='square_meter' type='number' max='5000' placeholder='Es. 30' />
                    <Input label='Indirizzo' name='address' type='text' placeholder="via esempio 15..." />
                    <Input label='Città' name='city' type='text' placeholder="Inserisci la città" />
                    <Input label='Provincia' style="text-transform: uppercase;" name='province' type='text' minlength='2' maxlength='2' />
                    <Textarea label='Descrizione' name='description' rows="5" placeholder="Inserisci la descrizione qui..." />
                    <button disabled={isSubmitting} type='reset'>Resetta Form</button>
                    <button disabled={isSubmitting} type='submit' className='btn btn-primary'>Carica Immobile</button>
                </Form>
            )}
        </Formik>
    )
}

// resize: none;
