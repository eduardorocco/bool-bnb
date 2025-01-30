import { Formik, Form } from 'formik'
import * as yup from 'yup'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Select from '../components/Select'
import { useParams } from "react-router-dom"
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { useContext, useState } from 'react'

export default function InsertPropertyPage() {

    const { id } = useParams()

    const { API_URL } = useContext(GlobalContext)
    const [newImage, setNewImage] = useState(null)

    const MAX_FILE_SIZE = 102400; //100KB

    const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] }; // oggetto che contiene le tipologie di estensione file validi

    function isValidFileType(fileName, fileType) {
        // se fileName esiste
        // fileType image cosi cerca l'attributo image dentro validFileExtensions
        // fileName nome del file caricato "fileName.split('.').pop()" prende l'estensione del file dopo il .
        // con il controllo di indexOf > -1 controlla che sia presente in validFileExtensions e sia quindi valido
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }

    const propertySchema = yup.object().shape({
        title: yup.string().required("Inserisci il nome dell'immobile."),
        description: yup.string().min(15, "Dicci qualcosa in più.").required("Inserisci una breve descrizione."),
        room: yup.number().positive().min(1, "L'immobile deve avere almeno una stanza.").required("Selezionare il numero di stanze."),
        bed: yup.number().positive().min(1, "L'immobile deve avere almeno un letto.").required("Selezionare il numero di letti."),
        toilet: yup.number().positive().min(1, "L'immobile deve avere almeno un bagno.").required("Selezionare il numero di bagni."),
        square_meter: yup.number().positive().min(2, "Inserire una grandezza abitabile.").max(400, "Inserire una grandezza abitabile.").required("Inserire le dimensioni dell'immobile (in mq)."),
        address: yup.string().min(5, "Inserire un indirizzo valido.").required("Inserire un indirizzo."),
        city: yup.string().required("Inserire la città."),
        province: yup.string().min(2, "Inserire una provincia valida.").max(2, "Inserire una provincia valida.").required("Inserisci la provincia."),
        // image: yup.mixed() // bisogna aggiungere required dopo aver capito come fare l'upload
        //     .test("is-valid-type", "Not a valid image type", value => isValidFileType(value && value.name.toLowerCase(), "image"))
        //     .test("is-valid-size", "Max allowed size is 100KB", value => value && value.size <= MAX_FILE_SIZE),
        type: yup.string().oneOf(['apartment', 'room', 'villa', 'loft', 'chalet']).required("Scegliere la tipologia di immobile"),
    })

    async function onSubmitProperties(values, action) {


        const { title, description, room, bed, toilet, square_meter, address, city, province, type, image } = values
        const newProperties = {
            title: title,
            description: description,
            room: room,
            bed: bed,
            toilet: toilet,
            square_meter: square_meter,
            address: address,
            city: city,
            province: province,
            type: type,
            image: newImage.name
        }
        const addProperties = await axios.post(`${API_URL}properties/${id}`, newProperties).then((_) => {

        }).catch((err) => {
            console.log(err.response.data)
        })

        const formData = new FormData()
        formData.append('image', newImage)

        const response = await axios.post(`${API_URL}api/upload`, formData, {
            headers: { 'content-Type': 'multipart/form-data' }
        }).then((_) => {
            console.log('L\'immagine è stata caricata')
        }).catch((err) => {
            console.log(err)
        })

        action.resetForm()
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()


    // }


    function onImageChange(e) {
        setNewImage(e.target.files[0])
    }




    return (
        <>
            <Formik initialValues={{ title: '', description: '', room: 1, bed: 1, toilet: 1, square_meter: 2, address: '', city: '', province: '', type: '', image: '' }} validationSchema={propertySchema} onSubmit={(values, actions) => onSubmitProperties(values, actions)}>
                {({ isSubmitting }) => (
                    <>
                        <Form>
                            <Input label='Nome della proprietà' name='title' type='text' placeholder="Es. Villetta sul lago di..." />
                            <Select label="Tipologia di immobile" name="type" />
                            <Input label='Stanze' name='room' type='number' />
                            <Input label='Posti letto' name='bed' type='number' />
                            <Input label='Bagni' name='toilet' type='number' />
                            <Input label='Dimensioni immobile (mq)' name='square_meter' type='number' placeholder='Es. 30' />
                            <Input label='Indirizzo' name='address' type='text' placeholder="via esempio 15..." />
                            <Input label='Città' name='city' type='text' placeholder="Inserisci la città" />
                            <div className='toUppercase'><Input label='Provincia' name='province' type='text' minLength='2' maxLength='2' /></div>
                            <Textarea label='Descrizione' name='description' rows="5" placeholder="Inserisci la descrizione qui..." />
                            <button disabled={isSubmitting} type='reset'>Resetta Form</button>
                            <button disabled={isSubmitting} type='submit' className='btn btn-primary'>Crea immobile</button>
                            <Input type='file' id='image' name='image' onChange={onImageChange} />
                        </Form>
                    </>
                )}
            </Formik>
        </>


    )
}

