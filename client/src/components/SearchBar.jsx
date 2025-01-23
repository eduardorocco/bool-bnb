import GlobalContext from '../context/GlobalContext';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

export default function SearchBar() {

    const { API_URL, search, setSearch } = useContext(GlobalContext)
    const { city, setCity } = useContext(GlobalContext)
    const navigate = useNavigate();
    const { pathname } = useLocation()
    
    const initialSearchData =
    {
        address: '',
        type: '',
        room: '',
        bed: '',
        toilet: ''
    }



    function handleSearch(e) {
        const el = e.target
        setCity(
            {
                ...city, [el.name]: el.value
            })
        console.log(e.target.value);
    }

    function onSubmit(e) {
        setCity(initialSearchData)
        e.preventDefault()
        setSearch(city)
        if (pathname === '/properties') return
        navigate('/properties')

    }

    return (
        <form onSubmit={onSubmit} >
            <input
                type="text"
                placeholder='Cerca una città...'
                value={city.address}
                onChange={handleSearch}
                name='address'
            />

            <select
                value={city.type}
                name='type'
                className="form-select"
                aria-label="Type"
                onChange={handleSearch}>
                <option value={''}>Tipologia</option>
                <option value="villa">villa</option>
                <option value="chalet">chalet</option>
                <option value="apartment">apartment</option>
                <option value="loft">loft</option>
            </select>


            <select
                value={city.room}
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
            </select>


            <select
                name='bed'
                value={city.bed}
                className="form-select"
                aria-label="bed"
                onChange={handleSearch}>
                <option value={''} >Letti</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>


            <select
                value={city.toilet}
                name='toilet'
                className="form-select"
                aria-label="toilet"
                onChange={handleSearch}>
                <option value=''>Bagni</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>



            <button type='submit' className='btn btn-primary'>Cerca</button>

        </form>
    )
}