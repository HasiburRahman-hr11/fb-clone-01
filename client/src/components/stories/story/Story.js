import './story.css';
import {Avatar} from '@material-ui/core';
import {Add} from '@material-ui/icons';

export default function Story({image , profilePic , title , user}) {
    return (
        <div className="story__item">
            <img src={image} alt="Story" className="story__img" />
            <Avatar className="story__Profile_pic" src={profilePic} />
            {user ? (
                <div className="add__story">
                    <Add className="add__story_icon"/>
                    <p>Add Story</p>
                </div>
            ) : (
                <p className="story__title">{title}</p>
            )}
            
        </div>
    )
}
