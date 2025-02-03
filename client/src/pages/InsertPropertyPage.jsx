import { Formik, Form } from 'formik'
import * as yup from 'yup'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Select from '../components/Select'
import { useParams } from "react-router-dom"
import axios from 'axios'
import GlobalContext from '../context/GlobalContext'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import style from '../assets/modules/InsertPropertyPage.module.css'
import img_newProperty from '../assets/houses/form_newProperty.jpg'

export default function InsertPropertyPage() {

    const { id } = useParams()

    const { API_URL, setUser, user } = useContext(GlobalContext)
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
        distance_centre: yup.number().positive().min(0, "Inserire la distanza dal centro città.").required("Inserire la distanza dal centro città."),
        price: yup.number().positive().min(1, "Inserire il prezzo dell'immobile.").required("Inserire il prezzo dell'immobile."),
        swim: yup.boolean(),
        tv: yup.boolean(),
        animals: yup.boolean(),
        high_chair: yup.boolean(),
        cleaner: yup.boolean(),
        heating: yup.boolean(),
        air_conditioning: yup.boolean(),
        essential: yup.boolean(),
        gym: yup.boolean(),
        courtyard: yup.boolean(),
        washing_machine: yup.boolean(),
        parking: yup.boolean()

    })

    async function onSubmitProperties(values, action) {


        const { title, description, room, bed, toilet, square_meter, address, city, province, type, distance_centre, price, swim, tv, animals, high_chair, cleaner, heating, air_conditioning, essential, gym, courtyard, washing_machine, parking } = values
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
            image: newImage.name,
            distance_centre: distance_centre,
            price: price,
            swim: swim,
            tv: tv,
            animals: animals,
            high_chair: high_chair,
            cleaner: cleaner,
            heating: heating,
            air_conditioning: air_conditioning,
            essential: essential,
            gym: gym,
            courtyard: courtyard,
            washing_machine: washing_machine,
            parking: parking
        }
        const addProperties = await axios.post(`${API_URL}properties/${user.id}`, newProperties).then((_) => {

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
        console.log(e.target.files)
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])




    return (
        <>
            <Formik initialValues={{ title: '', description: '', room: 1, bed: 1, toilet: 1, square_meter: 2, address: '', city: '', province: '', type: '', image: '', distance_centre: 0, price: 1, swim: false, tv: false, animals: false, high_chair: false, cleaner: false, heating: false, air_conditioning: false, essential: false, gym: false, courtyard: false, washing_machine: false, parking: false }} validationSchema={propertySchema} onSubmit={(values, actions) => onSubmitProperties(values, actions)}>
                {({ isSubmitting }) => (

                    <div className={`container ${style.form_container}`}>

                        <div className={`col-md-8 col-12 ${style.background_form}`}>

                            <Form className={`${style.form_new} card`} >
                                <h2 className={style.title_form}>Inserisci la tua proprietà</h2>
                                <div className={`${style.cardForm_container} card-body`}>
                                    <div className={style.form_group}>
                                        <Input className={style.input_form} label='Nome della proprietà' name='title' type='text' placeholder="Es. Villetta sul lago di..." />
                                        <Select label="Tipologia" name="type" />
                                    </div>

                                    <div className={style.form_group}>
                                        <Input label='Stanze' name='room' type='number' />
                                        <Input label='Posti letto' name='bed' type='number' />
                                    </div>

                                    <div className={style.form_group}>
                                        <Input label='Bagni' name='toilet' type='number' />
                                        <Input label='Dimensioni (mq)' name='square_meter' type='number' placeholder='Es. 30' />
                                    </div>
                                    <div className={style.form_group}>
                                        <Input label='Prezzo' name='price' type='number' />
                                        <Input label='Distanza dal centro (km)' name='distance_centre' type='number' placeholder='Es. 5' />
                                    </div>

                                    <div className={style.form_group}>
                                        <Input label='Indirizzo' name='address' type='text' placeholder="via esempio 15..." />
                                        <Input label='Città' name='city' type='text' placeholder="Inserisci la città" />
                                    </div>

                                    <div className='toUppercase'><Input label='Provincia' name='province' type='text' minLength='2' maxLength='2' /></div>
                                    <Textarea className={style.form_group} label='Descrizione' name='description' rows="5" placeholder="Inserisci la descrizione qui..." />
                                    <div className={style.img_input}>
                                        <label htmlFor="">Carica immagine: </label>
                                        <input type='file' id='image' name='image' onChange={onImageChange} />
                                    </div>

                                    <div className={style.form_group_checkbox}>
                                        <Input label='piscina' name='swim' type='checkbox' />
                                        <Input label='tv' name='tv' type='checkbox' />
                                        <Input label='animali' name='animals' type='checkbox' />
                                        <Input label='lavatrice' name='washing_machine' type='checkbox' />
                                        <Input label='aria condizionata' name='air_conditioning' type='checkbox' />
                                        <Input label='posate' name='essential' type='checkbox' />

                                        <Input label='prodotti per pulire' name='cleaner' type='checkbox' />
                                        <Input label='riscaldamento' name='heating' type='checkbox' />
                                        <Input label='palestra' name='gym' type='checkbox' />
                                        <Input label='giardino' name='courtyard' type='checkbox' />
                                        <Input label='parcheggio' name='parking' type='checkbox' />
                                        <Input label='attrezzato per bambini' name='high_chair' type='checkbox' />
                                    </div>

                                    <div className={style.form_input}>
                                        <button disabled={isSubmitting} type='reset' className={style.button_reset}>Resetta Form</button>
                                        <button disabled={isSubmitting} type='submit' className={style.button_newProperty}>Crea immobile</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className={`col-4 ${style.image_container}`}>
                            <img src={img_newProperty} alt="Form immobile" className={style.image_prop} />
                        </div>

                    </div>


                )}
            </Formik>
        </>


    )
}

