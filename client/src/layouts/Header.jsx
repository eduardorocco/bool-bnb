import { Link, NavLink, useNavigate } from "react-router"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"
import style from '../assets/modules/Header.module.css'
import whiteLinear from '../assets/logo-gallery/white-linear.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const { setOverlayLogin, user, setUser, isLogin } = useContext(GlobalContext)

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
                    {!isLogin ? <button
                        onClick={() => (setOverlayLogin(true))}
                        className={style.button}>
                        Accedi
                    </button> : <button className={style.button} onClick={logOut}>Log Out</button>}
                </div>

            </nav>
        </div>
    )
}