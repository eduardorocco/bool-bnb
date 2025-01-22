import GlobalContext from '../context/GlobalContext';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router';

export default function SearchBar() {

    const { API_URL, search, setSearch } = useContext(GlobalContext)
    const [city, setCity] = useState('')
    // let { pathname } = useLocation()
    // const [redirector, setRedirector] = useState(pathname)
    
    
    console.log(pathname, useLocation());
    function handleSearch(e) {
        setCity(e.target.value)
        console.log(e.target.value);
    }

    function onSubmit(e) {
        setCity('')
        e.preventDefault()
        setSearch(city)
        // pathname = '/properties'
    }

    return (
        <form onSubmit={onSubmit} >
            <input
                type="text"
                placeholder='Cerca una città...'
                value={city}
                onChange={handleSearch}
            />
            
            <button type='submit' className='btn btn-primary'>Cerca</button>
            
        </form>
    )
}