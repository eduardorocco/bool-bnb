import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import GlobalContext from "../context/GlobalContext"
import CardProperty from '../components/Card'
import SearchBar from '../components/SearchBar'
import LoginForm from '../components/LoginForm'
import style from '../assets/modules/HomePage.module.css'
import house from '../assets/houses/house.jpg'
import hero from '../assets/img/Bool_bnb_hero.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'


export default function HomePage() {

    const { API_URL, setUser, setSearch } = useContext(GlobalContext)
    const [properties, setProperties] = useState([])

    function fetchProperties() {
        axios.get(`${API_URL}properties`, {
            params: {
                limit: 4
            }
        })
            .then(res => {
                setProperties(res.data)
            })
            .catch(err => {
                console.error(err);
            })
    }


    function addHeart(id) {
        axios.patch(`${API_URL}properties/${id}/heart`)
            .then(res => {
                fetchProperties()
            })
    }

    useEffect(() => {
        fetchProperties()
    }, [])

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <main>
            <div className={style.jumbo}>
                <div>
                    <p className={style.slogan}>"Scopri, vivi, condividi."</p>
                </div>

                <figure className={style.image_container}>
                    <img className={style.image} src={house} alt="" />
                </figure>
                <div className={style.searchbar}>
                    <SearchBar />
                </div>
            </div>

            <div className={style.box}>
                <figure className={style.preview}>
                    <img src={hero} />
                </figure>
            </div>

            <div className={`${style.card_container} container-fluid p-6`}>
                <h3 className={style.title}>Le più amate:</h3>
                <div className="row">

                    {properties.map(property => {
                        return (
                            <CardProperty key={property.id} property={property} callback={() => (addHeart(property.id))} />
                        )
                    })}
                </div>
            </div>
            <div className={`${style.shadow} container-fluid`}>
                <Link className={style.showmore} to='/properties' onClick={() => setSearch({})}>Mostra di più <FontAwesomeIcon className={style.arrow} icon={faArrowRight} /></Link>
            </div>
        </main>

    )
}