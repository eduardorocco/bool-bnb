import { NavLink } from "react-router"
export default function Header() {
    return (
        <div className="container">
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/properties'>Pagina con filtri</NavLink>
                <NavLink to='/owners/1'>Pagina con i form</NavLink>
            </nav>
        </div>
    )
}