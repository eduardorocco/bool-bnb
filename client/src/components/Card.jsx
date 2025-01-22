import { Link } from 'react-router'
import GlobalContext from "../context/GlobalContext"
import { useContext } from 'react'
function CardProperty({ property }) {

    const { addHeart }= useContext(GlobalContext)

    const { id, title, room, toilet, square_meter, bed, image, heart, avg_vote, address, type } = property
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="card-text">
                    <span>Stanze: {room}</span>
                    <span>Bagni: {toilet}</span>
                    <span>Letti: {bed}</span>
                    <span>Mq: {square_meter}</span>
                    <div>
                    <button onClick={() => addHeart(id)} className='btn btn-danger'> {heart} </button>
                    </div>
                    
                    <span><strong>{address}</strong></span>
                    <span> {type}</span>
                    <span>{avg_vote}</span>
                </div>
                <Link className="btn btn-primary" to={`properties/${id}`}>Dettaglio</Link>
            </div>
        </div>

    );
}

export default CardProperty;