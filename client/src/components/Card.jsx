import { Link } from 'react-router'
import GlobalContext from '../context/GlobalContext';
import { useContext } from 'react';
import heartIcon from '../assets/icon-gallery/heart-salmon.png'
import style from '../assets/modules/Card.module.css'

function CardProperty({ property, callback }) {

    const { API_URL } = useContext(GlobalContext)


    const { id, title, room, toilet, square_meter, bed, image, heart, avg_vote, address, city, province, type } = property
    return (
        <div className='col-3'>
            <div className={style.card}>
                <div className="card-body">
                    <figure className={style.img_container}>
                        <img className={style.img} src={`${API_URL}/img/${image}`} />
                    </figure>
                    <div className={style.text}>
                        <h5 className={style.title}>{title}</h5>
                        <p>
                            {address}, {city}, ({province})
                        </p>
                    </div>
                    <p className={style.vote}>
                        {parseFloat(avg_vote).toFixed(1)}
                    </p>
                    <div>
                        <button className={style.heart} onClick={() => callback(id)}>
                            <img className={style.icon} src={heartIcon} alt="" />
                            <div>
                                {heart}
                            </div>
                        </button>
                    </div>

                </div>
                <Link className={style.button} to={`/properties/${id}`}>Scopri di più</Link>
            </div>


        </div>

    );
}

export default CardProperty;