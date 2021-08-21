import './friend.css'
import {Link} from 'react-router-dom';
export default function Friend({name , image , url}) {
    return (
        <Link to={url} className="friend__item">
            <img src={image} alt="Friend" />
            <h5>{name}</h5>
        </Link>
    )
}
