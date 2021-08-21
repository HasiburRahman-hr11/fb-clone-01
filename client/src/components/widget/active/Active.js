import './active.css';
import { Avatar } from '@material-ui/core';


export default function Active({title , image}) {
    return (
        <div className="active__friend d__flex align__center">
            <Avatar src={image} className="active__friend_avatar"/>
            <h4 className="active__friend_title">{title}</h4>
            <span className="active__status"></span>
        </div>
    )
}
