import { Link, useLocation } from 'react-router'
import GlobalContext from '../context/GlobalContext';
import { useContext } from 'react';
import heartIcon from '../assets/icon-gallery/heart-salmon.png'
import style from '../assets/modules/Card.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function CardProperty({ property, callback }) {

    const { API_URL } = useContext(GlobalContext)
    const { pathname } = useLocation()

    const { id, title, square_meter, bed, image, heart, avg_vote, address, city, province, type } = property

    return (

        <div className={pathname === '/' ? 'col-3' : 'col-6 col-lg-4 col-xxl-2'}>

            <div className={style.card}>

                <div className="card-body">

                    <figure className={style.img_container}>
                        <img className={style.img} src={`${API_URL}/img/${image}`} />
                    </figure>

                    <div className={style.card_container}>
                        <h5 className={style.title}>{title}</h5>
                        <p>
                            {address}, <strong>{city}</strong>, ({province})
                        </p>
                    </div>

                    <div className={style.icon_container}>
                        <div>
                            <span className={style.icon}> m&#178;</span>
                            <span>{square_meter}</span>
                        </div>

                        <div>
                            <span className={style.icon}><FontAwesomeIcon icon={faBed} /></span>
                            <span>{bed}</span>
                        </div>

                        <div>
                            <span className={style.icon}><FontAwesomeIcon icon={faHome} /></span>
                            <span className={style.type}>{type}</span>
                        </div>

                    </div>


                    <p className={style.vote}>
                        {avg_vote ? parseFloat(avg_vote).toFixed(1) : '-'}
                    </p>
                    <div>
                        <button className={style.heart} onClick={() => callback()}>
                            <img className={style.icon_heart} src={heartIcon} alt="" />
                            <div>
                                {heart}
                            </div>
                        </button>
                    </div>

                </div>
                <Link className={style.button} to={`/properties/${title.replaceAll(' ', '-').toLowerCase()}`}>Scopri di più</Link>
            </div>


        </div>

    );
}

export default CardProperty;