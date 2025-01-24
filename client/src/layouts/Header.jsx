import { Link, NavLink } from "react-router"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"
import style from './Header.module.css'
import whiteLinear from '../assets/logo-gallery/white-linear.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const { setOverlayLogin, user } = useContext(GlobalContext)
    return (
        <div>
            <nav className={style.navbar}>
                <Link to={'/'}>
                    <figure className={style.logo_container}>
                        <img className={style.logo} src={whiteLinear} alt="" />
                    </figure>
                </Link>
                <div className={style.navlink}>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/properties'>Soggiorni</NavLink>

                </div>
                <div className={style.navlink}>
                    <NavLink to={`users/${user.id}`}>
                        <div className={style.rounded}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>

                    </NavLink>
                    <button
                        onClick={() => (setOverlayLogin(true))}
                        className={style.button}>
                        Accedi
                    </button>
                </div>

            </nav>
        </div>
    )
}