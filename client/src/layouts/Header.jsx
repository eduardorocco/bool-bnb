import { Link, NavLink, useLocation, useNavigate } from "react-router"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"
import styleHomePage from '../assets/modules/Header.module.css'
import whiteLinear from '../assets/logo-gallery/white-linear.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import stylePages from '../assets/modules/HeaderPages.module.css'
import blackLinear from '../assets/logo-gallery/black-linear.png'

export default function Header() {
    const { setOverlayLogin, user, setUser, isLogin } = useContext(GlobalContext)
    let { pathname } = useLocation()
    const styles = pathname === '/' ? styleHomePage : stylePages
    const logo = pathname === '/' ? whiteLinear : blackLinear

    const navigate = useNavigate()

    function logOut() {
        localStorage.removeItem("user")
        navigate('/')
        setUser({})
    }

    return (
        <div>
            <nav className={styles.navbar}>

                <Link to={'/'}>
                    <figure className={styles.logo_container}>
                        <img className={styles.logo} src={logo} alt="" />
                    </figure>
                </Link>

                <div className={styles.navlink}>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/properties'>
                        Soggiorni
                    </NavLink>
                </div>

                <div className={styles.navlink}>
                    <Link to={`users/${user.id}`}>
                        <div className={styles.rounded}>
                            <FontAwesomeIcon icon={faUser} />
                            {/* <span>{user.username}</span> */}
                        </div>
                    </Link>

                    {!isLogin ? <button
                        onClick={() => (setOverlayLogin(true))}
                        className={styles.button}>
                        Accedi
                    </button> : <button className={styles.button} onClick={logOut}>Log Out</button>}
                </div>

            </nav>
        </div>
    )
}