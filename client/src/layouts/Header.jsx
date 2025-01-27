import { Link, NavLink, useNavigate } from "react-router"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"
import style from './Header.module.css'
import whiteLinear from '../assets/logo-gallery/white-linear.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function Header() {
    const { setOverlayLogin, user, setUser } = useContext(GlobalContext)
    const isUserEmpty = Object.keys(user).length === 0;
    const navigate = useNavigate()

    function logOut() {
        localStorage.removeItem("user")
        navigate('/')
        setUser({})
    }

    return (
        <div>
            <nav className={style.navbar}>
                <Link to={'/'}>
                    <figure className={style.logo_container}>
                        <img src={whiteLinear} alt="" />
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
                    {isUserEmpty ? <button
                        onClick={() => (setOverlayLogin(true))}
                        className={style.button}>
                        Accedi
                    </button> : <button onClick={logOut}>Log Out</button>}
                </div>

            </nav>
        </div>
    )
}