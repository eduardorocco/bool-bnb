import { NavLink } from "react-router"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"

export default function Header() {
    const {setOverlayLogin} = useContext(GlobalContext)
    return (
        <div className="container-fluid">
            <div>
                <nav className="d-flex align-items-center justify-content-between">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/properties'>Soggiorni</NavLink>
                    <NavLink to='/owners'>utente</NavLink>
                    <button onClick={()=>(setOverlayLogin(true))} className="btn btn-primary">Accedi</button>
                </nav>
            </div>
        </div>
    )
}