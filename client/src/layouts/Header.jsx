import { Link, NavLink, useLocation, useNavigate } from "react-router"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"
import styleHomePage from '../assets/modules/Header.module.css'
import whiteLinear from '../assets/logo-gallery/white-linear.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPlus, faHouse } from '@fortawesome/free-solid-svg-icons'
import stylePages from '../assets/modules/HeaderPages.module.css'
import blackLinear from '../assets/logo-gallery/black-linear.png'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import SearchBar from '../components/SearchBar'

export default function Header() {
    const { setOverlayLogin, user, setUser, isLogin } = useContext(GlobalContext)
    let { pathname } = useLocation()
    const styles = pathname === '/' ? styleHomePage : stylePages
    const logo = pathname === '/' ? whiteLinear : blackLinear



    function logOut() {
        localStorage.removeItem("user")
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
                    {isLogin ? <NavLink to={`users/${user.username}/properties`}>Affitta con Boolbnb</NavLink> : <div className={styles.insertprop} onClick={() => (setOverlayLogin(true))}>Affitta con Boolbnb</div>}
                </div>

                <div className={styles.navlink}>

                    {
                        isLogin ? <Link to={`users/${user.username}`}>
                            <div className={styles.rounded}>
                                <FontAwesomeIcon icon={faUser} />
                                {/* <span>{user.username}</span> */}
                            </div>
                        </Link> :
                            <div onClick={() => (setOverlayLogin(true))}>
                                <div className={styles.rounded}>
                                    <FontAwesomeIcon icon={faUser} />
                                    {/* <span>{user.username}</span> */}
                                </div>
                            </div>
                    }


                    {!isLogin ? <button
                        onClick={() => (setOverlayLogin(true))}
                        className={styles.button}>
                        Accedi
                    </button> : <button className={styles.button} onClick={logOut}>Log Out</button>}
                </div>

            </nav>
            {pathname !== '/' ? '' : <div className={`${styles.searchbar_mobile} ${styles.searchcontainer}`}>
                <SearchBar />
            </div>}

            <nav className={styles.navbar_mobile}>
                {pathname === '/' ? <div>
                    <NavLink to='/properties'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </NavLink>
                    <p>Cerca</p>
                </div> : <div>
                    <NavLink to='/'>
                        <FontAwesomeIcon icon={faHouse} />
                    </NavLink>
                    <p>Home</p>
                </div>}

                <div>
                    {isLogin ? <NavLink to={`users/${user.username}/properties`}><FontAwesomeIcon icon={faPlus} /></NavLink> : <div className={styles.insertprop} onClick={() => (setOverlayLogin(true))}><FontAwesomeIcon icon={faPlus} />

                    </div>}
                    <p>Inserisci</p>
                </div>
                <div>
                    {!isLogin ? <div className={styles.fakebtn}
                        onClick={() => (setOverlayLogin(true))}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </div> : <div className={styles.fakebtn} onClick={logOut}><FontAwesomeIcon icon={faUser} /></div>}
                    <p>{isLogin ? 'LogOut' : 'Accedi'}</p>
                </div>
            </nav>
        </div>
    )
}