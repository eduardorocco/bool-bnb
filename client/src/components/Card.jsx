import { Link } from 'react-router'
function CardProperty({ property }) {

    const { id, title, room, toilet, square_meters, bed, image, heart, avg_vote } = property
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="card-text">
                    <span>Stanze: {room}</span>
                    <span>Bagni: {toilet}</span>
                    <span>Letti: {bed}</span>
                    <span>Mq: {square_meters}</span>
                    <span>Cuori: {heart}</span>
                </div>
                <Link  className="btn btn-primary" to={`/${id}`}>Dettaglio</Link>
            </div>
        </div>

    );
}

export default CardProperty;