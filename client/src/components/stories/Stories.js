import './stories.css';
import Story from './story/Story';
import UserContext from '../../context/UserContext';
import { useContext} from 'react';
import Loading from '../loading/Loading';

// import axios from 'axios';


export default function Stories() {
    const { profilePicture , profile , isLoading} = useContext(UserContext);

    return (
        <div className="stories">
            {isLoading && (
                <Loading/>
            )}
            <Story 
            image={profilePicture === '/uploads/avatar.png' ? process.env.REACT_APP_DEF_FOLDER+profilePicture : profilePicture} 
            profilePic={profilePicture === '/uploads/avatar.png' ? process.env.REACT_APP_DEF_FOLDER+profilePicture : profilePicture} 
            title={profile?.firstName}
            user
            />
            <Story 
            image="https://images.pexels.com/photos/457418/pexels-photo-457418.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            profilePic="https://images.pexels.com/photos/2694040/pexels-photo-2694040.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            title="Mike"
            />
            <Story
            image="https://images.pexels.com/photos/5086489/pexels-photo-5086489.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            profilePic="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            title="Mark Hanry"
            />
            <Story
            image="https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            profilePic="https://avatars.githubusercontent.com/u/68282989?s=400&v=4"
            title="Robert Downey Jr."
            />
            <Story
            image="https://images.pexels.com/photos/1816823/pexels-photo-1816823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            profilePic="https://images.pexels.com/photos/789555/pexels-photo-789555.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            title="Laila"
            />
            <Story
            image="https://images.pexels.com/photos/3850526/pexels-photo-3850526.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            profilePic="https://images.pexels.com/photos/2748239/pexels-photo-2748239.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            title="Amanda"
            />
        </div>
    )
}
