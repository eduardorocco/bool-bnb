import GlobalContext from '../context/GlobalContext';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import styleHomePage from '../assets/modules/SearchBarHomePage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import stylePages from '../assets/modules/SearchBarPages.module.css'

export default function SearchBar() {

    const { API_URL, search, setSearch } = useContext(GlobalContext)
    const { searchCity, setSearchCity } = useContext(GlobalContext)
    const navigate = useNavigate();
    let { pathname } = useLocation()

    const styles = pathname === '/' ? styleHomePage : stylePages



    const initialSearchData =
    {
        city: '',
        type: '',
        room: '',
        bed: '',
        toilet: ''
    }



    function handleSearch(e) {
        const el = e.target
        setSearchCity(
            {
                ...searchCity, [el.name]: el.value
            })
        console.log(e.target.value);
    }

    function onSubmit(e) {
        setSearchCity(initialSearchData)
        e.preventDefault()
        setSearch(searchCity)
        if (pathname === '/properties') return
        navigate('/properties')

    }

    return (
        <div className={`container `}>
            <form onSubmit={onSubmit} className={styles.form} >
                {pathname === '/properties' && search.city && <p>hai filtrato per {search.city}</p>}
                <input
                    className={styles.input}
                    type="text"
                    placeholder='Dove andiamo?'
                    value={searchCity.city}
                    onChange={handleSearch}
                    name='city'
                />

                {pathname === '/' ? '' : <select
                    value={searchCity.type}
                    name='type'
                    className="form-select"
                    aria-label="Type"
                    onChange={handleSearch}>
                    <option value={''}>Tipologia</option>
                    <option value="villa">villa</option>
                    <option value="chalet">chalet</option>
                    <option value="apartment">apartment</option>
                    <option value="loft">loft</option>
                </select>}


                {pathname === '/' ? '' : <select
                    value={searchCity.room}
                    name='room'
                    className="form-select"
                    aria-label="room"
                    onChange={handleSearch}>
                    <option value={''}>Stanze</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>}


                {pathname === '/' ? '' : <select
                    name='bed'
                    value={searchCity.bed}
                    className="form-select"
                    aria-label="bed"
                    onChange={handleSearch}>
                    <option value={''} >Letti</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>}


                {pathname === '/' ? '' : <select
                    value={searchCity.toilet}
                    name='toilet'
                    className="form-select"
                    aria-label="toilet"
                    onChange={handleSearch}>
                    <option value=''>Bagni</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>}



                <button type='submit' className={styles.button}> {pathname === '/' ? <FontAwesomeIcon icon={faMagnifyingGlass} /> : 'Filtra'}</button>


            </form>
        </div>

    )
}